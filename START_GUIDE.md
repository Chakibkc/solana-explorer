# 🚀 Quick Start Guide - Solana Explorer

## Prerequisites Check
Before starting, ensure you have:
- Docker & Docker Compose installed
- OR Node.js 18+ and Rust 1.75+ for manual setup

## Option 1: Docker (Easiest - Full Stack)

### Start Everything:
```bash
cd /project/workspace/solana-explorer
docker-compose up -d
```

### Access the Application:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **Health Check**: http://localhost:8080/health

### View Logs:
```bash
docker-compose logs -f frontend
docker-compose logs -f backend
```

### Stop Everything:
```bash
docker-compose down
```

## Option 2: Frontend Only (Development Mode)

### Install Dependencies:
```bash
cd /project/workspace/solana-explorer/frontend
npm install
```

### Start Development Server:
```bash
npm run dev
```

**Access**: http://localhost:3000

The frontend will work in standalone mode with mock data when the backend isn't running.

## Option 3: Manual Full Stack Setup

### Terminal 1 - Start Backend:
```bash
cd /project/workspace/solana-explorer/backend

# Set environment variables
export DATABASE_URL="postgresql://postgres:password@localhost:5432/solana_explorer"
export REDIS_URL="redis://localhost:6379"
export SOLANA_RPC_URL="https://api.mainnet-beta.solana.com"

# Note: Requires PostgreSQL and Redis running
cargo run
```

### Terminal 2 - Start Frontend:
```bash
cd /project/workspace/solana-explorer/frontend
npm run dev
```

## 🧪 Testing the Application

### 1. Home Page
Visit http://localhost:3000 and you should see:
- Solana blockchain explorer homepage
- Dark theme with purple/green/blue gradients
- Search bar at the top
- Network statistics cards
- Latest blocks section
- Latest transactions section
- Trending tokens grid

### 2. Navigation
Test the sidebar navigation:
- **Dashboard** (/) - Home page
- **Blocks** (/blocks) - Block explorer
- **Tokens** (/tokens) - Token listings
- **Markets** (/markets) - DEX analytics
- **API** (/developer) - Developer portal
- **Donate** (/donate) - Donation page
- **Admin** (/admin) - Admin dashboard

### 3. API Endpoints
Test the backend API:
```bash
# Health check
curl http://localhost:8080/health

# Network statistics
curl http://localhost:8080/api/network/stats

# List blocks
curl http://localhost:8080/api/blocks

# Search
curl http://localhost:8080/api/search?q=12345
```

### 4. Features to Explore
- **Search**: Try searching for block numbers, addresses, or transactions
- **Real-time Updates**: Network stats refresh every 5 seconds
- **Responsive Design**: Resize browser to see mobile layout
- **Dark Theme**: Enjoy the Solana-inspired gradient design

## 🎨 What You'll See

### Color Scheme:
- **Background**: Very dark (#0a0a0f)
- **Primary**: Solana Purple (#9945FF)
- **Secondary**: Solana Green (#14F195)
- **Accent**: Solana Blue (#00D4AA)
- **Charts**: Green for up, Red for down

### Layout:
- **Desktop**: Sidebar navigation + main content
- **Mobile**: Bottom navigation + hamburger menu
- **All Pages**: Consistent header with user menu

## 🐛 Troubleshooting

### Port Already in Use:
```bash
# Change ports in docker-compose.yml or:
docker-compose down
# Kill processes using ports 3000 or 8080
```

### Frontend Won't Start:
```bash
cd frontend
rm -rf node_modules .next
npm install
npm run dev
```

### Backend Issues:
```bash
# Backend requires PostgreSQL and Redis
# Either use Docker or install them locally
```

### Can't Connect to Backend:
- The frontend will work with mock/empty data
- Some features require the backend running
- Check backend is running on port 8080

## 📱 Mobile Testing

Open on your phone or use browser dev tools:
```
1. Open Chrome DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select a mobile device
4. Test responsive layout
```

## 🔥 Hot Features to Try

1. **Search Bar**: Enter any text and see type detection
2. **Network Stats**: Watch real-time TPS and slot numbers
3. **Latest Blocks/Transactions**: Auto-refresh every 10 seconds
4. **Trending Tokens**: See mock token data with price changes
5. **Developer Portal**: View API pricing plans
6. **Admin Panel**: See dashboard with metrics

## 📊 Expected Behavior

### With Backend Running:
- Real Solana blockchain data
- Actual network statistics
- Live block and transaction data
- Working search functionality

### Without Backend (Frontend Only):
- Mock data for demonstration
- Empty lists for blocks/transactions
- Network stats will show loading state
- Search will work but return no results

## 🎯 Next Steps

1. **Customize**: Edit colors in `frontend/tailwind.config.ts`
2. **Add Features**: Extend components in `frontend/src/components`
3. **Backend**: Modify API routes in `backend/src/routes`
4. **Database**: Update schema in `backend/migrations`

## 💡 Tips

- Use Chrome DevTools to inspect API calls
- Check Network tab for API responses
- Console shows any errors or warnings
- Hot reload is enabled for frontend changes

---

Enjoy exploring the Solana blockchain! 🚀
