const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const Progress = require('../models/Progress');

async function markLessonComplete(req, res) {
  try {
    const { roadmapId, moduleId, lessonId } = req.body;
    const userId = req.user._id;

    if (!roadmapId || !moduleId || !lessonId) {
      return res.status(400).json({ success: false, message: 'roadmapId, moduleId, lessonId required' });
    }

    // Get total lessons using raw MongoDB
    const db      = mongoose.connection.db;
    const roadmap = await db.collection('roadmaps').findOne({ _id: new ObjectId(roadmapId) });
    if (!roadmap) return res.status(404).json({ success: false, message: 'Roadmap not found' });

    let totalLessons = 0;
    (roadmap.modules || []).forEach(m => { totalLessons += (m.lessons || []).length; });

    // Find or create progress
    let progress = await Progress.findOne({ userId, roadmapId });
    if (!progress) {
      progress = await Progress.create({ userId, roadmapId, completedLessons: [], percentage: 0 });
    }

    const alreadyDone = progress.completedLessons.some(cl => cl.lessonId === lessonId);
    if (!alreadyDone) {
      progress.completedLessons.push({ lessonId, moduleId, completedAt: new Date() });
    }

    progress.percentage      = Math.round((progress.completedLessons.length / (totalLessons || 1)) * 100);
    progress.lastAccessedAt  = new Date();
    await progress.save();

    res.json({
      success: true,
      message: alreadyDone ? 'Already completed' : 'Lesson marked complete!',
      progress: {
        completedLessons: progress.completedLessons,
        percentage:       progress.percentage,
        totalCompleted:   progress.completedLessons.length,
        totalLessons,
      },
    });
  } catch (err) {
    console.error('markLessonComplete error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
}

async function getUserProgress(req, res) {
  try {
    const { userId } = req.params;
    if (userId !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const progressList = await Progress.find({ userId });

    // Manually attach roadmap info using raw MongoDB
    const db = mongoose.connection.db;
    const enriched = await Promise.all(progressList.map(async (prog) => {
      const roadmap = await db.collection('roadmaps').findOne(
        { _id: new ObjectId(prog.roadmapId) },
        { projection: { title: 1, icon: 1, color: 1, totalLessons: 1, type: 1, category: 1 } }
      );
      return {
        ...prog.toObject(),
        roadmapId: roadmap || prog.roadmapId,
      };
    }));

    res.json({ success: true, progress: enriched });
  } catch (err) {
    console.error('getUserProgress error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
}

async function getRoadmapProgress(req, res) {
  try {
    const { userId, roadmapId } = req.params;
    if (userId !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const progress = await Progress.findOne({ userId, roadmapId });
    if (!progress) {
      return res.json({
        success: true,
        progress: { completedLessons: [], percentage: 0, userId, roadmapId },
      });
    }

    res.json({ success: true, progress });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function unmarkLesson(req, res) {
  try {
    const { roadmapId, lessonId } = req.body;
    const userId = req.user._id;

    const db      = mongoose.connection.db;
    const roadmap = await db.collection('roadmaps').findOne({ _id: new ObjectId(roadmapId) });

    let totalLessons = 0;
    (roadmap?.modules || []).forEach(m => { totalLessons += (m.lessons || []).length; });

    const progress = await Progress.findOne({ userId, roadmapId });
    if (!progress) return res.status(404).json({ success: false, message: 'Progress not found' });

    progress.completedLessons = progress.completedLessons.filter(cl => cl.lessonId !== lessonId);
    progress.percentage = Math.round((progress.completedLessons.length / (totalLessons || 1)) * 100);
    await progress.save();

    res.json({ success: true, progress });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = { markLessonComplete, getUserProgress, getRoadmapProgress, unmarkLesson };