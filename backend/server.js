require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');

const app = express();

app.use(cors({ origin: '*', methods: ['GET','POST','PUT','DELETE','OPTIONS'], allowedHeaders: ['Content-Type','Authorization'] }));
app.use(express.json());

// Log all requests
app.use((req, res, next) => { console.log(req.method, req.path); next(); });

// ── Health ────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// ── AUTH ──────────────────────────────────────────────────────
const jwt    = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User   = require('./models/User');

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, roleGoal, experienceLevel } = req.body;
    if (!name || !email || !password) return res.status(400).json({ success: false, message: 'Name, email, password required' });
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(400).json({ success: false, message: 'Email already exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email: email.toLowerCase(), password: hash, roleGoal: roleGoal || 'Full Stack Developer', experienceLevel: experienceLevel || 'beginner' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret123', { expiresIn: '7d' });
    res.status(201).json({ success: true, token, user: { _id: user._id, name: user.name, email: user.email, roleGoal: user.roleGoal, experienceLevel: user.experienceLevel, currentRoadmapId: null } });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) return res.status(401).json({ success: false, message: 'Invalid email or password' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ success: false, message: 'Invalid email or password' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret123', { expiresIn: '7d' });
    res.json({ success: true, token, user: { _id: user._id, name: user.name, email: user.email, roleGoal: user.roleGoal, experienceLevel: user.experienceLevel, currentRoadmapId: user.currentRoadmapId } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/auth/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'No token' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (err) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
});

app.put('/api/auth/update-profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    const { name, roleGoal, experienceLevel, currentRoadmapId } = req.body;
    const updates = {};
    if (name) updates.name = name;
    if (roleGoal) updates.roleGoal = roleGoal;
    if (experienceLevel) updates.experienceLevel = experienceLevel;
    if (currentRoadmapId !== undefined) updates.currentRoadmapId = currentRoadmapId;
    const user = await User.findByIdAndUpdate(decoded.id, updates, { new: true });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── ROADMAPS (raw MongoDB) ────────────────────────────────────
const { ObjectId } = require('mongodb');

app.get('/api/roadmaps', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const roadmaps = await db.collection('roadmaps')
      .find({})
      .project({ title:1, description:1, type:1, category:1, totalLessons:1, estimatedHours:1, tags:1, icon:1, color:1 })
      .toArray();
    console.log('Roadmaps found:', roadmaps.length);
    res.json({ success: true, count: roadmaps.length, roadmaps });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/roadmaps/type/:type', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const roadmaps = await db.collection('roadmaps')
      .find({ type: req.params.type })
      .project({ title:1, description:1, type:1, category:1, totalLessons:1, estimatedHours:1, tags:1, icon:1, color:1 })
      .toArray();
    res.json({ success: true, roadmaps });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/roadmaps/:id', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const roadmap = await db.collection('roadmaps').findOne({ _id: new ObjectId(req.params.id) });
    if (!roadmap) return res.status(404).json({ success: false, message: 'Roadmap not found' });
    res.json({ success: true, roadmap });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── LESSONS ───────────────────────────────────────────────────
app.get('/api/lessons/:lessonId', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    const { roadmapId, moduleId } = req.query;
    const db = mongoose.connection.db;
    const roadmap = await db.collection('roadmaps').findOne({ _id: new ObjectId(roadmapId) });
    if (!roadmap) return res.status(404).json({ success: false, message: 'Roadmap not found' });
    const mod = (roadmap.modules || []).find(m => m._id.toString() === moduleId);
    if (!mod) return res.status(404).json({ success: false, message: 'Module not found' });
    const lesson = (mod.lessons || []).find(l => l._id.toString() === req.params.lessonId);
    if (!lesson) return res.status(404).json({ success: false, message: 'Lesson not found' });
    const allLessons = [];
    (roadmap.modules || []).forEach(m => (m.lessons || []).forEach(l => allLessons.push({ lessonId: l._id.toString(), moduleId: m._id.toString(), lessonTitle: l.title })));
    const idx = allLessons.findIndex(l => l.lessonId === req.params.lessonId);
    res.json({ success: true, lesson, module: { _id: mod._id, title: mod.title, level: mod.level }, roadmap: { _id: roadmap._id, title: roadmap.title }, navigation: { prevLesson: idx > 0 ? allLessons[idx-1] : null, nextLesson: idx < allLessons.length-1 ? allLessons[idx+1] : null, currentIndex: idx+1, total: allLessons.length } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── PROGRESS ──────────────────────────────────────────────────
const Progress = require('./models/Progress');

app.post('/api/progress/complete', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    const userId = decoded.id;
    const { roadmapId, moduleId, lessonId } = req.body;
    const db = mongoose.connection.db;
    const roadmap = await db.collection('roadmaps').findOne({ _id: new ObjectId(roadmapId) });
    let total = 0;
    (roadmap?.modules || []).forEach(m => { total += (m.lessons || []).length; });
    let progress = await Progress.findOne({ userId, roadmapId });
    if (!progress) progress = await Progress.create({ userId, roadmapId, completedLessons: [], percentage: 0 });
    const done = progress.completedLessons.some(cl => cl.lessonId === lessonId);
    if (!done) progress.completedLessons.push({ lessonId, moduleId, completedAt: new Date() });
    progress.percentage = Math.round((progress.completedLessons.length / (total || 1)) * 100);
    progress.lastAccessedAt = new Date();
    await progress.save();
    res.json({ success: true, message: 'Lesson complete!', progress: { completedLessons: progress.completedLessons, percentage: progress.percentage, totalCompleted: progress.completedLessons.length, totalLessons: total } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/progress/uncomplete', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    const { roadmapId, lessonId } = req.body;
    const db = mongoose.connection.db;
    const roadmap = await db.collection('roadmaps').findOne({ _id: new ObjectId(roadmapId) });
    let total = 0;
    (roadmap?.modules || []).forEach(m => { total += (m.lessons || []).length; });
    const progress = await Progress.findOne({ userId: decoded.id, roadmapId });
    if (!progress) return res.status(404).json({ success: false, message: 'Progress not found' });
    progress.completedLessons = progress.completedLessons.filter(cl => cl.lessonId !== lessonId);
    progress.percentage = Math.round((progress.completedLessons.length / (total || 1)) * 100);
    await progress.save();
    res.json({ success: true, progress });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/progress/:userId', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    if (req.params.userId !== decoded.id) return res.status(403).json({ success: false, message: 'Forbidden' });
    const progressList = await Progress.find({ userId: decoded.id });
    const db = mongoose.connection.db;
    const enriched = await Promise.all(progressList.map(async p => {
      try {
        const rm = await db.collection('roadmaps').findOne({ _id: new ObjectId(p.roadmapId) }, { projection: { title:1, icon:1, color:1, totalLessons:1, type:1 } });
        return { ...p.toObject(), roadmapId: rm || p.roadmapId };
      } catch { return p.toObject(); }
    }));
    res.json({ success: true, progress: enriched });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/progress/:userId/:roadmapId', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    if (req.params.userId !== decoded.id) return res.status(403).json({ success: false, message: 'Forbidden' });
    const progress = await Progress.findOne({ userId: decoded.id, roadmapId: req.params.roadmapId });
    res.json({ success: true, progress: progress || { completedLessons: [], percentage: 0 } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── AI ────────────────────────────────────────────────────────
const OpenAI = require('openai');

app.post('/api/ai/generate-notes', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    if (!process.env.OPENAI_API_KEY) return res.status(400).json({ success: false, message: 'OPENAI_API_KEY not set in .env file' });
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const { lessonTitle, topic, difficulty } = req.body;
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an expert programming educator. Use markdown formatting.' },
        { role: 'user', content: 'Generate comprehensive lesson notes for: "' + lessonTitle + '"\nTopic: ' + (topic||lessonTitle) + '\nDifficulty: ' + (difficulty||'beginner') + '\n\nInclude: Overview, Key Concepts, Code Examples, Best Practices, Common Mistakes, Summary.' }
      ],
      max_tokens: 1500,
    });
    res.json({ success: true, notes: completion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/ai/generate-roadmap', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    if (!process.env.OPENAI_API_KEY) return res.status(400).json({ success: false, message: 'OPENAI_API_KEY not set in .env file' });
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const { goal, experienceLevel, timeAvailable } = req.body;
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Return only valid JSON, no markdown.' },
        { role: 'user', content: 'Create a learning roadmap JSON for: "' + goal + '"\nLevel: ' + (experienceLevel||'beginner') + '\nTime: ' + (timeAvailable||'10h/week') + '\nFormat: {"title":"...","description":"...","estimatedWeeks":N,"modules":[{"title":"...","level":"...","estimatedHours":N,"description":"...","lessons":[{"title":"...","summary":"...","estimatedMinutes":N}]}],"recommendations":["..."]}' }
      ],
      max_tokens: 2000,
    });
    let roadmap;
    try { roadmap = JSON.parse(completion.choices[0].message.content.replace(/```json|```/g,'')); } catch { roadmap = {}; }
    res.json({ success: true, roadmap });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/ai/recommend', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    if (!process.env.OPENAI_API_KEY) return res.status(400).json({ success: false, message: 'OPENAI_API_KEY not set in .env file' });
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const { goalRole, currentLevel } = req.body;
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Return only valid JSON.' },
        { role: 'user', content: 'Give 5 learning recommendations for a ' + (currentLevel||'beginner') + ' who wants to become a ' + (goalRole||'developer') + '. Format: {"recommendations":[{"topic":"...","reason":"...","priority":"high|medium|low"}]}' }
      ],
      max_tokens: 800,
    });
    let data;
    try { data = JSON.parse(completion.choices[0].message.content.replace(/```json|```/g,'')); } catch { data = { recommendations: [] }; }
    res.json({ success: true, ...data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── 404 ───────────────────────────────────────────────────────
app.use((req, res) => { res.status(404).json({ success: false, message: 'Not found' }); });
app.use((err, req, res, next) => { res.status(500).json({ success: false, message: err.message }); });

// ── Start ─────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected, db:', mongoose.connection.db.databaseName);
    app.listen(PORT, () => console.log('🚀 Server on http://localhost:' + PORT));
  })
  .catch(err => { console.error('❌ DB Error:', err.message); process.exit(1); });

module.exports = app;