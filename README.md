# 🤖 AI-Powered Meeting Notes Summarizer & Sharer

A full-stack web application that allows users to upload meeting transcripts, generate AI-powered summaries based on custom instructions, edit the output, and share the final summary via email.

## ✨ Features

- **📁 File Upload**: Support for .txt and .docx transcript files
- **🎯 Custom Prompts**: Enter specific instructions for summarization
- **🤖 AI-Powered Summaries**: Uses Groq API for intelligent summarization
- **✏️ Editable Summaries**: Review and edit generated summaries
- **📧 Email Sharing**: Send summaries to multiple recipients
- **🎨 Modern UI**: Beautiful, responsive design with glassmorphism effects
- **⚡ Real-time Updates**: Auto-save functionality and live feedback

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **React Dropzone** for file uploads
- **React Hot Toast** for notifications
- **Lucide React** for icons
- **Modern CSS** with glassmorphism design

### Backend
- **Node.js** with Express.js
- **Multer** for file upload handling
- **Mammoth** for .docx text extraction
- **Groq SDK** for AI summarization
- **Nodemailer** for email functionality
- **Helmet** for security headers
- **Rate limiting** for API protection

### AI Integration
- **Groq API** with Llama3-8b-8192 model
- Custom prompt engineering for optimal results
- Token usage tracking

### Email Services
- **Gmail** (with app passwords)
- **SendGrid** support
- **Custom SMTP** configuration
- HTML email templates

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Groq API key
- Email service credentials (optional)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ai-summarizer
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install all dependencies (frontend + backend)
npm run install-all
```

### 3. Environment Configuration

Create a `.env` file in the `backend` directory:

```bash
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Groq AI API Configuration
GROQ_API_KEY=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

# Email Configuration (Choose one option)

# Option 1: Gmail
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password_here

# Option 2: SendGrid
# EMAIL_SERVICE=sendgrid
# SENDGRID_API_KEY=your_sendgrid_api_key_here

# Option 3: Custom SMTP
# EMAIL_SERVICE=smtp
# SMTP_HOST=smtp.yourdomain.com
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=your_smtp_username
# SMTP_PASSWORD=your_smtp_password
```

### 4. Start Development Servers
```bash
# Start both frontend and backend
npm run dev

# Or start them separately
npm run server  # Backend on port 5000
npm run client  # Frontend on port 5173
```

### 5. Access the Application
Open your browser and navigate to `http://localhost:5173`

## 📋 API Endpoints

### File Upload
- `POST /api/upload` - Upload transcript file
- `GET /api/upload/:fileId` - Get file information

### AI Summarization
- `POST /api/summarize` - Generate AI summary
- `GET /api/summarize/:summaryId` - Get summary details
- `PUT /api/summarize/:summaryId` - Update summary

### Email
- `POST /api/email/send` - Send summary via email
- `POST /api/email/test` - Test email configuration

### Health Check
- `GET /api/health` - Server health status

## 🎯 Usage Guide

### 1. Upload Transcript
- Drag and drop or click to upload a .txt or .docx file
- Maximum file size: 10MB
- Supported formats: .txt, .docx

### 2. Custom Instructions
- Enter specific summarization instructions
- Use provided examples as starting points
- Be specific about format, audience, and focus areas

### 3. AI Summary Generation
- Click "Generate Summary" to process with Groq AI
- Review the generated summary
- Edit and refine as needed

### 4. Share via Email
- Add recipient email addresses
- Customize subject and message
- Test email configuration if needed
- Send the final summary

## 🔧 Configuration

### Groq API Setup
1. Sign up at [Groq Console](https://console.groq.com/)
2. Generate an API key
3. Add to `.env` file as `GROQ_API_KEY`

### Email Configuration

#### Gmail Setup
1. Enable 2-factor authentication
2. Generate an app password
3. Use app password in `EMAIL_PASSWORD`

#### SendGrid Setup
1. Create SendGrid account
2. Generate API key
3. Set `EMAIL_SERVICE=sendgrid`
4. Add API key as `SENDGRID_API_KEY`

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the dist folder
```

### Backend (Render/Railway/Heroku)
```bash
cd backend
npm start
# Deploy with environment variables
```

### Environment Variables for Production
- Set `NODE_ENV=production`
- Update `FRONTEND_URL` to your deployed frontend URL
- Configure email service credentials
- Set up CORS origins properly

## 📁 Project Structure

```
ai-summarizer/
├── backend/
│   ├── routes/
│   │   ├── upload.js
│   │   ├── summarize.js
│   │   └── email.js
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileUpload.jsx
│   │   │   ├── PromptInput.jsx
│   │   │   ├── SummaryEditor.jsx
│   │   │   └── EmailSender.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── package.json
└── README.md
```

## 🔒 Security Features

- **Helmet.js** for security headers
- **Rate limiting** to prevent abuse
- **File type validation** for uploads
- **CORS configuration** for cross-origin requests
- **Input sanitization** and validation
- **Environment variable** protection

## 🎨 UI/UX Features

- **Glassmorphism design** with backdrop blur effects
- **Responsive layout** for all device sizes
- **Progress indicators** for multi-step workflow
- **Real-time feedback** with toast notifications
- **Auto-save functionality** for summary editing
- **Drag-and-drop** file upload interface

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
1. Check the documentation
2. Review existing issues
3. Create a new issue with detailed information

## 🔮 Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] User authentication and accounts
- [ ] Summary history and management
- [ ] Multiple AI model support
- [ ] Advanced editing features
- [ ] Team collaboration features
- [ ] API rate limiting dashboard
- [ ] Export to multiple formats (PDF, Word, etc.)

---

**Built with ❤️ using React, Node.js, and Groq AI**
