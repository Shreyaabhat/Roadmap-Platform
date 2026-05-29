const Lesson = require("../models/Lesson");

// GET lesson
exports.getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE lesson
exports.createLesson = async (req, res) => {
  try {
    const { title, content, resources, difficulty } = req.body;

    const lesson = new Lesson({
      title,
      content,
      resources,
      difficulty
    });

    const saved = await lesson.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};