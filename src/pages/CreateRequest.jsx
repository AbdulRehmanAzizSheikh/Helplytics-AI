import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function CreateRequest() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [urgency, setUrgency] = useState("Low");
  const [ai, setAi] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAiSuggest = async () => {
    if (!description && !title)
      return alert("Write a title & description first!");
    // Simple mock AI logic for now since backend intelligence is migrated
    setAi({
      suggestedCategory: "Web Development",
      detectedUrgency:
        description.toLowerCase().includes("urgent") ||
        description.toLowerCase().includes("asap")
          ? "High"
          : "Medium",
      suggestedTags: ["Support", "Help"],
      rewriteSuggestion:
        "Could you provide more details about the error you're seeing?",
    });
  };

  const applySuggestions = () => {
    if (!ai) return;
    setCategory(ai.suggestedCategory);
    setUrgency(ai.detectedUrgency);
    setTags(ai.suggestedTags.join(", "));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("requests").insert([
        {
          title,
          description,
          tags: tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          category,
          urgency,
          author_id: user?.id,
          author_name: user?.username || "Anonymous",
        },
      ]);

      if (error) throw error;
      navigate("/explore");
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
    setLoading(false);
  };

  return (
    <div className="fade-in">
      <div className="hero-dark">
        <span className="section-label section-label-light">
          CREATE REQUEST
        </span>
        <h1 style={{ fontSize: "2.2rem", marginBottom: "0.5rem" }}>
          Turn a rough problem into a clear help request.
        </h1>
        <p>
          Use built-in AI suggestions for category, urgency, tags, and a
          stronger description rewrite.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "2rem" }}>
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Briefly state your issue"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Explain the challenge, your progress, and what kind of help would be useful."
              />
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label>Tags (comma separated)</label>
                <input
                  type="text"
                  className="form-control"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="React, CSS, Debugging"
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Web Development</option>
                  <option>Design</option>
                  <option>Career</option>
                  <option>Backend</option>
                  <option>General</option>
                </select>
              </div>
            </div>
            <div className="form-group" style={{ maxWidth: "200px" }}>
              <label>Urgency</label>
              <select
                className="form-control"
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div
              className="d-flex gap-4 mt-4"
              style={{
                borderTop: "1px solid var(--border)",
                paddingTop: "1.5rem",
              }}
            >
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleAiSuggest}
              >
                ✨ AI suggestions
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Publishing..." : "Publish request"}
              </button>
            </div>
          </form>
        </div>

        <div className="card" style={{ background: "#FAFCFB" }}>
          <span className="section-label">✨ AI ASSISTANT</span>
          <h2 style={{ fontSize: "1.6rem", marginBottom: "1.5rem" }}>
            Smart request guidance
          </h2>
          {ai ? (
            <div className="d-flex flex-col gap-4">
              <div
                className="d-flex justify-between"
                style={{
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: "0.5rem",
                }}
              >
                <span style={{ fontWeight: 600 }}>Suggested category</span>
                <span style={{ fontWeight: 700 }}>{ai.suggestedCategory}</span>
              </div>
              <div
                className="d-flex justify-between"
                style={{
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: "0.5rem",
                }}
              >
                <span style={{ fontWeight: 600 }}>Detected urgency</span>
                <span className={`tag tag-${ai.detectedUrgency.toLowerCase()}`}>
                  {ai.detectedUrgency}
                </span>
              </div>
              <div
                className="d-flex justify-between"
                style={{
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: "0.5rem",
                }}
              >
                <span style={{ fontWeight: 600 }}>Suggested tags</span>
                <span>{ai.suggestedTags.join(", ") || "None detected"}</span>
              </div>
              <div>
                <span
                  style={{
                    fontWeight: 600,
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  Rewrite suggestion
                </span>
                <p style={{ color: "var(--text)", fontStyle: "italic" }}>
                  {ai.rewriteSuggestion}
                </p>
              </div>
              <button
                className="btn btn-primary w-full"
                onClick={applySuggestions}
              >
                Apply all suggestions
              </button>
            </div>
          ) : (
            <p>
              Write your title and description, then click "AI suggestions" to
              let our AI analyze your request.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
