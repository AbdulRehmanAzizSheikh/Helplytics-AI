import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [insights, setInsights] = useState(null);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch(`${API}/requests/ai-insights`).then(r => r.json()).then(setInsights).catch(console.error);
    fetch(`${API}/requests?status=Open`).then(r => r.json()).then(d => setRequests(d.slice(0, 5))).catch(console.error);
  }, []);

  return (
    <div className="fade-in">
      <div className="hero-dark" style={{ marginBottom: '2rem' }}>
        <span className="section-label section-label-light">DASHBOARD</span>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Welcome back, {user?.username || 'User'}</h1>
        <p>Here's what's happening on the platform right now.</p>
      </div>

      {/* Stats */}
      <div className="grid-3 mb-6">
        <div className="card">
          <span className="section-label">TOTAL REQUESTS</span>
          <div className="stat-value">{insights?.totalRequests || 0}</div>
          <p>Community requests created</p>
        </div>
        <div className="card">
          <span className="section-label">URGENCY WATCH</span>
          <div className="stat-value" style={{ color: '#DC2626' }}>{insights?.highUrgency || 0}</div>
          <p>Requests flagged high priority</p>
        </div>
        <div className="card">
          <span className="section-label">SOLVED</span>
          <div className="stat-value" style={{ color: 'var(--primary)' }}>{insights?.solvedRequests || 0}</div>
          <p>Problems resolved by the community</p>
        </div>
      </div>

      <div className="grid-2" style={{ gap: '2rem' }}>
        {/* Recent Requests */}
        <div className="card">
          <div className="d-flex justify-between align-center mb-4">
            <h2 style={{ fontSize: '1.4rem' }}>Recent Requests</h2>
            <Link to="/explore" className="btn btn-secondary btn-sm">View all</Link>
          </div>
          <div className="d-flex flex-col gap-3">
            {requests.length === 0 && <p>No open requests yet.</p>}
            {requests.map(r => (
              <div key={r._id} style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: '#F9FAFB', border: '1px solid var(--border)' }}>
                <div className="d-flex align-center gap-2 mb-2">
                  <span className="tag">{r.category}</span>
                  <span className={`tag tag-${r.urgency.toLowerCase()}`}>{r.urgency}</span>
                </div>
                <Link to={`/request/${r._id}`} style={{ fontWeight: 600, textDecoration: 'none', color: 'var(--text)' }}>{r.title}</Link>
                <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>{r.authorName}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions + AI Insights */}
        <div className="d-flex flex-col gap-4">
          <div className="card">
            <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Quick Actions</h2>
            <div className="d-flex flex-col gap-3">
              <Link to="/create-request" className="btn btn-primary w-full">Create New Request</Link>
              <Link to="/explore" className="btn btn-secondary w-full">Browse Help Feed</Link>
              <Link to="/profile" className="btn btn-secondary w-full">Edit Profile</Link>
            </div>
          </div>
          <div className="ai-box">
            <span className="section-label">AI INSIGHTS</span>
            <h3 className="mb-2">Trending category</h3>
            <p style={{ color: 'var(--text)', fontWeight: 600, fontSize: '1.2rem' }}>{insights?.topCategory || 'General'}</p>
            <p className="mt-2">{insights?.totalHelpers || 0} active helpers in the community</p>
          </div>
        </div>
      </div>
    </div>
  );
}
