const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Handle specific error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      message: err.message,
      details: err.details
    });
  }

  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'File too large',
        message: 'File size must be less than 10MB'
      });
    }
    return res.status(400).json({
      error: 'File upload error',
      message: err.message
    });
  }

  // Handle Groq API errors
  if (err.status === 401) {
    return res.status(401).json({
      error: 'Invalid API key',
      message: 'Please check your Groq API configuration.'
    });
  }

  if (err.status === 429) {
    return res.status(429).json({
      error: 'Rate limit exceeded',
      message: 'Please try again later.'
    });
  }

  if (err.status === 400) {
    return res.status(400).json({
      error: 'Invalid request to AI service',
      message: err.message
    });
  }

  // Handle email errors
  if (err.code === 'EAUTH') {
    return res.status(401).json({
      error: 'Email authentication failed',
      message: 'Please check your email credentials.'
    });
  }

  if (err.code === 'ECONNECTION') {
    return res.status(500).json({
      error: 'Email service connection failed',
      message: 'Please try again later.'
    });
  }

  if (err.code === 'EMESSAGE') {
    return res.status(400).json({
      error: 'Invalid email message format',
      message: err.message
    });
  }

  // Default error response
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
  });
};

module.exports = errorHandler;
