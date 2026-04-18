import { useState } from 'react';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Demo User', skills: 'Figma, UI/UX', interests: 'React, Node', location: 'Karachi' };

  return (
    <div>
      <div className="dark-section" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.5rem', color: '#94a3b8' }}>
          PROFILE
        </p>
        <h1 style={{ fontSize: '2.5rem', margin: 0 }}>{user.name}</h1>
        <p style={{ color: '#94a3b8', margin: 0, marginTop: '0.5rem' }}>{user.role} • {user.location}</p>
      </div>

      <div className="grid-2" style={{ gap: '2rem' }}>
        <div className="card">
          <p style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--primary)' }}>PUBLIC PROFILE</p>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Skills and reputation</h2>
          
          <div className="d-flex justify-between" style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
            <span>Trust score</span>
            <span style={{ fontWeight: 'bold' }}>100%</span>
          </div>
          <div className="d-flex justify-between" style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
            <span>Contributions</span>
            <span style={{ fontWeight: 'bold' }}>35</span>
          </div>

          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Skills</h3>
          <div className="d-flex gap-2" style={{ flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {(user.skills || 'Empty').split(',').map(s => <span key={s} className="tag" style={{ background: '#f0fdf4', color: '#16a34a' }}>{s.trim()}</span>)}
          </div>

          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Badges</h3>
          <div className="d-flex gap-2" style={{ flexWrap: 'wrap' }}>
            <span className="tag solved">Design Ally</span>
            <span className="tag solved">Fast Responder</span>
            <span className="tag solved">Top Mentor</span>
          </div>
        </div>

        <div className="card">
          <p style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--primary)' }}>EDIT PROFILE</p>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Update your identity</h2>
          <form>
            <div className="grid-2">
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" defaultValue={user.name} />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input type="text" className="form-control" defaultValue={user.location} />
              </div>
            </div>
            <div className="form-group">
              <label>Skills</label>
              <input type="text" className="form-control" defaultValue={user.skills} />
            </div>
            <div className="form-group">
              <label>Interests</label>
              <input type="text" className="form-control" defaultValue={user.interests} />
            </div>
            <button className="btn btn-primary w-full">Save profile</button>
          </form>
        </div>
      </div>
    </div>
  );
}
