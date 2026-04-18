import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function AiCenter() {
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        // 1. Get all requests to calculate top category
        const { data: requests } = await supabase.from('requests').select('category');
        const counts = requests?.reduce((acc, curr) => {
          acc[curr.category] = (acc[curr.category] || 0) + 1;
          return acc;
        }, {}) || {};
        const topCat = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b, 'General');

        // 2. Count high urgency requests
        const { count: highUrgencyCount } = await supabase
          .from('requests')
          .select('*', { count: 'exact', head: true })
          .eq('urgency', 'High');

        // 3. Count total users (helpers)
        const { count: helpersCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        // 4. Get active recommendations
        const { data: recs } = await supabase
          .from('requests')
          .select('*')
          .eq('status', 'Open')
          .order('created_at', { ascending: false })
          .limit(3);

        setInsights({
          topCategory: topCat,
          highUrgency: highUrgencyCount,
          totalHelpers: helpersCount,
          recommendations: recs
        });
      } catch (err) {
        console.error('Error fetching AI insights:', err);
      }
    };

    fetchInsights();
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
            <div key={r.id} className="card card-flat" style={{ background: 'white' }}>
              <h3 style={{ marginBottom: '0.4rem' }}>{r.title}</h3>
              <p style={{ marginBottom: '0.75rem' }}>{r.ai_summary || r.description?.substring(0, 120)}</p>
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
