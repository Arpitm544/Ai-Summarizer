
# 🔧 Fix AI Summary and Email Issues

## 🚨 Issues Identified

### 1. **AI Summary Not Working**
- **Status**: ✅ Backend working perfectly
- **Issue**: Frontend might have network/CORS issues
- **Test**: Backend API tested successfully

### 2. **Email Sharing Not Working**
- **Status**: ❌ Email credentials not configured
- **Issue**: `EMAIL_USER` and `EMAIL_PASSWORD` are placeholder values
- **Error**: "nodemailer.createTransporter is not a function"

## 🛠️ Solutions

### Fix 1: AI Summary Issue

**Step 1: Test the current flow**
1. Upload a file (✅ Working)
2. Enter a prompt and submit
3. Check browser console for errors

**Step 2: If there are CORS issues, check:**
- Frontend is running on `http://localhost:5173`
- Backend is running on `http://localhost:5000`
- Vite proxy is configured correctly

**Step 3: Test API directly:**
```bash
# Test file upload
curl -X POST -F "transcript=@sample-transcript.txt" http://localhost:5000/api/upload

# Test AI summarization
curl -X POST -H "Content-Type: application/json" \
  -d '{"fileId":"YOUR_FILE_ID","customPrompt":"Summarize this"}' \
  http://localhost:5000/api/summarize
```

### Fix 2: Email Configuration

**Step 1: Configure Gmail (Recommended)**

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate new app password for "Mail"
3. **Update .env file**:
   ```bash
   # Edit backend/.env
   EMAIL_USER=your_actual_email@gmail.com
   EMAIL_PASSWORD=your_16_character_app_password
   ```

**Step 2: Alternative - Use SendGrid**

1. **Create SendGrid account** at sendgrid.com
2. **Generate API key**
3. **Update .env file**:
   ```bash
   EMAIL_SERVICE=sendgrid
   SENDGRID_API_KEY=your_sendgrid_api_key
   ```

**Step 3: Test Email Configuration**

```bash
# Test email configuration
curl -X POST -H "Content-Type: application/json" \
  -d '{"testEmail":"your_test_email@example.com"}' \
  http://localhost:5000/api/email/test
```

## 🧪 Testing Steps

### Test 1: Complete AI Summary Flow
1. Open browser to `http://localhost:5173`
2. Upload a file (any .txt or .docx)
3. Enter a prompt like "Summarize the key points"
4. Click "Generate Summary"
5. Check if summary appears

### Test 2: Email Configuration
1. Configure email settings in `backend/.env`
2. Restart the server: `npm run dev`
3. Complete the AI summary flow
4. Try sending an email
5. Check if email is received

## 🔍 Debugging

### Check Browser Console
1. Open Developer Tools (F12)
2. Go to Console tab
3. Look for any error messages
4. Check Network tab for failed requests

### Check Server Logs
1. Look at terminal where `npm run dev` is running
2. Check for any error messages
3. Verify API calls are being received

### Common Issues

1. **CORS Error**: Frontend can't reach backend
   - Solution: Check Vite proxy configuration

2. **Network Error**: API calls failing
   - Solution: Verify both servers are running

3. **Email Auth Error**: Invalid credentials
   - Solution: Use app password, not regular password

4. **File Upload Error**: File too large or wrong format
   - Solution: Check file size and format

## ✅ Success Indicators

### AI Summary Working:
- ✅ File uploads successfully
- ✅ Prompt submission works
- ✅ Summary appears in editor
- ✅ Can edit and save summary

### Email Working:
- ✅ Email configuration test passes
- ✅ Can send summary via email
- ✅ Email is received by recipient

## 🚀 Quick Fix Commands

```bash
# 1. Check if servers are running
curl http://localhost:5000/api/health
curl http://localhost:5173

# 2. Test AI summarization
curl -X POST -F "transcript=@sample-transcript.txt" http://localhost:5000/api/upload

# 3. Configure email (edit backend/.env manually)
# EMAIL_USER=your_email@gmail.com
# EMAIL_PASSWORD=your_app_password

# 4. Restart servers
pkill -f "npm run dev"
npm run dev
```

## 📞 Need Help?

If issues persist:
1. Check browser console for errors
2. Check server logs for errors
3. Verify all environment variables are set
4. Test API endpoints directly with curl
5. Ensure both frontend and backend are running
