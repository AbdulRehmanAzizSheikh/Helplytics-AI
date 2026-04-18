import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Both');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if(name) {
      localStorage.setItem('user', JSON.stringify({ name, role }));
      navigate('/explore');
    }
  };

  return (
    <div className="grid-2" style={{ marginTop: '2rem', minHeight: '60vh' }}>
      <div className="dark-section d-flex" style={{ flexDirection: 'column', justifyContent: 'center' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem' }}>
          COMMUNITY ACCESS
        </p>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Enter the support network.</h1>
        <p style={{ marginBottom: '1rem' }}>
          Choose a demo identity, set your role, and jump into a multi-page product flow designed for asking, offering, and tracking help with a premium interface.
        </p>
        <ul style={{ paddingLeft: '1.2rem', color: '#E5E7EB', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li>Role-based entry for Need Help, Can Help, or Both</li>
          <li>Direct path into dashboard, requests, AI Center</li>
          <li>Persistent demo session powered by LocalStorage</li>
        </ul>
      </div>

      <div className="card d-flex" style={{ flexDirection: 'column', justifyContent: 'center', padding: '3rem' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--primary-dark)' }}>
          LOGIN / SIGNUP
        </p>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Authenticate your community profile</h2>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Select demo user (Your Name)</label>
            <input 
              type="text" 
              className="form-control" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="e.g. Ayesha Khan"
              required
            />
          </div>
          <div className="form-group">
            <label>Role selection</label>
            <select className="form-control" value={role} onChange={e => setRole(e.target.value)}>
              <option>Both</option>
              <option>Need Help</option>
              <option>Can Help</option>
            </select>
          </div>
          <div className="grid-2 form-group">
            <div>
              <label>Email</label>
              <input type="email" className="form-control" placeholder="community@helphub.ai" />
            </div>
            <div>
              <label>Password</label>
              <input type="password" className="form-control" placeholder="••••••••" />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-full" style={{ marginTop: '1rem' }}>
            Continue to platform
          </button>
        </form>
      </div>
    </div>
  );
}
