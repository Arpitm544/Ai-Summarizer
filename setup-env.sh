#!/bin/bash

echo "🚀 Setting up AI Summarizer Environment"
echo "========================================"

# Check if .env file exists
if [ ! -f "backend/.env" ]; then
    echo "Creating .env file from template..."
    cp backend/env.example backend/.env
fi

# Update the API key
echo "Updating Groq API key..."
sed -i '' 's/your_groq_api_key_here/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/' backend/.env

echo "✅ Environment configured successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Edit backend/.env to configure your email settings (optional)"
echo "2. The application is running at http://localhost:5173"
echo "3. Backend API is available at http://localhost:5000"
echo ""
echo "🎯 To start the application: npm run dev"
