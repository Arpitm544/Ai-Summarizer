import React, { useState } from 'react';
import { Sparkles, Lightbulb, Send } from 'lucide-react';

const PromptInput = ({ onSubmit, isLoading, fileData }) => {
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedExample, setSelectedExample] = useState(null);

  const examplePrompts = [
    {
      id: 1,
      title: 'Executive Summary',
      prompt: 'Create a concise executive summary highlighting key decisions, action items, and important outcomes from this meeting.',
      icon: '👔'
    },
    {
      id: 2,
      title: 'Action Items',
      prompt: 'Extract all action items, assignees, and deadlines mentioned in this meeting. Organize them in a clear, actionable format.',
      icon: '✅'
    },
    {
      id: 3,
      title: 'Bullet Points',
      prompt: 'Summarize the main points of this meeting in clear bullet points, focusing on the most important topics discussed.',
      icon: '📋'
    },
    {
      id: 4,
      title: 'Technical Summary',
      prompt: 'Provide a technical summary of this meeting, focusing on technical decisions, architecture discussions, and implementation details.',
      icon: '⚙️'
    },
    {
      id: 5,
      title: 'Stakeholder Update',
      prompt: 'Create a stakeholder-friendly summary that explains the key outcomes and next steps in non-technical language.',
      icon: '🤝'
    },
    {
      id: 6,
      title: 'Custom Format',
      prompt: 'Summarize this meeting in a structured format with sections for: Key Decisions, Action Items, Next Steps, and Important Notes.',
      icon: '📝'
    }
  ];

  const handleExampleSelect = (example) => {
    setSelectedExample(example.id);
    setCustomPrompt(example.prompt);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customPrompt.trim()) {
      return;
    }
    onSubmit(customPrompt);
  };

  const handleCustomPrompt = (e) => {
    setCustomPrompt(e.target.value);
    setSelectedExample(null);
  };

  return (
    <div className="prompt-input">
      <div className="prompt-header">
        <h2>Custom Summarization Instructions</h2>
        <p>Tell the AI how you want your meeting transcript summarized</p>
      </div>

      {fileData && (
        <div className="file-preview">
          <h3>Uploaded File: {fileData.originalName}</h3>
          <p>Text length: {fileData.textLength.toLocaleString()} characters</p>
          <div className="text-preview">
            <strong>Preview:</strong> {fileData.preview}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="prompt-form">
        <div className="form-group">
          <label htmlFor="customPrompt" className="form-label">
            <Sparkles className="label-icon" />
            Your Instructions
          </label>
          <textarea
            id="customPrompt"
            className="textarea"
            value={customPrompt}
            onChange={handleCustomPrompt}
            placeholder="Enter your custom instructions for summarizing the meeting transcript..."
            rows={4}
            required
            disabled={isLoading}
          />
        </div>

        <div className="example-prompts">
          <h3>
            <Lightbulb className="section-icon" />
            Quick Examples
          </h3>
          <p>Click on an example to use it as a starting point:</p>
          
          <div className="examples-grid">
            {examplePrompts.map((example) => (
              <div
                key={example.id}
                className={`example-card ${selectedExample === example.id ? 'selected' : ''}`}
                onClick={() => handleExampleSelect(example)}
              >
                <div className="example-icon">{example.icon}</div>
                <div className="example-content">
                  <h4>{example.title}</h4>
                  <p>{example.prompt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!customPrompt.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <div className="loading"></div>
                Generating Summary...
              </>
            ) : (
              <>
                <Send size={16} />
                Generate Summary
              </>
            )}
          </button>
        </div>
      </form>

      <div className="prompt-tips">
        <h4>💡 Tips for better summaries:</h4>
        <ul>
          <li>Be specific about the format you want (bullet points, paragraphs, etc.)</li>
          <li>Mention the target audience (executives, team members, stakeholders)</li>
          <li>Specify what to focus on (decisions, action items, technical details)</li>
          <li>Include any special requirements or constraints</li>
        </ul>
      </div>
    </div>
  );
};

export default PromptInput;
