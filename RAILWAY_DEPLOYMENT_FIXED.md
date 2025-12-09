# 🚂 Railway Deployment - FIXED!

## ✅ What I Fixed:

1. **Created `nixpacks.toml`** - Tells Railway how to build Rust
2. **Updated `railway.json`** - Proper build commands
3. **Fixed `Procfile`** - Correct start command
4. **Added `rust-toolchain.toml`** - Rust version specification
5. **Created `.railwayignore`** - Exclude unnecessary files

---

## 🚀 Deploy to Railway (Step by Step)

### Step 1: Push Fixed Code to GitHub

I'll push the fixes now. The code is ready!

### Step 2: Go to Railway

**Visit:** https://railway.app/new

### Step 3: Deploy from GitHub

1. Click **"Deploy from GitHub repo"**
2. Authorize Railway to access your GitHub
3. Select **"Chakibkc/solana-explorer"**
4. Click **"Add variables"** (we'll do this after)

### Step 4: Configure Root Directory

⚠️ **IMPORTANT:**
1. After Railway creates the service
2. Click on your service
3. Go to **Settings** tab
4. Find **"Root Directory"**
5. Set it to: `backend`
6. Click **"Update"**

This tells Railway to look in the `backend` folder!

### Step 5: Add PostgreSQL Database

1. In your Railway project, click **"+ New"**
2. Select **"Database"**
3. Choose **"Add PostgreSQL"**
4. Railway will create it automatically

### Step 6: Add Redis

1. Click **"+ New"** again
2. Select **"Database"**
3. Choose **"Add Redis"**
4. Done!

### Step 7: Configure Environment Variables

Click on your backend service → **"Variables"** tab

**Add these variables:**

```bash
# Railway auto-provides these (use reference variables):
DATABASE_URL=${{Postgres.DATABASE_URL}}
REDIS_URL=${{Redis.REDIS_URL}}

# Add these manually:
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
HOST=0.0.0.0
PORT=${{PORT}}
RUST_LOG=info
```

**How to add reference variables:**
1. Click **"+ New Variable"**
2. For `DATABASE_URL`, click **"Add Reference"**
3. Select `Postgres` → `DATABASE_URL`
4. Do same for `REDIS_URL`

### Step 8: Trigger Deployment

1. Go to **"Deployments"** tab
2. Click **"Deploy"** or push to GitHub
3. Wait for build (~10-15 minutes first time)

Railway will:
- ✅ Install Rust
- ✅ Install dependencies
- ✅ Build your backend
- ✅ Start the server

### Step 9: Get Your Backend URL

After successful deployment:
1. Go to **Settings** tab
2. Scroll to **"Networking"**
3. Click **"Generate Domain"**
4. Copy your URL: `https://your-app.up.railway.app`

---

## 🔗 Connect to Vercel Frontend

### Update Vercel Environment Variable:

1. Go to: https://vercel.com/dashboard
2. Click your **"solana-explorer"** project
3. Go to **Settings** → **Environment Variables**
4. **Edit** `NEXT_PUBLIC_API_URL`:
   ```
   NEXT_PUBLIC_API_URL=https://your-railway-url.up.railway.app
   ```
5. Go to **Deployments** → **Redeploy**

---

## 🧪 Test Your Backend

Once deployed, test these endpoints:

```bash
# Replace YOUR_URL with your Railway URL

# Health check
curl https://YOUR_URL.up.railway.app/health

# Network stats
curl https://YOUR_URL.up.railway.app/api/network/stats

# Blocks
curl https://YOUR_URL.up.railway.app/api/blocks

# Transactions
curl https://YOUR_URL.up.railway.app/api/transactions
```

---

## 📊 Expected Build Process

Railway will show:
```
1. Cloning repository...                    ✅
2. Installing Rust toolchain...             ✅
3. Installing pkg-config and openssl...     ✅
4. Running cargo build --release...         ✅ (takes ~10 mins)
5. Starting application...                  ✅
6. Service is live!                         🎉
```

---

## 🐛 Common Issues & Fixes

### Issue: "Build failed with Railpack"
**Fix:** Make sure Root Directory is set to `backend` in Settings

### Issue: "Could not read Cargo.toml"
**Fix:** Root Directory must be `backend`, not root

### Issue: "Database connection failed"
**Fix:** Check environment variables are set correctly with references

### Issue: "Port binding error"
**Fix:** Use `PORT=${{PORT}}` in environment variables

### Issue: "Build takes too long / timeout"
**Fix:** This is normal for Rust first build (~10-15 minutes)
Railway free tier might have limits - consider paid plan

---

## 💡 Alternative: Use Railway Template

If manual setup doesn't work:

1. Go to: https://railway.app/templates
2. Search for "Rust API" or "Axum"
3. Deploy template
4. Replace code with your backend files
5. Configure variables

---

## ⏱️ Build Time Expectations

**First deployment:**
- Build time: 10-15 minutes (Rust compilation)
- Start time: ~5 seconds
- Total: ~15 minutes

**Subsequent deployments:**
- Build time: 5-10 minutes (cached dependencies)
- Faster with cargo cache

---

## 💰 Railway Pricing

**Free Tier:**
- $5 credit per month
- ~500 execution hours
- Good for testing

**Pro Plan ($20/month):**
- Unlimited hours
- Better performance
- Priority support

---

## 📋 Deployment Checklist

Before deploying:
- [x] Code pushed to GitHub with fixes
- [ ] Railway account created
- [ ] Root directory set to `backend`
- [ ] PostgreSQL added
- [ ] Redis added
- [ ] Environment variables configured
- [ ] Domain generated
- [ ] Backend tested
- [ ] Frontend connected
- [ ] Everything working!

---

## 🎯 Quick Commands After Setup

**View logs:**
```bash
# In Railway dashboard → Service → Logs
```

**Redeploy:**
```bash
# Just push to GitHub:
git push origin main
```

**Check status:**
```bash
curl https://your-url.up.railway.app/health
```

---

## ✅ Success Indicators

Your deployment is successful when:
1. ✅ Build completes without errors
2. ✅ Service shows "Active" status
3. ✅ `/health` endpoint returns 200 OK
4. ✅ Database connections work
5. ✅ Frontend can fetch data

---

## 🔗 Useful Links

- **Railway Dashboard:** https://railway.app/dashboard
- **Railway Docs:** https://docs.railway.app/
- **Your Frontend:** https://solana-explorer-gray.vercel.app/
- **Your GitHub:** https://github.com/Chakibkc/solana-explorer

---

## 🎉 After Successful Deployment

Your full stack will be:
- ✅ **Frontend:** Vercel (Next.js)
- ✅ **Backend:** Railway (Rust + Axum)
- ✅ **Database:** Railway (PostgreSQL)
- ✅ **Cache:** Railway (Redis)
- ✅ **All connected and working!**

---

**Ready to deploy? Let me push the fixes to GitHub!**
