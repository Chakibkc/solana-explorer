# 🚂 Railway Deployment - No Root Setting Fix

## ✅ PROBLEM SOLVED!

Railway's UI doesn't show "Root Directory" setting anymore. I've fixed this by creating configuration files that tell Railway where to find your backend!

---

## 🔧 What I Added:

1. **`railway.toml`** at repository root - Tells Railway to build from `backend` folder
2. **Updated `backend/nixpacks.toml`** - Better build configuration

---

## 🚀 NEW DEPLOYMENT STEPS (Simplified!):

### Step 1: Push Latest Changes

I'll push the config files now!

### Step 2: Go to Railway

👉 https://railway.app/new

### Step 3: Deploy from GitHub

1. Click **"Deploy from GitHub repo"**
2. Authorize Railway
3. Select **"Chakibkc/solana-explorer"**
4. Click **"Deploy"**

**That's it!** Railway will automatically use the `railway.toml` config!

### Step 4: Add PostgreSQL

1. In your project, click **"New"**
2. Select **"Database"**
3. Choose **"PostgreSQL"**
4. Click **"Add"**

### Step 5: Add Redis

1. Click **"New"** again
2. Select **"Database"**
3. Choose **"Redis"**
4. Click **"Add"**

### Step 6: Configure Environment Variables

Click on your backend service → **"Variables"** tab

**Click "New Variable"** and add each:

```
DATABASE_URL
  → Click "Reference" → Select "Postgres" → "DATABASE_URL"

REDIS_URL
  → Click "Reference" → Select "Redis" → "REDIS_URL"

SOLANA_RPC_URL
  → Type: https://api.mainnet-beta.solana.com

HOST
  → Type: 0.0.0.0

PORT
  → Click "Reference" → Select "PORT"

RUST_LOG
  → Type: info
```

### Step 7: Wait for Build

⏱️ **First build: 10-15 minutes**

Railway will:
- ✅ Clone your repo
- ✅ Navigate to `backend` folder automatically
- ✅ Install Rust
- ✅ Build your backend
- ✅ Start the server

Watch the **"Deployments"** tab to see progress!

### Step 8: Get Your URL

After successful deployment:

1. Click on your service
2. Go to **"Settings"**
3. Scroll to **"Networking"** or **"Domains"**
4. Click **"Generate Domain"**
5. Copy your URL: `https://your-app-production.up.railway.app`

---

## 🧪 Test Your Backend

```bash
# Replace YOUR_URL with your Railway URL

curl https://YOUR_URL.up.railway.app/health

curl https://YOUR_URL.up.railway.app/api/network/stats

curl https://YOUR_URL.up.railway.app/api/blocks
```

---

## 🔗 Connect to Vercel Frontend

Once backend is live:

1. Go to **Vercel Dashboard**: https://vercel.com/dashboard
2. Click your **"solana-explorer"** project
3. Go to **Settings** → **Environment Variables**
4. Find `NEXT_PUBLIC_API_URL` and click **"Edit"**
5. Change value to: `https://YOUR_RAILWAY_URL.up.railway.app`
6. Click **"Save"**
7. Go to **Deployments** tab
8. Click **"..."** on latest deployment → **"Redeploy"**

---

## 📊 What Railway Will Do Automatically

With the new `railway.toml` config:

```
1. Read railway.toml                        ✅
2. Navigate to backend folder               ✅
3. Run: cargo build --release               ✅ (10-15 min)
4. Start: ./target/release/...              ✅
5. Your backend is live!                    🎉
```

---

## 🐛 If Build Still Fails

### Check These:

1. **Variables are set correctly**
   - All variables from Step 6 added
   - References are connected properly

2. **Watch the build logs**
   - Click "Deployments" tab
   - Click on the deployment
   - Watch logs for errors

3. **Common issues:**
   - Missing environment variables
   - Database not connected
   - Out of memory (free tier limit)

### Alternative: Deploy Backend Folder Only

If the above doesn't work, you can deploy JUST the backend folder:

1. In Railway, click **"New"**
2. Select **"GitHub Repo"**
3. Instead of the full repo, select **"backend"** as a separate service
4. (This requires setting up the backend folder as its own repo)

---

## 💰 Railway Free Tier

- **$5 credit per month**
- **~500 execution hours**
- **Good for testing!**

If you need more, upgrade to Pro ($5/month for more resources)

---

## ⏱️ Expected Timeline

```
00:00 - Start deployment
00:30 - Installing Rust toolchain
02:00 - Downloading dependencies
10:00 - Compiling (this is the longest part)
15:00 - Build complete, starting server
15:30 - Backend is LIVE! 🎉
```

---

## ✅ Success Indicators

Your deployment worked if:
1. ✅ Build shows "Success" status
2. ✅ Service shows "Active" 
3. ✅ Domain is generated
4. ✅ `/health` endpoint returns 200 OK
5. ✅ Logs show "Server listening on 0.0.0.0:8080"

---

## 🎯 Quick Checklist

- [ ] Push latest code to GitHub (I'll do this)
- [ ] Go to Railway and deploy
- [ ] Add PostgreSQL database
- [ ] Add Redis database
- [ ] Configure all environment variables
- [ ] Wait for build (~15 min)
- [ ] Generate domain
- [ ] Test `/health` endpoint
- [ ] Update Vercel env vars
- [ ] Redeploy frontend
- [ ] Test full stack!

---

## 🔗 Your URLs After Setup

- **Frontend:** https://solana-explorer-gray.vercel.app/
- **Backend:** https://your-app-production.up.railway.app/
- **GitHub:** https://github.com/Chakibkc/solana-explorer

---

## 💡 Pro Tips

1. **Be patient** - Rust takes time to compile
2. **Watch the logs** - They show exactly what's happening
3. **Check variables** - Most failures are missing env vars
4. **Test health first** - Before testing complex endpoints
5. **Use Railway CLI** - For advanced debugging: `npm i -g @railway/cli`

---

**The config files handle everything automatically now!**

**No "Root Directory" setting needed!** 🎉

---

Ready to deploy? Let me push these fixes!
