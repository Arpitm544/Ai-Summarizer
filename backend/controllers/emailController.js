const emailService = require('../services/emailService');

module.exports = {
  async sendSummaryEmail(req, res, next) {
    try {
      const { summaryId, recipientEmails, subject, message } = req.body;
      const validEmails = emailService.validateEmails(recipientEmails);
      const result = await emailService.sendSummaryEmail(summaryId, validEmails, subject, message);

      res.json({
        success: true,
        message: 'Email sent successfully',
        ...result
      });
    } catch (error) {
      next(error);
    }
  },

  async sendTestEmail(req, res, next) {
    try {
      const { testEmail } = req.body;
      const result = await emailService.sendTestEmail(testEmail);

      res.json({
        success: true,
        message: 'Test email sent successfully',
        ...result
      });
    } catch (error) {
      next(error);
    }
  }
};
