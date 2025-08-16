# 🚀 Quick Setup Guide - AI Meeting Notes Summarizer

## ✅ Current Status
Your AI Meeting Notes Summarizer is **READY TO USE**! 

- ✅ All dependencies installed
- ✅ Backend server running on port 5000
- ✅ Frontend server running on port 5173
- ✅ Groq API key configured
- ✅ Sample transcript file created for testing

## 🌐 Access Your Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 🎯 How to Use

### 1. Upload a Transcript
- Go to http://localhost:5173
- Drag and drop or click to upload a `.txt` or `.docx` file
- Use the provided `sample-transcript.txt` for testing

### 2. Custom Instructions
- Enter specific summarization instructions
- Use the provided examples (Executive Summary, Action Items, etc.)
- Be specific about format and audience

### 3. Generate AI Summary
- Click "Generate Summary" 
- The AI will process your transcript using Groq API
- Review and edit the generated summary

### 4. Share via Email
- Add recipient email addresses
- Customize subject and message
- Send the final summary

## 🔧 Configuration (Optional)

### Email Setup
To enable email functionality, edit `backend/.env`:

```bash
# For Gmail
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password_here

# For SendGrid
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your_sendgrid_api_key_here
```

### Gmail App Password Setup
1. Enable 2-factor authentication on your Gmail account
2. Go to Google Account Settings > Security
3. Generate an "App Password" for "Mail"
4. Use this password in the EMAIL_PASSWORD field

## 📁 Project Structure
```
ai-summarizer/
├── backend/          # Node.js Express server
├── frontend/         # React Vite application
├── sample-transcript.txt  # Test file
├── setup-env.sh      # Setup script
└── README.md         # Full documentation
```

## 🛠️ Available Commands
```bash
npm run dev          # Start both frontend and backend
npm run server       # Start backend only
npm run client       # Start frontend only
npm run build        # Build frontend for production
```

## 🔍 Testing the Application

1. **Upload Test**: Use `sample-transcript.txt`
2. **Custom Prompt**: Try "Create an executive summary with key decisions and action items"
3. **AI Generation**: Should work with your configured API key
4. **Email Test**: Use the "Test Email Configuration" feature

## 🚨 Troubleshooting

### If servers aren't running:
```bash
# Kill any existing processes
pkill -f "node"
pkill -f "vite"

# Restart the application
npm run dev
```

### If API key issues:
```bash
# Check if API key is set
grep "GROQ_API_KEY" backend/.env

# Re-run setup if needed
./setup-env.sh
```

### If port conflicts:
- Backend: Change `PORT=5000` in `backend/.env`
- Frontend: Change port in `frontend/vite.config.js`

## 📞 Support
- Check the full `README.md` for detailed documentation
- Review API endpoints at `http://localhost:5000/api/health`
- Test individual components using the sample transcript

---

**🎉 Your AI Meeting Notes Summarizer is ready! Start using it at http://localhost:5173**
