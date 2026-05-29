const mongoose = require('mongoose');

// ─── Lesson Schema ─────────────────────────────────────────────────────────────
const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Lesson title is required'],
    trim: true,
  },
  content: {
    type: String,
    default: '', // AI-generated content stored here
  },
  summary: {
    type: String,
    default: '',
  },
  resources: [
    {
      title: String,
      url: String,
      type: { type: String, enum: ['article', 'video', 'docs', 'course'], default: 'article' },
    },
  ],
  tasks: [
    {
      description: String,
      completed: { type: Boolean, default: false },
    },
  ],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
  },
  estimatedTime: {
    type: Number, // minutes
    default: 30,
  },
  order: {
    type: Number,
    default: 0,
  },
});

// ─── Module Schema ─────────────────────────────────────────────────────────────
const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Module title is required'],
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  lessons: [lessonSchema],
  order: {
    type: Number,
    default: 0,
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
  },
  icon: {
    type: String,
    default: '📚',
  },
});

// ─── Roadmap Schema ────────────────────────────────────────────────────────────
const roadmapSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Roadmap title is required'],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Roadmap description is required'],
  },
  type: {
    type: String,
    enum: ['role', 'language'],
    required: true,
  },
  category: {
    type: String,
    required: true,
    // e.g., 'Frontend Developer', 'Python', 'JavaScript'
  },
  modules: [moduleSchema],
  totalLessons: {
    type: Number,
    default: 0,
  },
  estimatedHours: {
    type: Number,
    default: 0,
  },
  tags: [String],
  icon: {
    type: String,
    default: '🚀',
  },
  color: {
    type: String,
    default: '#6366f1', // Indigo
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Auto-calculate totalLessons before saving
roadmapSchema.pre('save', function (next) {
  let count = 0;
  this.modules.forEach((mod) => {
    count += mod.lessons.length;
  });
  this.totalLessons = count;
  next();
});

module.exports = mongoose.model('Roadmap', roadmapSchema);