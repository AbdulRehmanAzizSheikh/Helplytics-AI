import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function CreateRequest() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [urgency, setUrgency] = useState('Low');
  
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const navigate = useNavigate();

  const handleAiSuggest = async () => {
    if (!description) return alert("Write a description first!");
    try {
      const res = await fetch('http://localhost:5000/api/requests/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: description + " " + title })
      });
      const data = await res.json();
      setAiSuggestions(data);
    } catch (e) {
      console.error(e);
    }
  };

  const applySuggestions = () => {
    if(!aiSuggestions) return;
    setCategory(aiSuggestions.suggestedCategory);
    setUrgency(aiSuggestions.detectedUrgency);
    setTags(aiSuggestions.suggestedTags.join(", "));
    if (aiSuggestions.rewriteSuggestion) setDescription(aiSuggestions.rewriteSuggestion);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user')) || { name: 'Anonymous' };
    
    try {
      const res = await fetch('http://localhost:5000/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title, description, tags: tags.split(",").map(t => t.trim()), category, urgency, author: user.name
        })
      });
      if (res.ok) {
        navigate('/explore');
      }
    } catch(e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="dark-section" style={{ padding: '3rem', marginBottom: '3rem' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem' }}>
          CREATE REQUEST
        </p>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Turn a rough problem into a clear help request.</h1>
        <p>Use built-in AI suggestions for category, urgency, tags, and a stronger description rewrite.</p>
      </div>

      <div className="grid-2" style={{ gap: '2rem' }}>
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input type="text" className="form-control" value={title} onChange={e=>setTitle(e.target.value)} required placeholder="Briefly state your issue" />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea className="form-control" value={description} onChange={e=>setDescription(e.target.value)} required placeholder="Explain the challenge, your progress, and what kind of help would be useful."></textarea>
            </div>
            
            <div className="grid-2 form-group">
              <div>
                <label>Tags</label>
                <input type="text" className="form-control" value={tags} onChange={e=>setTags(e.target.value)} placeholder="Comma separated" />
              </div>
              <div>
                <label>Category</label>
                <select className="form-control" value={category} onChange={e=>setCategory(e.target.value)}>
                  <option>Web Development</option>
                  <option>Design</option>
                  <option>Career</option>
                  <option>General</option>
                </select>
              </div>
            </div>
            
            <div className="form-group" style={{ width: '50%' }}>
              <label>Urgency</label>
              <select className="form-control" value={urgency} onChange={e=>setUrgency(e.target.value)}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div className="d-flex justify-between align-center mt-4 pt-4" style={{ borderTop: '1px solid var(--border-light)' }}>
              <button type="button" className="btn btn-secondary" onClick={handleAiSuggest}>Get AI Suggestions</button>
              <button type="submit" className="btn btn-primary">Publish request</button>
            </div>
          </form>
        </div>

        <div>
          <div className="card" style={{ background: '#f8fafc' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--primary)' }}>
              <Sparkles size={14} style={{ display: 'inline', marginRight: '5px' }}/> AI ASSISTANT
            </p>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Smart request guidance</h2>
            
            {aiSuggestions ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="d-flex justify-between" style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 600 }}>Suggested category</span>
                  <span>{aiSuggestions.suggestedCategory}</span>
                </div>
                <div className="d-flex justify-between" style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 600 }}>Detected urgency</span>
                  <span>{aiSuggestions.detectedUrgency}</span>
                </div>
                <div className="d-flex justify-between" style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 600 }}>Suggested tags</span>
                  <span>{aiSuggestions.suggestedTags.join(', ')}</span>
                </div>
                <div>
                  <span style={{ fontWeight: 600, display:'block', marginBottom:'0.5rem' }}>Rewrite suggestion</span>
                  <p style={{ fontSize: '0.9rem' }}>{aiSuggestions.rewriteSuggestion}</p>
                </div>
                <button className="btn btn-primary mt-4 w-full" onClick={applySuggestions}>Apply all suggestions</button>
              </div>
            ) : (
             <p>Write your title and description, then click "Get AI Suggestions" to let our AI analyze your request and suggest tags, urgency, and category automatically.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
