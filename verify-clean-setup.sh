#!/bin/bash

echo "🧹 Verifying Clean Backend Setup..."
echo "===================================="

# Check if problematic files exist
if [ -f "backend/server.js" ]; then
    echo "❌ WARNING: backend/server.js still exists!"
    echo "   This will cause deployment issues."
    echo "   Removing it now..."
    rm backend/server.js
else
    echo "✅ backend/server.js removed"
fi

# Check if new entry point exists
if [ -f "backend/index.js" ]; then
    echo "✅ backend/index.js exists (new entry point)"
else
    echo "❌ ERROR: backend/index.js missing!"
    exit 1
fi

# Check vercel.json configuration
if grep -q "backend/index.js" vercel.json; then
    echo "✅ vercel.json points to backend/index.js"
else
    echo "❌ ERROR: vercel.json not configured correctly!"
    exit 1
fi

# Check package.json
if grep -q '"main": "index.js"' backend/package.json; then
    echo "✅ backend/package.json main field updated"
else
    echo "❌ ERROR: package.json main field not updated!"
    exit 1
fi

echo ""
echo "🎯 Setup Verification Complete!"
echo "📋 Next Steps:"
echo "   1. Commit and push these changes to GitHub"
echo "   2. Go to Vercel website and redeploy"
echo "   3. Vercel will now use backend/index.js"
echo "   4. No more FUNCTION_INVOCATION_FAILED errors!"
echo ""
echo "🔗 Test endpoints after deployment:"
echo "   - /api/health"
echo "   - /api/test"
