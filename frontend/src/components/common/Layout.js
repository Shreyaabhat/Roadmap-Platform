import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NAV = [
  { to:'/dashboard', label:'Dashboard',   emoji:'⊞' },
  { to:'/roadmaps',  label:'Roadmaps',    emoji:'🗺' },
  { to:'/progress',  label:'My Progress', emoji:'📈' },
  { to:'/ai-tools',  label:'AI Tools',    emoji:'✨' },
  { to:'/profile',   label:'Profile',     emoji:'👤' },
];

function SidebarContent({ onClose, user, onLogout }) {
  return (
    <div style={{
      display:'flex', flexDirection:'column', height:'100%',
      background:'#030712', borderRight:'1px solid rgba(31,41,55,0.7)',
    }}>
      {/* Logo */}
      <div style={{
        display:'flex', alignItems:'center', gap:'0.75rem',
        padding:'1.25rem 1.5rem', borderBottom:'1px solid rgba(31,41,55,0.7)',
      }}>
        <div style={{
          width:36, height:36, background:'#4f46e5', borderRadius:'0.625rem',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontWeight:700, color:'#fff', fontSize:'1rem', flexShrink:0,
        }}>L</div>
        <div>
          <p style={{fontWeight:700, color:'#fff', fontSize:'0.95rem', lineHeight:1.2}}>LearnPath</p>
          <p style={{fontSize:'0.7rem', color:'#6b7280'}}>AI Learning Platform</p>
        </div>
      </div>

      {/* Nav */}
      <nav style={{flex:1, padding:'1rem 0.75rem', overflowY:'auto'}}>
        <p style={{fontSize:'0.7rem', fontWeight:600, color:'#4b5563', textTransform:'uppercase', letterSpacing:'0.08em', padding:'0 0.75rem', marginBottom:'0.75rem'}}>
          Navigation
        </p>
        {NAV.map(({to, label, emoji}) => (
          <NavLink key={to} to={to} onClick={onClose}
            className={({isActive}) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            <span style={{fontSize:'1rem', width:20, textAlign:'center'}}>{emoji}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User footer */}
      <div style={{padding:'0.75rem', borderTop:'1px solid rgba(31,41,55,0.7)'}}>
        <div style={{
          display:'flex', alignItems:'center', gap:'0.75rem',
          padding:'0.75rem', borderRadius:'0.75rem', background:'rgba(17,24,39,0.5)', marginBottom:'0.5rem',
        }}>
          <div style={{
            width:32, height:32, flexShrink:0, borderRadius:'50%',
            background:'linear-gradient(135deg,#6366f1,#8b5cf6)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontWeight:600, color:'#fff', fontSize:'0.875rem',
          }}>{user?.name?.charAt(0)?.toUpperCase()}</div>
          <div style={{overflow:'hidden', flex:1}}>
            <p style={{fontSize:'0.875rem', fontWeight:500, color:'#fff', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{user?.name}</p>
            <p style={{fontSize:'0.7rem', color:'#6b7280', textTransform:'capitalize'}}>{user?.experienceLevel}</p>
          </div>
        </div>
        <button onClick={onLogout} className="btn-ghost" style={{width:'100%', color:'#f87171', justifyContent:'flex-start', gap:'0.5rem'}}>
          <span>→</span> Sign out
        </button>
      </div>
    </div>
  );
}

function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#030712' }}>
      {/* Desktop sidebar */}
      <aside style={{ width:256, flexShrink:0, display:'none' }} className="lg:flex lg:flex-col">
        <div style={{ width:256, position:'fixed', top:0, left:0, height:'100vh' }}>
          <SidebarContent user={user} onLogout={handleLogout} onClose={()=>{}} />
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div style={{ position:'fixed', inset:0, zIndex:50, display:'flex' }}>
          <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', backdropFilter:'blur(4px)' }}
            onClick={() => setMobileOpen(false)} />
          <div style={{ position:'relative', zIndex:10, width:280, height:'100%' }}>
            <SidebarContent user={user} onLogout={handleLogout} onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0 }}>
        {/* Mobile top bar — hidden on lg */}
        <header className="lg:hidden" style={{
          display:'flex', alignItems:'center', gap:'1rem',
          padding:'1rem 1.25rem', borderBottom:'1px solid rgba(31,41,55,0.6)',
          background:'rgba(3,7,18,0.9)', backdropFilter:'blur(8px)',
          position:'sticky', top:0, zIndex:30,
        }}>
          <button onClick={() => setMobileOpen(true)} style={{
            padding:'0.5rem', borderRadius:'0.5rem', border:'none',
            background:'transparent', cursor:'pointer', color:'#9ca3af',
            display:'flex', alignItems:'center',
          }}>
            <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
            <div style={{ width:28, height:28, background:'#4f46e5', borderRadius:'0.5rem', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, color:'#fff', fontSize:'0.875rem' }}>L</div>
            <span style={{ fontWeight:700, color:'#fff' }}>LearnPath</span>
          </div>
        </header>

        {/* Page */}
        <main style={{ flex:1, overflowY:'auto' }}>
          <div style={{ maxWidth:'80rem', margin:'0 auto', padding:'2rem 1.5rem' }} className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;