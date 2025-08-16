const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateFileUpload = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  next();
};

const validateSummaryRequest = (req, res, next) => {
  const { fileId, customPrompt } = req.body;

  if (!fileId) {
    return res.status(400).json({ error: 'File ID is required' });
  }

  if (!customPrompt || customPrompt.trim().length === 0) {
    return res.status(400).json({ error: 'Custom prompt is required' });
  }

  next();
};

const validateEmailRequest = (req, res, next) => {
  const { summaryId, recipientEmails, subject, message } = req.body;

  if (!summaryId) {
    return res.status(400).json({ error: 'Summary ID is required' });
  }

  if (!recipientEmails || !Array.isArray(recipientEmails) || recipientEmails.length === 0) {
    return res.status(400).json({ error: 'At least one recipient email is required' });
  }

  // Validate email format
  for (const email of recipientEmails) {
    if (!validateEmail(email)) {
      return res.status(400).json({ error: `Invalid email format: ${email}` });
    }
  }

  next();
};

const validateTestEmailRequest = (req, res, next) => {
  const { testEmail } = req.body;

  if (!testEmail) {
    return res.status(400).json({ error: 'Test email address is required' });
  }

  if (!validateEmail(testEmail)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  next();
};

module.exports = {
  validateEmail,
  validateFileUpload,
  validateSummaryRequest,
  validateEmailRequest,
  validateTestEmailRequest
};
