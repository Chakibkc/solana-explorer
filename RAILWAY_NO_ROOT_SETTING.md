# 🚂 Railway Deployment - NO ROOT SETTING NEEDED!

## ✅ FIXED - No UI Configuration Required!

Since Railway doesn't show a "Root Directory" setting in the UI, I've created configuration files that handle everything automatically!

---

## 🎯 **What I Did:**

1. ✅ **Created `railway.toml` at repo root** - Tells Railway where backend is
2. ✅ **Updated `backend/nixpacks.toml`** - Better build configuration
3. ✅ **All paths handled automatically** - No manual UI configuration needed!

---

## 🚀 **DEPLOY NOW - Super Simple:**

### **Step 1: Go to Railway**
👉 https://railway.app/new

### **Step 2: Deploy from GitHub**
1. Click **"Deploy from GitHub repo"**
2. Authorize Railway (if needed)
3. Select **"Chakibkc/solana-explorer"**
4. Click **"Deploy"**

**That's it!** Railway will automatically:
- ✅ Read `railway.toml`
- ✅ Navigate to `backend` folder
- ✅ Install Rust
- ✅ Build your backend
- ✅ Start the server

---

## 📊 **What Will Happen:**

```
Railway automatically detects:
1. railway.toml at repo root        ✅
2. Uses build command with cd backend ✅
3. Compiles Rust project             ✅
4. Runs the binary                   ✅
```

**Build time: 10-15 minutes (first time)**

---

## 🗄️ **Add Databases:**

### **PostgreSQL:**
1. In Railway project, click **"+ New"**
2. Select **"Database"**
3. Choose **"Add PostgreSQL"**

### **Redis:**
1. Click **"+ New"** again
2. Select **"Database"**
3. Choose **"Add Redis"**

---

## 🔧 **Configure Environment Variables:**

Click on your backend service → **"Variables"** tab

**Add these variables:**

### **Database Connections (use references):**
```
DATABASE_URL = ${{Postgres.DATABASE_URL}}
REDIS_URL = ${{Redis.REDIS_URL}}
```

### **Solana Configuration:**
```
SOLANA_RPC_URL = https://api.mainnet-beta.solana.com
```

### **Server Configuration:**
```
HOST = 0.0.0.0
PORT = ${{PORT}}
RUST_LOG = info
```

### **How to Add Reference Variables:**
1. Click **"+ New Variable"**
2. Type variable name (e.g., `DATABASE_URL`)
3. Click **"Add Reference"** button
4. Select `Postgres` → `DATABASE_URL`
5. Do same for `REDIS_URL`

---

## ⏳ **Wait for Build:**

**First deployment takes ~10-15 minutes**

Railway will show progress in the logs:
```
✅ Cloning repository
✅ Installing Rust toolchain
✅ Installing dependencies
✅ Building backend (this takes longest)
✅ Starting server
🎉 Deployed successfully!
```

**Pro tip:** Watch the **"Deployments"** tab for real-time logs!

---

## 🌐 **Get Your Backend URL:**

After successful deployment:

1. Click on your service
2. Go to **"Settings"** tab
3. Scroll to **"Networking"** section
4. Click **"Generate Domain"**
5. Copy the URL: `https://your-app.up.railway.app`

---

## 🧪 **Test Your Backend:**

```bash
# Replace YOUR_URL with your actual Railway URL

# Health check
curl https://YOUR_URL.up.railway.app/health

# Expected response:
# {"status":"ok","timestamp":...}

# Network stats
curl https://YOUR_URL.up.railway.app/api/network/stats

# Blocks
curl https://YOUR_URL.up.railway.app/api/blocks

# Transactions
curl https://YOUR_URL.up.railway.app/api/transactions

# Tokens
curl https://YOUR_URL.up.railway.app/api/tokens
```

---

## 🔗 **Connect to Vercel Frontend:**

Once your backend is deployed and working:

### **Update Vercel:**
1. Go to: https://vercel.com/dashboard
2. Click **"solana-explorer"** project
3. Go to **Settings** → **Environment Variables**
4. Find `NEXT_PUBLIC_API_URL`
5. Click **"Edit"**
6. Change to: `https://your-railway-url.up.railway.app`
7. Save
8. Go to **Deployments** → Click **"⋯"** → **"Redeploy"**

