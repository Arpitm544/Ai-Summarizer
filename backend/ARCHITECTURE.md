# 🏗️ Backend Architecture - AI Meeting Notes Summarizer

## 📁 Project Structure

```
backend/
├── config/                 # Configuration files
│   ├── ai.js              # Groq AI configuration
│   ├── database.js        # MongoDB connection
│   └── email.js           # Email service configuration
├── controllers/           # Request handlers
│   ├── uploadController.js
│   ├── summarizeController.js
│   └── emailController.js
├── middleware/            # Custom middleware
│   ├── upload.js          # File upload handling
│   ├── validation.js      # Request validation
│   └── errorHandler.js    # Error handling
├── models/               # Database models (MongoDB)
│   ├── File.js           # File upload model
│   └── Summary.js        # Summary model
├── routes/               # API route definitions
│   ├── upload.js         # File upload routes
│   ├── summarize.js      # AI summary routes
│   └── email.js          # Email routes
├── services/             # Business logic layer
│   ├── fileService.js    # File operations
│   ├── aiService.js      # AI operations
│   └── emailService.js   # Email operations
├── uploads/              # File upload directory
├── server.js             # Main application file
├── package.json
└── .env                  # Environment variables
```

## 🏛️ Architecture Pattern

### MVC (Model-View-Controller) + Service Layer

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Controllers   │    │    Services     │
│   (React)       │◄──►│   (Request      │◄──►│   (Business     │
│                 │    │    Handlers)    │    │    Logic)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                       │
                                ▼                       ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │   Middleware    │    │     Models      │
                       │   (Validation,  │    │   (Database     │
                       │    Upload,      │    │    Schema)      │
                       │    Errors)      │    │                 │
                       └─────────────────┘    └─────────────────┘
```

## 🔧 Components Overview

### 1. **Config** (`/config`)
Configuration files for external services and database connections.

- **`ai.js`**: Groq API client configuration
- **`database.js`**: MongoDB connection setup
- **`email.js`**: Email service transporter configuration

### 2. **Controllers** (`/controllers`)
Handle HTTP requests and responses. They delegate business logic to services.

- **`uploadController.js`**: File upload operations
- **`summarizeController.js`**: AI summary generation
- **`emailController.js`**: Email sending operations

### 3. **Middleware** (`/middleware`)
Custom middleware for request processing, validation, and error handling.

- **`upload.js`**: Multer configuration for file uploads
- **`validation.js`**: Request validation functions
- **`errorHandler.js`**: Centralized error handling

### 4. **Models** (`/models`)
MongoDB schema definitions using Mongoose.

- **`File.js`**: File upload data model
- **`Summary.js`**: Summary data model

### 5. **Routes** (`/routes`)
API endpoint definitions and route handlers.

- **`upload.js`**: File upload endpoints
- **`summarize.js`**: AI summary endpoints
- **`email.js`**: Email endpoints

### 6. **Services** (`/services`)
Business logic layer that handles core application functionality.

- **`fileService.js`**: File operations and text extraction
- **`aiService.js`**: AI summary generation with Groq
- **`emailService.js`**: Email sending and templates

## 🔄 Data Flow

### File Upload Flow
```
1. Frontend → POST /api/upload
2. upload.js (middleware) → File validation & storage
3. uploadController.js → Request handling
4. fileService.js → Text extraction & storage
5. Response → File ID & metadata
```

### Summary Generation Flow
```
1. Frontend → POST /api/summarize
2. validation.js → Request validation
3. summarizeController.js → Request handling
4. fileService.js → Get file data
5. aiService.js → Generate summary with Groq
6. Response → Summary data
```

### Email Sending Flow
```
1. Frontend → POST /api/email/send
2. validation.js → Email validation
3. emailController.js → Request handling
4. emailService.js → Send email & templates
5. Response → Email status
```

## 🛡️ Security Features

### Middleware Security
- **Helmet.js**: Security headers
- **Rate Limiting**: API abuse prevention
- **CORS**: Cross-origin request handling
- **File Validation**: Type and size restrictions

### Error Handling
- **Centralized Error Handler**: Consistent error responses
- **Validation Middleware**: Request validation
- **Try-Catch Blocks**: Service-level error handling

## 📊 Database Strategy

### Hybrid Storage
- **Development**: In-memory storage (Map objects)
- **Production**: MongoDB with Mongoose ODM
- **Automatic Fallback**: Graceful degradation

### Models
```javascript
// File Model
{
  originalName: String,
  fileName: String,
  filePath: String,
  fileSize: Number,
  mimeType: String,
  extractedText: String,
  uploadedAt: Date
}

// Summary Model
{
  fileId: ObjectId (ref: File),
  originalPrompt: String,
  generatedSummary: String,
  editedSummary: String,
  model: String,
  tokensUsed: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔌 API Endpoints

### File Upload
- `POST /api/upload` - Upload transcript file
- `GET /api/upload/:fileId` - Get file information
- `DELETE /api/upload/:fileId` - Delete file

### AI Summarization
- `POST /api/summarize` - Generate AI summary
- `GET /api/summarize/:summaryId` - Get summary details
- `PUT /api/summarize/:summaryId` - Update summary

### Email
- `POST /api/email/send` - Send summary via email
- `POST /api/email/test` - Test email configuration

### Health Check
- `GET /api/health` - Server health status

## 🚀 Deployment Considerations

### Environment Variables
```bash
# Required
GROQ_API_KEY=your_groq_api_key

# Optional
MONGODB_URI=mongodb://localhost:27017/ai-summarizer
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

### Production Setup
1. **Database**: Configure MongoDB connection
2. **Email**: Set up email service credentials
3. **Security**: Configure CORS origins
4. **Logging**: Enable production logging
5. **Monitoring**: Add health checks

## 🔄 Future Enhancements

### Planned Improvements
- [ ] **Authentication**: JWT-based user authentication
- [ ] **Caching**: Redis for performance optimization
- [ ] **Queue System**: Bull for background jobs
- [ ] **File Storage**: AWS S3 integration
- [ ] **Analytics**: Usage tracking and metrics
- [ ] **API Documentation**: Swagger/OpenAPI specs

### Scalability Features
- **Horizontal Scaling**: Stateless application design
- **Database Indexing**: Optimized queries
- **CDN Integration**: Static file delivery
- **Load Balancing**: Multiple server instances

---

**This architecture provides a clean, maintainable, and scalable foundation for the AI Meeting Notes Summarizer application.**
