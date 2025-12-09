use axum::{extract::{Query, State}, Json};
use serde::{Deserialize, Serialize};
use crate::AppState;

#[derive(Debug, Deserialize)]
pub struct SearchQuery {
    pub q: String,
}

#[derive(Debug, Serialize)]
pub struct SearchResult {
    #[serde(rename = "type")]
    pub result_type: String,
    pub result: Option<serde_json::Value>,
}

pub async fn search(
    State(_state): State<AppState>,
    Query(query): Query<SearchQuery>,
) -> Json<SearchResult> {
    let q = query.q.trim();
    
    // Detect type based on query format
    let result_type = if q.parse::<u64>().is_ok() {
        "block"
    } else if q.len() == 87 || q.len() == 88 {
        "transaction"
    } else if q.len() >= 32 && q.len() <= 44 {
        "address"
    } else {
        "unknown"
    };
    
    Json(SearchResult {
        result_type: result_type.to_string(),
        result: None,
    })
}
