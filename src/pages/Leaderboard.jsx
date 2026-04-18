import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('contributions', { ascending: false })
          .order('trust_score', { ascending: false })
          .limit(10);
        
        if (error) throw error;
        setLeaders(data || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchLeaders();
  }, []);

  return (
    <div className="fade-in">
      <div className="hero-dark">
        <span className="section-label section-label-light">LEADERBOARD</span>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Recognize the people who keep the community moving.</h1>
        <p>Trust score, contribution count, and badges create visible momentum for reliable helpers.</p>
      </div>

      <div className="grid-2" style={{ gap: '2rem' }}>
        {/* Rankings */}
        <div className="card">
          <span className="section-label">TOP HELPERS</span>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Rankings</h2>
          <div className="d-flex flex-col gap-3">
            {leaders.length === 0 && <p>No contributors yet. Help someone to appear here!</p>}
            {leaders.map((u, i) => (
              <div key={u.id} className="d-flex align-center justify-between" style={{ padding: '1rem', background: i === 0 ? '#F0FDF4' : '#F9FAFB', borderRadius: 'var(--radius-sm)', border: i === 0 ? '2px solid var(--primary)' : '1px solid var(--border)' }}>
                <div className="d-flex align-center gap-3">
                  <div style={{ background: i === 0 ? 'var(--primary-dark)' : i === 1 ? '#D97706' : '#6B7280', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                    {u.username?.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 style={{ margin: 0 }}>#{i + 1} {u.username}</h4>
                    <p style={{ margin: 0, fontSize: '0.8rem' }}>{u.skills?.join(', ') || 'No skills listed'}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700 }}>{u.trust_score}%</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{u.contributions} contributions</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badge System */}
        <div className="card">
          <span className="section-label">BADGE SYSTEM</span>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Trust and achievement</h2>
          <div className="d-flex flex-col gap-4">
            {leaders.slice(0, 5).map((u) => (
              <div key={u.id} style={{ padding: '1rem', background: '#F9FAFB', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                <h3 style={{ margin: 0, marginBottom: '0.3rem' }}>{u.username}</h3>
                <div className="d-flex gap-2 mb-2 flex-wrap">
                  {u.badges?.length > 0 ? u.badges.map(b => <span key={b} className="tag tag-solved">{b}</span>) : <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No badges yet</span>}
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${u.trust_score}%` }}></div>
                </div>
              </div>
            ))}
            {leaders.length === 0 && <p>Start helping others to earn badges!</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
