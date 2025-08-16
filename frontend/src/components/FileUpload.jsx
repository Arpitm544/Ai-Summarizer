import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const FileUpload = ({ onFileUpload }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['.txt', '.docx'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    
    if (!allowedTypes.includes(fileExtension)) {
      toast.error('Please upload a .txt or .docx file');
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setUploading(true);
    setUploadedFile(file);

    try {
      const formData = new FormData();
      formData.append('transcript', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      onFileUpload(result);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload file');
      setUploadedFile(null);
    } finally {
      setUploading(false);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    disabled: uploading
  });

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="file-upload">
      <div className="upload-header">
        <h2>Upload Meeting Transcript</h2>
        <p>Upload your meeting transcript file to get started</p>
      </div>

      <div 
        {...getRootProps()} 
        className={`dropzone ${isDragActive ? 'drag-active' : ''} ${isDragReject ? 'drag-reject' : ''}`}
      >
        <input {...getInputProps()} />
        
        {uploading ? (
          <div className="upload-loading">
            <div className="loading"></div>
            <p>Processing your file...</p>
          </div>
        ) : uploadedFile ? (
          <div className="upload-success">
            <CheckCircle className="upload-icon success" />
            <h3>File Uploaded Successfully!</h3>
            <div className="file-info">
              <p><strong>File:</strong> {uploadedFile.name}</p>
              <p><strong>Size:</strong> {formatFileSize(uploadedFile.size)}</p>
              <p><strong>Type:</strong> {uploadedFile.type || 'Unknown'}</p>
            </div>
          </div>
        ) : (
          <div className="upload-prompt">
            <Upload className="upload-icon" />
            <h3>Drop your transcript file here</h3>
            <p>or click to browse</p>
            <div className="upload-requirements">
              <p>Supported formats: .txt, .docx</p>
              <p>Maximum size: 10MB</p>
            </div>
          </div>
        )}
      </div>

      {isDragReject && (
        <div className="upload-error">
          <AlertCircle className="error-icon" />
          <p>Please upload a .txt or .docx file</p>
        </div>
      )}

      <div className="upload-tips">
        <h4>Tips for best results:</h4>
        <ul>
          <li>Ensure your transcript is clear and well-formatted</li>
          <li>Include speaker names if available</li>
          <li>Remove any unnecessary formatting or special characters</li>
          <li>For Word documents, ensure they're properly saved as .docx</li>
        </ul>
      </div>
    </div>
  );
};

export default FileUpload;
