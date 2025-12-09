use axum::{extract::State, Json};
use crate::{AppState, models::NetworkStats};

pub async fn get_stats(State(state): State<AppState>) -> Json<NetworkStats> {
    let slot = state.solana_client.get_slot().unwrap_or(0);
    let block_height = state.solana_client.get_block_height().unwrap_or(0);
    let epoch_info = state.solana_client.get_epoch_info().ok();
    
    Json(NetworkStats {
        slot: slot as i64,
        block_height: block_height as i64,
        tps: 2500.0, // Mock TPS
        total_transactions: 1_000_000_000,
        epoch: epoch_info.as_ref().map(|e| e.epoch as i64).unwrap_or(0),
        epoch_progress: epoch_info
            .map(|e| (e.slot_index as f64 / e.slots_in_epoch as f64) * 100.0)
            .unwrap_or(0.0),
    })
}
