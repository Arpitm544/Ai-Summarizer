import React, { useState } from 'react';
import { Upload, FileText, Sparkles, Mail, Download, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import FileUpload from './components/FileUpload';
import PromptInput from './components/PromptInput';
import SummaryEditor from './components/SummaryEditor';
import EmailSender from './components/EmailSender';
import './App.css';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [fileData, setFileData] = useState(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [summaryData, setSummaryData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (data) => {
    setFileData(data);
    setCurrentStep(2);
    toast.success('File uploaded successfully!');
  };

  const handlePromptSubmit = async (prompt) => {
    setCustomPrompt(prompt);
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileId: fileData.fileId,
          customPrompt: prompt,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate summary');
      }

      setSummaryData(result);
      setCurrentStep(3);
      toast.success('Summary generated successfully!');
    } catch (error) {
      console.error('Summary generation error:', error);
      toast.error(error.message || 'Failed to generate summary');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSummaryUpdate = (editedSummary) => {
    setSummaryData(prev => ({
      ...prev,
      summary: editedSummary,
    }));
    toast.success('Summary updated successfully!');
  };

  const handleEmailSend = async (emailData) => {
    try {
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          summaryId: summaryData.summaryId,
          ...emailData,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send email');
      }

      toast.success('Email sent successfully!');
      setCurrentStep(4);
    } catch (error) {
      console.error('Email sending error:', error);
      toast.error(error.message || 'Failed to send email');
    }
  };

  const resetApp = () => {
    setCurrentStep(1);
    setFileData(null);
    setCustomPrompt('');
    setSummaryData(null);
    setIsLoading(false);
  };

  const downloadSummary = () => {
    const content = summaryData.summary;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meeting-summary-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Summary downloaded!');
  };

  const steps = [
    { id: 1, title: 'Upload Transcript', icon: Upload, description: 'Upload your meeting transcript file' },
    { id: 2, title: 'Custom Prompt', icon: FileText, description: 'Enter your summarization instructions' },
    { id: 3, title: 'AI Summary', icon: Sparkles, description: 'Review and edit the generated summary' },
    { id: 4, title: 'Share', icon: Mail, description: 'Send the summary via email' },
  ];

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <header className="header">
          <h1 className="title">
            <Sparkles className="title-icon" />
            AI Meeting Notes Summarizer
          </h1>
          <p className="subtitle">
            Upload transcripts, generate AI-powered summaries, and share with your team
          </p>
        </header>

        {/* Progress Steps */}
        <div className="progress-steps">
          {steps.map((step, index) => (
            <div key={step.id} className={`step ${currentStep >= step.id ? 'active' : ''}`}>
              <div className="step-icon">
                {currentStep > step.id ? (
                  <CheckCircle className="step-icon-check" />
                ) : (
                  <step.icon className="step-icon-default" />
                )}
              </div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`step-connector ${currentStep > step.id ? 'active' : ''}`} />
              )}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <main className="main-content">
          <div className="card fade-in">
            {currentStep === 1 && (
              <FileUpload onFileUpload={handleFileUpload} />
            )}

            {currentStep === 2 && (
              <PromptInput 
                onSubmit={handlePromptSubmit} 
                isLoading={isLoading}
                fileData={fileData}
              />
            )}

            {currentStep === 3 && summaryData && (
              <div className="summary-section">
                <div className="summary-header">
                  <h2>Generated Summary</h2>
                  <div className="summary-actions">
                    <button 
                      className="btn btn-secondary" 
                      onClick={downloadSummary}
                    >
                      <Download size={16} />
                      Download
                    </button>
                    <button 
                      className="btn btn-primary" 
                      onClick={() => setCurrentStep(4)}
                    >
                      <Mail size={16} />
                      Share via Email
                    </button>
                  </div>
                </div>
                
                <div className="summary-info">
                  <div className="info-item">
                    <span className="info-label">Original Prompt:</span>
                    <span className="info-value">{customPrompt}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Model:</span>
                    <span className="info-value">{summaryData.model}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Tokens Used:</span>
                    <span className="info-value">{summaryData.tokensUsed}</span>
                  </div>
                </div>

                <SummaryEditor 
                  summary={summaryData.summary}
                  onUpdate={handleSummaryUpdate}
                />
              </div>
            )}

            {currentStep === 4 && summaryData && (
              <EmailSender 
                summaryId={summaryData.summaryId}
                onSend={handleEmailSend}
                summary={summaryData.summary}
              />
            )}
          </div>
        </main>

        {/* Navigation */}
        {currentStep > 1 && (
          <div className="navigation">
            <button 
              className="btn btn-secondary" 
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              ← Previous Step
            </button>
            
            {currentStep < 4 && (
              <button 
                className="btn btn-primary" 
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                Next Step →
              </button>
            )}
            
            <button 
              className="btn btn-secondary" 
              onClick={resetApp}
            >
              Start Over
            </button>
          </div>
        )}

        {/* Footer */}
        <footer className="footer">
          <p>Powered by Groq AI • Built with React & Node.js</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
