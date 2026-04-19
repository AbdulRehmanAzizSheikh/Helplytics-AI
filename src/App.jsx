import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import CreateRequest from './pages/CreateRequest';
import RequestDetail from './pages/RequestDetail';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Leaderboard from './pages/Leaderboard';
import AiCenter from './pages/AiCenter';
import Notifications from './pages/Notifications';
import Admin from './pages/Admin';
import './App.css';

function NavBar() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <header className="topbar">
      <div className="container nav">
        <Link to="/" className="brand">
          <span className="brand-badge">H</span>
          <span>HelpHub AI</span>
        </Link>
        <nav className="nav-links">
          <Link to="/" className={isActive('/')}>Home</Link>
          <Link to="/explore" className={isActive('/explore')}>Explore</Link>
          <Link to="/leaderboard" className={isActive('/leaderboard')}>Leaderboard</Link>
          <Link to="/ai-center" className={isActive('/ai-center')}>AI Center</Link>
        </nav>
        <div className="nav-actions">
          {user ? (
            <>
              <Link to="/notifications" className="pill">🔔 Notifications</Link>
              <Link to="/dashboard" className="btn btn-secondary btn-sm">Dashboard</Link>
              <Link to="/create-request" className="btn btn-primary btn-sm">Post Request</Link>
              <Link to="/profile" className={isActive('/profile')}>
                <div className="avatar">{user.username?.substring(0,2).toUpperCase() || 'U'}</div>
              </Link>
            </>
          ) : (
            <>
              <Link to="/notifications" className="pill">Live community signals</Link>
              <Link to="/auth" className="btn btn-primary">Join the platform</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function App() {
  return (
    <Router>
      <div className="container">
        <NavBar />
        <main className="fade-in">
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
        </main>
      </div>
    </Router>
  );
}

export default App;
