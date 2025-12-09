use axum::{extract::{Path, Query, State}, Json};
use serde::{Deserialize, Serialize};
use crate::{AppState, routes::blocks::ListParams};

#[derive(Debug, Deserialize)]
pub struct TokenParams {
    #[serde(default = "default_page")]
    pub page: i32,
    #[serde(default = "default_limit")]
    pub limit: i32,
    #[serde(default = "default_sort")]
    pub sort: String,
}

fn default_page() -> i32 { 1 }
fn default_limit() -> i32 { 20 }
fn default_sort() -> String { "volume_24h".to_string() }

#[derive(Debug, Serialize)]
pub struct TokensResponse {
    pub tokens: Vec<Token>,
    pub total: i64,
    pub page: i32,
    pub limit: i32,
}

#[derive(Debug, Serialize)]
pub struct Token {
    pub mint: String,
    pub symbol: String,
    pub name: String,
    pub price: f64,
    pub price_change_24h: f64,
    pub volume_24h: f64,
    pub market_cap: f64,
    pub holders: i32,
}

pub async fn list_tokens(
    State(_state): State<AppState>,
    Query(params): Query<TokenParams>,
) -> Json<TokensResponse> {
    // Mock data - in production, fetch from Jupiter/DexScreener API
    let tokens = vec![
        Token {
            mint: "So11111111111111111111111111111111111111112".to_string(),
            symbol: "SOL".to_string(),
            name: "Solana".to_string(),
            price: 100.0,
            price_change_24h: 5.2,
            volume_24h: 1_000_000.0,
            market_cap: 50_000_000_000.0,
            holders: 1_000_000,
        },
    ];
    
    Json(TokensResponse {
        tokens,
        total: 1,
        page: params.page,
        limit: params.limit,
    })
}

pub async fn get_token(
    State(_state): State<AppState>,
    Path(_mint): Path<String>,
) -> Json<Option<Token>> {
    Json(None)
}
