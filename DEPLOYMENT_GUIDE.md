# 🚀 Vercel Deployment Guide

## Quick Deploy to Vercel

### Option 1: One-Click Deploy (Easiest)

1. **Push to GitHub first:**
   ```bash
   cd /project/workspace/solana-explorer
   
   # Create GitHub repo (you'll need to authenticate)
   gh repo create solana-explorer --public --source=. --remote=origin
   
   # Push code
   git push -u origin feature/solana-explorer-implementation
   git checkout main || git checkout -b main
   git merge feature/solana-explorer-implementation
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your `solana-explorer` repo
   - Configure:
     - **Framework Preset**: Next.js
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `.next`
   - Click "Deploy"

3. **Get your live URL:**
   - You'll get a URL like: `https://solana-explorer-[random].vercel.app`
   - Custom domain available in settings

### Option 2: Deploy via CLI (Automated)

```bash
cd /project/workspace/solana-explorer/frontend

# Login to Vercel (opens browser)
vercel login

# Deploy to production
vercel --prod

# You'll get a live URL instantly!
```

### Option 3: Using This Script

Run this deployment script:

```bash
cd /project/workspace/solana-explorer
chmod +x deploy-vercel.sh
./deploy-vercel.sh
```

## 🔧 Configuration

### Environment Variables

After deployment, add these in Vercel Dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL (optional for demo)
   - `NEXT_PUBLIC_SOLANA_RPC`: `https://api.mainnet-beta.solana.com`

### Build Settings

Vercel automatically detects Next.js projects, but verify:

- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`
- **Root Directory**: `frontend`

## 📱 What Gets Deployed

Your live site will include:
- ✅ Full Next.js frontend
- ✅ Server-side rendering
- ✅ API routes (if any)
- ✅ Optimized production build
- ✅ CDN distribution worldwide
- ✅ HTTPS enabled
- ✅ Automatic deployments on git push

## 🌐 Custom Domain

Want your own domain?

1. Go to Project Settings → Domains
2. Add your domain (e.g., `solanaexplorer.com`)
3. Follow DNS configuration steps
4. Done! Auto-SSL included

## 🔄 Continuous Deployment

Once connected to GitHub:
- ✅ Every push to `main` auto-deploys to production
- ✅ Every PR gets a preview URL
- ✅ Rollback to any previous deployment
- ✅ Zero downtime deployments

## 📊 Performance

Vercel optimizations include:
- Edge network CDN
- Image optimization
- Code splitting
- Compression
- Smart caching

## 🐛 Troubleshooting

### Build Fails
```bash
# Test build locally first
cd frontend
npm run build
```

### Missing Dependencies
- Ensure all dependencies are in `package.json`
- Check Node version compatibility

### API Connection Issues
- Backend needs separate deployment
- Consider Vercel Functions or Railway for backend
- Or use Vercel's serverless functions

## 🎯 Next Steps After Deployment

1. **Test the live site**: Click the deployment URL
2. **Share the link**: Your site is live!
3. **Monitor**: Check Vercel analytics dashboard
4. **Update**: Push changes to GitHub for auto-deploy

## 💡 Pro Tips

- Use preview deployments for testing
- Enable Web Analytics in Vercel dashboard
- Set up custom 404 pages
- Add OpenGraph images for social sharing
- Monitor Core Web Vitals

## 🔗 Useful Links

- Vercel Dashboard: https://vercel.com/dashboard
- Deployment Docs: https://vercel.com/docs
- Next.js on Vercel: https://nextjs.org/docs/deployment

---

**Ready to deploy? Choose an option above and your site will be live in minutes!** 🚀
