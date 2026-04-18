import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || { name: '', role: 'Both' });
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState(null);

  const getAiSuggestion = () => {
    // Dummy AI Logic
    setSuggestions({
      helpWith: "React Context API, Basic Layouts, Debugging",
      needHelp: "Advanced Node.js, Deployment, Database Design"
    });
  };

  const saveProfile = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, skills, interests, location, onboarded: true };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    navigate('/dashboard');
  }

  return (
    <div className="grid-2" style={{ gap: '2rem' }}>
      <div className="dark-section d-flex flex-column" style={{ justifyContent: 'center' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', color: '#94a3b8' }}>
          ONBOARDING
        </p>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Build your reputation profile.</h1>
        <p>Let the community know what you can do and what you want to learn. Our AI will automatically suggest connections.</p>
      </div>
      <div>
        <div className="card">
          <form onSubmit={saveProfile}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" value={user.name} onChange={e => setUser({...user, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>My Skills (Comma separated)</label>
              <textarea className="form-control" style={{ minHeight: '80px' }} value={skills} onChange={e => setSkills(e.target.value)} required></textarea>
            </div>
            <div className="form-group">
              <label>Learning Interests</label>
              <textarea className="form-control" style={{ minHeight: '80px' }} value={interests} onChange={e => setInterests(e.target.value)} required></textarea>
            </div>
            <div className="form-group">
              <label>Location</label>
              <input type="text" className="form-control" value={location} onChange={e => setLocation(e.target.value)} required />
            </div>
            
            <button type="button" className="btn btn-secondary w-full mb-6 d-flex justify-center gap-2" onClick={getAiSuggestion}>
              <Sparkles size={16} color="var(--primary)" /> Let AI Suggest Connections
            </button>

            {suggestions && (
              <div className="ai-box mb-6">
                <p><strong>You could help others with:</strong> {suggestions.helpWith}</p>
                <p style={{ marginTop: '0.5rem' }}><strong>You might need help with:</strong> {suggestions.needHelp}</p>
              </div>
            )}

            <button type="submit" className="btn btn-primary w-full">Complete Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
}
