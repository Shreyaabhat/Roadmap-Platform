import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { roadmapAPI, progressAPI, authAPI } from '../api/api';
import { ProgressBar, Badge, DifficultyBadge, Spinner } from '../components/common/UIComponents';

const S = {
  page:       { animation: 'fadeIn 0.3s ease' },
  crumb:      { display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#6b7280', marginBottom: '1.5rem', flexWrap: 'wrap' },
  crumbLink:  { color: '#6b7280', textDecoration: 'none' },
  card:       { background: '#111827', border: '1px solid #1f2937', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem' },
  headerRow:  { display: 'flex', alignItems: 'flex-start', gap: '1.5rem', flexWrap: 'wrap' },
  iconBox:    (color) => ({ width: 80, height: 80, borderRadius: '1rem', background: (color || '#6366f1') + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', flexShrink: 0 }),
  meta:       { display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.875rem', color: '#6b7280', margin: '0.75rem 0' },
  badgeRow:   { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' },
  h1:         { fontSize: '1.5rem', fontWeight: 700, color: '#fff', margin: 0 },
  desc:       { color: '#9ca3af', fontSize: '0.9rem', lineHeight: 1.6, margin: '0.5rem 0 0.75rem' },
  actionCol:  { display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: 160 },
  tagsRow:    { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' },
  tag:        { background: '#1f2937', color: '#9ca3af', fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: 9999 },
  sectionH2:  { fontSize: '1.1rem', fontWeight: 600, color: '#fff', marginBottom: '1rem' },
  moduleCard: { background: '#111827', border: '1px solid #1f2937', borderRadius: '1rem', marginBottom: '1rem', overflow: 'hidden' },
  modHeader:  { display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem 1.5rem', width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' },
  modIcon:    { fontSize: '1.5rem', width: 36, textAlign: 'center', flexShrink: 0 },
  modTitle:   { color: '#fff', fontWeight: 600, fontSize: '1rem', marginBottom: '0.25rem' },
  modLevel:   (level) => ({
    fontSize: '0.75rem', fontWeight: 500, textTransform: 'capitalize',
    color: level === 'beginner' ? '#34d399' : level === 'intermediate' ? '#fbbf24' : '#f87171',
  }),
  modMeta:    { display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.35rem' },
  modBarWrap: { flex: 1, maxWidth: 200, height: 6, background: '#1f2937', borderRadius: 9999, overflow: 'hidden' },
  modBarFill: (pct, color) => ({ height: '100%', width: pct + '%', background: color || '#6366f1', borderRadius: 9999, transition: 'width 0.7s ease' }),
  modCount:   { color: '#6b7280', fontSize: '0.75rem' },
  chevron:    (open) => ({ width: 20, height: 20, color: '#6b7280', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }),
  lessonList: { padding: '0 1.25rem 1.25rem', borderTop: '1px solid #1f2937', marginTop: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '1rem' },
  lessonRow:  (completed) => ({
    display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem',
    borderRadius: '0.75rem', textDecoration: 'none', transition: 'all 0.15s',
    background: completed ? 'rgba(16,185,129,0.05)' : 'transparent',
    border: completed ? '1px solid rgba(16,185,129,0.2)' : '1px solid transparent',
  }),
  lessonNum:  (completed) => ({
    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '0.75rem', fontWeight: 700,
    background: completed ? '#10b981' : '#1f2937',
    color:      completed ? '#fff'    : '#6b7280',
  }),
  lessonTitle:(completed) => ({ fontSize: '0.875rem', fontWeight: 500, color: completed ? '#6ee7b7' : '#d1d5db', marginBottom: '0.15rem' }),
  lessonSub:  { fontSize: '0.75rem', color: '#6b7280' },
  lessonRight:{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 },
  lessonTime: { fontSize: '0.75rem', color: '#6b7280' },
};

const RoadmapDetail = () => {
  const { id } = useParams();
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [roadmap,        setRoadmap]        = useState(null);
  const [progress,       setProgress]       = useState(null);
  const [loading,        setLoading]        = useState(true);
  const [expandedModule, setExpandedModule] = useState(null);
  const [settingActive,  setSettingActive]  = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [roadmapRes, progRes] = await Promise.all([
          roadmapAPI.getById(id),
          progressAPI.getRoadmapProgress(user._id, id),
        ]);
        setRoadmap(roadmapRes.data.roadmap);
        setProgress(progRes.data.progress);
        const rm        = roadmapRes.data.roadmap;
        const completed = progRes.data.progress?.completedLessons?.map(cl => cl.lessonId) || [];
        const firstIncomplete = rm.modules.find(m =>
          m.lessons.some(l => !completed.includes(l._id.toString()))
        );
        setExpandedModule(firstIncomplete?._id || rm.modules[0]?._id);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, user._id]);

  const isLessonComplete = (lessonId) =>
    progress?.completedLessons?.some(cl => cl.lessonId === lessonId.toString()) || false;

  const handleSetActiveRoadmap = async () => {
    setSettingActive(true);
    try {
      await authAPI.updateProfile({ currentRoadmapId: id });
      updateUser({ currentRoadmapId: id });
      alert('Roadmap set as active! Redirecting to dashboard...');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setSettingActive(false);
    }
  };

  const getModuleProgress = (mod) => {
    const completed = mod.lessons.filter(l => isLessonComplete(l._id)).length;
    return {
      completed,
      total:   mod.lessons.length,
      percent: mod.lessons.length > 0 ? Math.round((completed / mod.lessons.length) * 100) : 0,
    };
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 256 }}>
      <Spinner size="lg" />
    </div>
  );

  if (!roadmap) return (
    <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
      <p style={{ color: '#fff', marginBottom: '1rem' }}>Roadmap not found.</p>
      <Link to="/roadmaps" className="btn-primary">Back to Roadmaps</Link>
    </div>
  );

  const isActiveRoadmap =
    user.currentRoadmapId?.toString() === id ||
    user.currentRoadmapId?._id?.toString() === id;

  return (
    <div style={S.page}>

      {/* Breadcrumb */}
      <div style={S.crumb}>
        <Link to="/roadmaps" style={S.crumbLink}
          onMouseEnter={e => e.currentTarget.style.color = '#d1d5db'}
          onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}>
          Roadmaps
        </Link>
        <span>/</span>
        <span style={{ color: '#d1d5db' }}>{roadmap.title}</span>
      </div>

      {/* Header card */}
      <div style={S.card}>
        <div style={S.headerRow}>

          {/* Icon */}
          <div style={S.iconBox(roadmap.color)}>{roadmap.icon}</div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={S.badgeRow}>
              <h1 style={S.h1}>{roadmap.title}</h1>
              <Badge variant={roadmap.type === 'role' ? 'indigo' : 'purple'}>
                {roadmap.type === 'role' ? 'Role Path' : 'Language Path'}
              </Badge>
              {isActiveRoadmap && <Badge variant="green">✓ Active</Badge>}
            </div>
            <p style={S.desc}>{roadmap.description}</p>
            <div style={S.meta}>
              <span>📚 {roadmap.totalLessons} lessons</span>
              <span>📦 {roadmap.modules.length} modules</span>
              <span>⏱️ ~{roadmap.estimatedHours} hours</span>
            </div>
            <ProgressBar percentage={progress?.percentage || 0} size="md" />
          </div>

          {/* Action buttons */}
          <div style={S.actionCol}>
            {!isActiveRoadmap && (
              <button onClick={handleSetActiveRoadmap} className="btn-primary"
                disabled={settingActive}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                {settingActive ? <Spinner size="sm" /> : '🎯'} Set as Active
              </button>
            )}
            {progress?.percentage > 0 && (
              <button className="btn-secondary"
                style={{ fontSize: '0.875rem' }}
                onClick={() => {
                  const completedIds = progress?.completedLessons?.map(cl => cl.lessonId) || [];
                  for (const mod of roadmap.modules) {
                    for (const les of mod.lessons) {
                      if (!completedIds.includes(les._id.toString())) {
                        navigate(`/roadmaps/${id}/modules/${mod._id}/lessons/${les._id}`);
                        return;
                      }
                    }
                  }
                }}>
                ▶ Resume
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tags */}
      {roadmap.tags?.length > 0 && (
        <div style={S.tagsRow}>
          {roadmap.tags.map(tag => (
            <span key={tag} style={S.tag}>{tag}</span>
          ))}
        </div>
      )}

      {/* Curriculum */}
      <div>
        <h2 style={S.sectionH2}>Curriculum</h2>

        {roadmap.modules
          .sort((a, b) => a.order - b.order)
          .map((mod) => {
            const modProgress = getModuleProgress(mod);
            const isExpanded  = expandedModule === mod._id;

            return (
              <div key={mod._id} style={S.moduleCard}>

                {/* Module header button */}
                <button
                  onClick={() => setExpandedModule(isExpanded ? null : mod._id)}
                  style={S.modHeader}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(31,41,55,0.5)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}>

                  <span style={S.modIcon}>{mod.icon || '📘'}</span>

                  <div style={{ flex: 1 }}>
                    <p style={S.modTitle}>{mod.title}</p>
                    <div style={S.modMeta}>
                      <span style={S.modLevel(mod.level)}>{mod.level}</span>
                      <div style={S.modBarWrap}>
                        <div style={S.modBarFill(modProgress.percent, roadmap.color)} />
                      </div>
                      <span style={S.modCount}>{modProgress.completed}/{modProgress.total}</span>
                    </div>
                  </div>

                  {/* Chevron */}
                  <svg style={S.chevron(isExpanded)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Lessons list */}
                {isExpanded && (
                  <div style={S.lessonList}>
                    {mod.lessons
                      .sort((a, b) => a.order - b.order)
                      .map((lesson, idx) => {
                        const completed = isLessonComplete(lesson._id);
                        return (
                          <Link
                            key={lesson._id}
                            to={`/roadmaps/${id}/modules/${mod._id}/lessons/${lesson._id}`}
                            style={S.lessonRow(completed)}
                            onMouseEnter={e => {
                              if (!completed) {
                                e.currentTarget.style.background    = '#1f2937';
                                e.currentTarget.style.borderColor   = '#374151';
                              } else {
                                e.currentTarget.style.borderColor   = 'rgba(16,185,129,0.4)';
                              }
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.background  = completed ? 'rgba(16,185,129,0.05)' : 'transparent';
                              e.currentTarget.style.borderColor = completed ? 'rgba(16,185,129,0.2)'  : 'transparent';
                            }}
                          >
                            {/* Number / checkmark */}
                            <div style={S.lessonNum(completed)}>
                              {completed ? '✓' : idx + 1}
                            </div>

                            {/* Title + summary */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p style={S.lessonTitle(completed)}>{lesson.title}</p>
                              {lesson.summary && (
                                <p style={S.lessonSub}>{lesson.summary}</p>
                              )}
                            </div>

                            {/* Right side badges */}
                            <div style={S.lessonRight}>
                              <DifficultyBadge level={lesson.difficulty} />
                              <span style={S.lessonTime}>{lesson.estimatedTime}m</span>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RoadmapDetail;