**Wait 2 minutes for Vercel to redeploy**

Then test: https://solana-explorer-gray.vercel.app/

Your frontend will now use the Railway Rust backend! 🎉

---

## 📋 **Simple Checklist:**

- [ ] Go to https://railway.app/new
- [ ] Deploy from GitHub (Chakibkc/solana-explorer)
- [ ] Add PostgreSQL database
- [ ] Add Redis database
- [ ] Add environment variables (see above)
- [ ] Wait ~10-15 minutes for build
- [ ] Generate domain in Settings → Networking
- [ ] Test `/health` endpoint
- [ ] Update Vercel environment variable
- [ ] Redeploy Vercel
- [ ] Test full stack integration

---

## 🐛 **Troubleshooting:**

### **Build fails with "could not read Cargo.toml"**
**Solution:** Make sure the latest code is on GitHub (it is!)

### **Build takes too long / times out**
**Solution:** 
- First build is 10-15 minutes - this is normal
- Railway free tier has limits
- Consider upgrading to Pro plan if needed

### **"Database connection error"**
**Solution:**
- Check environment variables are set
- Use `${{Postgres.DATABASE_URL}}` not plain text
- Make sure PostgreSQL service is running

### **Port binding error**
**Solution:**
- Use `PORT = ${{PORT}}` (reference variable)
- Use `HOST = 0.0.0.0` not `127.0.0.1`

---

## 💡 **Pro Tips:**

1. **Watch the logs** - Click "View Logs" to see build progress
2. **Be patient** - Rust compilation takes time
3. **Test health first** - Always test `/health` endpoint first
4. **Use references** - For DATABASE_URL and REDIS_URL use references
5. **Check pricing** - Free tier: $5/month credit

---

## 💰 **Railway Pricing:**

**Free Tier (Hobby):**
- $5 credit per month
- ~500 execution hours
- Good for development/testing

**Pro Plan ($20/month):**
- Unlimited hours
- Better performance
- Priority support

---

## ✅ **Success Indicators:**

You know it's working when:
1. ✅ Deployment status shows "Active" (green)
2. ✅ `/health` endpoint returns 200 OK
3. ✅ Logs show "Server running on 0.0.0.0:PORT"
4. ✅ API endpoints return data
5. ✅ Frontend connects successfully

---

## 📖 **Configuration Files Created:**

**`railway.toml`** (repo root):
```toml
[build]
builder = "NIXPACKS"
buildCommand = "cd backend && cargo build --release"

[deploy]
startCommand = "cd backend && ./target/release/solana-explorer-backend"
```

**`backend/nixpacks.toml`**:
```toml
[phases.setup]
nixPkgs = ["rustc", "cargo", "pkg-config", "openssl"]
aptPkgs = ["libssl-dev"]

[phases.build]
cmds = ["cargo build --release"]

[start]
cmd = "./target/release/solana-explorer-backend"
```

---

## 🎉 **Your Complete Stack:**

After deployment:
- ✅ **Frontend:** Vercel (Next.js) - https://solana-explorer-gray.vercel.app/
- ✅ **Backend:** Railway (Rust + Axum) - https://your-app.up.railway.app
- ✅ **Database:** Railway (PostgreSQL)
- ✅ **Cache:** Railway (Redis)
- ✅ **Code:** GitHub - https://github.com/Chakibkc/solana-explorer

---

## 🚀 **START DEPLOYING:**

**Everything is ready!**

👉 **Go to:** https://railway.app/new

**Select:** Deploy from GitHub → Chakibkc/solana-explorer

**Then follow the steps above!**

---

## 📞 **Need Help?**

If deployment fails:
1. Check the logs in Railway dashboard
2. Verify environment variables are set correctly
3. Make sure databases are added and running
4. Test each endpoint individually
5. Check that PORT is referenced correctly

---

**The configuration is now automatic - no root directory setting needed!**

**Start deploying:** https://railway.app/new 🚀
