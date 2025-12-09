use axum::{extract::{Path, Query, State}, Json};
use serde::Serialize;
use crate::{AppState, routes::tokens::TokenParams};

#[derive(Debug, Serialize)]
pub struct MarketsResponse {
    pub markets: Vec<Market>,
    pub total: i64,
    pub page: i32,
    pub limit: i32,
}

#[derive(Debug, Serialize)]
pub struct Market {
    pub pair: String,
    pub base_token: String,
    pub quote_token: String,
    pub price: f64,
    pub price_change_24h: f64,
    pub volume_24h: f64,
    pub liquidity: f64,
    pub dex: String,
}

pub async fn list_markets(
    State(_state): State<AppState>,
    Query(params): Query<TokenParams>,
) -> Json<MarketsResponse> {
    Json(MarketsResponse {
        markets: vec![],
        total: 0,
        page: params.page,
        limit: params.limit,
    })
}

pub async fn get_market(
    State(_state): State<AppState>,
    Path(_pair): Path<String>,
) -> Json<Option<Market>> {
    Json(None)
}
