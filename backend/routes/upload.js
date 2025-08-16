const express = require('express');
const upload = require('../middleware/upload');
const { validateFileUpload } = require('../middleware/validation');
const uploadController = require('../controllers/uploadController');

const router = express.Router();

// Upload transcript endpoint
router.post('/', upload.single('transcript'), validateFileUpload, uploadController.uploadFile);

// Get uploaded file info
router.get('/:fileId', uploadController.getFileInfo);

// Delete file
router.delete('/:fileId', uploadController.deleteFile);

module.exports = router;
