# 📥 Project Download & Setup Guide

## After Downloading This Project

### 1️⃣ Extract the Archive

```bash
# If you downloaded .tar.gz
tar -xzf solana-explorer.tar.gz
cd solana-explorer

# If you downloaded .zip
unzip solana-explorer.zip
cd solana-explorer
```

### 2️⃣ Install Dependencies

**Frontend:**
```bash
cd frontend
npm install
```

**Backend (Optional):**
```bash
cd backend
cargo build
```

### 3️⃣ Configure Environment

**Frontend:**
```bash
cd frontend
cp .env.example .env.local
# Edit .env.local with your settings
```

**Backend:**
```bash
cd backend
cp .env.example .env
# Edit .env with your database/Redis URLs
```

### 4️⃣ Run the Project

**Frontend Only (Development):**
```bash
cd frontend
npm run dev
# Visit http://localhost:3000
```

**Full Stack with Docker:**
```bash
docker-compose up -d
# Frontend: http://localhost:3000
# Backend: http://localhost:8080
```

**Manual Full Stack:**

Terminal 1 - Backend:
```bash
cd backend
cargo run
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

### 5️⃣ Build for Production

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

**Backend:**
```bash
cd backend
cargo build --release
./target/release/backend
```

## 📁 Project Structure

```
solana-explorer/
├── frontend/           # Next.js application
│   ├── src/           # Source code
│   ├── public/        # Static assets
│   └── package.json   # Dependencies
├── backend/           # Rust API server
│   ├── src/          # Source code
│   ├── migrations/   # Database migrations
│   └── Cargo.toml    # Dependencies
├── docker-compose.yml # Docker setup
├── README.md         # Main documentation
└── ARCHITECTURE.md   # Technical docs
```

## ✅ Verify Installation

```bash
# Check Node.js
node --version  # Should be 18+

# Check npm
npm --version

# Check Rust (optional)
rustc --version
cargo --version

# Check Docker (optional)
docker --version
docker-compose --version
```

## 🚀 Quick Start After Download

**Fastest way to run:**
```bash
cd solana-explorer/frontend
npm install
npm run dev
```

Visit http://localhost:3000 and enjoy your Solana Explorer! 🎉

## 🐛 Common Issues

**"Module not found"**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**"Port already in use"**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Or change port
PORT=3001 npm run dev
```

**"Permission denied"**
```bash
chmod +x deploy-vercel.sh
chmod +x QUICK_DEPLOY.sh
```

## 📚 Documentation Files

- `README.md` - Overview and features
- `ARCHITECTURE.md` - Technical architecture
- `DEPLOY_NOW.md` - Vercel deployment guide
- `DEPLOYMENT_GUIDE.md` - Detailed deployment docs
- `START_GUIDE.md` - How to run locally
- `PULL_REQUEST.md` - PR documentation

## 💡 Next Steps

1. **Run locally** - Test the application
2. **Customize** - Edit colors, components, etc.
3. **Deploy** - Follow DEPLOY_NOW.md for Vercel
4. **Extend** - Add new features as needed

**Enjoy your Solana Blockchain Explorer!** 🚀
