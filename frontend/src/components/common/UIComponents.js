import React from 'react';

/* ── Progress Bar ─────────────────────────────────────────── */
export function ProgressBar({ percentage, size = 'md', showLabel = true, color = 'indigo' }) {
  const heights = { sm:4, md:8, lg:14 };
  const gradients = {
    indigo: 'linear-gradient(to right,#6366f1,#8b5cf6)',
    green:  'linear-gradient(to right,#10b981,#2dd4bf)',
    amber:  'linear-gradient(to right,#f59e0b,#f97316)',
    blue:   'linear-gradient(to right,#3b82f6,#22d3ee)',
  };
  const pct = Math.min(Math.max(percentage || 0, 0), 100);
  return (
    <div style={{ width:'100%' }}>
      {showLabel && (
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
          <span style={{ fontSize:'0.75rem', color:'#6b7280' }}>Progress</span>
          <span style={{ fontSize:'0.75rem', fontWeight:600, color:'#fff' }}>{pct}%</span>
        </div>
      )}
      <div style={{ height:heights[size], background:'#1f2937', borderRadius:9999, overflow:'hidden' }}>
        <div style={{
          height:'100%', width:`${pct}%`,
          background: gradients[color] || gradients.indigo,
          borderRadius:9999, transition:'width 0.7s ease-out',
        }} />
      </div>
    </div>
  );
}

/* ── Badge ────────────────────────────────────────────────── */
const BADGE_STYLES = {
  default: { background:'#1f2937', color:'#d1d5db', border:'none' },
  indigo:  { background:'rgba(99,102,241,0.15)', color:'#a5b4fc', border:'1px solid rgba(99,102,241,0.3)' },
  green:   { background:'rgba(16,185,129,0.15)', color:'#6ee7b7', border:'1px solid rgba(16,185,129,0.3)' },
  amber:   { background:'rgba(245,158,11,0.15)', color:'#fcd34d', border:'1px solid rgba(245,158,11,0.3)' },
  red:     { background:'rgba(239,68,68,0.15)',  color:'#fca5a5', border:'1px solid rgba(239,68,68,0.3)' },
  blue:    { background:'rgba(59,130,246,0.15)', color:'#93c5fd', border:'1px solid rgba(59,130,246,0.3)' },
  purple:  { background:'rgba(139,92,246,0.15)', color:'#d8b4fe', border:'1px solid rgba(139,92,246,0.3)' },
};

export function Badge({ children, variant = 'default', size = 'sm' }) {
  const s = BADGE_STYLES[variant] || BADGE_STYLES.default;
  return (
    <span style={{
      display:'inline-flex', alignItems:'center',
      borderRadius:9999, fontWeight:500,
      fontSize: size==='sm' ? '0.7rem' : '0.8rem',
      padding: size==='sm' ? '0.125rem 0.625rem' : '0.25rem 0.75rem',
      ...s,
    }}>{children}</span>
  );
}

/* ── Spinner ──────────────────────────────────────────────── */
export function Spinner({ size = 'md', color = '#6366f1' }) {
  const sizes = { sm:16, md:24, lg:40 };
  const px = sizes[size] || 24;
  return (
    <div style={{
      width:px, height:px, flexShrink:0,
      border:`2px solid rgba(99,102,241,0.25)`,
      borderTopColor: color,
      borderRadius:'50%',
      animation:'spin 0.8s linear infinite',
    }} />
  );
}

/* ── Stat Card ────────────────────────────────────────────── */
const STAT_COLORS = {
  indigo: { bg:'rgba(99,102,241,0.1)',  color:'#a5b4fc' },
  green:  { bg:'rgba(16,185,129,0.1)',  color:'#34d399' },
  amber:  { bg:'rgba(245,158,11,0.1)',  color:'#fbbf24' },
  blue:   { bg:'rgba(59,130,246,0.1)',  color:'#60a5fa' },
  purple: { bg:'rgba(139,92,246,0.1)',  color:'#a78bfa' },
};
export function StatCard({ icon, label, value, sub, color='indigo' }) {
  const c = STAT_COLORS[color] || STAT_COLORS.indigo;
  return (
    <div className="card" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
      <div>
        <p style={{ color:'#9ca3af', fontSize:'0.8rem', marginBottom:'0.25rem' }}>{label}</p>
        <p style={{ fontSize:'1.5rem', fontWeight:700, color:'#fff' }}>{value}</p>
        {sub && <p style={{ fontSize:'0.7rem', color:'#6b7280', marginTop:'0.25rem' }}>{sub}</p>}
      </div>
      <div style={{ padding:'0.625rem', borderRadius:'0.75rem', background:c.bg, color:c.color, fontSize:'1.25rem' }}>
        {icon}
      </div>
    </div>
  );
}

