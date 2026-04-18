import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Home() {
  const [featuredRequests, setFeaturedRequests] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data, error } = await supabase
          .from('requests')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);
        if (error) throw error;
        setFeaturedRequests(data || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <div className="grid-2" style={{ gap: '2.5rem', marginBottom: '4rem' }}>
        <div style={{ paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <span className="section-label">SMIT GRAND CODING NIGHT 2026</span>
          <h1 style={{ marginBottom: '0.5rem' }}>Find help faster.<br/>Become help that matters.</h1>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: 1.7 }}>
            HelpHub AI is a community-powered support network for students, mentors, creators, and builders.
            Ask for help, offer help, track impact, and let AI surface smarter matches across the platform.
          </p>
          <div className="d-flex flex-wrap gap-4 mb-4">
            <Link to="/dashboard" className="btn btn-primary">Open product demo</Link>
            <Link to="/create-request" className="btn btn-secondary">Post a request</Link>
          </div>

          {/* Stats */}
          <div className="grid-3 mt-4">
            <div className="card card-flat" style={{ padding: '1.25rem' }}>
              <span className="section-label">MEMBERS</span>
              <div className="stat-value" style={{ fontSize: '1.8rem' }}>384+</div>
              <p style={{ fontSize: '0.85rem' }}>Students, mentors, and helpers in the loop.</p>
            </div>
            <div className="card card-flat" style={{ padding: '1.25rem' }}>
              <span className="section-label">REQUESTS</span>
              <div className="stat-value" style={{ fontSize: '1.8rem' }}>54+</div>
              <p style={{ fontSize: '0.85rem' }}>Support posts shared across learning journeys.</p>
            </div>
            <div className="card card-flat" style={{ padding: '1.25rem' }}>
              <span className="section-label">SOLVED</span>
              <div className="stat-value" style={{ fontSize: '1.8rem' }}>23+</div>
              <p style={{ fontSize: '0.85rem' }}>Problems resolved through fast community action.</p>
            </div>
          </div>
        </div>

        {/* Right side — product feel */}
        <div className="hero-dark" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', margin: 0 }}>
          <div className="d-flex justify-between align-center mb-6">
            <span className="section-label section-label-light" style={{ margin: 0 }}>LIVE PRODUCT FEEL</span>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #fbbf24, #d97706)' }}></div>
          </div>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem', lineHeight: 1.15 }}>More than a form.<br/>More like an ecosystem.</h2>
          <p style={{ marginBottom: '2rem' }}>
            A polished multi-page experience inspired by product platforms, with AI summaries, trust scores, contribution signals, notifications, and leaderboard momentum built directly in React and Supabase.
          </p>
          <div className="d-flex flex-col gap-3">
            <div className="card card-flat" style={{ background: 'rgba(255,255,255,0.95)' }}>
              <h3 style={{ color: 'var(--text)' }}>✨ AI request intelligence</h3>
              <p style={{ color: 'var(--text)' }}>Auto-categorization, urgency detection, tags, rewrite suggestions, and trend snapshots.</p>
            </div>
            <div className="card card-flat" style={{ background: 'rgba(255,255,255,0.95)' }}>
              <h3 style={{ color: 'var(--text)' }}>📊 Community trust graph</h3>
              <p style={{ color: 'var(--text)' }}>Badges, helper rankings, trust score boosts, and visible contribution history.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Flow */}
      <div className="mb-6 mt-6 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
        <span className="section-label">CORE FLOW</span>
        <div className="d-flex justify-between align-center flex-wrap mb-4" style={{ gap: '1rem' }}>
          <h2>From struggling alone to solving together</h2>
          <Link to="/onboarding" className="btn btn-secondary btn-sm">Try onboarding AI</Link>
        </div>
        <div className="grid-3">
          <div className="card">
            <h3 className="mb-2">Ask for help clearly</h3>
            <p>Create structured requests with category, urgency, AI suggestions, and tags that attract the right people.</p>
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

      {/* Featured Requests */}
      <div className="mb-6 mt-6 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
        <span className="section-label">FEATURED REQUESTS</span>
        <div className="d-flex justify-between align-center flex-wrap mb-4" style={{ gap: '1rem' }}>
          <h2>Community problems currently in motion</h2>
          <Link to="/explore" className="btn btn-secondary btn-sm">View full feed</Link>
        </div>
        <div className="grid-3">
          {featuredRequests.length > 0 ? featuredRequests.map((req, i) => (
            <div key={req.id || i} className="card d-flex flex-col justify-between fade-in">
              <div>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <span className="tag">{req.category}</span>
                  <span className={`tag ${req.urgency === 'High' ? 'tag-high' : req.urgency === 'Medium' ? 'tag-medium' : 'tag-low'}`}>{req.urgency}</span>
                  <span className={`tag ${req.status === 'Solved' ? 'tag-solved' : 'tag-open'}`}>{req.status}</span>
                </div>
                <h3 className="mb-2">{req.title}</h3>
                <p className="mb-4" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {req.description}
                </p>
                {req.tags && req.tags.length > 0 && (
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    {req.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="tag" style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="d-flex justify-between align-center pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                <div>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text)' }}>{req.author_name}</strong>
                  <p style={{ margin: 0, fontSize: '0.8rem' }}>{req.helpers?.length || 0} helpers interested</p>
                </div>
                <Link to={`/request/${req.id}`} className="btn btn-secondary btn-sm">Open details</Link>
              </div>
            </div>
          )) : (
            <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>
              <p>No featured requests found yet. Be the first to ask for help!</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-6" style={{ padding: '2rem 0', borderTop: '1px solid var(--border)' }}>
        <p>HelpHub AI is built as a premium-feel, multi-page community support product using React, Supabase, and Vercel.</p>
      </div>
    </div>
  );
}
