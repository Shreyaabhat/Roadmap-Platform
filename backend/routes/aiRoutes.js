const express = require('express');
const router = express.Router();
const { generateNotes, generateRoadmap, getRecommendations } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/generate-notes', protect, generateNotes);
router.post('/generate-roadmap', protect, generateRoadmap);
router.post('/recommend', protect, getRecommendations);

module.exports = router;