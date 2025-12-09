#!/bin/bash

echo "🚀 Deploying Solana Explorer to Vercel..."
echo ""

# Navigate to frontend directory
cd "$(dirname "$0")/frontend" || exit 1

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "📦 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix errors and try again."
    exit 1
fi

echo ""
echo "✅ Build successful!"
echo ""
echo "🌐 Deploying to Vercel..."
echo ""

# Deploy to Vercel
vercel --prod

echo ""
echo "✨ Deployment complete!"
echo ""
echo "🎉 Your Solana Explorer is now live!"
echo ""
echo "📊 Next steps:"
echo "  1. Visit your deployment URL above"
echo "  2. Check Vercel dashboard for analytics"
echo "  3. Configure custom domain if needed"
echo ""
