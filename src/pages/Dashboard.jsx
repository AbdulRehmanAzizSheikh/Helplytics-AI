import { Sparkles, Activity, Bell, Map } from 'lucide-react';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Demo User', role: 'Both' };

  return (
    <div>
      <div className="dark-section" style={{ padding: '3rem', marginBottom: '2rem' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', color: '#94a3b8' }}>
          AI CENTER & DASHBOARD
        </p>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>See what the platform intelligence is noticing.</h1>
        <p>AI-like insights summarize demand trends, helper readiness, urgency signals, and recommendations.</p>
        <div className="d-flex align-center gap-4 mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ background: 'var(--primary)', color: 'white', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
            {user.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 style={{ margin: 0 }}>{user.name}</h3>
            <p style={{ margin: 0, color: '#94a3b8' }}>Role: {user.role}</p>
          </div>
        </div>
      </div>

      <div className="grid-3" style={{ marginBottom: '2rem' }}>
        <div className="card">
          <p style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--primary)' }}>TREND PULSE</p>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Web Development</h2>
          <p>Most common support area based on active community requests.</p>
        </div>
        <div className="card">
          <p style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--primary)' }}>URGENCY WATCH</p>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>2</h2>
          <p>Requests currently flagged high priority by the urgency detector.</p>
        </div>
        <div className="card">
          <p style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--primary)' }}>MENTOR POOL</p>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>5+</h2>
          <p>Trusted helpers with strong response history and contribution signals.</p>
        </div>
      </div>

      <div className="grid-2" style={{ gap: '2rem' }}>
        <div className="card ai-box">
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>AI Recommendations</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="card" style={{ background: '#f8fafc', padding: '1.2rem' }}>
              <h3 style={{ fontSize: '1rem', margin: 0, marginBottom: '0.5rem' }}>Need help making my portfolio responsive</h3>
              <p style={{ margin: 0, marginBottom: '1rem', fontSize: '0.9rem' }}>Responsive layout issue with a short deadline. Best helpers are frontend mentors comfortable with CSS grids.</p>
              <div className="d-flex gap-2">
                <span className="tag">Web Development</span>
                <span className="tag high">High</span>
              </div>
            </div>
            
            <div className="card" style={{ background: '#f8fafc', padding: '1.2rem' }}>
              <h3 style={{ fontSize: '1rem', margin: 0, marginBottom: '0.5rem' }}>Looking for Figma feedback</h3>
              <p style={{ margin: 0, marginBottom: '1rem', fontSize: '0.9rem' }}>A visual design critique request where feedback on hierarchy, spacing, and messaging would create the most value.</p>
              <div className="d-flex gap-2">
                <span className="tag">Design</span>
                <span className="tag medium">Medium</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="card">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Leaderboard</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div className="d-flex justify-between align-center" style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: '12px' }}>
                <div className="d-flex align-center gap-2">
                  <div style={{ width: '32px', height: '32px', background: '#1f2937', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>1</div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.9rem' }}>Hassan Ali</h4>
                    <p style={{ margin: 0, fontSize: '0.75rem' }}>JavaScript, React</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>88% Trust</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>24 contributions</div>
                </div>
              </div>
              <div className="d-flex justify-between align-center" style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: '12px' }}>
                <div className="d-flex align-center gap-2">
                  <div style={{ width: '32px', height: '32px', background: '#d97706', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>2</div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.9rem' }}>Sara Noor</h4>
                    <p style={{ margin: 0, fontSize: '0.75rem' }}>Python, Data</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>74% Trust</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>11 contributions</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Recent Activity</h3>
            <div style={{ fontSize: '0.9rem' }}>
              <div style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--border-light)' }}>
                <strong>Ayesha Khan</strong> offered help on "Need help"
              </div>
              <div style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--border-light)' }}>
                "Need help making my portfolio responsive" was marked as solved
              </div>
              <div style={{ padding: '0.75rem 0' }}>
                Your trust score increased after a solved request
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
