import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Activity } from 'lucide-react';

export default function Home() {
  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <div className="grid-2" style={{ marginBottom: '4rem', gap: '4rem' }}>
        <div style={{ paddingTop: '2rem' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--primary-dark)' }}>
            SMIT GRAND CODING NIGHT 2026
          </p>
          <h1>Find help faster.<br/>Become help that matters.</h1>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
            HelpHub AI is a community-powered support network for students, mentors, creators, and builders. Ask for help, offer help, track impact, and let AI surface smarter matches across the platform.
          </p>
          <div className="d-flex gap-4">
            <Link to="/auth" className="btn btn-primary">Open product demo</Link>
            <Link to="/create-request" className="btn btn-secondary">Post a request</Link>
          </div>
          
          <div className="d-flex gap-4" style={{ marginTop: '3rem' }}>
            <div className="card">
              <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Members</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-main)', margin: '0.5rem 0' }}>384+</p>
              <p style={{ fontSize: '0.8rem' }}>Students, mentors, and helpers in the loop.</p>
            </div>
            <div className="card">
              <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Requests</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-main)', margin: '0.5rem 0' }}>72+</p>
              <p style={{ fontSize: '0.8rem' }}>Support posts shared across learning journeys.</p>
            </div>
          </div>
        </div>

        <div className="dark-section" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '2rem' }}>
              LIVE PRODUCT FEEL
            </p>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(45deg, #fbbf24, #d97706)' }}></div>
          </div>
          <h2 style={{ fontSize: '2.5rem', lineHeight: '1.1' }}>More than a form.<br/>More like an ecosystem.</h2>
          <p style={{ marginBottom: '2rem', fontSize: '1.05rem', marginTop: '1rem' }}>
            A polished multi-page experience inspired by product platforms, with AI summaries, trust scores, contribution signals, notifications, and leaderboard momentum.
          </p>
          
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div className="card" style={{ background: '#f8fafc', color: 'var(--text-main)' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Sparkles size={18} color="var(--primary)" /> AI request intelligence</h3>
              <p>Auto-categorization, urgency detection, tags, rewrite suggestions, and trend snapshots.</p>
            </div>
            <div className="card" style={{ background: '#f8fafc', color: 'var(--text-main)' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity size={18} color="var(--primary)" /> Community trust graph</h3>
              <p>Badges, helper rankings, trust score boosts, and visible contribution history.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ textAlign: 'center', margin: '4rem 0' }}>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
           HelpHub AI is built as a premium-feel, multi-page community support product using React, Express, MongoDB.
        </p>
      </div>
    </div>
  );
}
