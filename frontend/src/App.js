import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import RoadmapsPage from './pages/RoadmapsPage';
import RoadmapDetail from './pages/RoadmapDetail';
import LessonPage from './pages/LessonPage';
import ProgressPage from './pages/ProgressPage';
import AITools from './pages/AITools';
import Profile from './pages/Profile';
import Layout from './components/common/Layout';

// ── Loading screen ──────────────────────────────────────────
function LoadingScreen() {
  return (
    <div style={{
      minHeight:'100vh', background:'#030712',
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center', gap:'1rem'
    }}>
      <div style={{
        width:40, height:40,
        border:'3px solid #374151', borderTopColor:'#6366f1',
        borderRadius:'50%', animation:'spin 0.8s linear infinite'
      }} />
      <p style={{ color:'#6b7280', fontSize:'0.875rem' }}>Loading LearnPath...</p>
    </div>
  );
}

// ── Route guards ────────────────────────────────────────────
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
}

// ── Routes ──────────────────────────────────────────────────
function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login"    element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

      {/* Protected */}
      <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
      <Route path="/roadmaps"  element={<ProtectedRoute><Layout><RoadmapsPage /></Layout></ProtectedRoute>} />
      <Route path="/roadmaps/:id" element={<ProtectedRoute><Layout><RoadmapDetail /></Layout></ProtectedRoute>} />
      <Route path="/roadmaps/:roadmapId/modules/:moduleId/lessons/:lessonId"
             element={<ProtectedRoute><Layout><LessonPage /></Layout></ProtectedRoute>} />
      <Route path="/progress"  element={<ProtectedRoute><Layout><ProgressPage /></Layout></ProtectedRoute>} />
      <Route path="/ai-tools"  element={<ProtectedRoute><Layout><AITools /></Layout></ProtectedRoute>} />
      <Route path="/profile"   element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// ── App root ────────────────────────────────────────────────
function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;