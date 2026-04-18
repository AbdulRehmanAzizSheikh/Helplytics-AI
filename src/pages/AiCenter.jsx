export default function AiCenter() {
  return (
    <div>
      <div className="dark-section" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.5rem', color: '#94a3b8' }}>
          AI CENTER
        </p>
        <h1 style={{ fontSize: '2.5rem', margin: 0 }}>See what the platform intelligence is noticing.</h1>
        <p style={{ marginTop: '0.5rem' }}>AI-like insights summarize demand trends, helper readiness, urgency signals, and request recommendations.</p>
      </div>

      <div className="grid-3" style={{ marginBottom: '2rem' }}>
        <div className="card">
          <p style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--primary)' }}>TREND PULSE</p>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Web Development</h2>
          <p>Most common support area based on active community requests.</p>
        </div>
        <div className="card">
          <p style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--primary)' }}>URGENCY WATCH</p>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>2</h2>
          <p>Requests currently flagged high priority by the urgency detector.</p>
        </div>
        <div className="card">
          <p style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--primary)' }}>MENTOR POOL</p>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>2</h2>
          <p>Trusted helpers with strong response history and contribution signals.</p>
        </div>
      </div>

      <div className="card ai-box" style={{ padding: '2rem' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--primary-dark)' }}>AI RECOMMENDATIONS</p>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Requests needing attention</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="card" style={{ background: '#f8fafc' }}>
            <h3 style={{ margin: 0, marginBottom: '0.5rem' }}>Need help</h3>
            <p style={{ margin: 0, marginBottom: '1rem', fontSize: '0.9rem' }}>AI summary: Web Development request with high urgency. Best suited for members with relevant expertise.</p>
             <div className="d-flex gap-2">
                <span className="tag">Web Development</span>
                <span className="tag high">High</span>
             </div>
          </div>
          <div className="card" style={{ background: '#f8fafc' }}>
            <h3 style={{ margin: 0, marginBottom: '0.5rem' }}>Looking for Figma feedback on a volunteer event poster</h3>
            <p style={{ margin: 0, marginBottom: '1rem', fontSize: '0.9rem' }}>A visual design critique request where feedback on hierarchy, spacing, and messaging would create the most value.</p>
             <div className="d-flex gap-2">
                <span className="tag">Design</span>
                <span className="tag medium">Medium</span>
             </div>
          </div>
          <div className="card" style={{ background: '#f8fafc' }}>
            <h3 style={{ margin: 0, marginBottom: '0.5rem' }}>Need mock interview support for internship applications</h3>
            <p style={{ margin: 0, marginBottom: '1rem', fontSize: '0.9rem' }}>Career coaching request focused on confidence-building, behavioral answers, and entry-level frontend interviews.</p>
             <div className="d-flex gap-2">
                <span className="tag">Career</span>
                <span className="tag low">Low</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
