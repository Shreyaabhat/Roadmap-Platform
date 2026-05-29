const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const { protect } = require('../middleware/authMiddleware');
const { ObjectId } = require('mongodb');

// GET /api/lessons/:lessonId?roadmapId=xxx&moduleId=xxx
router.get('/:lessonId', protect, async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { roadmapId, moduleId } = req.query;

    if (!roadmapId || !moduleId) {
      return res.status(400).json({ success: false, message: 'roadmapId and moduleId query params required' });
    }

    const db = mongoose.connection.db;
    const roadmap = await db.collection('roadmaps').findOne({ _id: new ObjectId(roadmapId) });
    if (!roadmap) return res.status(404).json({ success: false, message: 'Roadmap not found' });

    const module = (roadmap.modules || []).find(m => m._id && m._id.toString() === moduleId);
    if (!module) return res.status(404).json({ success: false, message: 'Module not found' });

    const lesson = (module.lessons || []).find(l => l._id && l._id.toString() === lessonId);
    if (!lesson) return res.status(404).json({ success: false, message: 'Lesson not found' });

    // Build flat list of all lessons for prev/next navigation
    const allLessons = [];
    (roadmap.modules || []).forEach(mod => {
      (mod.lessons || []).forEach(les => {
        allLessons.push({
          lessonId:    les._id.toString(),
          moduleId:    mod._id.toString(),
          lessonTitle: les.title,
        });
      });
    });

    const currentIndex = allLessons.findIndex(l => l.lessonId === lessonId);
    const prevLesson   = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
    const nextLesson   = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

    res.json({
      success: true,
      lesson,
      module:     { _id: module._id, title: module.title, level: module.level },
      roadmap:    { _id: roadmap._id, title: roadmap.title },
      navigation: {
        prevLesson,
        nextLesson,
        currentIndex: currentIndex + 1,
        total: allLessons.length,
      },
    });
  } catch (err) {
    console.error('Lesson route error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;