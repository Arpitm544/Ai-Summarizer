const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Import middleware
let errorHandler;
try {
  errorHandler = require('./middleware/errorHandler');
} catch (error) {
  console.error('Error loading error handler:', error);
  errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
    });
  };
}

// Import routes
let uploadRoutes, summarizeRoutes, emailRoutes;

try {
  uploadRoutes = require('./routes/upload');
  summarizeRoutes = require('./routes/summarize');
  emailRoutes = require('./routes/email');
} catch (error) {
  console.error('Error loading routes:', error);
  // Create fallback routes if loading fails
  uploadRoutes = express.Router();
  summarizeRoutes = express.Router();
  emailRoutes = express.Router();
  
  // Add fallback endpoints
  uploadRoutes.get('*', (req, res) => res.status(503).json({ error: 'Upload service temporarily unavailable' }));
  summarizeRoutes.get('*', (req, res) => res.status(503).json({ error: 'Summarization service temporarily unavailable' }));
  emailRoutes.get('*', (req, res) => res.status(503).json({ error: 'Email service temporarily unavailable' }));
}

// Import database connection (optional)
let connectDB;
try {
  connectDB = require('./config/database');
} catch (error) {
  console.error('Error loading database config:', error);
  connectDB = async () => {
    console.log('Database connection not available');
    return Promise.resolve();
  };
}

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files - only serve in development
if (process.env.NODE_ENV !== 'production') {
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
}

// Routes
app.use('/api/upload', uploadRoutes);
app.use('/api/summarize', summarizeRoutes);
app.use('/api/email', emailRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'AI Summarizer Backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Simple test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend is working!',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Database connection function
const initializeDatabase = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      console.log('🗄️ Database connected successfully');
    } else {
      console.log('🗄️ No database configured - using in-memory storage');
    }
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    // Don't exit in serverless environment
    if (process.env.NODE_ENV === 'development') {
      process.exit(1);
    }
  }
};

// Initialize database
initializeDatabase();

// Start server only in development
if (process.env.NODE_ENV !== 'production') {
  const startServer = async () => {
    try {
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📧 Email service: ${process.env.EMAIL_SERVICE || 'Not configured'}`);
        console.log(`🤖 AI service: ${process.env.GROQ_API_KEY ? 'Groq API configured' : 'Not configured'}`);
        console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      });
    } catch (error) {
      console.error('❌ Failed to start server:', error);
      process.exit(1);
    }
  };

  startServer();
}

// Export for Vercel serverless
module.exports = app;
