use axum::{extract::{Path, State}, Json};
use serde::{Deserialize, Serialize};
use crate::{AppState, models::{ApiKey, WatchlistItem}};

#[derive(Debug, Serialize)]
pub struct UserProfile {
    pub id: String,
    pub email: String,
    pub username: Option<String>,
    pub role: String,
    pub created_at: i64,
}

pub async fn get_profile(State(_state): State<AppState>) -> Json<UserProfile> {
    Json(UserProfile {
        id: uuid::Uuid::new_v4().to_string(),
        email: "user@example.com".to_string(),
        username: None,
        role: "user".to_string(),
        created_at: chrono::Utc::now().timestamp(),
    })
}

pub async fn update_profile(
    State(_state): State<AppState>,
    Json(_payload): Json<serde_json::Value>,
) -> Json<UserProfile> {
    Json(UserProfile {
        id: uuid::Uuid::new_v4().to_string(),
        email: "user@example.com".to_string(),
        username: Some("updated_user".to_string()),
        role: "user".to_string(),
        created_at: chrono::Utc::now().timestamp(),
    })
}

pub async fn get_api_keys(State(_state): State<AppState>) -> Json<Vec<ApiKey>> {
    Json(vec![])
}

#[derive(Debug, Deserialize)]
pub struct CreateApiKeyRequest {
    pub name: String,
    pub plan: String,
}

pub async fn create_api_key(
    State(_state): State<AppState>,
    Json(_payload): Json<CreateApiKeyRequest>,
) -> Json<ApiKey> {
    Json(ApiKey {
        id: uuid::Uuid::new_v4(),
        user_id: uuid::Uuid::new_v4(),
        name: "My API Key".to_string(),
        key: format!("sk_live_{}", uuid::Uuid::new_v4()),
        plan: "free".to_string(),
        rate_limit: 10,
        requests_used: 0,
        active: true,
        created_at: chrono::Utc::now(),
    })
}

pub async fn delete_api_key(
    State(_state): State<AppState>,
    Path(_id): Path<String>,
) -> Json<serde_json::Value> {
    Json(serde_json::json!({ "message": "API key deleted" }))
}

pub async fn get_watchlist(State(_state): State<AppState>) -> Json<Vec<WatchlistItem>> {
    Json(vec![])
}

pub async fn add_to_watchlist(
    State(_state): State<AppState>,
    Json(_payload): Json<serde_json::Value>,
) -> Json<serde_json::Value> {
    Json(serde_json::json!({ "message": "Added to watchlist" }))
}

pub async fn remove_from_watchlist(
    State(_state): State<AppState>,
    Path(_id): Path<String>,
) -> Json<serde_json::Value> {
    Json(serde_json::json!({ "message": "Removed from watchlist" }))
}
