export default function Notifications() {
  const notifications = [
    { text: 'Ayesha Khan offered help on "Need help"', type: 'Match', time: 'Just now', read: false },
    { text: 'Your request "Need help" is now live in the community feed', type: 'Request', time: 'Just now', read: false },
    { text: '"Need help making my portfolio responsive before demo day" was marked as solved', type: 'Status', time: '12 min ago', read: false },
    { text: 'New helper matched to your responsive portfolio request', type: 'Match', time: '12 min ago', read: true },
    { text: 'Your trust score increased after a solved request', type: 'Reputation', time: '1 hr ago', read: true },
    { text: 'AI Center detected rising demand for interview prep', type: 'Insight', time: 'Today', read: true },
  ];

  return (
    <div>
      <div className="dark-section" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.5rem', color: '#94a3b8' }}>
          NOTIFICATIONS
        </p>
        <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Stay updated on requests, helpers, and trust signals.</h1>
      </div>

      <div className="card">
        <p style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--primary)' }}>LIVE UPDATES</p>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Notification feed</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {notifications.map((n, i) => (
            <div key={i} className="d-flex align-center justify-between" style={{ padding: '1.2rem', borderBottom: '1px solid var(--border-light)', background: n.read ? 'transparent' : '#f8fafc' }}>
              <div>
                <p style={{ fontWeight: n.read ? 'normal' : 'bold', margin: 0, marginBottom: '0.25rem' }}>{n.text}</p>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{n.type} • {n.time}</p>
              </div>
              <div>
                <span className="tag" style={{ background: n.read ? '#e5e7eb' : '#f0fdf4', color: n.read ? '#6b7280' : '#16a34a' }}>
                  {n.read ? 'Read' : 'Unread'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
