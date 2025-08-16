#!/bin/bash

echo "🚀 Deploying Minimal Backend to Vercel..."
echo "=========================================="

# Check if we're in the right directory
if [ ! -d "vercel-minimal" ]; then
    echo "❌ vercel-minimal directory not found!"
    echo "   Make sure you're in the root directory (Ai-summarizer/)"
    exit 1
fi

# Navigate to minimal backend directory
cd vercel-minimal

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Install minimal dependencies
echo "📦 Installing minimal dependencies..."
npm install

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel

echo ""
echo "✅ Deployment initiated!"
echo "📋 Next steps:"
echo "   1. Follow the Vercel prompts"
echo "   2. Test the endpoints after deployment"
echo "   3. Check if the function works without crashing"
