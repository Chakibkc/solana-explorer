# Solana Blockchain Explorer & DEX Analytics Platform

A modern, high-performance Solana blockchain explorer with integrated DEX analytics, developer API platform, and monetization features.

## 🌟 Features

### Core Features
- **Blockchain Explorer**: Browse blocks, transactions, addresses, and tokens on Solana
- **DEX Analytics**: Real-time market data, price charts, and trading analytics (Dexscreener-style)
- **Developer API**: Monetized API access with multiple tiers and rate limiting
- **Real-time Updates**: WebSocket support for live price feeds and blockchain data
- **Dark Theme**: Solana-inspired gradient design with chart motifs

### User Features
- User authentication (email/password + OAuth)
- Watchlists for tokens, addresses, and markets
- Personalized dashboards
- Transaction history and portfolio tracking

### Monetization
- Advertisement management system
- Donation platform (SOL donations)
- Sponsorship tiers and featured listings
- API subscription plans

### Admin Panel
- User management and analytics
- API key and plan management
- Ad slot and sponsorship management
- Content management system

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: TanStack Query (React Query)
- **Charts**: Lightweight Charts / Recharts
- **Real-time**: WebSocket client

### Backend
- **Language**: Rust
- **Framework**: Axum (high-performance async web framework)
- **Database**: PostgreSQL + Redis (caching)
- **Migrations**: SQLx
- **Authentication**: JWT + OAuth2
- **API**: REST + WebSocket

### Infrastructure
- PostgreSQL for relational data
- Redis for caching and rate limiting
- Docker support for easy deployment

## 📁 Project Structure

```
solana-explorer/
├── frontend/          # Next.js frontend application
│   ├── app/           # Next.js App Router pages
│   ├── components/    # React components
│   ├── lib/           # Utilities and API clients
│   ├── hooks/         # Custom React hooks
│   └── styles/        # Global styles and Tailwind config
├── backend/           # Rust backend application
│   ├── src/
│   │   ├── routes/    # API route handlers
│   │   ├── services/  # Business logic
│   │   ├── models/    # Database models
│   │   ├── middleware/# Auth, rate limiting, etc.
│   │   └── utils/     # Shared utilities
│   ├── migrations/    # Database migrations
│   └── Cargo.toml     # Rust dependencies
├── docs/              # Documentation
└── docker/            # Docker configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and Bun
- Rust 1.75+
- PostgreSQL 15+
- Redis 7+

### Frontend Setup

```bash
cd frontend
bun install
cp .env.example .env.local
# Edit .env.local with your configuration
bun dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your database and API configuration
cargo build
cargo run
```

The backend API will be available at `http://localhost:8080`

### Database Setup

```bash
# Create database
createdb solana_explorer

# Run migrations
cd backend
sqlx migrate run
```

## 🔧 Configuration

### Environment Variables

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_WS_URL=ws://localhost:8080/ws
NEXT_PUBLIC_SOLANA_RPC=https://api.mainnet-beta.solana.com
```

#### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@localhost/solana_explorer
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

## 📖 API Documentation

API documentation is available at `/api/docs` when running the backend server.

### Key Endpoints

- `GET /api/blocks` - List recent blocks
- `GET /api/blocks/:number` - Get block details
- `GET /api/transactions/:signature` - Get transaction details
- `GET /api/addresses/:address` - Get address information
- `GET /api/tokens/:mint` - Get token information
- `GET /api/markets` - List DEX markets
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

## 🎨 Design System

The UI follows Solana's visual identity with:
- Dark theme by default
- Gradient accents (teal → purple → blue)
- Chart-inspired motifs and visualizations
- Modern, minimal dashboard design
- Responsive layout for mobile and desktop

## 🧪 Testing

### Frontend
```bash
cd frontend
bun test
bun test:e2e
```

### Backend
```bash
cd backend
cargo test
```

## 📦 Deployment

### Docker Deployment

```bash
docker-compose up -d
```

This will start:
- Frontend (Next.js)
- Backend (Rust API)
- PostgreSQL database
- Redis cache

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Solana Foundation for blockchain infrastructure
- Solscan for explorer inspiration
- Dexscreener for DEX analytics inspiration

## 📞 Support

For support and questions:
- Documentation: `/docs`
- API Issues: Open an issue on GitHub
- General inquiries: Contact via donation/sponsorship page

---

Built with ❤️ for the Solana ecosystem
