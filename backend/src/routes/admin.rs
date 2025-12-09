use axum::{extract::{Path, Query, State}, Json};
use serde::Serialize;
use crate::{AppState, models::Ad, routes::blocks::ListParams};

#[derive(Debug, Serialize)]
pub struct UsersResponse {
    pub users: Vec<serde_json::Value>,
    pub total: i64,
    pub page: i32,
    pub limit: i32,
}

pub async fn list_users(
    State(_state): State<AppState>,
    Query(params): Query<ListParams>,
) -> Json<UsersResponse> {
    Json(UsersResponse {
        users: vec![],
        total: 0,
        page: params.page,
        limit: params.limit,
    })
}

pub async fn update_user(
    State(_state): State<AppState>,
    Path(_id): Path<String>,
    Json(_payload): Json<serde_json::Value>,
) -> Json<serde_json::Value> {
    Json(serde_json::json!({ "message": "User updated" }))
}

pub async fn list_ads(State(state): State<AppState>) -> Json<Vec<Ad>> {
    sqlx::query_as::<_, Ad>("SELECT * FROM ads WHERE active = true")
        .fetch_all(&state.db)
        .await
        .unwrap_or_default()
        .into()
}

pub async fn create_ad(
    State(state): State<AppState>,
    Json(payload): Json<serde_json::Value>,
) -> Json<Ad> {
    let id = uuid::Uuid::new_v4();
    let slot = payload["slot"].as_str().unwrap_or("home-top");
    let image_url = payload["image_url"].as_str().unwrap_or("");
    let link_url = payload["link_url"].as_str().unwrap_or("");
    let label = payload["label"].as_str();
    
    sqlx::query_as::<_, Ad>(
        "INSERT INTO ads (id, slot, image_url, link_url, label, active, impressions, clicks, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, 0, 0, NOW())
         RETURNING *"
    )
    .bind(id)
    .bind(slot)
    .bind(image_url)
    .bind(link_url)
    .bind(label)
    .bind(true)
    .fetch_one(&state.db)
    .await
    .unwrap_or_else(|_| Ad {
        id,
        slot: slot.to_string(),
        image_url: image_url.to_string(),
        link_url: link_url.to_string(),
        label: label.map(|s| s.to_string()),
        active: true,
        impressions: 0,
        clicks: 0,
        created_at: chrono::Utc::now(),
    })
    .into()
}

pub async fn update_ad(
    State(_state): State<AppState>,
    Path(_id): Path<String>,
    Json(_payload): Json<serde_json::Value>,
) -> Json<serde_json::Value> {
    Json(serde_json::json!({ "message": "Ad updated" }))
}

pub async fn delete_ad(
    State(_state): State<AppState>,
    Path(_id): Path<String>,
) -> Json<serde_json::Value> {
    Json(serde_json::json!({ "message": "Ad deleted" }))
}
