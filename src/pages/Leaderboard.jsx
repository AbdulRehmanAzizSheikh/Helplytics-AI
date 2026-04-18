export default function Leaderboard() {
  return (
    <div>
      <div className="dark-section" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.5rem', color: '#94a3b8' }}>
          LEADERBOARD
        </p>
        <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Recognize the people who keep the community moving.</h1>
        <p style={{ marginTop: '0.5rem' }}>Trust score, contribution count, and badges create visible momentum for reliable helpers.</p>
      </div>

      <div className="grid-2" style={{ gap: '2rem' }}>
        <div className="card">
          <p style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--primary)' }}>TOP HELPERS</p>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Rankings</h2>

          <div className="d-flex" style={{ flexDirection: 'column', gap: '1rem' }}>
            <div className="card d-flex align-center justify-between" style={{ padding: '1rem', border: '2px solid var(--primary)' }}>
              <div className="d-flex align-center gap-4">
                <div style={{ background: '#1f2937', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  HA
                </div>
                <div>
                  <h4 style={{ margin: 0 }}>#1 Hassan Ali</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>JavaScript, React, Git/GitHub</p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 'bold' }}>88%</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>24 contributions</div>
              </div>
            </div>
            
            <div className="card d-flex align-center justify-between" style={{ padding: '1rem' }}>
              <div className="d-flex align-center gap-4">
                <div style={{ background: '#d97706', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  SN
                </div>
                <div>
                  <h4 style={{ margin: 0 }}>#2 Sara Noor</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Python, Data Analysis</p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 'bold' }}>74%</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>11 contributions</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <p style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--primary)' }}>BADGE SYSTEM</p>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Trust and achievement</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="card" style={{ background: '#f8fafc', padding: '1.2rem' }}>
              <h3 style={{ margin: 0, marginBottom: '0.5rem' }}>Hassan Ali</h3>
              <p style={{ margin: 0, marginBottom: '1rem', fontSize: '0.9rem' }}>Code Rescuer • Bug Hunter</p>
              <div style={{ height: '8px', width: '100%', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '88%', background: 'linear-gradient(90deg, #f59e0b, #10b981)' }}></div>
              </div>
            </div>
            
            <div className="card" style={{ background: '#f8fafc', padding: '1.2rem' }}>
              <h3 style={{ margin: 0, marginBottom: '0.5rem' }}>Sara Noor</h3>
              <p style={{ margin: 0, marginBottom: '1rem', fontSize: '0.9rem' }}>Community Voice</p>
              <div style={{ height: '8px', width: '100%', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '74%', background: 'linear-gradient(90deg, #f59e0b, #10b981)' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
