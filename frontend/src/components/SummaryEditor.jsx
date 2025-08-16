import React, { useState, useEffect, useCallback } from 'react';
import { Edit3, Save, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';

const SummaryEditor = ({ summary, onUpdate }) => {
  const [editedSummary, setEditedSummary] = useState(summary);
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Update local state when prop changes
  useEffect(() => {
    setEditedSummary(summary);
    setHasChanges(false);
  }, [summary]);

  // Auto-save functionality
  const autoSave = useCallback(async () => {
    if (!hasChanges || editedSummary === summary) return;

    setIsSaving(true);
    try {
      await onUpdate(editedSummary);
      setHasChanges(false);
      toast.success('Summary auto-saved!');
    } catch (error) {
      console.error('Auto-save error:', error);
      toast.error('Auto-save failed');
    } finally {
      setIsSaving(false);
    }
  }, [editedSummary, summary, hasChanges, onUpdate]);

  // Auto-save after 2 seconds of no typing
  useEffect(() => {
    if (!hasChanges) return;

    const timeoutId = setTimeout(autoSave, 2000);
    return () => clearTimeout(timeoutId);
  }, [editedSummary, hasChanges, autoSave]);

  const handleTextChange = (e) => {
    const newValue = e.target.value;
    setEditedSummary(newValue);
    setHasChanges(newValue !== summary);
  };

  const handleSave = async () => {
    if (!hasChanges) return;

    setIsSaving(true);
    try {
      await onUpdate(editedSummary);
      setHasChanges(false);
      toast.success('Summary saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save summary');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setEditedSummary(summary);
    setHasChanges(false);
    toast.success('Summary reset to original');
  };

  const handleToggleEdit = () => {
    if (isEditing && hasChanges) {
      // If we're exiting edit mode and have unsaved changes, save them
      handleSave();
    }
    setIsEditing(!isEditing);
  };

  const wordCount = editedSummary.trim().split(/\s+/).filter(word => word.length > 0).length;
  const charCount = editedSummary.length;

  return (
    <div className="summary-editor">
      <div className="editor-header">
        <div className="editor-title">
          <Edit3 className="editor-icon" />
          <h3>Summary Editor</h3>
        </div>
        
        <div className="editor-actions">
          {hasChanges && (
            <span className="unsaved-indicator">
              • Unsaved changes
            </span>
          )}
          
          <button
            className="btn btn-secondary"
            onClick={handleReset}
            disabled={!hasChanges || isSaving}
            title="Reset to original"
          >
            <RotateCcw size={16} />
            Reset
          </button>
          
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            title="Save changes"
          >
            {isSaving ? (
              <div className="loading"></div>
            ) : (
              <Save size={16} />
            )}
            Save
          </button>
        </div>
      </div>

      <div className="editor-content">
        <textarea
          className="textarea summary-textarea"
          value={editedSummary}
          onChange={handleTextChange}
          placeholder="Your summary will appear here..."
          rows={15}
          disabled={isSaving}
        />
      </div>

      <div className="editor-footer">
        <div className="text-stats">
          <span className="stat">
            <strong>Words:</strong> {wordCount}
          </span>
          <span className="stat">
            <strong>Characters:</strong> {charCount.toLocaleString()}
          </span>
          {hasChanges && (
            <span className="stat changes">
              <strong>Changes:</strong> {Math.abs(editedSummary.length - summary.length)} chars
            </span>
          )}
        </div>
        
        <div className="auto-save-info">
          {isSaving ? (
            <span className="saving">Saving...</span>
          ) : hasChanges ? (
            <span className="auto-save">Auto-saving in 2s...</span>
          ) : (
            <span className="saved">All changes saved</span>
          )}
        </div>
      </div>

      <div className="editor-tips">
        <h4>✏️ Editing Tips:</h4>
        <ul>
          <li>Make any necessary corrections or improvements to the AI-generated summary</li>
          <li>Add context or clarify any unclear points</li>
          <li>Your changes are automatically saved after 2 seconds of inactivity</li>
          <li>Use the Reset button to restore the original AI-generated summary</li>
        </ul>
      </div>
    </div>
  );
};

export default SummaryEditor;
