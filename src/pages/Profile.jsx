import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const [username, setUsername] = useState(user?.username || '');
  const [skills, setSkills] = useState(user?.skills?.join(', ') || '');
  const [interests, setInterests] = useState(user?.interests?.join(', ') || '');
  const [location, setLocation] = useState(user?.location || '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          username,
          skills: skills.split(',').map(s => s.trim()).filter(Boolean),
          interests: interests.split(',').map(s => s.trim()).filter(Boolean),
          location,
        })
        .eq('id', user.id)
        .select()
        .single();
      
      if (error) throw error;
      localStorage.setItem('user', JSON.stringify({ ...user, ...data }));
      alert('Profile updated!');
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
    setSaving(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="fade-in">
      <div className="hero-dark">
        <span className="section-label section-label-light">PROFILE</span>
        <h1 style={{ fontSize: '2.5rem', margin: 0 }}>{user.username}</h1>
        <p style={{ margin: 0, marginTop: '0.5rem' }}>{user.role} • {user.location || 'No location set'}</p>
      </div>

      <div className="grid-2" style={{ gap: '2rem' }}>
        {/* Public Profile */}
        <div className="card">
          <span className="section-label">PUBLIC PROFILE</span>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Skills and reputation</h2>

          <div className="d-flex justify-between" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
            <span>Trust score</span>
            <span style={{ fontWeight: 700 }}>{user.trust_score || 50}%</span>
          </div>
          <div className="progress-bar mb-4">
            <div className="progress-fill" style={{ width: `${user.trust_score || 50}%` }}></div>
          </div>
          <div className="d-flex justify-between mb-6" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
            <span>Contributions</span>
            <span style={{ fontWeight: 700 }}>{user.contributions || 0}</span>
          </div>

          <h3 className="mb-2">Skills</h3>
          <div className="d-flex gap-2 flex-wrap mb-4">
            {user.skills?.length > 0 ? user.skills.map(s => <span key={s} className="tag">{s}</span>) : <p>No skills added</p>}
          </div>

          <h3 className="mb-2">Badges</h3>
          <div className="d-flex gap-2 flex-wrap">
            {user.badges?.length > 0 ? user.badges.map(b => <span key={b} className="tag tag-solved">{b}</span>) : <p>No badges earned</p>}
          </div>
        </div>

        {/* Edit Profile */}
        <div className="card">
          <span className="section-label">EDIT PROFILE</span>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Update your identity</h2>
          <form onSubmit={handleSave}>
            <div className="grid-2">
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input type="text" className="form-control" value={location} onChange={e => setLocation(e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>Skills</label>
              <input type="text" className="form-control" value={skills} onChange={e => setSkills(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Interests</label>
              <input type="text" className="form-control" value={interests} onChange={e => setInterests(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary w-full" disabled={saving}>{saving ? 'Saving...' : 'Save profile'}</button>
          </form>
          <button className="btn btn-danger w-full mt-4" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}
