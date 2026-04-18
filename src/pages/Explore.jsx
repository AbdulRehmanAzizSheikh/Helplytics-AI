import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Explore() {
  const [requests, setRequests] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [urgencyFilter, setUrgencyFilter] = useState('All');

  useEffect(() => {
    fetch('http://localhost:5000/api/requests')
      .then(r => r.json())
      .then(data => setRequests(data))
      .catch(e => console.error(e));
  }, []);

  const filtered = requests.filter(r => {
    if (categoryFilter !== 'All' && r.category !== categoryFilter) return false;
    if (urgencyFilter !== 'All' && r.urgency !== urgencyFilter) return false;
    return true;
  });

  return (
    <div>
      <div className="dark-section" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem' }}>
          EXPLORE / FEED
        </p>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Browse help requests with filterable community context.</h1>
        <p>Filter by category, urgency, skills, and location to surface the best matches.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
        <div className="card" style={{ alignSelf: 'start' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Refine the feed</h3>
          <div className="form-group">
            <label>Category</label>
            <select className="form-control" value={categoryFilter} onChange={e=>setCategoryFilter(e.target.value)}>
              <option>All</option>
              <option>Web Development</option>
              <option>Design</option>
              <option>Career</option>
            </select>
          </div>
          <div className="form-group">
            <label>Urgency</label>
            <select className="form-control" value={urgencyFilter} onChange={e=>setUrgencyFilter(e.target.value)}>
              <option>All</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filtered.length === 0 ? <p>No requests found.</p> : null}
          {filtered.map(req => (
            <div key={req._id} className="card d-flex flex-column" style={{ padding: '1.5rem', gap: '1rem' }}>
              <div className="d-flex align-center gap-2">
                <span className="tag" style={{ background: '#e0f2fe', color: '#0369a1' }}>{req.category}</span>
                <span className={`tag ${req.urgency.toLowerCase()}`}>{req.urgency}</span>
                {req.status === 'Solved' && <span className="tag solved">Solved</span>}
              </div>
              
              <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{req.title}</h3>
              <p style={{ margin: 0, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                {req.description}
              </p>
              
              <div className="d-flex gap-2">
                {req.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
              
              <div className="d-flex justify-between align-center" style={{ marginTop: '0.5rem', borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                <div style={{ fontWeight: 600 }}>{req.author} <span style={{ color: 'var(--text-muted)', fontWeight: 400, marginLeft: '0.5rem' }}>• {req.helpers?.length || 0} helper interested</span></div>
                <Link to={`/request/${req._id}`} className="btn btn-secondary" style={{ borderRadius: '24px', padding: '0.5rem 1rem' }}>Open details</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
