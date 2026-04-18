import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Both');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const endpoint = isLogin ? `${API}/users/login` : `${API}/users/register`;
      const body = isLogin ? { email, password } : { username, email, password, role };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem('user', JSON.stringify(data.user));
      if (!isLogin || !data.user.onboarded) {
        navigate('/onboarding');
      } else {
        navigate('/dashboard');
      }
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid-2 fade-in" style={{ minHeight: '65vh', gap: '2.5rem' }}>
      <div className="hero-dark d-flex flex-col justify-center">
        <span className="section-label section-label-light">COMMUNITY ACCESS</span>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Enter the support network.</h1>
        <p style={{ marginBottom: '1.5rem' }}>Choose a demo identity, set your role, and jump into a multi-page product flow designed for asking, offering, and tracking help.</p>
        <ul style={{ paddingLeft: '1.2rem', color: '#CBD5E1', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.95rem' }}>
          <li>Role-based entry for Need Help, Can Help, or Both</li>
          <li>Direct path into dashboard, requests, AI Center</li>
          <li>Persistent session powered by MongoDB</li>
        </ul>
      </div>

      <div className="card d-flex flex-col justify-center" style={{ padding: '2.5rem' }}>
        <span className="section-label">LOGIN / SIGNUP</span>
        <h2 style={{ marginBottom: '1.5rem' }}>Authenticate your community profile</h2>

        <div className="d-flex gap-2 mb-4">
          <button className={`btn ${isLogin ? 'btn-primary' : 'btn-secondary'} btn-sm`} onClick={() => setIsLogin(true)}>Login</button>
          <button className={`btn ${!isLogin ? 'btn-primary' : 'btn-secondary'} btn-sm`} onClick={() => setIsLogin(false)}>Sign Up</button>
        </div>

        {error && <p style={{ color: '#DC2626', marginBottom: '1rem', fontWeight: 600 }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Username</label>
              <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} placeholder="e.g. Ayesha Khan" required />
            </div>
          )}
          {!isLogin && (
            <div className="form-group">
              <label>Role selection</label>
              <select className="form-control" value={role} onChange={e => setRole(e.target.value)}>
                <option>Both</option>
                <option>Need Help</option>
                <option>Can Help</option>
              </select>
            </div>
          )}
          <div className={isLogin ? '' : 'grid-2'}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder="community@helphub.ai" required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-full mt-2" disabled={loading}>
            {loading ? 'Please wait...' : (isLogin ? 'Continue to dashboard' : 'Create account')}
          </button>
        </form>
      </div>
    </div>
  );
}
