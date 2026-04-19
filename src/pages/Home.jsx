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
    <div className="site-shell">
      {/* Note: The topbar nav is handled in App.jsx */}
      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy fade-in">
              <p className="eyebrow">SMIT Grand Coding Night 2026</p>
              <h1>Find help faster. Become help that matters.</h1>
              <p>HelpHub AI is a community-powered support network for students, mentors, creators, and builders. Ask for help, offer help, track impact, and let AI surface smarter matches across the platform.</p>
              <div className="hero-actions">
                <Link className="btn btn-primary" to="/dashboard">Open product demo</Link>
                <Link className="btn btn-secondary" to="/create-request">Post a request</Link>
              </div>
              <div className="stats-grid">
                <div className="stat-card">
                  <p className="eyebrow">Members</p>
                  <div className="stat-value">384+</div>
                  <p>Students, mentors, and helpers in the loop.</p>
                </div>
                <div className="stat-card">
                  <p className="eyebrow">Requests</p>
                  <div className="stat-value">54+</div>
                  <p>Support posts shared across learning journeys.</p>
                </div>
                <div className="stat-card">
                  <p className="eyebrow">Solved</p>
                  <div className="stat-value">23+</div>
                  <p>Problems resolved through fast community action.</p>
                </div>
              </div>
            </div>
            
            <div className="hero-panel fade-in">
              <span className="orb"></span>
              <p className="eyebrow">Live product feel</p>
              <h2>More than a form. More like an ecosystem.</h2>
              <p>A polished multi-page experience inspired by product platforms, with AI summaries, trust scores, contribution signals, notifications, and leaderboard momentum built directly in React and Supabase.</p>
              <div className="stack">
                <div className="feature-card" style={{ color: 'black' }}>
                  <h3 style={{ color: 'black' }}>AI request intelligence</h3>
                  <p style={{ color: 'black' }}>Auto-categorization, urgency detection, tags, rewrite suggestions, and trend snapshots.</p>
                </div>
                <div className="feature-card" style={{ color: 'black' }}>
                  <h3 style={{ color: 'black' }}>Community trust graph</h3>
                  <p style={{ color: 'black' }}>Badges, helper rankings, trust score boosts, and visible contribution history.</p>
                </div>
                <div className="feature-card" style={{ color: 'black' }}>
                  <h3 style={{ color: 'black' }}>92%</h3>
                  <p style={{ color: 'black' }}>Top trust score currently active across the sample mentor network.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="section-kicker">Core flow</p>
                <h2>From struggling alone to solving together</h2>
              </div>
              <Link className="btn btn-secondary" to="/onboarding">Try onboarding AI</Link>
            </div>
            <div className="card-grid">
              <article className="feature-card fade-in">
                <h3>Ask for help clearly</h3>
                <p>Create structured requests with category, urgency, AI suggestions, and tags that attract the right people.</p>
              </article>
              <article className="feature-card fade-in">
                <h3>Discover the right people</h3>
                <p>Use the explore feed, helper lists, notifications, and messaging to move quickly once a match happens.</p>
              </article>
              <article className="feature-card fade-in">
                <h3>Track real contribution</h3>
                <p>Trust scores, badges, solved requests, and rankings help the community recognize meaningful support.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="section-kicker">Featured requests</p>
                <h2>Community problems currently in motion</h2>
              </div>
              <Link className="btn btn-secondary" to="/explore">View full feed</Link>
            </div>
            <div className="card-grid">
              {featuredRequests.length > 0 ? (
                featuredRequests.map((req, i) => (
                  <article key={req.id || i} className="request-card fade-in d-flex flex-col justify-between" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ flex: 1 }}>
                      <div className="card-meta" style={{ marginBottom: '16px' }}>
                        <span className="tag">{req.category}</span>
                        <span className={`tag ${req.urgency === 'High' ? 'urgent' : req.urgency === 'Low' ? 'success' : ''}`}>{req.urgency}</span>
                        <span className={`tag ${req.status === 'Solved' ? 'success' : ''}`}>{req.status}</span>
                      </div>
                      <h3>{req.title}</h3>
                      <p style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '16px' }}>
                        {req.description}
                      </p>
                      {req.tags && req.tags.length > 0 && (
                        <div className="tag-row" style={{ marginBottom: '16px' }}>
                          {req.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="tag" style={{ background: 'transparent', border: '1px solid var(--line)' }}>{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="list-item" style={{ paddingBottom: 0, borderBottom: 0, marginTop: 'auto' }}>
                      <div>
                        <strong style={{ display: 'block', color: 'var(--text)' }}>{req.author_name}</strong>
                        <p style={{ margin: 0, fontSize: '0.9rem' }}>{req.helpers?.length || 0} helpers interested</p>
                      </div>
                      <Link className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }} to={`/request/${req.id}`}>Open details</Link>
                    </div>
                  </article>
                ))
              ) : (
                <article className="request-card fade-in" style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                  <p>No featured requests found yet. Be the first to ask for help!</p>
                </article>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          HelpHub AI is built as a premium-feel, multi-page community support product using React, Supabase, and Vercel.
        </div>
      </footer>
    </div>
  );
}
