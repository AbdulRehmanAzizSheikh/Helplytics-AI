import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';

export default function RequestDetail() {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const [req, setReq] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/requests/${id}`).then(r => r.json()).then(d => { setReq(d); setLoading(false); }).catch(console.error);
  }, [id]);

  const handleHelp = async () => {
    try {
      const res = await fetch(`${API}/requests/${id}/help`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?._id, name: user?.username || 'Anonymous', skills: user?.skills?.join(', ') || 'General' }),
      });
      if (res.ok) { const data = await res.json(); setReq(data); }
    } catch (e) { console.error(e); }
  };

  const handleSolve = async () => {
    try {
      const res = await fetch(`${API}/requests/${id}/solve`, { method: 'PATCH' });
      if (res.ok) { const data = await res.json(); setReq(data); }
    } catch (e) { console.error(e); }
  };

  if (loading) return <div className="text-center mt-6"><p>Loading...</p></div>;
  if (!req) return <div className="text-center mt-6"><p>Request not found.</p></div>;

  return (
    <div className="fade-in">
      <div className="hero-dark">
        <span className="section-label section-label-light">REQUEST DETAIL</span>
        <div className="d-flex gap-2 mb-4">
          <span className="tag">{req.category}</span>
          <span className={`tag tag-${req.urgency.toLowerCase()}`}>{req.urgency}</span>
          <span className={`tag ${req.status === 'Solved' ? 'tag-solved' : 'tag-open'}`}>{req.status}</span>
        </div>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>{req.title}</h1>
        <p style={{ maxWidth: '800px', lineHeight: 1.7, fontSize: '1rem' }}>{req.description}</p>
      </div>

      <div className="grid-2" style={{ gap: '2rem' }}>
        <div className="d-flex flex-col gap-4">
          {/* AI Summary */}
          <div className="ai-box">
            <span className="section-label">AI SUMMARY</span>
            <p style={{ color: 'var(--text)' }}>{req.aiSummary || `This is a ${req.urgency} urgency ${req.category} request.`}</p>
            <div className="d-flex gap-2 mt-4">
              {req.tags?.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>

          {/* Actions */}
          <div className="card">
            <span className="section-label">ACTIONS</span>
            <div className="d-flex gap-4 mt-2">
              <button className="btn btn-primary" onClick={handleHelp} disabled={req.status === 'Solved'}>I can help</button>
              <button className="btn btn-secondary" onClick={handleSolve} disabled={req.status === 'Solved'}>Mark as solved</button>
            </div>
          </div>
        </div>

        {/* Helpers */}
        <div>
          <div className="card">
            <span className="section-label">HELPERS</span>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>People ready to support</h2>
            <div className="d-flex flex-col gap-3">
              {req.helpers?.length === 0 && <p>No helpers yet. Be the first to offer help!</p>}
              {req.helpers?.map((h, i) => (
                <div key={i} className="d-flex align-center justify-between" style={{ padding: '0.75rem', background: '#F9FAFB', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <div className="d-flex align-center gap-3">
                    <div style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)', width: '40px', height: '40px', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>
                      {h.name?.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '0.95rem' }}>{h.name}</h4>
                      <p style={{ margin: 0, fontSize: '0.8rem' }}>{h.skills}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
