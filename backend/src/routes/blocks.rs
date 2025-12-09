use axum::{extract::{Path, Query, State}, Json};
use serde::{Deserialize, Serialize};
use crate::{AppState, models::Block};

#[derive(Debug, Deserialize)]
pub struct ListParams {
    #[serde(default = "default_page")]
    pub page: i32,
    #[serde(default = "default_limit")]
    pub limit: i32,
}

fn default_page() -> i32 { 1 }
fn default_limit() -> i32 { 20 }

#[derive(Debug, Serialize)]
pub struct BlocksResponse {
    pub blocks: Vec<Block>,
    pub total: i64,
    pub page: i32,
    pub limit: i32,
}

pub async fn list_blocks(
    State(state): State<AppState>,
    Query(params): Query<ListParams>,
) -> Json<BlocksResponse> {
    // Get latest blocks from Solana
    let slot = state.solana_client.get_slot().unwrap_or(0);
    
    let mut blocks = Vec::new();
    for i in 0..params.limit {
        let block_slot = slot - (params.page as u64 - 1) * params.limit as u64 - i as u64;
        if let Ok(block) = state.solana_client.get_block(block_slot) {
            blocks.push(Block {
                block_number: block_slot as i64,
                slot: block_slot as i64,
                timestamp: block.block_time.unwrap_or(0),
                leader: block.rewards.first()
                    .map(|r| r.pubkey.clone())
                    .unwrap_or_default(),
                transactions_count: block.transactions.len() as i32,
                blockhash: Some(block.blockhash),
                parent_slot: Some(block.parent_slot as i64),
                previous_blockhash: Some(block.previous_blockhash),
            });
        }
    }
    
    Json(BlocksResponse {
        blocks,
        total: slot as i64,
        page: params.page,
        limit: params.limit,
    })
}

pub async fn get_block(
    State(state): State<AppState>,
    Path(number): Path<u64>,
) -> Json<Option<Block>> {
    if let Ok(block) = state.solana_client.get_block(number) {
        Json(Some(Block {
            block_number: number as i64,
            slot: number as i64,
            timestamp: block.block_time.unwrap_or(0),
            leader: block.rewards.first()
                .map(|r| r.pubkey.clone())
                .unwrap_or_default(),
            transactions_count: block.transactions.len() as i32,
            blockhash: Some(block.blockhash),
            parent_slot: Some(block.parent_slot as i64),
            previous_blockhash: Some(block.previous_blockhash),
        }))
    } else {
        Json(None)
    }
}
