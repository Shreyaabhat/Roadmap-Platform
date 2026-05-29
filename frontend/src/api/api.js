import axios from 'axios';

// Base API instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// Attach JWT token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('learnpath_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired tokens globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('learnpath_token');
      localStorage.removeItem('learnpath_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ─── Auth ──────────────────────────────────────────────────────────────────────
export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getMe: () => API.get('/auth/me'),
  updateProfile: (data) => API.put('/auth/update-profile', data),
};

// ─── Roadmaps ──────────────────────────────────────────────────────────────────
export const roadmapAPI = {
  getAll: () => API.get('/roadmaps'),
  getById: (id) => API.get(`/roadmaps/${id}`),
  getByType: (type) => API.get(`/roadmaps/type/${type}`),
};

// ─── Lessons ──────────────────────────────────────────────────────────────────
export const lessonAPI = {
  getById: (lessonId, roadmapId, moduleId) =>
    API.get(`/lessons/${lessonId}?roadmapId=${roadmapId}&moduleId=${moduleId}`),
};

// ─── Progress ──────────────────────────────────────────────────────────────────
export const progressAPI = {
  complete: (data) => API.post('/progress/complete', data),
  uncomplete: (data) => API.post('/progress/uncomplete', data),
  getUserProgress: (userId) => API.get(`/progress/${userId}`),
  getRoadmapProgress: (userId, roadmapId) => API.get(`/progress/${userId}/${roadmapId}`),
};

// ─── AI ────────────────────────────────────────────────────────────────────────
export const aiAPI = {
  generateNotes: (data) => API.post('/ai/generate-notes', data),
  generateRoadmap: (data) => API.post('/ai/generate-roadmap', data),
  getRecommendations: (data) => API.post('/ai/recommend', data),
};

export default API;