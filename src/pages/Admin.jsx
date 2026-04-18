import { useState, useEffect } from 'react';
import API from '../api';

export default function Admin() {
  const [requests, setRequests] = useState([]);
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    fetch(`${API}/requests`).then(r => r.json()).then(setRequests).catch(console.error);
    fetch(`${API}/requests/ai-insights`).then(r => r.json()).then(setInsights).catch(console.error);
  }, []);

  const deleteRequest = async (id) => {
    if (!confirm('Are you sure you want to delete this request?')) return;
    try {
      await fetch(`${API}/requests/${id}`, { method: 'DELETE' });
      setRequests(requests.filter(r => r._id !== id));
    } catch (e) { console.error(e); }
  };

  return (
    <div className="fade-in">
      <div className="hero-dark" style={{ background: 'linear-gradient(135deg, #7f1d1d 0%, #451a03 100%)' }}>
        <span className="section-label" style={{ color: '#FCA5A5' }}>ADMIN PANEL (BONUS)</span>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Manage Platform Integrity.</h1>
        <p>View analytics, manage requests, and moderate content.</p>
      </div>

      <div className="grid-3 mb-6">
        <div className="card">
          <span className="section-label">TOTAL REQUESTS</span>
          <div className="stat-value">{insights?.totalRequests || 0}</div>
        </div>
        <div className="card">
          <span className="section-label">OPEN</span>
          <div className="stat-value" style={{ color: '#D97706' }}>{insights?.openRequests || 0}</div>
        </div>
        <div className="card">
          <span className="section-label">SOLVED</span>
          <div className="stat-value" style={{ color: 'var(--primary)' }}>{insights?.solvedRequests || 0}</div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Moderate Content</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req._id}>
                <td style={{ fontWeight: 600 }}>{req.title}</td>
                <td>{req.authorName}</td>
                <td><span className="tag">{req.category}</span></td>
                <td><span className={`tag ${req.status === 'Solved' ? 'tag-solved' : 'tag-open'}`}>{req.status}</span></td>
                <td><button className="btn btn-danger btn-sm" onClick={() => deleteRequest(req._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
