import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function RequestDetail() {
  const { id } = useParams();
  const [req, setReq] = useState(null);
  const [currentUser, setCurrentUser] = useState({ name: 'Anonymous' });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user) setCurrentUser(user);

    fetch(`http://localhost:5000/api/requests/${id}`)
      .then(res => res.json())
      .then(data => setReq(data));
  }, [id]);

  const handleHelp = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/requests/${id}/help`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: currentUser.name, skills: 'General' })
      });
      if(res.ok) {
        const data = await res.json();
        setReq(data);
      }
    } catch(e) { console.error(e) }
  };

  const handleSolve = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/requests/${id}/solve`, {
        method: 'PATCH'
      });
      if(res.ok) {
        setReq(prev => ({...prev, status: 'Solved'}));
      }
    } catch(e) { console.error(e) }
  };

  if(!req) return <div>Loading...</div>;

  return (
    <div>
      <div className="dark-section" style={{ padding: '3rem', marginBottom: '2rem' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', color: '#94a3b8' }}>
          REQUEST DETAIL
        </p>
        <div className="d-flex gap-2" style={{ marginBottom: '1rem' }}>
            <span className="tag">{req.category}</span>
            <span className={`tag ${req.urgency.toLowerCase()}`}>{req.urgency}</span>
            {req.status === 'Solved' && <span className="tag solved">Solved</span>}
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{req.title}</h1>
        <p style={{ fontSize: '1.1rem', maxWidth: '800px', lineHeight: 1.6 }}>{req.description}</p>
      </div>

      <div className="grid-2" style={{ gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="card ai-box">
             <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--primary-dark)', marginBottom: '1rem' }}>AI Summary</h3>
             <p style={{ fontSize: '1rem' }}>This is a {req.urgency} urgency request for {req.category}. Based on context, it seems the user is looking for guidance directly related to {req.tags.join(', ')}.</p>
             <div className="d-flex gap-2 mt-4">
                {req.tags.map(t => <span key={t} className="tag">{t}</span>)}
             </div>
          </div>
          <div className="card">
            <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>Actions</h3>
            <div className="d-flex gap-4">
              <button className="btn btn-primary" onClick={handleHelp} disabled={req.status === 'Solved'}>I can help</button>
              <button className="btn btn-secondary" onClick={handleSolve} disabled={req.status === 'Solved'}>Mark as solved</button>
            </div>
          </div>
        </div>

        <div>
          <div className="card">
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>People ready to support</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               {req.helpers?.length === 0 ? <p>No helpers yet.</p> : null}
               {req.helpers?.map((h, i) => (
                 <div key={i} className="card" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <div className="d-flex align-center gap-4">
                     <div style={{ background: 'linear-gradient(45deg, #f97316, #fbbf24)', width: '40px', height: '40px', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                       {h.name.substring(0, 2).toUpperCase()}
                     </div>
                     <div>
                       <h4 style={{ margin: 0, marginBottom: '0.25rem' }}>{h.name}</h4>
                       <p style={{ margin: 0, fontSize: '0.8rem' }}>Trust score building</p>
                     </div>
                   </div>
                   <span className="tag" style={{ background: '#f0fdf4', color: '#16a34a' }}>Trust 100%</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
