import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

export default function Explore() {
  const [requests, setRequests] = useState([]);
  const [category, setCategory] = useState('All');
  const [urgency, setUrgency] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== 'All') params.append('category', category);
    if (urgency !== 'All') params.append('urgency', urgency);
    fetch(`${API}/requests?${params.toString()}`)
      .then(r => r.json())
      .then(setRequests)
      .catch(console.error);
  }, [category, urgency]);

  const filtered = requests.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="fade-in">
      <div className="hero-dark">
        <span className="section-label section-label-light">EXPLORE / FEED</span>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Browse help requests with filterable community context.</h1>
        <p>Filter by category, urgency, skills, and location to surface the best matches.</p>
      </div>

      <div className="sidebar-layout">
        {/* Filters */}
        <div className="card" style={{ alignSelf: 'start', position: 'sticky', top: '1rem' }}>
          <span className="section-label">FILTERS</span>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Refine the feed</h2>
          <div className="form-group">
            <label>Search</label>
            <input type="text" className="form-control" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by title or tag..." />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select className="form-control" value={category} onChange={e => setCategory(e.target.value)}>
              <option>All</option>
              <option>Web Development</option>
              <option>Design</option>
              <option>Career</option>
              <option>Backend</option>
              <option>General</option>
            </select>
          </div>
          <div className="form-group">
            <label>Urgency</label>
            <select className="form-control" value={urgency} onChange={e => setUrgency(e.target.value)}>
              <option>All</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

        {/* Feed */}
        <div className="d-flex flex-col gap-4">
          {filtered.length === 0 && <div className="card text-center"><p>No requests found. Try changing the filters or create a new request!</p></div>}
          {filtered.map(req => (
            <div key={req._id} className="card">
              <div className="d-flex align-center gap-2 mb-2">
                <span className="tag">{req.category}</span>
                <span className={`tag tag-${req.urgency.toLowerCase()}`}>{req.urgency}</span>
                <span className={`tag ${req.status === 'Solved' ? 'tag-solved' : 'tag-open'}`}>{req.status}</span>
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem' }}>{req.title}</h3>
              <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '0.75rem' }}>{req.description}</p>
              <div className="d-flex gap-2 flex-wrap mb-4">
                {req.tags?.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
              <div className="d-flex justify-between align-center" style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{req.authorName} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>• {req.helpers?.length || 0} helper interested</span></span>
                <Link to={`/request/${req._id}`} className="btn btn-secondary btn-sm">Open details</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
