# 🚀 Minimal Backend Deployment Guide

## 🎯 Goal
Deploy a minimal working backend to Vercel to test the basic setup before adding complex features.

## 📁 Files Created
- `backend/server-minimal.js` - Simple Express server with basic endpoints
- `backend/package-minimal.json` - Minimal dependencies
- `vercel.json` - Updated to use minimal server

## 🔧 Current Configuration
The `vercel.json` is now configured to use `backend/server-minimal.js` instead of the full `server.js`.

## 🚀 Deploy Steps

### 1. Install Minimal Dependencies
```bash
cd backend
npm install --package-lock-only
npm install express cors
```

### 2. Deploy to Vercel
```bash
# From root directory
vercel
```

### 3. Test Basic Endpoints
After deployment, test:
- `GET /api/health` - Should return status OK
- `GET /api/test` - Should return "Backend is working!"

## ✅ What This Tests
- Basic Vercel serverless function setup
- Express.js compatibility
- CORS configuration
- Basic routing

## 🔄 After Success
Once the minimal version works:
1. Gradually add back features
2. Test each addition
3. Identify which specific feature causes crashes

## 🆘 If Still Failing
1. Check Vercel function logs
2. Verify the function deployed correctly
3. Check if there are any build errors

## 📝 Next Steps
After minimal version works:
1. Add error handling
2. Add file upload (with memory storage)
3. Add AI summarization
4. Add database connection
5. Add email service

## 🎯 Why This Approach
- Eliminates complex dependencies as crash sources
- Provides a working baseline
- Makes debugging easier
- Allows incremental feature addition
