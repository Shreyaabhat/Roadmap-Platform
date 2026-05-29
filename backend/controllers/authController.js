const jwt    = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User   = require('../models/User');

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret_123', {
    expiresIn: '7d',
  });
}

// POST /api/auth/register
async function register(req, res) {
  try {
    console.log('\n=== REGISTER REQUEST ===');
    console.log('Body:', JSON.stringify(req.body));

    const { name, email, password, roleGoal, experienceLevel } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      });
    }

    // Check duplicate
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists',
      });
    }

    // Hash password manually (in case pre-save hook fails)
    const salt           = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name:            name.trim(),
      email:           email.toLowerCase().trim(),
      password:        hashedPassword,
      roleGoal:        roleGoal || 'Full Stack Developer',
      experienceLevel: experienceLevel || 'beginner',
    });

    await user.save();
    console.log('User saved with id:', user._id);

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        _id:             user._id,
        name:            user.name,
        email:           user.email,
        roleGoal:        user.roleGoal,
        experienceLevel: user.experienceLevel,
        currentRoadmapId: null,
      },
    });
  } catch (err) {
    console.error('REGISTER ERROR:', err);

    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists',
      });
    }
    if (err.name === 'ValidationError') {
      const msg = Object.values(err.errors).map(e => e.message).join('. ');
      return res.status(400).json({ success: false, message: msg });
    }

    return res.status(500).json({
      success: false,
      message: 'Server error: ' + err.message,
    });
  }
}

// POST /api/auth/login
async function login(req, res) {
  try {
    console.log('\n=== LOGIN REQUEST ===');
    console.log('Email:', req.body.email);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    }).select('+password');

    console.log('User found:', user ? 'YES' : 'NO');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(user._id);

    return res.json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        _id:              user._id,
        name:             user.name,
        email:            user.email,
        roleGoal:         user.roleGoal,
        experienceLevel:  user.experienceLevel,
        currentRoadmapId: user.currentRoadmapId || null,
      },
    });
  } catch (err) {
    console.error('LOGIN ERROR:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error: ' + err.message,
    });
  }
}

// GET /api/auth/me
async function getMe(req, res) {
  try {
    const user = await User.findById(req.user._id)
      .populate('currentRoadmapId', 'title icon color');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.json({ success: true, user });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

// PUT /api/auth/update-profile
async function updateProfile(req, res) {
  try {
    const { name, roleGoal, experienceLevel, currentRoadmapId } = req.body;
    const updates = {};
    if (name)                        updates.name             = name;
    if (roleGoal)                    updates.roleGoal         = roleGoal;
    if (experienceLevel)             updates.experienceLevel  = experienceLevel;
    if (currentRoadmapId !== undefined) updates.currentRoadmapId = currentRoadmapId;

    const user = await User.findByIdAndUpdate(
      req.user._id, updates, { new: true, runValidators: true }
    );
    return res.json({ success: true, message: 'Profile updated', user });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = { register, login, getMe, updateProfile };