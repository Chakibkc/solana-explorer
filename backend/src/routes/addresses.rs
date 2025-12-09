use axum::{extract::{Path, Query, State}, Json};
use serde::{Deserialize, Serialize};
use crate::{AppState, routes::blocks::ListParams};

#[derive(Debug, Serialize)]
pub struct AddressDetails {
    pub address: String,
    pub balance: f64,
    #[serde(rename = "type")]
    pub address_type: String,
    pub tokens: Vec<TokenBalance>,
    pub transaction_count: i32,
}

#[derive(Debug, Serialize)]
pub struct TokenBalance {
    pub mint: String,
    pub symbol: String,
    pub name: String,
    pub balance: String,
    pub decimals: u8,
    pub usd_value: Option<f64>,
}

#[derive(Debug, Serialize)]
pub struct TransactionsResponse {
    pub transactions: Vec<serde_json::Value>,
    pub total: i64,
    pub page: i32,
    pub limit: i32,
}

pub async fn get_address(
    State(state): State<AppState>,
    Path(address): Path<String>,
) -> Json<Option<AddressDetails>> {
    use solana_sdk::pubkey::Pubkey;
    use std::str::FromStr;
    
    if let Ok(pubkey) = Pubkey::from_str(&address) {
        if let Ok(balance) = state.solana_client.get_balance(&pubkey) {
            return Json(Some(AddressDetails {
                address: address.clone(),
                balance: balance as f64 / 1_000_000_000.0,
                address_type: "wallet".to_string(),
                tokens: vec![],
                transaction_count: 0,
            }));
        }
    }
    
    Json(None)
}

pub async fn get_address_transactions(
    State(_state): State<AppState>,
    Path(_address): Path<String>,
    Query(params): Query<ListParams>,
) -> Json<TransactionsResponse> {
    Json(TransactionsResponse {
        transactions: vec![],
        total: 0,
        page: params.page,
        limit: params.limit,
    })
}
