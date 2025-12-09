use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use chrono::{DateTime, Utc};

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct User {
    pub id: Uuid,
    pub email: String,
    #[serde(skip_serializing)]
    pub password_hash: String,
    pub username: Option<String>,
    pub role: String,
    pub status: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct ApiKey {
    pub id: Uuid,
    pub user_id: Uuid,
    pub name: String,
    pub key: String,
    pub plan: String,
    pub rate_limit: i32,
    pub requests_used: i32,
    pub active: bool,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct WatchlistItem {
    pub id: Uuid,
    pub user_id: Uuid,
    #[serde(rename = "type")]
    pub item_type: String,
    pub address: String,
    pub name: Option<String>,
    pub added_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Ad {
    pub id: Uuid,
    pub slot: String,
    pub image_url: String,
    pub link_url: String,
    pub label: Option<String>,
    pub active: bool,
    pub impressions: i64,
    pub clicks: i64,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Block {
    pub block_number: i64,
    pub slot: i64,
    pub timestamp: i64,
    pub leader: String,
    pub transactions_count: i32,
    pub blockhash: Option<String>,
    pub parent_slot: Option<i64>,
    pub previous_blockhash: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Transaction {
    pub signature: String,
    pub block_number: i64,
    pub slot: i64,
    pub timestamp: i64,
    pub fee: i64,
    pub status: String,
    pub signer: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NetworkStats {
    pub slot: i64,
    pub block_height: i64,
    pub tps: f64,
    pub total_transactions: i64,
    pub epoch: i64,
    pub epoch_progress: f64,
}
