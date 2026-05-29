const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  roadmapId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Roadmap',
    required: true,
  },
  completedLessons: [
    {
      lessonId: { type: String, required: true }, // Mongoose subdoc _id as string
      moduleId: { type: String, required: true },
      completedAt: { type: Date, default: Date.now },
    },
  ],
  percentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  lastAccessedAt: {
    type: Date,
    default: Date.now,
  },
  startedAt: {
    type: Date,
    default: Date.now,
  },
  streak: {
    type: Number,
    default: 0,
  },
  totalTimeSpent: {
    type: Number, // minutes
    default: 0,
  },
});

// Ensure one progress document per user per roadmap
progressSchema.index({ userId: 1, roadmapId: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);