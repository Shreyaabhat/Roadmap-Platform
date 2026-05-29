import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { roadmapAPI } from '../api/api';

export default function RoadmapsPage() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [filter,   setFilter]   = useState('all');
  const [search,   setSearch]   = useState('');
  const [error,    setError]    = useState('');

  useEffect(() => {
    roadmapAPI.getAll()
      .then(res => setRoadmaps(res.data.roadmaps || []))
      .catch(err => setError('Failed to load roadmaps: ' + err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = roadmaps.filter(r => {
    const matchFilter = filter === 'all' || r.type === filter;
    const matchSearch = !search ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      (r.tags || []).some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchFilter && matchSearch;
  });

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>Learning Roadmaps</h1>
        <p style={{ color: '#9ca3af', marginTop: '0.25rem' }}>Choose a structured path to reach your career goal</p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', background: '#111827', border: '1px solid #1f2937', borderRadius: '0.75rem', padding: 4, gap: 4 }}>
          {[['all','All'],['role','By Role'],['language','By Language']].map(([k, l]) => (
            <button key={k} onClick={() => setFilter(k)} style={{
              padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer',
              fontSize: '0.8rem', fontWeight: 500, transition: 'all 0.15s',
              background: filter === k ? '#4f46e5' : 'transparent',
              color:      filter === k ? '#fff'    : '#9ca3af',
            }}>{l}</button>
          ))}
        </div>
        <div style={{ flex: 1, position: 'relative', minWidth: 200 }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }}>🔍</span>
          <input className="input" style={{ paddingLeft: '2.25rem' }}
            placeholder="Search roadmaps..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.75rem', padding: '1rem', color: '#fca5a5', marginBottom: '1.5rem' }}>
          {error} — Make sure backend is running and database is seeded.
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1.5rem' }}>
          {[1,2,3,4,5].map(i => (
            <div key={i} className="shimmer" style={{ height: 220, borderRadius: '1rem' }} />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
          <p style={{ color: '#fff', fontWeight: 600 }}>No roadmaps found</p>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '0.5rem' }}>
            {roadmaps.length === 0 ? 'Database may not be seeded. Run: node seed/seedData.js' : 'Try a different search or filter'}
          </p>
        </div>
      )}

      {/* Grid */}
      {!loading && filtered.length > 0 && (
        <>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>{filtered.length} roadmap{filtered.length !== 1 ? 's' : ''}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1.5rem' }}>
            {filtered.map(r => (
              <Link key={r._id} to={'/roadmaps/' + r._id} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: '#111827', border: '1px solid #1f2937', borderRadius: '1rem', padding: '1.5rem',
                  height: '100%', display: 'flex', flexDirection: 'column', transition: 'all 0.2s', cursor: 'pointer',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#374151'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#1f2937'; e.currentTarget.style.transform = 'translateY(0)'; }}>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ width: 52, height: 52, borderRadius: '0.875rem', background: (r.color || '#6366f1') + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', border: '1px solid ' + (r.color || '#6366f1') + '30' }}>
                      {r.icon}
                    </div>
                    <span style={{ background: r.type === 'role' ? 'rgba(99,102,241,0.15)' : 'rgba(139,92,246,0.15)', color: r.type === 'role' ? '#a5b4fc' : '#d8b4fe', border: '1px solid ' + (r.type === 'role' ? 'rgba(99,102,241,0.3)' : 'rgba(139,92,246,0.3)'), borderRadius: 9999, padding: '0.2rem 0.75rem', fontSize: '0.7rem', fontWeight: 500, height: 'fit-content' }}>
                      {r.type === 'role' ? '👔 Role' : '💻 Language'}
                    </span>
                  </div>

                  <h3 style={{ color: '#fff', fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{r.title}</h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.8rem', lineHeight: 1.6, flex: 1, marginBottom: '1rem' }}>
                    {r.description?.length > 90 ? r.description.slice(0, 90) + '...' : r.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1rem' }}>
                    {(r.tags || []).slice(0, 4).map(t => (
                      <span key={t} style={{ background: '#1f2937', color: '#9ca3af', fontSize: '0.7rem', padding: '0.2rem 0.625rem', borderRadius: 9999 }}>{t}</span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #1f2937', paddingTop: '0.75rem', fontSize: '0.8rem', color: '#6b7280' }}>
                    <span>📚 {r.totalLessons} lessons</span>
                    <span>⏱️ ~{r.estimatedHours}h</span>
                    <span style={{ color: r.color || '#6366f1', fontWeight: 600 }}>Start →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}