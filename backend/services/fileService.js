const fs = require('fs').promises;
const path = require('path');
const mammoth = require('mammoth');
const { v4: uuidv4 } = require('uuid');
const File = require('../models/File');

class FileService {
  async extractTextFromFile(filePath, originalName) {
    const fileExtension = path.extname(originalName).toLowerCase();
    let extractedText = '';

    if (fileExtension === '.txt') {
      extractedText = await fs.readFile(filePath, 'utf-8');
    } else if (fileExtension === '.docx') {
      const result = await mammoth.extractRawText({ path: filePath });
      extractedText = result.value;
      
      if (result.messages.length > 0) {
        console.log('Mammoth messages:', result.messages);
      }
    }

    if (!extractedText.trim()) {
      throw new Error('Could not extract text from the uploaded file');
    }

    return extractedText;
  }

  async saveFileInfo(fileData, extractedText) {
    const fileInfo = {
      originalName: fileData.originalname,
      fileName: fileData.filename,
      filePath: fileData.path,
      fileSize: fileData.size,
      mimeType: fileData.mimetype,
      extractedText: extractedText
    };

    // If database is configured, save to database
    if (process.env.MONGODB_URI) {
      const file = new File(fileInfo);
      await file.save();
      return file;
    }

    // Otherwise, store in memory (for development)
    const fileId = uuidv4();
    if (!global.uploadedFiles) {
      global.uploadedFiles = new Map();
    }
    
    const fileRecord = {
      id: fileId,
      ...fileInfo,
      uploadedAt: new Date()
    };
    
    global.uploadedFiles.set(fileId, fileRecord);
    return fileRecord;
  }

  async getFileById(fileId) {
    // If database is configured, get from database
    if (process.env.MONGODB_URI) {
      return await File.findById(fileId);
    }

    // Otherwise, get from memory
    if (!global.uploadedFiles || !global.uploadedFiles.has(fileId)) {
      return null;
    }
    
    return global.uploadedFiles.get(fileId);
  }

  async deleteFile(fileId) {
    // If database is configured, delete from database
    if (process.env.MONGODB_URI) {
      const file = await File.findById(fileId);
      if (file) {
        await fs.unlink(file.filePath).catch(err => console.log('File not found:', err));
        await File.findByIdAndDelete(fileId);
      }
      return;
    }

    // Otherwise, delete from memory
    if (global.uploadedFiles && global.uploadedFiles.has(fileId)) {
      const file = global.uploadedFiles.get(fileId);
      await fs.unlink(file.filePath).catch(err => console.log('File not found:', err));
      global.uploadedFiles.delete(fileId);
    }
  }
}

module.exports = new FileService();
