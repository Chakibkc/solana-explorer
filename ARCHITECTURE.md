# Architecture Documentation

## Overview

The Solana Explorer is a full-stack web application that provides blockchain exploration, DEX analytics, and developer API services for the Solana ecosystem.

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                   │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐   │
│  │   Explorer  │  │ DEX Markets  │  │  Developer  │   │
│  │    Pages    │  │   Analytics  │  │    Portal   │   │
│  └─────────────┘  └──────────────┘  └─────────────┘   │
└────────────────────────┬────────────────────────────────┘
                         │ REST API / WebSocket
┌────────────────────────▼────────────────────────────────┐
│                Backend (Rust + Axum)                     │
│  ┌──────────┐  ┌──────────┐  ┌────────────────────┐   │
│  │  Routes  │─▶│ Services │─▶│   Solana RPC       │   │
│  └──────────┘  └──────────┘  └────────────────────┘   │
│                     │                                    │
│                     ▼                                    │
│         ┌─────────────────┬─────────────┐              │
│         │   PostgreSQL    │    Redis    │              │
│         │   (User Data)   │  (Caching)  │              │
│         └─────────────────┴─────────────┘              │
└─────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **State Management**: TanStack Query (React Query) + Zustand
- **Charts**: Recharts + Lightweight Charts
- **API Communication**: Axios with interceptors

### Backend
- **Language**: Rust
- **Web Framework**: Axum (async, high-performance)
- **Database**: PostgreSQL with SQLx
- **Caching**: Redis
- **Authentication**: JWT with bcrypt
- **Blockchain**: Solana Web3.js + RPC Client
- **Rate Limiting**: Governor

### Infrastructure
- **Containerization**: Docker + Docker Compose
- **Database Migrations**: SQLx migrations
- **Logging**: tracing + tracing-subscriber
- **CORS**: tower-http

## Directory Structure

```
solana-explorer/
├── frontend/
│   ├── src/
│   │   ├── app/              # Next.js App Router pages
│   │   │   ├── page.tsx      # Home page
│   │   │   ├── blocks/       # Block explorer pages
│   │   │   ├── tokens/       # Token pages
│   │   │   ├── markets/      # DEX analytics pages
│   │   │   ├── developer/    # API portal
│   │   │   ├── donate/       # Donations page
│   │   │   └── admin/        # Admin dashboard
│   │   ├── components/
│   │   │   ├── ui/           # Base UI components
│   │   │   ├── layout/       # Layout components
│   │   │   ├── explorer/     # Explorer-specific components
│   │   │   ├── markets/      # Market components
│   │   │   └── admin/        # Admin components
│   │   ├── lib/
│   │   │   ├── api-client.ts # API client with types
│   │   │   └── utils.ts      # Utility functions
│   │   └── hooks/            # Custom React hooks
│   ├── public/               # Static assets
│   └── package.json          # Dependencies
│
├── backend/
│   ├── src/
│   │   ├── main.rs           # Application entry point
│   │   ├── models/           # Data models
│   │   ├── routes/           # API route handlers
│   │   │   ├── blocks.rs
│   │   │   ├── transactions.rs
│   │   │   ├── addresses.rs
│   │   │   ├── tokens.rs
│   │   │   ├── markets.rs
│   │   │   ├── auth.rs
│   │   │   ├── user.rs
│   │   │   └── admin.rs
│   │   ├── services/         # Business logic
│   │   ├── middleware/       # Auth, rate limiting, etc.
│   │   └── utils/            # Utilities
│   ├── migrations/           # Database migrations
│   └── Cargo.toml            # Rust dependencies
│
└── docker-compose.yml        # Docker orchestration
```

## Data Flow

### Block Explorer Flow
1. User navigates to explorer page
2. Frontend requests data from backend API
3. Backend fetches from Solana RPC or cache (Redis)
4. Data is formatted and returned to frontend
5. Frontend displays with real-time updates

### DEX Analytics Flow
1. Background service aggregates market data
2. Data is cached in Redis for fast access
3. Frontend polls/subscribes via WebSocket
4. Charts update in real-time
5. Historical data stored in PostgreSQL

### API Key Management Flow
1. User registers/logs in (JWT authentication)
2. User creates API key via developer portal
3. Backend generates key and sets rate limits
4. API requests include key in header
5. Middleware validates and enforces limits
6. Usage metrics stored for billing

## Database Schema

### Core Tables
- **users**: User accounts and authentication
- **api_keys**: Developer API keys and plans
- **watchlist**: User watchlists (tokens, addresses)
- **ads**: Advertisement management
- **donations**: SOL donation tracking
- **sponsorships**: Sponsored project listings
- **api_request_logs**: API usage analytics

## API Endpoints

### Public Endpoints
- `GET /api/blocks` - List blocks
- `GET /api/blocks/:number` - Block details
- `GET /api/transactions` - List transactions
- `GET /api/transactions/:signature` - Transaction details
- `GET /api/addresses/:address` - Address information
- `GET /api/tokens` - List tokens
- `GET /api/markets` - List DEX markets
- `GET /api/network/stats` - Network statistics
- `GET /api/search` - Universal search

### Authenticated Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/user/profile` - Get user profile
- `GET /api/user/api-keys` - List API keys
- `POST /api/user/api-keys` - Create API key
- `GET /api/user/watchlist` - Get watchlist

### Admin Endpoints
- `GET /api/admin/users` - List users
- `PUT /api/admin/users/:id` - Update user
- `GET /api/admin/ads` - List ads
- `POST /api/admin/ads` - Create ad
- `PUT /api/admin/ads/:id` - Update ad
- `DELETE /api/admin/ads/:id` - Delete ad

## Performance Optimizations

### Frontend
- Server-side rendering for SEO
- React Query for automatic caching
- Code splitting and lazy loading
- Image optimization with Next.js
- Skeleton loaders for better UX

### Backend
- Redis caching for frequently accessed data
- Connection pooling for PostgreSQL
- Async/await for non-blocking I/O
- Rate limiting to prevent abuse
- Efficient Solana RPC batching

### Database
- Indexed columns for fast queries
- Materialized views for analytics
- Connection pooling
- Query optimization

## Security Measures

- JWT authentication with secure secrets
- Password hashing with bcrypt
- API key validation and rate limiting
- CORS configuration
- SQL injection prevention (parameterized queries)
- Input validation and sanitization
- HTTPS enforcement in production

## Monitoring and Logging

- Structured logging with tracing
- Request/response logging
- Error tracking and reporting
- API usage metrics
- Performance monitoring

## Scaling Considerations

- Horizontal scaling with load balancers
- Database replication for read scaling
- Redis cluster for distributed caching
- CDN for static assets
- Microservices architecture for future growth

## Future Enhancements

- WebSocket for real-time updates
- Advanced charting with technical indicators
- NFT marketplace integration
- Portfolio tracking
- Price alerts and notifications
- Mobile app with React Native
- GraphQL API option
- Multi-language support
