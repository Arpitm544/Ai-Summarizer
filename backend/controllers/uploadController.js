const fileService = require('../services/fileService');

module.exports = {
  async uploadFile(req, res) {
    try {
      const fileData = req.file;
      
      // Handle both memory and disk storage
      let extractedText;
      if (fileData.buffer) {
        // Memory storage (production/serverless)
        extractedText = await fileService.extractTextFromBuffer(fileData.buffer, fileData.originalname);
      } else {
        // Disk storage (development)
        extractedText = await fileService.extractTextFromFile(fileData.path, fileData.originalname);
      }
      
      const savedFile = await fileService.saveFileInfo(fileData, extractedText);

      res.json({
        success: true,
        message: 'File uploaded and text extracted successfully',
        fileId: savedFile.id || savedFile._id,
        originalName: savedFile.originalName,
        textLength: extractedText.length,
        preview: extractedText.substring(0, 200) + (extractedText.length > 200 ? '...' : '')
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getFileInfo(req, res) {
    try {
      const { fileId } = req.params;
      const fileInfo = await fileService.getFileById(fileId);

      if (!fileInfo) {
        return res.status(404).json({ error: 'File not found' });
      }

      res.json({
        success: true,
        file: {
          id: fileInfo.id || fileInfo._id,
          originalName: fileInfo.originalName,
          fileSize: fileInfo.fileSize,
          textLength: fileInfo.extractedText.length,
          uploadedAt: fileInfo.uploadedAt,
          preview: fileInfo.extractedText.substring(0, 500) + (fileInfo.extractedText.length > 500 ? '...' : '')
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteFile(req, res) {
    try {
      const { fileId } = req.params;
      await fileService.deleteFile(fileId);

      res.json({
        success: true,
        message: 'File deleted successfully'
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