/* ── Difficulty Badge ─────────────────────────────────────── */
export function DifficultyBadge({ level }) {
  const map = { beginner:'green', intermediate:'amber', advanced:'red' };
  const labels = { beginner:'Beginner', intermediate:'Intermediate', advanced:'Advanced' };
  return <Badge variant={map[level]||'green'}>{labels[level]||'Beginner'}</Badge>;
}

/* ── Toast ────────────────────────────────────────────────── */
const TOAST_STYLES = {
  success: { bg:'rgba(16,185,129,0.15)', border:'rgba(16,185,129,0.35)', color:'#6ee7b7' },
  error:   { bg:'rgba(239,68,68,0.15)',  border:'rgba(239,68,68,0.35)',  color:'#fca5a5' },
  info:    { bg:'rgba(99,102,241,0.15)', border:'rgba(99,102,241,0.35)', color:'#a5b4fc' },
};
export function Toast({ message, type='success', onClose }) {
  const s = TOAST_STYLES[type] || TOAST_STYLES.info;
  const icons = { success:'✓', error:'✗', info:'i' };
  return (
    <div style={{
      position:'fixed', top:16, right:16, zIndex:9999,
      display:'flex', alignItems:'center', gap:'0.75rem',
      padding:'0.75rem 1rem', borderRadius:'0.75rem',
      background:s.bg, border:`1px solid ${s.border}`,
      color:s.color, backdropFilter:'blur(8px)',
      boxShadow:'0 8px 32px rgba(0,0,0,0.3)',
      animation:'slideUp 0.3s ease-out',
      maxWidth:'360px',
    }}>
      <span style={{ fontWeight:700 }}>{icons[type]}</span>
      <p style={{ fontSize:'0.875rem', fontWeight:500 }}>{message}</p>
      {onClose && (
        <button onClick={onClose} style={{
          marginLeft:'0.5rem', border:'none', background:'none',
          color:'inherit', cursor:'pointer', fontSize:'1.1rem', opacity:0.7,
          lineHeight:1, padding:0,
        }}>×</button>
      )}
    </div>
  );
}

/* ── Page Header ──────────────────────────────────────────── */
export function PageHeader({ title, subtitle, action }) {
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'2rem' }}>
      <div>
        <h1 style={{ fontSize:'1.5rem', fontWeight:700, color:'#fff' }}>{title}</h1>
        {subtitle && <p style={{ color:'#9ca3af', marginTop:'0.25rem' }}>{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

/* ── Skeleton ─────────────────────────────────────────────── */
export function Skeleton({ style = {} }) {
  return <div className="shimmer" style={{ height:16, borderRadius:8, ...style }} />;
}

export function CardSkeleton() {
  return (
    <div className="card" style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
      <Skeleton style={{ width:'75%', height:18 }} />
      <Skeleton style={{ width:'100%', height:14 }} />
      <Skeleton style={{ width:'60%', height:14 }} />
      <Skeleton style={{ marginTop:'0.5rem', height:8 }} />
    </div>
  );
}

/* ── Empty State ──────────────────────────────────────────── */
export function EmptyState({ icon='📭', title, description, action }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'4rem 1rem', textAlign:'center' }}>
      <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>{icon}</div>
      <h3 style={{ fontSize:'1.125rem', fontWeight:600, color:'#fff', marginBottom:'0.5rem' }}>{title}</h3>
      {description && <p style={{ color:'#9ca3af', fontSize:'0.875rem', maxWidth:'24rem', marginBottom:'1.5rem' }}>{description}</p>}
      {action}
    </div>
  );
}