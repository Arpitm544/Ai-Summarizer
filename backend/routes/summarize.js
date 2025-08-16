const express = require('express');
const { validateSummaryRequest } = require('../middleware/validation');
const summarizeController = require('../controllers/summarizeController');

const router = express.Router();

// Generate summary endpoint
router.post('/', validateSummaryRequest, summarizeController.generateSummary);

// Get summary by ID
router.get('/:summaryId', summarizeController.getSummary);

// Update summary (for manual edits)
router.put('/:summaryId', summarizeController.updateSummary);

module.exports = router;
