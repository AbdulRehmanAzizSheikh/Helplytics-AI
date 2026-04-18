import { useState, useEffect } from 'react';
import API from '../api';

export default function Notifications() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user?._id) {
      fetch(`${API}/notifications/${user._id}`).then(r => r.json()).then(setNotifications).catch(console.error);
    }
  }, []);

  const markRead = async (id) => {
    await fetch(`${API}/notifications/${id}/read`, { method: 'PATCH' });
    setNotifications(notifications.map(n => n._id === id ? { ...n, read: true } : n));
  };

  const markAllRead = async () => {
    if (!user?._id) return;
    await fetch(`${API}/notifications/${user._id}/read-all`, { method: 'PATCH' });
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="fade-in">
      <div className="hero-dark">
        <span className="section-label section-label-light">NOTIFICATIONS</span>
        <h1 style={{ fontSize: '2.2rem', margin: 0 }}>Stay updated on requests, helpers, and trust signals.</h1>
      </div>

      <div className="card">
        <div className="d-flex justify-between align-center mb-4">
          <div>
            <span className="section-label">LIVE UPDATES</span>
            <h2 style={{ fontSize: '1.5rem' }}>Notification feed</h2>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={markAllRead}>Mark all read</button>
        </div>
        <div>
          {notifications.length === 0 && <p className="text-center mt-4">No notifications yet.</p>}
          {notifications.map(n => (
            <div key={n._id} className={`notif-row ${!n.read ? 'unread' : ''}`} onClick={() => markRead(n._id)} style={{ cursor: 'pointer' }}>
              <div>
                <p style={{ fontWeight: n.read ? 400 : 700, margin: 0, marginBottom: '0.2rem', color: 'var(--text)' }}>{n.text}</p>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{n.type} • {new Date(n.createdAt).toLocaleString()}</p>
              </div>
              <span className={`tag ${n.read ? '' : 'tag-low'}`}>{n.read ? 'Read' : 'Unread'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
