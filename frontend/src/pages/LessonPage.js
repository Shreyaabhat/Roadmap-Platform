import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { lessonAPI, progressAPI, aiAPI } from '../api/api';
import { DifficultyBadge, Badge, Spinner, Toast } from '../components/common/UIComponents';

// ── Markdown renderer ────────────────────────────────────────
function renderMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/^### (.+)$/gm,  '<h3 style="color:#fff;font-size:1.05rem;font-weight:600;margin:1.25rem 0 0.5rem">$1</h3>')
    .replace(/^## (.+)$/gm,   '<h2 style="color:#fff;font-size:1.2rem;font-weight:600;margin:1.5rem 0 0.75rem">$1</h2>')
    .replace(/^# (.+)$/gm,    '<h1 style="color:#fff;font-size:1.4rem;font-weight:700;margin:1.5rem 0 0.75rem">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g,'<strong style="color:#fff;font-weight:600">$1</strong>')
    .replace(/\*(.+?)\*/g,    '<em style="color:#d1d5db;font-style:italic">$1</em>')
    .replace(/`([^`\n]+)`/g,  '<code style="background:#1f2937;color:#a5b4fc;padding:2px 6px;border-radius:4px;font-family:monospace;font-size:0.85em">$1</code>')
    .replace(/```[\w]*\n([\s\S]*?)```/g, '<pre style="background:#0f172a;border:1px solid #374151;border-radius:10px;padding:1rem;overflow-x:auto;margin:1rem 0;font-family:monospace;font-size:0.85em;color:#e2e8f0">$1</pre>')
    .replace(/^- (.+)$/gm,    '<li style="margin-left:1.25rem;margin-bottom:0.25rem;color:#d1d5db;list-style-type:disc">$1</li>')
    .replace(/^\d+\. (.+)$/gm,'<li style="margin-left:1.25rem;margin-bottom:0.25rem;color:#d1d5db;list-style-type:decimal">$1</li>')
    .replace(/\n\n/g,         '</p><p style="margin-bottom:1rem;color:#d1d5db;line-height:1.7">')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener" style="color:#818cf8;text-decoration:underline">$1</a>');
}

const RESOURCE_ICONS = { article:'📄', video:'🎬', docs:'📖', course:'🎓' };

// ── Shared inline styles ─────────────────────────────────────
const S = {
  page:    { maxWidth:900, margin:'0 auto', animation:'fadeIn 0.3s ease' },
  crumb:   { display:'flex', alignItems:'center', gap:'0.5rem', flexWrap:'wrap', fontSize:'0.875rem', color:'#6b7280', marginBottom:'1.5rem' },
  crumbLink:{ color:'#6b7280', textDecoration:'none' },
  navBar:  { display:'flex', alignItems:'center', gap:'0.75rem', background:'#111827', border:'1px solid #1f2937', borderRadius:'0.75rem', padding:'0.75rem 1rem', marginBottom:'1.5rem' },
  tabRow:  { display:'flex', gap:'4px', background:'#111827', border:'1px solid #1f2937', borderRadius:'0.75rem', padding:'4px', marginBottom:'1.5rem', overflowX:'auto' },
  tabBtn:  (active) => ({
    padding:'0.5rem 1rem', borderRadius:'0.625rem', border:'none', cursor:'pointer',
    fontSize:'0.8rem', fontWeight:500, whiteSpace:'nowrap', transition:'all 0.15s',
    background: active ? '#4f46e5' : 'transparent',
    color:      active ? '#fff'    : '#9ca3af',
  }),
  card:    { background:'#111827', border:'1px solid #1f2937', borderRadius:'1rem', padding:'1.5rem', marginBottom:'1.5rem' },
  cardRow: { display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'1rem', flexWrap:'wrap' },
  h1:      { fontSize:'1.4rem', fontWeight:700, color:'#fff', margin:'0.5rem 0 0' },
  center:  { display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'3rem 1rem', textAlign:'center' },
  navBtns: { display:'flex', alignItems:'center', justifyContent:'space-between', gap:'1rem', marginTop:'1.5rem' },
  resRow:  { display:'flex', alignItems:'center', gap:'1rem', padding:'1rem', background:'rgba(31,41,55,0.5)', borderRadius:'0.75rem', border:'1px solid transparent', textDecoration:'none', transition:'all 0.15s', marginBottom:'0.75rem' },
  taskRow: { display:'flex', alignItems:'flex-start', gap:'1rem', padding:'1rem', background:'rgba(31,41,55,0.5)', borderRadius:'0.75rem', border:'1px solid #1f2937', marginBottom:'0.75rem' },
  taskNum: { width:28, height:28, flexShrink:0, borderRadius:'50%', background:'rgba(99,102,241,0.15)', border:'1px solid rgba(99,102,241,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.75rem', fontWeight:700, color:'#a5b4fc' },
  completedBox: { display:'flex', alignItems:'center', gap:'0.5rem', background:'rgba(16,185,129,0.1)', border:'1px solid rgba(16,185,129,0.3)', borderRadius:'0.75rem', padding:'0.5rem 1rem' },
};

export default function LessonPage() {
  const { roadmapId, moduleId, lessonId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [lesson,      setLesson]      = useState(null);
  const [moduleInfo,  setModuleInfo]  = useState(null);
  const [roadmapInfo, setRoadmapInfo] = useState(null);
  const [navigation,  setNavigation]  = useState(null);
  const [progress,    setProgress]    = useState(null);
  const [loading,     setLoading]     = useState(true);
  const [aiNotes,     setAiNotes]     = useState('');
  const [aiLoading,   setAiLoading]   = useState(false);
  const [completing,  setCompleting]  = useState(false);
  const [toast,       setToast]       = useState(null);
  const [activeTab,   setActiveTab]   = useState('content');

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const [lessonRes, progRes] = await Promise.all([
          lessonAPI.getById(lessonId, roadmapId, moduleId),
          progressAPI.getRoadmapProgress(user._id, roadmapId),
        ]);
        setLesson(lessonRes.data.lesson);
        setModuleInfo(lessonRes.data.module);
        setRoadmapInfo(lessonRes.data.roadmap);
        setNavigation(lessonRes.data.navigation);
        setProgress(progRes.data.progress);
      } catch (err) {
        showToast('Failed to load lesson: ' + (err.response?.data?.message || err.message), 'error');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [lessonId, roadmapId, moduleId, user._id, showToast]);

  const isCompleted = progress?.completedLessons?.some(cl => cl.lessonId === lessonId) || false;

  async function handleComplete() {
    if (completing) return;
    setCompleting(true);
    try {
      const { data } = await progressAPI.complete({ roadmapId, moduleId, lessonId });
      setProgress(prev => ({
        ...prev,
        completedLessons: data.progress.completedLessons,
        percentage: data.progress.percentage,
      }));
      showToast('Lesson completed! Great work!', 'success');
    } catch (err) {
      showToast('Failed to mark complete: ' + (err.response?.data?.message || err.message), 'error');
    } finally {
      setCompleting(false);
    }
  }

  async function handleGenerateAINotes() {
    setAiLoading(true);
    setActiveTab('ai');
    try {
      const { data } = await aiAPI.generateNotes({
        lessonTitle: lesson.title,
        topic:       lesson.title,
        difficulty:  lesson.difficulty,
        context:     moduleInfo ? moduleInfo.title : '',
      });
      setAiNotes(data.notes);
      showToast('AI notes generated!', 'info');
    } catch (err) {
      showToast(err.response?.data?.message || 'AI generation failed. Check your API key.', 'error');
    } finally {
      setAiLoading(false);
    }
  }

  function navigateLesson(target) {
    if (!target) return;
    navigate('/roadmaps/' + roadmapId + '/modules/' + target.moduleId + '/lessons/' + target.lessonId);
  }

  // ── Loading state ──────────────────────────────────────────
  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:256 }}>
      <Spinner size="lg" />
    </div>
  );

  // ── Not found ──────────────────────────────────────────────
  if (!lesson) return (
    <div style={{ textAlign:'center', padding:'5rem 1rem' }}>
      <p style={{ color:'#fff', marginBottom:'1rem' }}>Lesson not found.</p>
      <Link to={'/roadmaps/' + roadmapId} className="btn-primary">Back to Roadmap</Link>
    </div>
  );

  const navPct = navigation ? Math.round((navigation.currentIndex / navigation.total) * 100) : 0;

  return (
    <div style={S.page}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Breadcrumb */}
      <div style={S.crumb}>
        <Link to="/roadmaps" style={S.crumbLink}>Roadmaps</Link>
        <span>/</span>
        <Link to={'/roadmaps/' + roadmapId} style={S.crumbLink}>{roadmapInfo ? roadmapInfo.title : '...'}</Link>
        <span>/</span>
        <span style={{ color:'#9ca3af' }}>{moduleInfo ? moduleInfo.title : '...'}</span>
        <span>/</span>
        <span style={{ color:'#d1d5db', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:200 }}>{lesson.title}</span>
      </div>

      {/* Progress tracker */}
      {navigation && (
        <div style={S.navBar}>
          <span style={{ fontSize:'0.75rem', color:'#6b7280', whiteSpace:'nowrap' }}>
            {navigation.currentIndex} / {navigation.total}
          </span>
          <div style={{ flex:1, height:6, background:'#1f2937', borderRadius:9999, overflow:'hidden' }}>
            <div style={{ height:'100%', width: navPct + '%', background:'linear-gradient(to right,#6366f1,#8b5cf6)', borderRadius:9999, transition:'width 0.5s ease' }} />
          </div>
          {isCompleted && <Badge variant="green">✓ Completed</Badge>}
        </div>
      )}

      {/* Lesson header card */}
      <div style={S.card}>
        <div style={S.cardRow}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', flexWrap:'wrap', marginBottom:'0.5rem' }}>
              <Badge variant="indigo">{moduleInfo ? moduleInfo.title : ''}</Badge>
              <DifficultyBadge level={lesson.difficulty} />
              <span style={{ fontSize:'0.75rem', color:'#6b7280' }}>⏱️ {lesson.estimatedTime} min</span>
            </div>
            <h1 style={S.h1}>{lesson.title}</h1>
            {lesson.summary && <p style={{ color:'#9ca3af', marginTop:'0.5rem', fontSize:'0.9rem' }}>{lesson.summary}</p>}
          </div>

          {!isCompleted ? (
            <button onClick={handleComplete} className="btn-primary" disabled={completing}
              style={{ display:'flex', alignItems:'center', gap:'0.5rem', flexShrink:0 }}>
              {completing ? <Spinner size="sm" /> : '✓'} Mark Complete
            </button>
          ) : (
            <div style={S.completedBox}>
              <span style={{ color:'#34d399', fontSize:'0.875rem', fontWeight:500 }}>✓ Completed</span>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div style={S.tabRow}>
        {[
          { key:'content',   label:'📝 Content' },
          { key:'resources', label:'🔗 Resources (' + (lesson.resources ? lesson.resources.length : 0) + ')' },
          { key:'tasks',     label:'✅ Tasks (' + (lesson.tasks ? lesson.tasks.length : 0) + ')' },
          { key:'ai',        label:'🤖 AI Notes' },
        ].map(({ key, label }) => (
          <button key={key} onClick={() => setActiveTab(key)} style={S.tabBtn(activeTab === key)}>
            {label}
          </button>
        ))}
      </div>

      {/* Tab content card */}
      <div style={{ ...S.card, minHeight:200 }}>

        {/* Content tab */}
        {activeTab === 'content' && (
          lesson.content ? (
            <div className="prose-dark"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(lesson.content) }} />
          ) : (
            <div style={S.center}>
              <div style={{ fontSize:'2.5rem', marginBottom:'1rem' }}>🤖</div>
              <p style={{ color:'#fff', fontWeight:500, marginBottom:'0.5rem' }}>No static content for this lesson</p>
              <p style={{ color:'#9ca3af', fontSize:'0.875rem', marginBottom:'1.5rem', maxWidth:360 }}>
                Generate AI-powered notes to get detailed explanations, code examples, and best practices.
              </p>
              <button onClick={handleGenerateAINotes} className="btn-primary"
                disabled={aiLoading} style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
                {aiLoading ? <Spinner size="sm" /> : '✨'} Generate AI Notes
              </button>
            </div>
          )
        )}

        {/* Resources tab */}
        {activeTab === 'resources' && (
          <div>
            <p style={{ color:'#fff', fontWeight:600, marginBottom:'1rem' }}>Learning Resources</p>
            {lesson.resources && lesson.resources.length > 0 ? (
              lesson.resources.map((res, i) => (
                <a key={i} href={res.url} target="_blank" rel="noopener noreferrer" style={S.resRow}
                  onMouseEnter={e => { e.currentTarget.style.background='rgba(31,41,55,0.9)'; e.currentTarget.style.borderColor='#374151'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='rgba(31,41,55,0.5)'; e.currentTarget.style.borderColor='transparent'; }}
                >
                  <span style={{ fontSize:'1.5rem' }}>{RESOURCE_ICONS[res.type] || '🔗'}</span>
                  <div style={{ flex:1, overflow:'hidden' }}>
                    <p style={{ color:'#e5e7eb', fontWeight:500, fontSize:'0.9rem' }}>{res.title}</p>
                    <p style={{ color:'#6b7280', fontSize:'0.75rem', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{res.url}</p>
                  </div>
                  <Badge variant="default">{res.type}</Badge>
                </a>
              ))
            ) : (
              <p style={{ color:'#9ca3af', fontSize:'0.875rem', textAlign:'center', padding:'2rem' }}>No resources for this lesson yet.</p>
            )}
          </div>
        )}

        {/* Tasks tab */}
        {activeTab === 'tasks' && (
          <div>
            <p style={{ color:'#fff', fontWeight:600, marginBottom:'1rem' }}>Practice Tasks</p>
            {lesson.tasks && lesson.tasks.length > 0 ? (
              lesson.tasks.map((task, i) => (
                <div key={i} style={S.taskRow}>
                  <div style={S.taskNum}>{i + 1}</div>
                  <p style={{ color:'#d1d5db', fontSize:'0.875rem', flex:1, lineHeight:1.6 }}>{task.description}</p>
                </div>
              ))
            ) : (
              <p style={{ color:'#9ca3af', fontSize:'0.875rem', textAlign:'center', padding:'2rem' }}>No tasks for this lesson yet.</p>
            )}
          </div>
        )}

        {/* AI Notes tab */}
        {activeTab === 'ai' && (
          <div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1rem' }}>
              <p style={{ color:'#fff', fontWeight:600 }}>AI-Generated Notes</p>
              <button onClick={handleGenerateAINotes} className="btn-secondary"
                disabled={aiLoading} style={{ display:'flex', alignItems:'center', gap:'0.5rem', fontSize:'0.8rem' }}>
                {aiLoading ? <Spinner size="sm" /> : '✨'}
                {aiNotes ? 'Regenerate' : 'Generate Notes'}
              </button>
            </div>
            {aiLoading ? (
              <div style={S.center}>
                <Spinner size="lg" />
                <p style={{ color:'#9ca3af', fontSize:'0.875rem', marginTop:'1rem' }}>AI is generating your notes...</p>
              </div>
            ) : aiNotes ? (
              <div className="prose-dark" dangerouslySetInnerHTML={{ __html: renderMarkdown(aiNotes) }} />
            ) : (
              <div style={S.center}>
                <div style={{ fontSize:'2.5rem', marginBottom:'1rem' }}>✨</div>
                <p style={{ color:'#fff', fontWeight:500, marginBottom:'0.5rem' }}>Generate AI-powered notes</p>
                <p style={{ color:'#9ca3af', fontSize:'0.875rem', marginBottom:'1.5rem', maxWidth:360 }}>
                  Get instant explanations, code examples, and best practices powered by GPT.
                </p>
                <button onClick={handleGenerateAINotes} className="btn-primary"
                  style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
                  ✨ Generate Notes
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Prev / Next navigation */}
      <div style={S.navBtns}>
        <button onClick={() => navigateLesson(navigation ? navigation.prevLesson : null)}
          disabled={!navigation || !navigation.prevLesson}
          className="btn-secondary"
          style={{ display:'flex', alignItems:'center', gap:'0.5rem', opacity: (!navigation || !navigation.prevLesson) ? 0.4 : 1 }}>
          ← Previous
        </button>

        <Link to={'/roadmaps/' + roadmapId} className="btn-ghost" style={{ fontSize:'0.875rem' }}>
          View Roadmap
        </Link>

        {navigation && navigation.nextLesson ? (
          <button onClick={() => navigateLesson(navigation.nextLesson)}
            className="btn-primary" style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
            Next →
          </button>
        ) : (
          <button className="btn-primary"
            style={{ background:'#059669', display:'flex', alignItems:'center', gap:'0.5rem' }}>
            🎉 Complete!
          </button>
        )}
      </div>
    </div>
  );
}