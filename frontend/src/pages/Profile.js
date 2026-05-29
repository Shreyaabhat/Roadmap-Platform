import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../api/api';

const ROLES = [
  'Frontend Developer','Backend Developer','Full Stack Developer',
  'Data Scientist','DevOps Engineer','Mobile Developer',
];

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [form, setForm]     = useState({
    name:            user?.name || '',
    roleGoal:        user?.roleGoal || 'Full Stack Developer',
    experienceLevel: user?.experienceLevel || 'beginner',
  });
  const [loading, setLoading] = useState(false);
  const [msg,     setMsg]     = useState(null); // {text, ok}

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const { data } = await authAPI.updateProfile(form);
      updateUser(data.user);
      setMsg({ text: '✅ Profile updated successfully!', ok: true });
    } catch (err) {
      setMsg({ text: '❌ ' + (err.response?.data?.message || 'Update failed'), ok: false });
    } finally {
      setLoading(false);
    }
  };

  const S = {
    page:  { maxWidth: 560, animation: 'fadeIn 0.3s ease' },
    card:  { background: '#111827', border: '1px solid #1f2937', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem' },
    label: { display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#d1d5db', marginBottom: '0.5rem' },
    msg:   (ok) => ({
      background: ok ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
      border: '1px solid ' + (ok ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'),
      color:  ok ? '#6ee7b7' : '#fca5a5',
      borderRadius: '0.75rem', padding: '0.75rem 1rem',
      fontSize: '0.875rem', marginBottom: '1.25rem',
    }),
  };

  return (
    <div style={S.page}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>Profile Settings</h1>
        <p style={{ color: '#9ca3af', marginTop: '0.25rem' }}>Manage your account and learning preferences</p>
      </div>

      {/* Avatar card */}
      <div style={S.card}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: 64, height: 64, borderRadius: '1rem', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <p style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>{user?.name}</p>
            <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{user?.email}</p>
            <p style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '0.2rem', textTransform: 'capitalize' }}>
              {user?.experienceLevel} · {user?.roleGoal}
            </p>
          </div>
        </div>
      </div>

      {/* Edit form */}
      <div style={S.card}>
        <p style={{ color: '#fff', fontWeight: 600, marginBottom: '1.25rem' }}>Edit Profile</p>

        {msg && <div style={S.msg(msg.ok)}>{msg.text}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div>
            <label style={S.label}>Full Name</label>
            <input className="input" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })} required />
          </div>

          <div>
            <label style={S.label}>Email (cannot be changed)</label>
            <input className="input" value={user?.email} disabled
              style={{ opacity: 0.5, cursor: 'not-allowed' }} />
          </div>

          <div>
            <label style={S.label}>Career Goal</label>
            <select className="input" value={form.roleGoal}
              onChange={e => setForm({ ...form, roleGoal: e.target.value })}>
              {ROLES.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>

          <div>
            <label style={S.label}>Experience Level</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
              {['beginner','intermediate','advanced'].map(l => (
                <button key={l} type="button"
                  onClick={() => setForm({ ...form, experienceLevel: l })}
                  style={{
                    padding: '0.625rem', borderRadius: '0.75rem',
                    border: '1px solid ' + (form.experienceLevel === l ? '#6366f1' : '#374151'),
                    background: form.experienceLevel === l ? '#4f46e5' : '#1f2937',
                    color: form.experienceLevel === l ? '#fff' : '#9ca3af',
                    cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500,
                    textTransform: 'capitalize', transition: 'all 0.15s',
                  }}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-primary"
            style={{ padding: '0.75rem', fontSize: '0.9rem', marginTop: '0.5rem' }}
            disabled={loading}>
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                Saving...
              </span>
            ) : '💾 Save Changes'}
          </button>
        </form>
      </div>

      {/* Account info */}
      <div style={S.card}>
        <p style={{ color: '#fff', fontWeight: 600, marginBottom: '1rem' }}>Account Info</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid #1f2937' }}>
            <span style={{ color: '#6b7280' }}>Member since</span>
            <span style={{ color: '#d1d5db' }}>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#6b7280' }}>User ID</span>
            <span style={{ color: '#4b5563', fontFamily: 'monospace', fontSize: '0.75rem' }}>{user?._id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}