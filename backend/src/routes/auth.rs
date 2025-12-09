use axum::{extract::State, Json};
use serde::{Deserialize, Serialize};
use crate::AppState;

#[derive(Debug, Deserialize)]
pub struct RegisterRequest {
    pub email: String,
    pub password: String,
    pub username: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
}

#[derive(Debug, Serialize)]
pub struct AuthResponse {
    pub token: String,
    pub user: UserInfo,
}

#[derive(Debug, Serialize)]
pub struct UserInfo {
    pub id: String,
    pub email: String,
    pub username: Option<String>,
    pub role: String,
}

pub async fn register(
    State(_state): State<AppState>,
    Json(_payload): Json<RegisterRequest>,
) -> Json<AuthResponse> {
    // Mock response
    Json(AuthResponse {
        token: "mock_jwt_token".to_string(),
        user: UserInfo {
            id: uuid::Uuid::new_v4().to_string(),
            email: "user@example.com".to_string(),
            username: None,
            role: "user".to_string(),
        },
    })
}

pub async fn login(
    State(_state): State<AppState>,
    Json(_payload): Json<LoginRequest>,
) -> Json<AuthResponse> {
    // Mock response
    Json(AuthResponse {
        token: "mock_jwt_token".to_string(),
        user: UserInfo {
            id: uuid::Uuid::new_v4().to_string(),
            email: "user@example.com".to_string(),
            username: None,
            role: "user".to_string(),
        },
    })
}

pub async fn logout(State(_state): State<AppState>) -> Json<serde_json::Value> {
    Json(serde_json::json!({ "message": "Logged out successfully" }))
}
