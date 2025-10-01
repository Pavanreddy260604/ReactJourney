import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Topics = ({ user }) => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [editingTopic, setEditingTopic] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    path: "",
    intro: "",
    why: { title: "", points: [""] },
    examples: [{ title: "", code: "" }],
    best: { title: "", points: [""], conclusion: "" }
  });
  const navigate = useNavigate();

  // Fetch items (topics) for the logged-in user
  useEffect(() => {
    if (!user?.userId) {
      setLoading(false);
      setTopics([]);
      return;
    }

    fetchTopics();
  }, [user]);

  const fetchTopics = async () => {
    try {
      const response = await fetch(`https://reactjourney.onrender.com/api/items/user/${user.userId}`);
      if (!response.ok) throw new Error(`Server responded with ${response.status}`);
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error("Invalid data format");
      setTopics(data);
    } catch (err) {
      console.error("Error fetching topics:", err);
      setError("Failed to load topics");
      setTopics([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (topicId, topicTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${topicTitle}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(topicId);
    try {
      const response = await fetch(`https://reactjourney.onrender.com/api/items/${topicId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete topic");

      setTopics(topics.filter(topic => topic._id !== topicId));
      
    } catch (err) {
      console.error("Error deleting topic:", err);
      alert("Failed to delete topic. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (topic) => {
    setEditingTopic(topic._id);
    setEditFormData({
      title: topic.title || "",
      path: topic.path || "",
      intro: topic.intro || "",
      why: {
        title: topic.why?.title || "",
        points: topic.why?.points?.length > 0 ? [...topic.why.points] : [""]
      },
      examples: topic.examples?.length > 0 ? [...topic.examples] : [{ title: "", code: "" }],
      best: {
        title: topic.best?.title || "",
        points: topic.best?.points?.length > 0 ? [...topic.best.points] : [""],
        conclusion: topic.best?.conclusion || ""
      }
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNestedEditChange = (section, field, index, value) => {
    setEditFormData(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      
      if (section === "why" && field === "points") {
        copy.why.points[index] = value;
      } else if (section === "examples") {
        copy.examples[index][field] = value;
      } else if (section === "best" && field === "points") {
        copy.best.points[index] = value;
      } else if (section === "best" && field === "conclusion") {
        copy.best.conclusion = value;
      } else if (section === "why" && field === "title") {
        copy.why.title = value;
      } else if (section === "best" && field === "title") {
        copy.best.title = value;
      }
      
      return copy;
    });
  };

  const addPoint = (section, field) => {
    setEditFormData(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      
      if (section === "why" && field === "points") {
        copy.why.points.push("");
      } else if (section === "best" && field === "points") {
        copy.best.points.push("");
      } else if (section === "examples") {
        copy.examples.push({ title: "", code: "" });
      }
      
      return copy;
    });
  };

  const removePoint = (section, field, index) => {
    setEditFormData(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      
      if (section === "why" && field === "points") {
        if (copy.why.points.length > 1) {
          copy.why.points.splice(index, 1);
        }
      } else if (section === "best" && field === "points") {
        if (copy.best.points.length > 1) {
          copy.best.points.splice(index, 1);
        }
      } else if (section === "examples") {
        if (copy.examples.length > 1) {
          copy.examples.splice(index, 1);
        }
      }
      
      return copy;
    });
  };

  const handleEditSubmit = async (topicId) => {
    if (!editFormData.title.trim() || !editFormData.path.trim()) {
      alert("Title and path are required");
      return;
    }

    try {
      const response = await fetch(`https://reactjourney.onrender.com/api/items/${topicId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      });

      if (!response.ok) throw new Error("Failed to update topic");

      const updatedTopic = await response.json();
      
      // Update local state
      setTopics(topics.map(topic => 
        topic._id === topicId ? { ...topic, ...updatedTopic } : topic
      ));
      
      setEditingTopic(null);
      setEditFormData({ 
        title: "", 
        path: "", 
        intro: "", 
        why: { title: "", points: [""] }, 
        examples: [{ title: "", code: "" }], 
        best: { title: "", points: [""], conclusion: "" } 
      });
      
      alert("Topic updated successfully!");
    } catch (err) {
      console.error("Error updating topic:", err);
      alert("Failed to update topic. Please try again.");
    }
  };

  const cancelEdit = () => {
    setEditingTopic(null);
    setEditFormData({ 
      title: "", 
      path: "", 
      intro: "", 
      why: { title: "", points: [""] }, 
      examples: [{ title: "", code: "" }], 
      best: { title: "", points: [""], conclusion: "" } 
    });
  };

  if (loading) return (
    <div style={styles.loadingContainer}>
      <div style={styles.spinner}></div>
      <p>Loading your topics...</p>
    </div>
  );

  if (error) return (
    <div style={styles.errorContainer}>
      <p style={styles.errorText}>{error}</p>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>My Learning Topics</h1>
        <p style={styles.subtitle}>Manage and organize your learning materials</p>
      </div>

      {topics.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📚</div>
          <h3 style={styles.emptyTitle}>No topics yet</h3>
          <p style={styles.emptyText}>Start creating your first learning topic to build your knowledge base.</p>
          <button
            onClick={() => navigate("/add-topic")}
            style={styles.addButton}
          >
            <span style={styles.addIcon}>+</span>
            Create Your First Topic
          </button>
        </div>
      ) : (
        <div style={styles.topicsGrid}>
          {topics.map((topic) => (
            <div key={topic._id} style={styles.topicCard}>
              {editingTopic === topic._id ? (
                // Edit Mode - Full Form
                <div style={styles.editForm}>
                  <h3 style={styles.editTitle}>Edit Topic: {topic.title}</h3>
                  
                  {/* Basic Information */}
                  <div style={styles.formSection}>
                    <h4 style={styles.sectionTitle}>Basic Information</h4>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={editFormData.title}
                        onChange={handleEditChange}
                        style={styles.input}
                        placeholder="Enter topic title"
                        required
                      />
                    </div>
                    
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Path *</label>
                      <input
                        type="text"
                        name="path"
                        value={editFormData.path}
                        onChange={handleEditChange}
                        style={styles.input}
                        placeholder="/topic-path"
                        required
                      />
                    </div>
                    
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Introduction</label>
                      <textarea
                        name="intro"
                        value={editFormData.intro}
                        onChange={handleEditChange}
                        style={styles.textarea}
                        placeholder="Brief description..."
                        rows="3"
                      />
                    </div>
                  </div>

                  {/* Why Section */}
                  <div style={styles.formSection}>
                    <h4 style={styles.sectionTitle}>Why Learn This</h4>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Section Title</label>
                      <input
                        type="text"
                        value={editFormData.why.title}
                        onChange={(e) => handleNestedEditChange("why", "title", null, e.target.value)}
                        style={styles.input}
                        placeholder="Why learn about this topic?"
                      />
                    </div>
                    
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Key Points</label>
                      {editFormData.why.points.map((point, index) => (
                        <div key={index} style={styles.pointItem}>
                          <input
                            type="text"
                            value={point}
                            onChange={(e) => handleNestedEditChange("why", "points", index, e.target.value)}
                            style={styles.input}
                            placeholder={`Point ${index + 1}`}
                          />
                          <button 
                            type="button"
                            onClick={() => removePoint("why", "points", index)}
                            disabled={editFormData.why.points.length === 1}
                            style={styles.removePointButton}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button 
                        type="button"
                        onClick={() => addPoint("why", "points")}
                        style={styles.addPointButton}
                      >
                        + Add Point
                      </button>
                    </div>
                  </div>

                  {/* Examples Section */}
                  <div style={styles.formSection}>
                    <h4 style={styles.sectionTitle}>Code Examples</h4>
                    {editFormData.examples.map((example, index) => (
                      <div key={index} style={styles.exampleItem}>
                        <div style={styles.exampleHeader}>
                          <h5 style={styles.exampleSubtitle}>Example {index + 1}</h5>
                          <button 
                            type="button"
                            onClick={() => removePoint("examples", null, index)}
                            disabled={editFormData.examples.length === 1}
                            style={styles.removePointButton}
                          >
                            Remove Example
                          </button>
                        </div>
                        
                        <div style={styles.formGroup}>
                          <label style={styles.label}>Example Title</label>
                          <input
                            type="text"
                            value={example.title}
                            onChange={(e) => handleNestedEditChange("examples", "title", index, e.target.value)}
                            style={styles.input}
                            placeholder="e.g., Basic Usage"
                          />
                        </div>
                        
                        <div style={styles.formGroup}>
                          <label style={styles.label}>Code</label>
                          <textarea
                            value={example.code}
                            onChange={(e) => handleNestedEditChange("examples", "code", index, e.target.value)}
                            style={{...styles.textarea, ...styles.codeTextarea}}
                            placeholder="Paste your code here..."
                            rows="4"
                          />
                        </div>
                      </div>
                    ))}
                    <button 
                      type="button"
                      onClick={() => addPoint("examples", null)}
                      style={styles.addPointButton}
                    >
                      + Add Another Example
                    </button>
                  </div>

                  {/* Best Practices Section */}
                  <div style={styles.formSection}>
                    <h4 style={styles.sectionTitle}>Best Practices</h4>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Section Title</label>
                      <input
                        type="text"
                        value={editFormData.best.title}
                        onChange={(e) => handleNestedEditChange("best", "title", null, e.target.value)}
                        style={styles.input}
                        placeholder="Best Practices and Guidelines"
                      />
                    </div>
                    
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Practice Points</label>
                      {editFormData.best.points.map((point, index) => (
                        <div key={index} style={styles.pointItem}>
                          <input
                            type="text"
                            value={point}
                            onChange={(e) => handleNestedEditChange("best", "points", index, e.target.value)}
                            style={styles.input}
                            placeholder={`Practice ${index + 1}`}
                          />
                          <button 
                            type="button"
                            onClick={() => removePoint("best", "points", index)}
                            disabled={editFormData.best.points.length === 1}
                            style={styles.removePointButton}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button 
                        type="button"
                        onClick={() => addPoint("best", "points")}
                        style={styles.addPointButton}
                      >
                        + Add Practice
                      </button>
                    </div>
                    
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Conclusion</label>
                      <textarea
                        value={editFormData.best.conclusion}
                        onChange={(e) => handleNestedEditChange("best", "conclusion", null, e.target.value)}
                        style={styles.textarea}
                        placeholder="Summary and final thoughts..."
                        rows="3"
                      />
                    </div>
                  </div>

                  {/* Edit Actions */}
                  <div style={styles.editActions}>
                    <button 
                      onClick={() => handleEditSubmit(topic._id)}
                      style={styles.saveButton}
                    >
                      💾 Save Changes
                    </button>
                    <button 
                      onClick={cancelEdit}
                      style={styles.cancelButton}
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <>
                  <div style={styles.topicContent}>
                    <Link
                      to={topic.path}
                      style={styles.topicLink}
                    >
                      <h3 style={styles.topicTitle}>{topic.title}</h3>
                    </Link>
                    {topic.intro && (
                      <p style={styles.topicIntro}>{topic.intro}</p>
                    )}
                    <div style={styles.topicMeta}>
                      <span style={styles.exampleCount}>
                        {topic.examples?.length || 0} example{topic.examples?.length !== 1 ? 's' : ''}
                      </span>
                      <span style={styles.path}>{topic.path}</span>
                    </div>
                    <div style={styles.sectionPreview}>
                      <div style={styles.previewItem}>
                        <strong>Why:</strong> {topic.why?.points?.length || 0} points
                      </div>
                      <div style={styles.previewItem}>
                        <strong>Best Practices:</strong> {topic.best?.points?.length || 0} points
                      </div>
                    </div>
                    <div style={styles.dateInfo}>
                      Created: {new Date(topic.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div style={styles.actions}>
                    <button
                      onClick={() => handleEdit(topic)}
                      style={styles.editButton}
                      title="Edit topic"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(topic._id, topic.title)}
                      disabled={deletingId === topic._id}
                      style={deletingId === topic._id ? styles.deleteButtonDisabled : styles.deleteButton}
                      title="Delete topic"
                    >
                      {deletingId === topic._id ? "⏳" : "🗑️ Delete"}
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Topic button */}
      {topics.length > 0 && (
        <div style={styles.footer}>
          <button
            onClick={() => navigate("/add-topic")}
            style={styles.addButton}
          >
            <span style={styles.addIcon}>+</span>
            Create New Topic
          </button>
        </div>
      )}
    </div>
  );
};

// Enhanced styling for full edit form
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#1a1a1a',
    margin: '0 0 10px 0',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#666',
    margin: 0,
    fontWeight: '400',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '100px 20px',
    textAlign: 'center',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #667eea',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px',
  },
  errorContainer: {
    textAlign: 'center',
    padding: '100px 20px',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: '1.1rem',
  },
  emptyState: {
    textAlign: 'center',
    padding: '80px 20px',
    background: '#f8f9fa',
    borderRadius: '20px',
    border: '2px dashed #e1e8ed',
  },
  emptyIcon: {
    fontSize: '4rem',
    marginBottom: '20px',
  },
  emptyTitle: {
    fontSize: '1.5rem',
    color: '#2c3e50',
    margin: '0 0 10px 0',
    fontWeight: '600',
  },
  emptyText: {
    color: '#7f8c8d',
    fontSize: '1rem',
    margin: '0 0 30px 0',
  },
  topicsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '25px',
    marginBottom: '40px',
  },
  topicCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '25px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e1e8ed',
    transition: 'all 0.3s ease',
  },
  topicContent: {
    marginBottom: '15px',
  },
  topicLink: {
    textDecoration: 'none',
    color: '#2c3e50',
    display: 'block',
    marginBottom: '12px',
  },
  topicTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    margin: '0 0 12px 0',
    lineHeight: '1.4',
    color: '#2d3748',
  },
  topicIntro: {
    color: '#666',
    fontSize: '0.95rem',
    lineHeight: '1.5',
    margin: '0 0 15px 0',
  },
  topicMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.85rem',
    color: '#999',
    marginBottom: '10px',
  },
  exampleCount: {
    background: '#f8f9fa',
    padding: '4px 12px',
    borderRadius: '12px',
    fontWeight: '600',
    color: '#667eea',
  },
  path: {
    fontFamily: 'monospace',
    background: '#edf2ff',
    padding: '4px 12px',
    borderRadius: '8px',
    color: '#667eea',
    fontWeight: '500',
  },
  sectionPreview: {
    display: 'flex',
    gap: '15px',
    marginBottom: '10px',
  },
  previewItem: {
    fontSize: '0.8rem',
    color: '#718096',
    background: '#f7fafc',
    padding: '4px 8px',
    borderRadius: '6px',
  },
  dateInfo: {
    fontSize: '0.8rem',
    color: '#a0aec0',
    fontStyle: 'italic',
  },
  actions: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end',
    borderTop: '1px solid #f1f5f9',
    paddingTop: '15px',
  },
  editButton: {
    background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
  },
  deleteButton: {
    background: 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
  },
  deleteButtonDisabled: {
    background: '#a0aec0',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'not-allowed',
    fontSize: '12px',
    fontWeight: '600',
    opacity: 0.6,
  },
  // Edit Form Styles
  editForm: {
    width: '100%',
  },
  editTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '25px',
    color: '#2d3748',
    textAlign: 'center',
  },
  formSection: {
    marginBottom: '30px',
    padding: '20px',
    background: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
  },
  sectionTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#2d3748',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '8px',
  },
  exampleSubtitle: {
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#4a5568',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: '600',
    color: '#2d3748',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '10px 12px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'border-color 0.2s ease',
    resize: 'vertical',
    minHeight: '80px',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  codeTextarea: {
    fontFamily: '"Courier New", monospace',
    fontSize: '13px',
    background: '#2d3748',
    color: '#e2e8f0',
  },
  pointItem: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
    alignItems: 'center',
  },
  exampleItem: {
    background: 'white',
    padding: '15px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    marginBottom: '15px',
  },
  exampleHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  removePointButton: {
    background: '#e53e3e',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '11px',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  },
  addPointButton: {
    background: '#4299e1',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
    marginTop: '5px',
  },
  editActions: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '2px solid #e2e8f0',
  },
  saveButton: {
    background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
  },
  cancelButton: {
    background: '#a0aec0',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
  },
  footer: {
    textAlign: 'center',
    paddingTop: '40px',
    borderTop: '1px solid #e1e8ed',
  },
  addButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
  },
  addIcon: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
};

// Add CSS animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

export default Topics;