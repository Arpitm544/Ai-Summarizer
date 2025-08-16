const aiService = require('../services/aiService');
const fileService = require('../services/fileService');

module.exports = {
  async generateSummary(req, res) {
    try {
      const { fileId, customPrompt } = req.body;
      const fileInfo = await fileService.getFileById(fileId);

      if (!fileInfo) return res.status(404).json({ error: 'File not found' });

      const transcriptText = fileInfo.extractedText?.trim();
      if (!transcriptText) return res.status(400).json({ error: 'No text content found in the uploaded file' });

      const summaryData = await aiService.generateSummary(fileId, customPrompt, transcriptText);

      res.json({
        success: true,
        message: 'Summary generated successfully',
        ...summaryData,
        summary: summaryData.generatedSummary
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getSummary(req, res) {
    try {
      const { summaryId } = req.params;
      const summaryData = await aiService.getSummaryById(summaryId);

      if (!summaryData) return res.status(404).json({ error: 'Summary not found' });

      res.json({ success: true, summary: summaryData });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateSummary(req, res) {
    try {
      const { summaryId } = req.params;
      const { editedSummary } = req.body;

      if (!editedSummary?.trim()) return res.status(400).json({ error: 'Edited summary is required' });

      await aiService.updateSummary(summaryId, editedSummary);

      res.json({
        success: true,
        message: 'Summary updated successfully',
        summaryId,
        editedSummary
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
