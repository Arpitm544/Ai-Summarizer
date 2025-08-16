#!/bin/bash

echo "🔍 Verifying Vercel Backend Deployment..."
echo "=========================================="

# Get the project URL from user
echo "Enter your Vercel project URL (e.g., https://ai-summarizer-iota-two.vercel.app):"
read PROJECT_URL

if [ -z "$PROJECT_URL" ]; then
    echo "❌ No URL provided. Exiting."
    exit 1
fi

echo ""
echo "🧪 Testing endpoints..."

# Test health endpoint
echo "1. Testing /api/health..."
HEALTH_RESPONSE=$(curl -s "$PROJECT_URL/api/health")
if [[ $HEALTH_RESPONSE == *"status"*"OK"* ]]; then
    echo "✅ Health endpoint working: $HEALTH_RESPONSE"
else
    echo "❌ Health endpoint failed: $HEALTH_RESPONSE"
fi

# Test simple test endpoint
echo ""
echo "2. Testing /api/test..."
TEST_RESPONSE=$(curl -s "$PROJECT_URL/api/test")
if [[ $TEST_RESPONSE == *"Backend is working"* ]]; then
    echo "✅ Test endpoint working: $TEST_RESPONSE"
else
    echo "❌ Test endpoint failed: $TEST_RESPONSE"
fi

# Test upload endpoint (should return 404 for GET)
echo ""
echo "3. Testing /api/upload (GET should return 404)..."
UPLOAD_RESPONSE=$(curl -s -w "%{http_code}" "$PROJECT_URL/api/upload" -o /dev/null)
if [ "$UPLOAD_RESPONSE" = "404" ]; then
    echo "✅ Upload endpoint working (correctly returns 404 for GET)"
else
    echo "❌ Upload endpoint unexpected response: HTTP $UPLOAD_RESPONSE"
fi

echo ""
echo "🎯 Deployment Status Summary:"
echo "=============================="

if [[ $HEALTH_RESPONSE == *"status"*"OK"* ]] && [[ $TEST_RESPONSE == *"Backend is working"* ]]; then
    echo "🎉 SUCCESS: Your backend is working correctly!"
    echo ""
    echo "📋 Next steps:"
    echo "   1. Set environment variables in Vercel dashboard"
    echo "   2. Test file upload functionality"
    echo "   3. Test AI summarization"
    echo "   4. Update your frontend to use: $PROJECT_URL"
else
    echo "❌ FAILED: Some endpoints are not working"
    echo ""
    echo "🔧 Troubleshooting:"
    echo "   1. Check Vercel function logs"
    echo "   2. Verify environment variables are set"
    echo "   3. Check if the function deployed correctly"
fi

echo ""
echo "🔗 Your backend URL: $PROJECT_URL"
