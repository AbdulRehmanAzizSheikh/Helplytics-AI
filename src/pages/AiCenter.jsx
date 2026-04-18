import { useState, useEffect } from 'react';
import API from '../api';

export default function AiCenter() {
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    fetch(`${API}/requests/ai-insights`).then(r => r.json()).then(setInsights).catch(console.error);
  }, []);

  return (
    <div className="fade-in">
      <div className="hero-dark">
        <span className="section-label section-label-light">AI CENTER</span>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>See what the platform intelligence is noticing.</h1>
        <p>AI-like insights summarize demand trends, helper readiness, urgency signals, and request recommendations.</p>
      </div>

      <div className="grid-3 mb-6">
        <div className="card">
          <span className="section-label">TREND PULSE</span>
          <div className="stat-value" style={{ fontSize: '1.6rem' }}>{insights?.topCategory || 'General'}</div>
          <p>Most common support area based on active community requests.</p>
        </div>
        <div className="card">
          <span className="section-label">URGENCY WATCH</span>
          <div className="stat-value" style={{ color: '#DC2626' }}>{insights?.highUrgency || 0}</div>
          <p>Requests currently flagged high priority by the urgency detector.</p>
        </div>
        <div className="card">
          <span className="section-label">MENTOR POOL</span>
          <div className="stat-value">{insights?.totalHelpers || 0}</div>
          <p>Trusted helpers with strong response history and contribution signals.</p>
        </div>
      </div>

      <div className="ai-box" style={{ padding: '2rem' }}>
        <span className="section-label">AI RECOMMENDATIONS</span>
        <h2 style={{ fontSize: '1.6rem', marginBottom: '1.5rem' }}>Requests needing attention</h2>
        <div className="d-flex flex-col gap-3">
          {insights?.recommendations?.length === 0 && <p>No open requests to recommend.</p>}
          {insights?.recommendations?.map(r => (
            <div key={r._id} className="card card-flat" style={{ background: 'white' }}>
              <h3 style={{ marginBottom: '0.4rem' }}>{r.title}</h3>
              <p style={{ marginBottom: '0.75rem' }}>{r.aiSummary || r.description?.substring(0, 120)}</p>
              <div className="d-flex gap-2">
                <span className="tag">{r.category}</span>
                <span className={`tag tag-${r.urgency.toLowerCase()}`}>{r.urgency}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
