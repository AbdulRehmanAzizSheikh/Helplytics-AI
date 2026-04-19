import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

export default function Explore() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterUrgency, setFilterUrgency] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    setLoading(true);
    const { data, error } = await supabase
      .from("requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setRequests(data);
    }
    setLoading(false);
  }

  const filteredRequests = requests.filter((req) => {
    let matches = true;
    if (filterCategory && req.category !== filterCategory) matches = false;
    if (filterUrgency && req.urgency !== filterUrgency) matches = false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const textMatch =
        req.title?.toLowerCase().includes(q) ||
        req.description?.toLowerCase().includes(q);
      const tagMatch = req.tags?.some((tag) => tag.toLowerCase().includes(q));
      if (!textMatch && !tagMatch) matches = false;
    }
    return matches;
  });

  return (
    <div className="site-shell fade-in">
      <main className="container">
        {/* Top Header Block */}
        <div
          className="panel"
          style={{
            marginBottom: "24px",
            background:
              "linear-gradient(140deg, rgba(20, 29, 32, 0.93), rgba(16, 26, 29, 0.88))",
            marginTop: "30px",
          }}
        >
          <p
            className="eyebrow"
            style={{ color: "rgba(255,255,255,0.7)", marginBottom: "8px" }}
          >
            EXPLORE / FEED
          </p>
          <h1
            style={{
              color: "white",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              lineHeight: 1.15,
              marginBottom: "16px",
            }}
          >
            Browse help requests with filterable
            <br />
            community context.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.85)" }}>
            Filter by category, urgency, skills, and location to surface the
            best matches.
          </p>
        </div>

        {/* Feed Grid Layout */}
        <div className="feed-grid">
          {/* Sidebar */}
          <aside>
            <div className="panel">
              <span
                className="eyebrow"
                style={{ color: "#0f766e", marginBottom: "12px" }}
              >
                FILTERS
              </span>
              <h2 style={{ marginBottom: "32px" }}>Refine the feed</h2>

              <div className="field-full">
                <label>Search</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by title or tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="field-full" style={{ marginTop: "24px" }}>
                <label>Category</label>
                <select
                  className="form-control"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="">All categories</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Design">Design</option>
                  <option value="Career">Career</option>
                  <option value="Academics">Academics</option>
                  <option value="Content">Content</option>
                  <option value="Community">Community</option>
                </select>
              </div>

              <div className="field-full" style={{ marginTop: "24px" }}>
                <label>Urgency</label>
                <select
                  className="form-control"
                  value={filterUrgency}
                  onChange={(e) => setFilterUrgency(e.target.value)}
                >
                  <option value="">All urgency levels</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Results Feed */}
          <div>
            <div style={{ display: "grid", gap: "16px" }}>
              {loading ? (
                <div className="panel">
                  <p>Loading feed...</p>
                </div>
              ) : filteredRequests.length > 0 ? (
                filteredRequests.map((req) => (
                  <article key={req.id} className="request-card fade-in">
                    <div className="card-meta" style={{ marginBottom: "16px" }}>
                      <span className="tag">{req.category}</span>
                      <span
                        className={`tag ${["Critical", "High"].includes(req.urgency) ? "urgent" : req.urgency === "Medium" ? "tag-medium" : "success"}`}
                      >
                        {req.urgency}
                      </span>
                      <span
                        className={`tag ${req.status === "Solved" ? "success" : "tag-open"}`}
                      >
                        {req.status}
                      </span>
                    </div>

                    <h3 style={{ marginBottom: "12px" }}>{req.title}</h3>
                    <p
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        marginBottom: "16px",
                      }}
                    >
                      {req.description}
                    </p>

                    {req.tags && req.tags.length > 0 && (
                      <div className="tag-row" style={{ marginBottom: "16px" }}>
                        {req.tags.map((tag) => (
                          <span
                            key={tag}
                            className="tag"
                            style={{
                              background: "transparent",
                              border: "1px solid var(--line)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div
                      className="list-item"
                      style={{
                        paddingBottom: 0,
                        borderBottom: 0,
                        marginTop: "24px",
                      }}
                    >
                      <div>
                        <strong
                          style={{ display: "block", color: "var(--text)" }}
                        >
                          {req.author_name}
                        </strong>
                        <p style={{ margin: 0, fontSize: "0.9rem" }}>
                          {req.location ? `${req.location} • ` : ""}
                          {req.helpers?.length || 0} helper
                          {req.helpers?.length !== 1 ? "s" : ""} interested
                        </p>
                      </div>
                      <Link
                        className="btn btn-secondary"
                        style={{ padding: "8px 16px", fontSize: "0.9rem" }}
                        to={`/request/${req.id}`}
                      >
                        Open details
                      </Link>
                    </div>
                  </article>
                ))
              ) : (
                <div
                  className="panel"
                  style={{ textAlign: "center", padding: "40px 20px" }}
                >
                  <h3>No requests found</h3>
                  <p>Try broadening the filters to surface more matches.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
