# 🚀 AI Meeting Notes Summarizer - Clean Project

## 📁 Project Structure

```
Ai-summarizer/
├── backend/                 # Node.js Express API
│   ├── index.js            # Main server entry point
│   ├── package.json        # Backend dependencies
│   ├── controllers/        # API controllers
│   ├── middleware/         # Express middleware
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── models/             # Data models
│   └── config/             # Configuration
├── frontend/                # React Vite application
│   ├── src/
│   │   ├── App.jsx         # Main application
│   │   ├── components/     # React components
│   │   └── index.css       # Global styles
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
├── package.json             # Root package.json
├── README.md                # Project documentation
└── CLEAN_SETUP.md          # Setup guide
```

## 🎯 Core Features

### Backend API
- **File Upload**: Handle .txt and .docx files
- **AI Summarization**: Generate summaries using Groq AI
- **Email Service**: Send summaries via email
- **Database**: MongoDB integration (optional)

### Frontend
- **File Upload**: Drag & drop interface
- **Custom Prompts**: User-defined summarization instructions
- **Summary Editor**: Edit and refine AI-generated summaries
- **Email Sender**: Share summaries with team members
- **Progress Tracking**: Step-by-step workflow

## 🛠️ Technology Stack

- **Backend**: Node.js, Express, MongoDB
- **Frontend**: React, Vite, Tailwind CSS
- **AI**: Groq API for summarization
- **File Processing**: Mammoth.js for .docx files

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm run install-all
```

### 2. Start Development
```bash
npm run dev          # Start both frontend and backend
npm run server       # Start backend only
npm run client       # Start frontend only
```

### 3. Environment Variables
Create `.env` file in backend directory:
```env
GROQ_API_KEY=your_groq_api_key
MONGODB_URI=your_mongodb_uri
FRONTEND_URL=http://localhost:5173
```

## 📱 Frontend Components

- **FileUpload**: Drag & drop file upload
- **PromptInput**: Custom prompt input
- **SummaryEditor**: Edit AI summaries
- **EmailSender**: Send summaries via email

## 🔧 Backend Services

- **FileService**: Handle file uploads and text extraction
- **AIService**: Integrate with Groq API
- **EmailService**: Send emails using Nodemailer

## 🎨 UI Features

- **Responsive Design**: Works on all devices
- **Progress Steps**: Clear workflow indication
- **Toast Notifications**: User feedback
- **Modern Icons**: Lucide React icons
- **Clean Styling**: Professional appearance

## 🚀 Deployment

### Backend
- Deploy to Vercel, Railway, Render, or Heroku
- Set environment variables
- No complex configuration needed

### Frontend
- Build with `npm run build`
- Deploy to Vercel, Netlify, or any static hosting

## ✨ Key Benefits

- **Clean Code**: No unnecessary complexity
- **Maintainable**: Easy to understand and modify
- **Scalable**: Well-structured for growth
- **Professional**: Production-ready quality
- **User-Friendly**: Intuitive interface
