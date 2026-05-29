const mongoose = require('mongoose');

/**
 * @route GET /api/roadmaps
 * Gets all roadmaps - uses raw MongoDB to avoid schema issues
 */
async function getAllRoadmaps(req, res) {
  try {
    const db = mongoose.connection.db;
    const roadmaps = await db.collection('roadmaps')
      .find({ isPublished: true })
      .project({ title: 1, description: 1, type: 1, category: 1, totalLessons: 1, estimatedHours: 1, tags: 1, icon: 1, color: 1 })
      .toArray();

    console.log('GET /api/roadmaps - found:', roadmaps.length);
    res.json({ success: true, count: roadmaps.length, roadmaps });
  } catch (err) {
    console.error('getAllRoadmaps error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
}

/**
 * @route GET /api/roadmaps/type/:type
 */
async function getRoadmapsByType(req, res) {
  try {
    const db = mongoose.connection.db;
    const roadmaps = await db.collection('roadmaps')
      .find({ type: req.params.type, isPublished: true })
      .project({ title: 1, description: 1, type: 1, category: 1, totalLessons: 1, estimatedHours: 1, tags: 1, icon: 1, color: 1 })
      .toArray();

    res.json({ success: true, roadmaps });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

/**
 * @route GET /api/roadmaps/:id
 * Gets full roadmap with all modules and lessons
 */
async function getRoadmapById(req, res) {
  try {
    const { ObjectId } = require('mongodb');
    const db = mongoose.connection.db;
    
    let id;
    try {
      id = new ObjectId(req.params.id);
    } catch (e) {
      return res.status(400).json({ success: false, message: 'Invalid roadmap ID' });
    }

    const roadmap = await db.collection('roadmaps').findOne({ _id: id });

    if (!roadmap) {
      return res.status(404).json({ success: false, message: 'Roadmap not found' });
    }

    console.log('GET /api/roadmaps/' + req.params.id + ' - found:', roadmap.title);
    res.json({ success: true, roadmap });
  } catch (err) {
    console.error('getRoadmapById error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
}

/**
 * @route GET /api/roadmaps/:roadmapId/modules/:moduleId/lessons/:lessonId
 */
async function getLesson(req, res) {
  try {
    const { ObjectId } = require('mongodb');
    const { roadmapId, moduleId, lessonId } = req.params;
    const db = mongoose.connection.db;

    const roadmap = await db.collection('roadmaps').findOne({ _id: new ObjectId(roadmapId) });
    if (!roadmap) return res.status(404).json({ success: false, message: 'Roadmap not found' });

    const module = (roadmap.modules || []).find(m => m._id && m._id.toString() === moduleId);
    if (!module) return res.status(404).json({ success: false, message: 'Module not found' });

    const lesson = (module.lessons || []).find(l => l._id && l._id.toString() === lessonId);
    if (!lesson) return res.status(404).json({ success: false, message: 'Lesson not found' });

    res.json({
      success: true,
      lesson,
      module: { _id: module._id, title: module.title, level: module.level },
      roadmap: { _id: roadmap._id, title: roadmap.title },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = { getAllRoadmaps, getRoadmapById, getRoadmapsByType, getLesson };