# 🔧 Vercel Environment Variables Checklist

## ❌ CRITICAL: These MUST be set in Vercel Dashboard

### 1. Required Environment Variables
Go to your Vercel project dashboard → Settings → Environment Variables and add:

| Variable Name | Value | Required | Notes |
|---------------|-------|----------|-------|
| `NODE_ENV` | `production` | ✅ YES | Set this to production |
| `GROQ_API_KEY` | `your_actual_groq_api_key` | ✅ YES | Your Groq API key |
| `FRONTEND_URL` | `https://your-frontend-domain.vercel.app` | ✅ YES | Your frontend URL for CORS |

### 2. Optional but Recommended
| Variable Name | Value | Required | Notes |
|---------------|-------|----------|-------|
| `MONGODB_URI` | `mongodb+srv://...` | ❌ NO | Only if using MongoDB |
| `EMAIL_SERVICE` | `gmail` | ❌ NO | Only if using email |
| `EMAIL_USER` | `your_email@gmail.com` | ❌ NO | Only if using email |
| `EMAIL_PASS` | `your_app_password` | ❌ NO | Only if using email |

## 🚨 How to Set Environment Variables in Vercel:

1. **Go to Vercel Dashboard**
2. **Select your project** (`ai-summarizer-iota-two`)
3. **Click Settings tab**
4. **Click Environment Variables**
5. **Add each variable** with the exact names above
6. **Redeploy** after setting variables

## 🔍 Why Your Backend is Crashing:

The `500: INTERNAL_SERVER_ERROR` usually means:
- Missing `GROQ_API_KEY` - Backend can't initialize AI service
- Missing `FRONTEND_URL` - CORS issues
- Database connection failures
- File system access issues (already fixed in code)

## ✅ After Setting Variables:

1. **Redeploy**: Go to Deployments → Redeploy
2. **Test**: Visit `https://your-project.vercel.app/api/health`
3. **Should see**: `{"status":"OK","message":"AI Summarizer Backend is running"}`

## 🆘 Still Getting Errors?

Check Vercel Function Logs:
1. Go to your deployment
2. Click "Functions" tab
3. Click on the function logs
4. Look for specific error messages

## 📝 Quick Test:

Once deployed, test these endpoints:
- `GET /api/health` - Should return status OK
- `GET /api/test` - Should return "Backend is working!"
- `POST /api/upload` - File upload (if configured)
- `POST /api/summarize` - AI summarization (if GROQ_API_KEY set)
