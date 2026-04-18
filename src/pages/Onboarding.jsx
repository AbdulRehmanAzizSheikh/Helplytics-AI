import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Onboarding() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!user) { navigate('/auth'); return null; }

  const getAiSuggestion = async () => {
    try {
      const res = await fetch(`${API}/users/ai-suggest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skills: skills.split(',').map(s => s.trim()),
          interests: interests.split(',').map(s => s.trim()),
        }),
      });
      const data = await res.json();
      setSuggestions(data);
    } catch (e) { console.error(e); }
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API}/users/${user._id}/onboard`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skills: skills.split(',').map(s => s.trim()),
          interests: interests.split(',').map(s => s.trim()),
          location,
        }),
      });
      const data = await res.json();
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
      window.location.reload();
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div className="grid-2 fade-in" style={{ gap: '2.5rem' }}>
      <div className="hero-dark d-flex flex-col justify-center">
        <span className="section-label section-label-light">ONBOARDING</span>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Build your reputation profile.</h1>
        <p>Let the community know what you can do and what you want to learn. Our AI will suggest where you can help and where you might need support.</p>
      </div>
      <div className="card">
        <form onSubmit={saveProfile}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" value={user.username} readOnly />
          </div>
          <div className="form-group">
            <label>Skills (comma separated)</label>
            <input type="text" className="form-control" value={skills} onChange={e => setSkills(e.target.value)} placeholder="React, Figma, Node.js" required />
          </div>
          <div className="form-group">
            <label>Interests</label>
            <input type="text" className="form-control" value={interests} onChange={e => setInterests(e.target.value)} placeholder="UI/UX, Backend, Data Science" required />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" className="form-control" value={location} onChange={e => setLocation(e.target.value)} placeholder="Karachi" required />
          </div>

          <button type="button" className="btn btn-secondary w-full mb-4" onClick={getAiSuggestion}>✨ Get AI Skill Suggestions</button>

          {suggestions && (
            <div className="ai-box mb-4">
              <span className="section-label">AI SUGGESTIONS</span>
              <p style={{ color: 'var(--text)' }}><strong>You can help with:</strong> {suggestions.canHelpWith?.join(', ')}</p>
              <p style={{ color: 'var(--text)', marginTop: '0.5rem' }}><strong>You may need help with:</strong> {suggestions.mayNeedHelp?.join(', ')}</p>
            </div>
          )}

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? 'Saving...' : 'Complete Onboarding'}
          </button>
        </form>
      </div>
    </div>
  );
}
