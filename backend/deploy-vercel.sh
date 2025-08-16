#!/bin/bash

echo "🚀 Deploying AI Summarizer Backend to Vercel..."
echo "================================================"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if we're in the backend directory
if [ ! -f "server.js" ]; then
    echo "❌ Please run this script from the backend directory"
    echo "   cd backend && ./deploy-vercel.sh"
    exit 1
fi

# Check if .env file exists and warn about environment variables
if [ -f ".env" ]; then
    echo "⚠️  .env file found. Make sure to set these variables in Vercel dashboard:"
    echo "   - GROQ_API_KEY"
    echo "   - MONGODB_URI (if using database)"
    echo "   - FRONTEND_URL"
    echo "   - EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS (if using email)"
    echo ""
else
    echo "⚠️  No .env file found. You'll need to set environment variables in Vercel dashboard."
    echo ""
fi

# Deploy to Vercel
echo "📦 Deploying to Vercel..."
vercel

echo ""
echo "✅ Deployment initiated!"
echo "📋 Next steps:"
echo "   1. Set environment variables in Vercel dashboard"
echo "   2. Run 'vercel --prod' to deploy to production"
echo "   3. Update your frontend to use the new API URL"
