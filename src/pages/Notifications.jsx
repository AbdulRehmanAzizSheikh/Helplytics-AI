import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function Notifications() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (user?.id) {
        try {
          const { data, error } = await supabase
            .from('notifications')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });
          
          if (error) throw error;
          setNotifications(data || []);
        } catch (e) {
          console.error(e);
        }
      }
    };
    fetchNotifications();
  }, [user?.id]);

  const markRead = async (id) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', id);
      
      if (error) throw error;
      setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (e) {
      console.error(e);
    }
  };

  const markAllRead = async () => {
    if (!user?.id) return;
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', user.id);
      
      if (error) throw error;
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    } catch (e) {
      console.error(e);
    }
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
            <div key={n.id} className={`notif-row ${!n.read ? 'unread' : ''}`} onClick={() => markRead(n.id)} style={{ cursor: 'pointer' }}>
              <div>
                <p style={{ fontWeight: n.read ? 400 : 700, margin: 0, marginBottom: '0.2rem', color: 'var(--text)' }}>{n.text}</p>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{n.type} • {new Date(n.created_at).toLocaleString()}</p>
              </div>
              <span className={`tag ${n.read ? '' : 'tag-low'}`}>{n.read ? 'Read' : 'Unread'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
