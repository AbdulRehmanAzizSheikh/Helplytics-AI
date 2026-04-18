import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import CreateRequest from './pages/CreateRequest';
import Explore from './pages/Explore';
import RequestDetail from './pages/RequestDetail';
import Onboarding from './pages/Onboarding';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Leaderboard from './pages/Leaderboard';
import AiCenter from './pages/AiCenter';
import Notifications from './pages/Notifications';
import Admin from './pages/Admin';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <Router>
      <div className="container">
        <nav style={{ flexWrap: 'wrap' }}>
          <Link to="/" className="d-flex align-center gap-2" style={{ textDecoration: 'none', color: 'var(--primary-dark)', fontWeight: 'bold' }}>
            <div style={{ background: 'var(--primary-dark)', color: 'white', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              H
            </div>
            HelpHub AI
          </Link>
          <div className="nav-links" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <Link to="/explore">Explore</Link>
            <Link to="/leaderboard">Leaderboard</Link>
            <Link to="/ai-center">AI Center</Link>
            
            {user ? (
              <>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/messages">Messages</Link>
                <Link to="/notifications">Notifications</Link>
                <Link to="/admin" style={{ color: '#dc2626' }}>Admin</Link>
                <Link to="/profile" className="d-flex align-center gap-2" style={{ textDecoration: 'none', color: 'var(--primary-dark)', fontWeight: 'bold' }}>
                  <div style={{ background: 'var(--primary)', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {user.name ? user.name.substring(0, 2).toUpperCase() : 'U'}
                  </div>
                </Link>
                <Link to="/create-request" className="btn btn-primary" style={{ padding: '0.4rem 1rem' }}>Ask Help</Link>
              </>
            ) : (
              <Link to="/auth" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Join</Link>
            )}
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/create-request" element={<CreateRequest />} />
          <Route path="/request/:id" element={<RequestDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/ai-center" element={<AiCenter />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
