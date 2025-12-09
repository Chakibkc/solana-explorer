use axum::{extract::{Path, Query, State}, Json};
use serde::Serialize;
use crate::{AppState, models::Transaction, routes::blocks::ListParams};

#[derive(Debug, Serialize)]
pub struct TransactionsResponse {
    pub transactions: Vec<Transaction>,
    pub total: i64,
    pub page: i32,
    pub limit: i32,
}

pub async fn list_transactions(
    State(_state): State<AppState>,
    Query(params): Query<ListParams>,
) -> Json<TransactionsResponse> {
    // Mock data for now - in production, query from indexed database
    let transactions = vec![];
    
    Json(TransactionsResponse {
        transactions,
        total: 0,
        page: params.page,
        limit: params.limit,
    })
}

pub async fn get_transaction(
    State(state): State<AppState>,
    Path(signature): Path<String>,
) -> Json<Option<Transaction>> {
    use solana_sdk::signature::Signature;
    use std::str::FromStr;
    
    if let Ok(sig) = Signature::from_str(&signature) {
        if let Ok(tx) = state.solana_client.get_transaction(
            &sig,
            solana_transaction_status::UiTransactionEncoding::Json,
        ) {
            let meta = tx.transaction.meta.as_ref();
            return Json(Some(Transaction {
                signature: signature.clone(),
                block_number: tx.slot as i64,
                slot: tx.slot as i64,
                timestamp: tx.block_time.unwrap_or(0),
                fee: meta.map(|m| m.fee as i64).unwrap_or(0),
                status: if meta.map(|m| m.err.is_none()).unwrap_or(false) {
                    "success".to_string()
                } else {
                    "failed".to_string()
                },
                signer: String::new(),
            }));
        }
    }
    
    Json(None)
}
