const express = require('express');
const { validateEmailRequest, validateTestEmailRequest } = require('../middleware/validation');
const emailController = require('../controllers/emailController');

const router = express.Router();

// Send email endpoint
router.post('/send', validateEmailRequest, emailController.sendSummaryEmail);

// Test email configuration endpoint
router.post('/test', validateTestEmailRequest, emailController.sendTestEmail);

module.exports = router;
