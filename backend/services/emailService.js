const { createTransporter } = require('../config/email');
const aiService = require('./aiService');

class EmailService {
  async sendSummaryEmail(summaryId, recipientEmails, subject, message) {
    // Get the summary
    const summaryData = await aiService.getSummaryById(summaryId);
    if (!summaryData) {
      throw new Error('Summary not found');
    }

    const finalSummary = summaryData.editedSummary || summaryData.generatedSummary;

    // Check if email service is configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      throw new Error('Email service not configured. Please set EMAIL_USER and EMAIL_PASSWORD environment variables.');
    }

    // Create transporter
    const transporter = createTransporter();

    // Verify transporter configuration
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error('Email transporter verification failed:', verifyError);
      throw new Error('Email service configuration error. Please check your email settings.');
    }

    // Prepare email content
    const emailSubject = subject || 'Meeting Summary - AI Summarizer';
    const emailMessage = message || 'Please find the meeting summary attached below.';
    
    const emailContent = this.generateEmailTemplate(
      emailMessage,
      finalSummary,
      summaryData.originalPrompt,
      summaryData.model,
      summaryData.tokensUsed
    );

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmails.join(', '),
      subject: emailSubject,
      html: emailContent,
      text: `Meeting Summary\n\n${emailMessage}\n\n${finalSummary}\n\nGenerated using AI Summarizer.`
    };

    const info = await transporter.sendMail(mailOptions);

    // Log email sending
    console.log('Email sent successfully:', {
      messageId: info.messageId,
      summaryId: summaryId,
      recipients: recipientEmails,
      timestamp: new Date()
    });

    return {
      messageId: info.messageId,
      recipients: recipientEmails
    };
  }

  async sendTestEmail(testEmail) {
    // Check if email service is configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      throw new Error('Email service not configured. Please set EMAIL_USER and EMAIL_PASSWORD environment variables.');
    }

    // Create transporter
    const transporter = createTransporter();

    // Verify transporter configuration
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error('Email transporter verification failed:', verifyError);
      throw new Error('Email service configuration error. Please check your email settings.');
    }

    // Send test email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: testEmail,
      subject: 'AI Summarizer - Email Test',
      html: `
        <h2>✅ Email Configuration Test</h2>
        <p>This is a test email to verify that your email configuration is working correctly.</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        <p>If you received this email, your email service is properly configured!</p>
      `,
      text: 'AI Summarizer Email Test - Configuration is working correctly!'
    };

    const info = await transporter.sendMail(mailOptions);

    return {
      messageId: info.messageId
    };
  }

  generateEmailTemplate(message, summary, originalPrompt, model, tokensUsed) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Meeting Summary</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .summary-content { background-color: #ffffff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px; }
        .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e9ecef; font-size: 12px; color: #6c757d; }
        .highlight { background-color: #fff3cd; padding: 10px; border-radius: 4px; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>📋 Meeting Summary</h2>
            <p><strong>Generated on:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Original prompt:</strong> ${originalPrompt}</p>
        </div>
        
        <div class="summary-content">
            <h3>Summary</h3>
            <div class="highlight">
                ${message}
            </div>
            <div style="white-space: pre-wrap;">${summary}</div>
        </div>
        
        <div class="footer">
            <p>This summary was generated using AI Summarizer.</p>
            <p>Model: ${model} | Tokens used: ${tokensUsed}</p>
        </div>
    </div>
</body>
</html>`;
  }

  validateEmails(emails) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmails = emails.filter(email => email.trim() && emailRegex.test(email.trim()));
    
    if (validEmails.length === 0) {
      throw new Error('Please enter at least one valid email address');
    }
    
    return validEmails;
  }
}

module.exports = new EmailService();
