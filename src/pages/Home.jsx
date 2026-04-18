import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <div className="grid-2" style={{ gap: '2.5rem', marginBottom: '4rem' }}>
        <div style={{ paddingTop: '1.5rem' }}>
          <span className="section-label">SMIT GRAND CODING NIGHT 2026</span>
          <h1 style={{ marginBottom: '1.5rem' }}>Find help faster.<br/>Become help that matters.</h1>
          <p style={{ fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 1.7 }}>
            HelpHub AI is a community-powered support network for students, mentors, creators, and builders.
            Ask for help, offer help, track impact, and let AI surface smarter matches across the platform.
          </p>
          <div className="d-flex gap-4">
            <Link to="/auth" className="btn btn-primary">Open product demo</Link>
            <Link to="/create-request" className="btn btn-secondary">Post a request</Link>
          </div>

          {/* Stats */}
          <div className="d-flex gap-4 mt-6">
            <div className="card" style={{ flex: 1 }}>
              <span className="section-label">MEMBERS</span>
              <div className="stat-value">384+</div>
              <p>Students, mentors, and helpers in the loop.</p>
            </div>
            <div className="card" style={{ flex: 1 }}>
              <span className="section-label">REQUESTS</span>
              <div className="stat-value">72+</div>
              <p>Support posts shared across learning journeys.</p>
            </div>
            <div className="card" style={{ flex: 1 }}>
              <span className="section-label">SOLVED</span>
              <div className="stat-value">69+</div>
              <p>Problems resolved through fast community action.</p>
            </div>
          </div>
        </div>

        {/* Right side — product feel */}
        <div className="hero-dark" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="d-flex justify-between align-center mb-6">
            <span className="section-label section-label-light" style={{ margin: 0 }}>LIVE PRODUCT FEEL</span>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #fbbf24, #d97706)' }}></div>
          </div>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem', lineHeight: 1.15 }}>More than a form.<br/>More like an ecosystem.</h2>
          <p style={{ marginBottom: '2rem' }}>
            A polished multi-page experience with AI summaries, trust scores, contribution signals, notifications, and leaderboard momentum.
          </p>
          <div className="d-flex flex-col gap-3">
            <div className="card card-flat" style={{ background: 'rgba(255,255,255,0.95)' }}>
              <h3>✨ AI request intelligence</h3>
              <p>Auto-categorization, urgency detection, tags, rewrite suggestions, and trend snapshots.</p>
            </div>
            <div className="card card-flat" style={{ background: 'rgba(255,255,255,0.95)' }}>
              <h3>📊 Community trust graph</h3>
              <p>Badges, helper rankings, trust score boosts, and visible contribution history.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Flow */}
      <div className="mb-6">
        <span className="section-label">CORE FLOW</span>
        <div className="d-flex justify-between align-center mb-4">
          <h2>From struggling alone to solving together</h2>
          <Link to="/onboarding" className="btn btn-secondary btn-sm">Try onboarding AI</Link>
        </div>
        <div className="grid-3">
          <div className="card">
            <h3 className="mb-2">Ask for help clearly</h3>
            <p>Create structured requests with category, urgency. AI suggestions and tags attract the right people.</p>
          </div>
          <div className="card">
            <h3 className="mb-2">Discover the right people</h3>
            <p>Use the explore feed, helper lists, notifications, and messaging to move quickly once a match happens.</p>
          </div>
          <div className="card">
            <h3 className="mb-2">Track real contribution</h3>
            <p>Trust scores, badges, solved requests, and rankings help the community recognize meaningful support.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-6" style={{ padding: '2rem 0', borderTop: '1px solid var(--border)' }}>
        <p>HelpHub AI is built as a premium-feel, multi-page community support product using React, Node.js, Express, and MongoDB.</p>
      </div>
    </div>
  );
}
