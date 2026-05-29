const express = require('express');
const router = express.Router();
const { markLessonComplete, getUserProgress, getRoadmapProgress, unmarkLesson } = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');

router.post('/complete', protect, markLessonComplete);
router.post('/uncomplete', protect, unmarkLesson);
router.get('/:userId', protect, getUserProgress);
router.get('/:userId/:roadmapId', protect, getRoadmapProgress);

module.exports = router;