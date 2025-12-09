use axum::{
    routing::{get, post, put, delete},
    Router,
};
use sqlx::postgres::PgPoolOptions;
use std::net::SocketAddr;
use tower_http::cors::{CorsLayer, Any};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

mod models;
mod routes;
mod services;
mod middleware;
mod utils;

#[derive(Clone)]
pub struct AppState {
    pub db: sqlx::PgPool,
    pub redis: redis::aio::ConnectionManager,
    pub solana_client: solana_client::rpc_client::RpcClient,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Load environment variables
    dotenvy::dotenv().ok();
    
    // Initialize logging
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "info,solana_explorer_backend=debug".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    tracing::info!("Starting Solana Explorer Backend");

    // Database connection
    let database_url = std::env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set");
    let db = PgPoolOptions::new()
        .max_connections(50)
        .connect(&database_url)
        .await?;
    
    tracing::info!("Database connected");

    // Run migrations
    sqlx::migrate!("./migrations")
        .run(&db)
        .await?;
    
    tracing::info!("Migrations completed");

    // Redis connection
    let redis_url = std::env::var("REDIS_URL")
        .unwrap_or_else(|_| "redis://localhost:6379".to_string());
    let redis_client = redis::Client::open(redis_url)?;
    let redis = redis::aio::ConnectionManager::new(redis_client).await?;
    
    tracing::info!("Redis connected");

    // Solana RPC client
    let solana_rpc_url = std::env::var("SOLANA_RPC_URL")
        .unwrap_or_else(|_| "https://api.mainnet-beta.solana.com".to_string());
    let solana_client = solana_client::rpc_client::RpcClient::new(solana_rpc_url);
    
    tracing::info!("Solana RPC client initialized");

    // Create app state
    let state = AppState {
        db,
        redis,
        solana_client,
    };

    // Build routes
    let app = Router::new()
        // Health check
        .route("/health", get(routes::health::health_check))
        
        // API routes
        .route("/api/blocks", get(routes::blocks::list_blocks))
        .route("/api/blocks/:number", get(routes::blocks::get_block))
        .route("/api/transactions", get(routes::transactions::list_transactions))
        .route("/api/transactions/:signature", get(routes::transactions::get_transaction))
        .route("/api/addresses/:address", get(routes::addresses::get_address))
        .route("/api/addresses/:address/transactions", get(routes::addresses::get_address_transactions))
        .route("/api/tokens", get(routes::tokens::list_tokens))
        .route("/api/tokens/:mint", get(routes::tokens::get_token))
        .route("/api/markets", get(routes::markets::list_markets))
        .route("/api/markets/:pair", get(routes::markets::get_market))
        .route("/api/network/stats", get(routes::network::get_stats))
        .route("/api/search", get(routes::search::search))
        
        // Auth routes
        .route("/api/auth/register", post(routes::auth::register))
        .route("/api/auth/login", post(routes::auth::login))
        .route("/api/auth/logout", post(routes::auth::logout))
        
        // User routes
        .route("/api/user/profile", get(routes::user::get_profile))
        .route("/api/user/profile", put(routes::user::update_profile))
        .route("/api/user/api-keys", get(routes::user::get_api_keys))
        .route("/api/user/api-keys", post(routes::user::create_api_key))
        .route("/api/user/api-keys/:id", delete(routes::user::delete_api_key))
        .route("/api/user/watchlist", get(routes::user::get_watchlist))
        .route("/api/user/watchlist", post(routes::user::add_to_watchlist))
        .route("/api/user/watchlist/:id", delete(routes::user::remove_from_watchlist))
        
        // Admin routes
        .route("/api/admin/users", get(routes::admin::list_users))
        .route("/api/admin/users/:id", put(routes::admin::update_user))
        .route("/api/admin/ads", get(routes::admin::list_ads))
        .route("/api/admin/ads", post(routes::admin::create_ad))
        .route("/api/admin/ads/:id", put(routes::admin::update_ad))
        .route("/api/admin/ads/:id", delete(routes::admin::delete_ad))
        
        // State
        .with_state(state)
        
        // CORS
        .layer(
            CorsLayer::new()
                .allow_origin(Any)
                .allow_methods(Any)
                .allow_headers(Any)
        );

    // Server address
    let host = std::env::var("HOST").unwrap_or_else(|_| "0.0.0.0".to_string());
    let port = std::env::var("PORT").unwrap_or_else(|_| "8080".to_string());
    let addr: SocketAddr = format!("{}:{}", host, port).parse()?;

    tracing::info!("Server listening on {}", addr);

    // Start server
    let listener = tokio::net::TcpListener::bind(addr).await?;
    axum::serve(listener, app).await?;

    Ok(())
}
