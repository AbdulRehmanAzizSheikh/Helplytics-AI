import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [insights, setInsights] = useState(null);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch global stats for dashboard
        const { count: totalRequests } = await supabase.from('requests').select('*', { count: 'exact', head: true });
        const { count: highUrgency } = await supabase.from('requests').select('*', { count: 'exact', head: true }).eq('urgency', 'High');
        const { count: solvedRequests } = await supabase.from('requests').select('*', { count: 'exact', head: true }).eq('status', 'Solved');
        const { count: totalHelpers } = await supabase.from('profiles').select('*', { count: 'exact', head: true });

        // Calculate top category (simple client-side for now)
        const { data: catData } = await supabase.from('requests').select('category');
        const counts = catData?.reduce((acc, curr) => {
          acc[curr.category] = (acc[curr.category] || 0) + 1;
          return acc;
        }, {}) || {};
        const topCat = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b, 'General');

        setInsights({
          totalRequests,
          highUrgency,
          solvedRequests,
          totalHelpers,
          topCategory: topCat
        });

        // Fetch recent open requests
        const { data: recentRequests } = await supabase
          .from('requests')
          .select('*')
          .eq('status', 'Open')
          .order('created_at', { ascending: false })
          .limit(5);
        
        setRequests(recentRequests || []);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
    };

    fetchData();
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
              <div key={r.id} style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: '#F9FAFB', border: '1px solid var(--border)' }}>
                <div className="d-flex align-center gap-2 mb-2">
                  <span className="tag">{r.category}</span>
                  <span className={`tag tag-${r.urgency.toLowerCase()}`}>{r.urgency}</span>
                </div>
                <Link to={`/request/${r.id}`} style={{ fontWeight: 600, textDecoration: 'none', color: 'var(--text)' }}>{r.title}</Link>
                <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>{r.author_name}</p>
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
