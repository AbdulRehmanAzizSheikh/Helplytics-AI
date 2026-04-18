import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import CreateRequest from './pages/CreateRequest';
import Explore from './pages/Explore';
import RequestDetail from './pages/RequestDetail';
import { HelpCircle } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="container">
        <nav>
          <Link to="/" className="d-flex align-center gap-2" style={{ textDecoration: 'none', color: 'var(--primary-dark)', fontWeight: 'bold' }}>
            <div style={{ background: 'var(--primary-dark)', color: 'white', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              H
            </div>
            HelpHub AI
          </Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/explore">Explore</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/auth" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Join the platform</Link>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/create-request" element={<CreateRequest />} />
          <Route path="/request/:id" element={<RequestDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
