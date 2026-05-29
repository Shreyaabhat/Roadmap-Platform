import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { roadmapAPI, progressAPI } from '../api/api';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState(null);
  const [progress, setProgress] = useState(null);
  const [allProgress, setAllProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const progRes = await progressAPI.getUserProgress(user._id);
        const progList = progRes.data.progress || [];
        setAllProgress(progList);

        const rmId = user.currentRoadmapId
          ? (typeof user.currentRoadmapId === 'object' ? user.currentRoadmapId._id : user.currentRoadmapId)
          : null;

        if (rmId) {
          const rmRes = await roadmapAPI.getById(rmId);
          setRoadmap(rmRes.data.roadmap);
          const prog = progList.find(p => {
            const pid = typeof p.roadmapId === 'object' ? p.roadmapId._id : p.roadmapId;
            return pid && pid.toString() === rmId.toString();
          });
          setProgress(prog || null);
        }
      } catch (err) {
        console.error('Dashboard load error:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user]);

  const getNextLesson = () => {
    if (!roadmap || !progress) return null;
    const done = (progress.completedLessons || []).map(cl => cl.lessonId);
    for (const mod of roadmap.modules) {
      for (const les of mod.lessons) {
        if (!done.includes(les._id.toString())) {
          return { lesson: les, moduleId: mod._id, moduleTitle: mod.title };
        }
      }
    }
    return null;
  };

  const nextLesson = getNextLesson();
  const totalDone  = allProgress.reduce((s, p) => s + (p.completedLessons?.length || 0), 0);
  const rmId = user.currentRoadmapId
    ? (typeof user.currentRoadmapId === 'object' ? user.currentRoadmapId._id : user.currentRoadmapId)
    : null;

  const S = {
    page:     { animation: 'fadeIn 0.3s ease' },
    heading:  { fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem' },
    sub:      { color: '#9ca3af', marginBottom: '2rem' },
    statsRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '1rem', marginBottom: '2rem' },
    statCard: () => ({
      background: '#111827', border: '1px solid #1f2937', borderRadius: '1rem', padding: '1.25rem',
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    }),
    statIcon: (bg) => ({ fontSize: '1.25rem', background: bg, borderRadius: '0.75rem', padding: '0.5rem' }),
    mainGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '1.5rem' },
    card:     { background: '#111827', border: '1px solid #1f2937', borderRadius: '1rem', padding: '1.5rem' },
    modRow:   { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' },
    bar:      () => ({
      flex: 1, height: 6, background: '#1f2937', borderRadius: 9999, overflow: 'hidden',
      position: 'relative',
    }),
    fill:     (pct, color) => ({
      height: '100%', width: pct + '%', background: color || '#6366f1',
      borderRadius: 9999, transition: 'width 0.7s ease',
    }),
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300 }}>
      <div style={{ width: 40, height: 40, border: '3px solid #374151', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    </div>
  );

  return (
    <div style={S.page}>
      <h1 style={S.heading}>
        Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'},{' '}
        <span style={{ color: '#818cf8' }}>{user?.name?.split(' ')[0]}</span> 👋
      </h1>
      <p style={S.sub}>
        {progress?.percentage > 0 ? `You're ${progress.percentage}% through your current roadmap!` : "Pick a roadmap to start learning."}
      </p>

      {/* Stats */}
      <div style={S.statsRow}>
        {[
          { icon: '📚', label: 'Lessons Done',    value: totalDone,                     bg: 'rgba(99,102,241,0.15)' },
          { icon: '🎯', label: 'Current Progress', value: (progress?.percentage || 0) + '%', bg: 'rgba(16,185,129,0.15)' },
          { icon: '⚡', label: 'Experience',       value: user?.experienceLevel || 'beginner', bg: 'rgba(245,158,11,0.15)' },
          { icon: '🏆', label: 'Goal',             value: (user?.roleGoal || 'Developer').split(' ')[0], bg: 'rgba(139,92,246,0.15)' },
        ].map(s => (
          <div key={s.label} style={S.statCard()}>
            <div>
              <p style={{ color: '#9ca3af', fontSize: '0.78rem', marginBottom: '0.25rem' }}>{s.label}</p>
              <p style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', textTransform: 'capitalize' }}>{s.value}</p>
            </div>
            <div style={S.statIcon(s.bg)}>{s.icon}</div>
          </div>
        ))}
      </div>

      <div style={S.mainGrid}>
        {/* Current Roadmap */}
        <div style={{ gridColumn: 'span 2' }}>
          {roadmap ? (
            <div style={S.card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '0.75rem', background: (roadmap.color || '#6366f1') + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                    {roadmap.icon}
                  </div>
                  <div>
                    <p style={{ color: '#fff', fontWeight: 600, fontSize: '1.1rem' }}>{roadmap.title}</p>
                    <p style={{ color: '#6b7280', fontSize: '0.8rem' }}>{roadmap.totalLessons} lessons · {roadmap.estimatedHours}h</p>
                  </div>
                </div>
                <Link to={'/roadmaps/' + roadmap._id} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>View All</Link>
              </div>

              {/* Overall progress */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ color: '#9ca3af', fontSize: '0.8rem' }}>Overall Progress</span>
                  <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.8rem' }}>{progress?.percentage || 0}%</span>
                </div>
                <div style={{ height: 10, background: '#1f2937', borderRadius: 9999, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: (progress?.percentage || 0) + '%', background: 'linear-gradient(to right,#6366f1,#8b5cf6)', borderRadius: 9999, transition: 'width 0.7s ease' }} />
                </div>
              </div>

              {/* Modules */}
              <p style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>Modules</p>
              {roadmap.modules.map(mod => {
                const done = (progress?.completedLessons || []).filter(cl => cl.moduleId === mod._id.toString()).length;
                const pct  = mod.lessons.length > 0 ? Math.round((done / mod.lessons.length) * 100) : 0;
                return (
                  <div key={mod._id} style={S.modRow}>
                    <span style={{ fontSize: '1.1rem', width: 24 }}>{mod.icon || '📘'}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ color: '#d1d5db', fontSize: '0.875rem' }}>{mod.title}</span>
                        <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>{done}/{mod.lessons.length}</span>
                      </div>
                      <div style={S.bar()}>
                        <div style={S.fill(pct, roadmap.color)} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ ...S.card, textAlign: 'center', padding: '3rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗺️</div>
              <p style={{ color: '#fff', fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem' }}>No roadmap selected</p>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Pick a learning path to get started.</p>
              <Link to="/roadmaps" className="btn-primary">Browse Roadmaps</Link>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Resume */}
          {nextLesson && (
            <div style={{ ...S.card, background: 'linear-gradient(135deg,rgba(49,46,129,0.5),rgba(88,28,135,0.3))', borderColor: 'rgba(99,102,241,0.3)' }}>
              <p style={{ color: '#a5b4fc', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>▶ Resume Learning</p>
              <p style={{ color: '#fff', fontWeight: 600, marginBottom: '0.25rem' }}>{nextLesson.lesson.title}</p>
              <p style={{ color: '#9ca3af', fontSize: '0.8rem', marginBottom: '1rem' }}>{nextLesson.moduleTitle}</p>
              <button className="btn-primary" style={{ width: '100%' }}
                onClick={() => navigate('/roadmaps/' + rmId + '/modules/' + nextLesson.moduleId + '/lessons/' + nextLesson.lesson._id)}>
                Continue →
              </button>
            </div>
          )}

          {/* Quick actions */}
          <div style={S.card}>
            <p style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>Quick Actions</p>
            {[
              { to: '/roadmaps', icon: '🗺️', label: 'Browse Roadmaps', sub: 'Explore all paths' },
              { to: '/ai-tools', icon: '🤖', label: 'AI Tools',         sub: 'Generate notes & roadmaps' },
              { to: '/progress', icon: '📈', label: 'My Progress',      sub: 'View analytics' },
            ].map(a => (
              <Link key={a.to} to={a.to} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.625rem 0.5rem', borderRadius: '0.75rem', textDecoration: 'none', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#1f2937'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <span style={{ fontSize: '1.25rem' }}>{a.icon}</span>
                <div>
                  <p style={{ color: '#d1d5db', fontSize: '0.875rem', fontWeight: 500 }}>{a.label}</p>
                  <p style={{ color: '#6b7280', fontSize: '0.75rem' }}>{a.sub}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Profile card */}
          <div style={S.card}>
            <p style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>Your Profile</p>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff', fontSize: '1.1rem', flexShrink: 0 }}>
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>
              <div>
                <p style={{ color: '#fff', fontWeight: 500 }}>{user?.name}</p>
                <p style={{ color: '#6b7280', fontSize: '0.8rem' }}>{user?.email}</p>
              </div>
            </div>
            <div style={{ borderTop: '1px solid #1f2937', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              {[['Goal', user?.roleGoal], ['Level', user?.experienceLevel]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <span style={{ color: '#6b7280' }}>{k}</span>
                  <span style={{ color: '#d1d5db', textTransform: 'capitalize' }}>{v}</span>
                </div>
              ))}
            </div>
            <Link to="/profile" className="btn-secondary" style={{ display: 'block', textAlign: 'center', marginTop: '0.75rem', fontSize: '0.8rem', padding: '0.5rem' }}>Edit Profile</Link>
          </div>
        </div>
      </div>
    </div>
  );
}