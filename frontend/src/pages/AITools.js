import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { aiAPI } from '../api/api';

function renderMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/^### (.+)$/gm,  '<h3 style="color:#fff;font-size:1.05rem;font-weight:600;margin:1.25rem 0 0.5rem">$1</h3>')
    .replace(/^## (.+)$/gm,   '<h2 style="color:#fff;font-size:1.2rem;font-weight:600;margin:1.5rem 0 0.75rem">$1</h2>')
    .replace(/^# (.+)$/gm,    '<h1 style="color:#fff;font-size:1.4rem;font-weight:700;margin:1.5rem 0 0.75rem">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g,'<strong style="color:#fff;font-weight:600">$1</strong>')
    .replace(/`([^`\n]+)`/g,  '<code style="background:#1f2937;color:#a5b4fc;padding:2px 6px;border-radius:4px;font-family:monospace;font-size:0.85em">$1</code>')
    .replace(/```[\w]*\n([\s\S]*?)```/g,'<pre style="background:#0f172a;border:1px solid #374151;border-radius:10px;padding:1rem;overflow-x:auto;margin:1rem 0;font-family:monospace;font-size:0.85em;color:#e2e8f0;white-space:pre-wrap">$1</pre>')
    .replace(/^- (.+)$/gm,    '<li style="margin-left:1.25rem;margin-bottom:0.25rem;color:#d1d5db;list-style-type:disc">$1</li>')
    .replace(/\n\n/g,         '</p><p style="margin-bottom:1rem;color:#d1d5db;line-height:1.7">');
}

export default function AITools() {
  const { user } = useAuth();
  const [tab, setTab] = useState('notes');

  // Notes
  const [nForm, setNForm]   = useState({ lessonTitle: '', topic: '', difficulty: 'beginner' });
  const [notes, setNotes]   = useState('');
  const [nLoad, setNLoad]   = useState(false);
  const [nErr,  setNErr]    = useState('');

  // Roadmap
  const [rForm, setRForm]   = useState({ goal: '', experienceLevel: user?.experienceLevel || 'beginner', timeAvailable: '10 hours per week', specificInterests: '' });
  const [rMap,  setRMap]    = useState(null);
  const [rLoad, setRLoad]   = useState(false);
  const [rErr,  setRErr]    = useState('');

  // Recommendations
  const [recs,  setRecs]    = useState([]);
  const [rcLoad,setRcLoad]  = useState(false);
  const [rcErr, setRcErr]   = useState('');

  const S = {
    card:   { background: '#111827', border: '1px solid #1f2937', borderRadius: '1rem', padding: '1.5rem' },
    tab:    (a) => ({ padding: '0.5rem 1rem', borderRadius: '0.625rem', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500, whiteSpace: 'nowrap', transition: 'all 0.15s', background: a ? '#4f46e5' : 'transparent', color: a ? '#fff' : '#9ca3af' }),
    label:  { display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#d1d5db', marginBottom: '0.5rem' },
    err:    { background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.75rem', padding: '0.75rem', color: '#fca5a5', fontSize: '0.875rem', marginBottom: '1rem' },
    empty:  { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', textAlign: 'center' },
    spin:   { width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
    grid:   { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem' },
  };

  async function genNotes(e) {
    e.preventDefault();
    setNErr(''); setNLoad(true);
    try {
      const { data } = await aiAPI.generateNotes(nForm);
      setNotes(data.notes);
    } catch (err) {
      setNErr(err.response?.data?.message || 'Failed. Check your OpenAI API key in backend .env');
    } finally { setNLoad(false); }
  }

  async function genRoadmap(e) {
    e.preventDefault();
    setRErr(''); setRLoad(true);
    try {
      const { data } = await aiAPI.generateRoadmap(rForm);
      setRMap(data.roadmap);
    } catch (err) {
      setRErr(err.response?.data?.message || 'Failed. Check your OpenAI API key in backend .env');
    } finally { setRLoad(false); }
  }

  async function getRecs() {
    setRcErr(''); setRcLoad(true);
    try {
      const { data } = await aiAPI.getRecommendations({
        completedTopics: [],
        currentLevel:    user?.experienceLevel,
        goalRole:        user?.roleGoal,
        roadmapTitle:    user?.roleGoal,
      });
      setRecs(data.recommendations || []);
    } catch (err) {
      setRcErr(err.response?.data?.message || 'Failed. Check your OpenAI API key in backend .env');
    } finally { setRcLoad(false); }
  }

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>AI Tools ✨</h1>
        <p style={{ color: '#9ca3af', marginTop: '0.25rem' }}>Powered by OpenAI GPT — requires OPENAI_API_KEY in backend .env</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, background: '#111827', border: '1px solid #1f2937', borderRadius: '0.75rem', padding: 4, marginBottom: '2rem', width: 'fit-content', flexWrap: 'wrap' }}>
        {[['notes','📝 Generate Notes'],['roadmap','🗺️ Custom Roadmap'],['recommend','🎯 Recommendations']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={S.tab(tab === k)}>{l}</button>
        ))}
      </div>

      {/* ── Notes Tab ── */}
      {tab === 'notes' && (
        <div style={S.grid}>
          <div style={S.card}>
            <p style={{ color: '#fff', fontWeight: 600, marginBottom: '0.5rem' }}>📝 Generate Lesson Notes</p>
            <p style={{ color: '#9ca3af', fontSize: '0.8rem', marginBottom: '1.25rem' }}>Enter any topic to get detailed notes with code examples.</p>
            {nErr && <div style={S.err}>{nErr}</div>}
            <form onSubmit={genNotes} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={S.label}>Topic / Lesson Title *</label>
                <input className="input" placeholder="e.g. JavaScript Promises"
                  value={nForm.lessonTitle} onChange={e => setNForm({...nForm, lessonTitle: e.target.value})} required />
              </div>
              <div>
                <label style={S.label}>Technology</label>
                <input className="input" placeholder="e.g. React, Python, Node.js"
                  value={nForm.topic} onChange={e => setNForm({...nForm, topic: e.target.value})} />
              </div>
              <div>
                <label style={S.label}>Difficulty</label>
                <select className="input" value={nForm.difficulty} onChange={e => setNForm({...nForm, difficulty: e.target.value})}>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <button type="submit" className="btn-primary" disabled={nLoad}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                {nLoad ? <><div style={S.spin}/>Generating...</> : '✨ Generate Notes'}
              </button>
            </form>
          </div>

          <div style={{ ...S.card, minHeight: 200 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <p style={{ color: '#fff', fontWeight: 600 }}>Generated Notes</p>
              {notes && (
                <button className="btn-ghost" style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem' }}
                  onClick={() => navigator.clipboard.writeText(notes)}>📋 Copy</button>
              )}
            </div>
            {nLoad ? (
              <div style={S.empty}>
                <div style={{ width: 36, height: 36, border: '3px solid #374151', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginBottom: '1rem' }} />
                <p style={{ color: '#9ca3af' }}>AI is writing your notes...</p>
              </div>
            ) : notes ? (
              <div className="prose-dark" dangerouslySetInnerHTML={{ __html: renderMarkdown(notes) }} />
            ) : (
              <div style={S.empty}>
                <span style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>✨</span>
                <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Notes will appear here</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Roadmap Tab ── */}
      {tab === 'roadmap' && (
        <div style={S.grid}>
          <div style={S.card}>
            <p style={{ color: '#fff', fontWeight: 600, marginBottom: '0.5rem' }}>🗺️ Generate Custom Roadmap</p>
            <p style={{ color: '#9ca3af', fontSize: '0.8rem', marginBottom: '1.25rem' }}>Describe your goal and get a personalized learning path.</p>
            {rErr && <div style={S.err}>{rErr}</div>}
            <form onSubmit={genRoadmap} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={S.label}>Your Goal *</label>
                <textarea className="input" rows={3} style={{ resize: 'none' }}
                  placeholder="e.g. I want to become a React developer who can build full-stack apps"
                  value={rForm.goal} onChange={e => setRForm({...rForm, goal: e.target.value})} required />
              </div>
              <div>
                <label style={S.label}>Current Level</label>
                <select className="input" value={rForm.experienceLevel} onChange={e => setRForm({...rForm, experienceLevel: e.target.value})}>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label style={S.label}>Time Available</label>
                <select className="input" value={rForm.timeAvailable} onChange={e => setRForm({...rForm, timeAvailable: e.target.value})}>
                  <option>5 hours per week</option>
                  <option>10 hours per week</option>
                  <option>20 hours per week</option>
                  <option>Full time (40h/week)</option>
                </select>
              </div>
              <button type="submit" className="btn-primary" disabled={rLoad}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                {rLoad ? <><div style={S.spin}/>Generating...</> : '✨ Generate Roadmap'}
              </button>
            </form>
          </div>

          <div style={{ ...S.card, minHeight: 200 }}>
            {rLoad ? (
              <div style={S.empty}>
                <div style={{ width: 36, height: 36, border: '3px solid #374151', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginBottom: '1rem' }} />
                <p style={{ color: '#9ca3af' }}>Creating your roadmap...</p>
              </div>
            ) : rMap ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>{rMap.title}</h3>
                  <span style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 9999, padding: '0.15rem 0.625rem', fontSize: '0.75rem' }}>{rMap.estimatedWeeks}w</span>
                </div>
                <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '1.25rem' }}>{rMap.description}</p>
                {(rMap.modules || []).map((mod, i) => (
                  <div key={i} style={{ border: '1px solid #1f2937', borderRadius: '0.75rem', padding: '1rem', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <div style={{ width: 24, height: 24, background: 'rgba(99,102,241,0.2)', borderRadius: '0.375rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, color: '#a5b4fc' }}>{i+1}</div>
                      <p style={{ color: '#fff', fontWeight: 500, fontSize: '0.9rem' }}>{mod.title}</p>
                      <span style={{ color: '#6b7280', fontSize: '0.75rem', marginLeft: 'auto', textTransform: 'capitalize' }}>{mod.level} · {mod.estimatedHours}h</span>
                    </div>
                    {(mod.lessons || []).map((l, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0', fontSize: '0.8rem' }}>
                        <span style={{ color: '#6b7280', width: 16 }}>{j+1}.</span>
                        <span style={{ color: '#d1d5db' }}>{l.title}</span>
                        <span style={{ color: '#4b5563', marginLeft: 'auto' }}>{l.estimatedMinutes}m</span>
                      </div>
                    ))}
                  </div>
                ))}
                {rMap.recommendations?.length > 0 && (
                  <div style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '0.75rem', padding: '1rem', marginTop: '0.75rem' }}>
                    <p style={{ color: '#a5b4fc', fontWeight: 500, fontSize: '0.875rem', marginBottom: '0.5rem' }}>💡 AI Tips</p>
                    {rMap.recommendations.map((t, i) => <p key={i} style={{ color: '#9ca3af', fontSize: '0.8rem', marginBottom: '0.25rem' }}>• {t}</p>)}
                  </div>
                )}
              </div>
            ) : (
              <div style={S.empty}>
                <span style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🗺️</span>
                <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Your roadmap will appear here</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Recommendations Tab ── */}
      {tab === 'recommend' && (
        <div style={S.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{ color: '#fff', fontWeight: 600, fontSize: '1.05rem' }}>🎯 Personalized Recommendations</p>
              <p style={{ color: '#9ca3af', fontSize: '0.8rem', marginTop: '0.25rem' }}>AI suggestions based on your profile and career goal.</p>
            </div>
            <button className="btn-primary" onClick={getRecs} disabled={rcLoad}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {rcLoad ? <><div style={S.spin}/>Loading...</> : '✨ Get Recommendations'}
            </button>
          </div>

          {/* Profile summary */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '0.75rem', padding: '1rem', background: 'rgba(31,41,55,0.4)', borderRadius: '0.75rem', marginBottom: '1.5rem' }}>
            {[['Career Goal', user?.roleGoal], ['Experience', user?.experienceLevel], ['Name', user?.name]].map(([k,v]) => (
              <div key={k}>
                <p style={{ color: '#6b7280', fontSize: '0.75rem', marginBottom: '0.2rem' }}>{k}</p>
                <p style={{ color: '#d1d5db', fontSize: '0.875rem', fontWeight: 500, textTransform: 'capitalize' }}>{v}</p>
              </div>
            ))}
          </div>

          {rcErr && <div style={S.err}>{rcErr}</div>}

          {rcLoad ? (
            <div style={S.empty}>
              <div style={{ width: 36, height: 36, border: '3px solid #374151', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginBottom: '1rem' }} />
              <p style={{ color: '#9ca3af' }}>Analyzing your profile...</p>
            </div>
          ) : recs.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: '1rem' }}>
              {recs.map((r, i) => {
                const colors = { high: { bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', color: '#fca5a5' }, medium: { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', color: '#fcd34d' }, low: { bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', color: '#6ee7b7' } };
                const c = colors[r.priority] || colors.medium;
                return (
                  <div key={i} style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '0.75rem', padding: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <p style={{ color: '#fff', fontWeight: 500, fontSize: '0.9rem' }}>{r.topic}</p>
                      <span style={{ background: c.bg, border: '1px solid ' + c.border, color: c.color, borderRadius: 9999, padding: '0.1rem 0.5rem', fontSize: '0.7rem', fontWeight: 500, flexShrink: 0, marginLeft: '0.5rem' }}>{r.priority}</span>
                    </div>
                    <p style={{ color: '#9ca3af', fontSize: '0.8rem', lineHeight: 1.5 }}>{r.reason}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={S.empty}>
              <span style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🎯</span>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Click "Get Recommendations" to start</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}