const express = require('express');
const router = express.Router();
const { getAllRoadmaps, getRoadmapById, getRoadmapsByType, getLesson } = require('../controllers/roadmapController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getAllRoadmaps);
router.get('/type/:type', getRoadmapsByType);
router.get('/:id', getRoadmapById);
router.get('/:roadmapId/modules/:moduleId/lessons/:lessonId', protect, getLesson);

module.exports = router;