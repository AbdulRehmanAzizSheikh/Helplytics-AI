import { useState } from 'react';

export default function Messages() {
  const [messages, setMessages] = useState([
    { from: 'Ayesha Khan', to: 'Sara Noor', text: 'I checked your portfolio request. Share the breakpoint screenshots and I can suggest fixes.', time: '09:45 AM' },
    { from: 'Hassan Ali', to: 'Ayesha Khan', text: 'Your event poster concept is solid. I would tighten the CTA and reduce the background texture.', time: '11:10 AM' }
  ]);
  const [msg, setMsg] = useState("");

  const send = (e) => {
    e.preventDefault();
    if (msg.trim()) {
      setMessages([...messages, { from: 'Me', to: 'Community', text: msg, time: 'Just now' }]);
      setMsg("");
    }
  }

  return (
    <div>
      <div className="dark-section" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.5rem', color: '#94a3b8' }}>
          INTERACTION / MESSAGING
        </p>
        <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Keep support moving through direct communication.</h1>
        <p style={{ marginTop: '0.5rem' }}>Basic messaging gives helpers and requesters a clear follow-up path once a match happens.</p>
      </div>

      <div className="grid-2" style={{ gap: '2rem' }}>
        <div className="card">
          <p style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--primary)' }}>CONVERSATION STREAM</p>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Recent messages</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.map((m, i) => (
              <div key={i} className="card" style={{ padding: '1rem', background: '#f8fafc', position: 'relative' }}>
                <p style={{ fontSize: '0.85rem', fontWeight: 'bold', margin: 0, marginBottom: '0.5rem' }}>{m.from} → {m.to}</p>
                <p style={{ margin: 0, fontSize: '0.95rem' }}>{m.text}</p>
                <span className="tag" style={{ position: 'absolute', right: '1rem', top: '1rem' }}>{m.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <p style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--primary)' }}>SEND MESSAGE</p>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Start a conversation</h2>
          <form onSubmit={send}>
            <div className="form-group">
              <label>To</label>
              <select className="form-control">
                <option>Ayesha Khan</option>
                <option>Hassan Ali</option>
                <option>Sara Noor</option>
              </select>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea className="form-control" value={msg} onChange={e => setMsg(e.target.value)} placeholder="Share support details, ask for files, or suggest next steps." required></textarea>
            </div>
            <button className="btn btn-primary w-full">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
