import React, { useState } from 'react';
import { Mail, Send, Plus, X, Settings, TestTube } from 'lucide-react';
import toast from 'react-hot-toast';

const EmailSender = ({ summaryId, onSend, summary }) => {
  const [recipients, setRecipients] = useState(['']);
  const [subject, setSubject] = useState('Meeting Summary - AI Summarizer');
  const [message, setMessage] = useState('Please find the meeting summary attached below.');
  const [isSending, setIsSending] = useState(false);
  const [showTestEmail, setShowTestEmail] = useState(false);
  const [testEmail, setTestEmail] = useState('');

  const addRecipient = () => {
    setRecipients([...recipients, '']);
  };

  const removeRecipient = (index) => {
    if (recipients.length > 1) {
      const newRecipients = recipients.filter((_, i) => i !== index);
      setRecipients(newRecipients);
    }
  };

  const updateRecipient = (index, value) => {
    const newRecipients = [...recipients];
    newRecipients[index] = value;
    setRecipients(newRecipients);
  };

  const validateEmails = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmails = recipients.filter(email => email.trim() && emailRegex.test(email.trim()));
    
    if (validEmails.length === 0) {
      toast.error('Please enter at least one valid email address');
      return false;
    }
    
    return validEmails;
  };

  const handleSend = async (e) => {
    e.preventDefault();
    
    const validEmails = validateEmails();
    if (!validEmails) return;

    setIsSending(true);
    try {
      await onSend({
        recipientEmails: validEmails,
        subject: subject.trim() || 'Meeting Summary - AI Summarizer',
        message: message.trim() || 'Please find the meeting summary attached below.'
      });
    } catch (error) {
      console.error('Send error:', error);
      // Error is handled by the parent component
    } finally {
      setIsSending(false);
    }
  };

  const handleTestEmail = async (e) => {
    e.preventDefault();
    
    if (!testEmail.trim()) {
      toast.error('Please enter a test email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(testEmail.trim())) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch('/api/email/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          testEmail: testEmail.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send test email');
      }

      toast.success('Test email sent successfully!');
      setShowTestEmail(false);
      setTestEmail('');
    } catch (error) {
      console.error('Test email error:', error);
      toast.error(error.message || 'Failed to send test email');
    } finally {
      setIsSending(false);
    }
  };

  const wordCount = summary.trim().split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="email-sender">
      <div className="email-header">
        <h2>
          <Mail className="header-icon" />
          Share Summary via Email
        </h2>
        <p>Send your meeting summary to team members and stakeholders</p>
      </div>

      <div className="summary-preview">
        <h3>Summary Preview</h3>
        <div className="preview-stats">
          <span><strong>Words:</strong> {wordCount}</span>
          <span><strong>Characters:</strong> {summary.length.toLocaleString()}</span>
        </div>
        <div className="preview-content">
          {summary.substring(0, 200)}...
        </div>
      </div>

      <form onSubmit={handleSend} className="email-form">
        <div className="form-section">
          <h3>Recipients</h3>
          <div className="recipients-list">
            {recipients.map((email, index) => (
              <div key={index} className="recipient-input">
                <input
                  type="email"
                  className="input"
                  value={email}
                  onChange={(e) => updateRecipient(index, e.target.value)}
                  placeholder="Enter email address"
                  required={index === 0}
                />
                {recipients.length > 1 && (
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeRecipient(index)}
                    title="Remove recipient"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary add-recipient"
              onClick={addRecipient}
            >
              <Plus size={16} />
              Add Recipient
            </button>
          </div>
        </div>

        <div className="form-section">
          <h3>Email Content</h3>
          <div className="form-group">
            <label htmlFor="emailSubject" className="form-label">Subject Line</label>
            <input
              id="emailSubject"
              type="text"
              className="input"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Meeting Summary - AI Summarizer"
            />
          </div>

          <div className="form-group">
            <label htmlFor="emailMessage" className="form-label">Message</label>
            <textarea
              id="emailMessage"
              className="textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a personal message to accompany the summary..."
              rows={3}
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowTestEmail(!showTestEmail)}
          >
            <TestTube size={16} />
            Test Email Configuration
          </button>
          
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSending}
          >
            {isSending ? (
              <>
                <div className="loading"></div>
                Sending...
              </>
            ) : (
              <>
                <Send size={16} />
                Send Summary
              </>
            )}
          </button>
        </div>
      </form>

      {showTestEmail && (
        <div className="test-email-section">
          <h3>
            <Settings className="section-icon" />
            Test Email Configuration
          </h3>
          <p>Send a test email to verify your email settings are working correctly.</p>
          
          <form onSubmit={handleTestEmail} className="test-form">
            <div className="form-group">
              <label htmlFor="testEmail" className="form-label">Test Email Address</label>
              <input
                id="testEmail"
                type="email"
                className="input"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="Enter your email address for testing"
                required
              />
            </div>
            
            <div className="test-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowTestEmail(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSending}
              >
                {isSending ? (
                  <>
                    <div className="loading"></div>
                    Sending Test...
                  </>
                ) : (
                  <>
                    <TestTube size={16} />
                    Send Test Email
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="email-tips">
        <h4>📧 Email Tips:</h4>
        <ul>
          <li>Add multiple recipients by clicking "Add Recipient"</li>
          <li>Customize the subject line to make it more specific to your meeting</li>
          <li>Include a personal message to provide context for the summary</li>
          <li>Test your email configuration before sending to ensure delivery</li>
          <li>The summary will be sent as a formatted HTML email</li>
        </ul>
      </div>
    </div>
  );
};

export default EmailSender;
