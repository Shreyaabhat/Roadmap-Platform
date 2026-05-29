const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * @desc    Generate lesson notes using AI
 * @route   POST /api/ai/generate-notes
 * @access  Private
 */
const generateNotes = async (req, res) => {
  try {
    const { lessonTitle, topic, difficulty, context } = req.body;

    if (!lessonTitle) {
      return res.status(400).json({ success: false, message: 'Lesson title is required' });
    }

    const prompt = `You are an expert programming educator. Generate comprehensive, well-structured learning notes for the following lesson.

Lesson Title: "${lessonTitle}"
Topic/Technology: ${topic || lessonTitle}
Difficulty Level: ${difficulty || 'beginner'}
${context ? `Additional Context: ${context}` : ''}

Please provide:
1. **Overview** - A brief introduction (2-3 sentences)
2. **Key Concepts** - Main concepts with explanations
3. **Code Examples** - Practical, commented code snippets
4. **Best Practices** - 3-5 important tips
5. **Common Mistakes** - What to avoid
6. **Summary** - Key takeaways

Format with clear headings using markdown. Keep it educational, practical, and beginner-friendly when appropriate.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert programming educator who creates clear, concise, and practical learning materials. Use markdown formatting.',
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });

    const notes = completion.choices[0].message.content;

    res.json({
      success: true,
      notes,
      usage: completion.usage,
    });
  } catch (error) {
    console.error('AI generate notes error:', error);
    if (error.code === 'insufficient_quota') {
      return res.status(402).json({ success: false, message: 'OpenAI quota exceeded. Please check your API key.' });
    }
    res.status(500).json({ success: false, message: 'Failed to generate notes: ' + error.message });
  }
};

/**
 * @desc    Generate a custom roadmap based on user goal
 * @route   POST /api/ai/generate-roadmap
 * @access  Private
 */
const generateRoadmap = async (req, res) => {
  try {
    const { goal, experienceLevel, timeAvailable, specificInterests } = req.body;

    if (!goal) {
      return res.status(400).json({ success: false, message: 'Learning goal is required' });
    }

    const prompt = `You are a career and learning advisor for software developers. Create a structured learning roadmap.

Goal: "${goal}"
Current Experience Level: ${experienceLevel || 'beginner'}
Time Available: ${timeAvailable || '10 hours per week'}
${specificInterests ? `Specific Interests: ${specificInterests}` : ''}

Generate a JSON roadmap with this exact structure:
{
  "title": "Roadmap title",
  "description": "Brief description",
  "estimatedWeeks": number,
  "modules": [
    {
      "title": "Module title",
      "level": "beginner|intermediate|advanced",
      "description": "What you'll learn",
      "estimatedHours": number,
      "lessons": [
        {
          "title": "Lesson title",
          "summary": "One-line description",
          "estimatedMinutes": number
        }
      ]
    }
  ],
  "recommendations": ["tip1", "tip2", "tip3"]
}

Return ONLY valid JSON, no extra text.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a structured learning advisor. Always respond with valid JSON only.',
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 2000,
      temperature: 0.6,
    });

    let roadmapData;
    try {
      const content = completion.choices[0].message.content.trim();
      // Remove potential markdown code fences
      const cleaned = content.replace(/```json\n?|\n?```/g, '').trim();
      roadmapData = JSON.parse(cleaned);
    } catch (parseError) {
      return res.status(500).json({ success: false, message: 'Failed to parse AI response. Please try again.' });
    }

    res.json({ success: true, roadmap: roadmapData });
  } catch (error) {
    console.error('AI generate roadmap error:', error);
    res.status(500).json({ success: false, message: 'Failed to generate roadmap: ' + error.message });
  }
};

/**
 * @desc    Get AI-powered topic recommendations based on progress
 * @route   POST /api/ai/recommend
 * @access  Private
 */
const getRecommendations = async (req, res) => {
  try {
    const { completedTopics, currentLevel, goalRole, roadmapTitle } = req.body;

    const prompt = `You are a learning advisor. Based on completed topics, recommend next steps.

Roadmap: ${roadmapTitle}
Goal Role: ${goalRole || 'Software Developer'}
Current Level: ${currentLevel || 'beginner'}
Completed Topics: ${completedTopics && completedTopics.length > 0 ? completedTopics.join(', ') : 'None yet'}

Provide 3-5 personalized next topic recommendations with brief explanations why they're important now.

Return JSON: { "recommendations": [{"topic": "string", "reason": "string", "priority": "high|medium|low"}] }`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a personalized learning advisor. Return only JSON.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    let recommendations;
    try {
      const content = completion.choices[0].message.content.trim();
      const cleaned = content.replace(/```json\n?|\n?```/g, '').trim();
      recommendations = JSON.parse(cleaned);
    } catch {
      recommendations = { recommendations: [] };
    }

    res.json({ success: true, ...recommendations });
  } catch (error) {
    console.error('AI recommend error:', error);
    res.status(500).json({ success: false, message: 'Failed to get recommendations: ' + error.message });
  }
};

module.exports = { generateNotes, generateRoadmap, getRecommendations };