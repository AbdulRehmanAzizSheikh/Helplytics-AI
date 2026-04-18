import { useState, useEffect } from 'react';
import API from '../api';

export default function Messages() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [receiverId, setReceiverId] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    fetch(`${API}/messages/all`).then(r => r.json()).then(setMessages).catch(console.error);
    fetch(`${API}/users/all`).then(r => r.json()).then(setUsers).catch(console.error);
  }, []);

  const send = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const receiver = users.find(u => u._id === receiverId) || users[0];
    if (!receiver) return alert('No users found to message');
    try {
      const res = await fetch(`${API}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: user?._id,
          senderName: user?.username || 'Anonymous',
          receiverId: receiver._id,
          receiverName: receiver.username,
          text,
        }),
      });
      if (res.ok) {
        const msg = await res.json();
        setMessages([msg, ...messages]);
        setText('');
      }
    } catch (e) { console.error(e); }
  };

  return (
    <div className="fade-in">
      <div className="hero-dark">
        <span className="section-label section-label-light">INTERACTION / MESSAGING</span>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Keep support moving through direct communication.</h1>
        <p>Basic messaging gives helpers and requesters a clear follow-up path once a match happens.</p>
      </div>

      <div className="grid-2" style={{ gap: '2rem' }}>
        <div className="card">
          <span className="section-label">CONVERSATION STREAM</span>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Recent messages</h2>
          <div className="d-flex flex-col gap-3" style={{ maxHeight: '500px', overflowY: 'auto' }}>
            {messages.length === 0 && <p>No messages yet. Start a conversation!</p>}
            {messages.map((m, i) => (
              <div key={i} style={{ padding: '1rem', background: '#F9FAFB', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', position: 'relative' }}>
                <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.3rem' }}>{m.senderName} → {m.receiverName}</p>
                <p style={{ margin: 0 }}>{m.text}</p>
                <span className="tag" style={{ position: 'absolute', right: '1rem', top: '1rem' }}>
                  {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <span className="section-label">SEND MESSAGE</span>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Start a conversation</h2>
          <form onSubmit={send}>
            <div className="form-group">
              <label>To</label>
              <select className="form-control" value={receiverId} onChange={e => setReceiverId(e.target.value)}>
                <option value="">Select a user</option>
                {users.filter(u => u._id !== user?._id).map(u => (
                  <option key={u._id} value={u._id}>{u.username}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea className="form-control" value={text} onChange={e => setText(e.target.value)} placeholder="Share support details, ask for files, or suggest next steps." required />
            </div>
            <button type="submit" className="btn btn-primary w-full">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
