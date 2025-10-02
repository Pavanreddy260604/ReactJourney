import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTopicForm = ({ user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showImport, setShowImport] = useState(false);
  const [importData, setImportData] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    path: "",
    intro: "",
    why: { title: "", points: [""] },
    examples: [{ title: "", code: "" }],
    best: { title: "", points: [""], conclusion: "" },
    userId: user?.userId
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (field, index, subfield, value) => {
    setFormData(prev => {
      const copy = { ...prev };
      if (field === "why") copy.why.points[index] = value;
      else if (field === "examples") copy.examples[index][subfield] = value;
      else if (field === "best" && subfield === "points") copy.best.points[index] = value;
      return copy;
    });
  };

  const addPoint = (field) => {
    setFormData(prev => {
      const copy = { ...prev };
      if (field === "why") copy.why.points.push("");
      else if (field === "best") copy.best.points.push("");
      else if (field === "examples") copy.examples.push({ title: "", code: "" });
      return copy;
    });
  };

  const removePoint = (field, index) => {
    if ((field === "why" && formData.why.points.length === 1) ||
        (field === "best" && formData.best.points.length === 1) ||
        (field === "examples" && formData.examples.length === 1)) {
      return;
    }

    setFormData(prev => {
      const copy = { ...prev };
      if (field === "why") copy.why.points.splice(index, 1);
      else if (field === "best") copy.best.points.splice(index, 1);
      else if (field === "examples") copy.examples.splice(index, 1);
      return copy;
    });
  };

  // New: Import JSON data function
  const handleImport = () => {
    try {
      if (!importData.trim()) {
        setError("Please paste JSON data");
        return;
      }

      const parsedData = JSON.parse(importData);
      
      // Validate and map the imported data to our form structure
      const importedFormData = {
        title: parsedData.title || "",
        path: parsedData.path || "",
        intro: parsedData.intro || "",
        why: {
          title: parsedData.why?.title || "",
          points: Array.isArray(parsedData.why?.points) ? parsedData.why.points : [""]
        },
        examples: Array.isArray(parsedData.examples) 
          ? parsedData.examples.map(ex => ({
              title: ex.title || "",
              code: ex.code || ""
            }))
          : [{ title: "", code: "" }],
        best: {
          title: parsedData.best?.title || "",
          points: Array.isArray(parsedData.best?.points) ? parsedData.best.points : [""],
          conclusion: parsedData.best?.conclusion || ""
        },
        userId: user?.userId
      };

      setFormData(importedFormData);
      setShowImport(false);
      setImportData("");
      setSuccess("Data imported successfully!");
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Invalid JSON format. Please check your data.");
    }
  };

  // New: Sample data for quick testing
  const loadSampleData = () => {
    const sampleData = {
      title: "React Props: Zero ➝ Hero 🚀",
      path: "/props",
      intro: "Learn React props step by step, starting from basics and moving to advanced patterns.",
      why: {
        title: "Why Props Matter in React",
        points: [
          "Enable passing data from parent to child components.",
          "Make components reusable and dynamic.",
          "Allow separation of concerns between logic and presentation.",
          "Support callbacks for communication between components."
        ]
      },
      examples: [
        {
          title: "1. What Are Props?",
          code: "function Greeting(props) {\n  return <h1>Hello, {props.name}!</h1>;\n}\n\n// Usage\n<Greeting name=\"Pavan\" />"
        },
        {
          title: "2. Props with Destructuring",
          code: "function Greeting({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}\n\n// Usage\n<Greeting name=\"Alice\" />"
        }
      ],
      best: {
        title: "Best Practices 📝",
        points: [
          "Always use descriptive and meaningful prop names.",
          "Use default props or optional chaining to avoid errors.",
          "Group related values in objects/arrays instead of many props.",
          "Pass functions as props for event handling.",
          "Remember: props are immutable. Never modify them in child components."
        ],
        conclusion: "Following these best practices ensures clean, maintainable, and professional React components."
      }
    };

    setImportData(JSON.stringify(sampleData, null, 2));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("https://reactjourney.onrender.com/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add topic");

      setSuccess("Topic added successfully!");
      setTimeout(() => navigate("/topics"), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: "",
      path: "",
      intro: "",
      why: { title: "", points: [""] },
      examples: [{ title: "", code: "" }],
      best: { title: "", points: [""], conclusion: "" },
      userId: user?.userId
    });
    setError("");
    setSuccess("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Add New Topic</h1>
        <p style={styles.subtitle}>Create comprehensive learning materials</p>
      </div>

      {/* Import/Export Controls */}
      <div style={styles.importSection}>
        <button 
          type="button" 
          onClick={() => setShowImport(!showImport)}
          style={styles.importButton}
        >
          {showImport ? "✕ Close Import" : "📥 Import JSON Data"}
        </button>
        
        <button 
          type="button" 
          onClick={loadSampleData}
          style={styles.sampleButton}
        >
          🚀 Load Sample Data
        </button>
      </div>

      {showImport && (
        <div style={styles.importModal}>
          <h3 style={styles.importTitle}>Paste JSON Data</h3>
          <textarea
            value={importData}
            onChange={(e) => setImportData(e.target.value)}
            placeholder={`Paste your JSON data here...\n\nExample:\n{\n  "title": "React Hooks",\n  "path": "/hooks",\n  "intro": "Learn about React Hooks",\n  "why": { "title": "...", "points": ["..."] },\n  "examples": [{ "title": "...", "code": "..." }],\n  "best": { "title": "...", "points": ["..."], "conclusion": "..." }\n}`}
            rows="15"
            style={styles.importTextarea}
          />
          <div style={styles.importActions}>
            <button 
              type="button" 
              onClick={handleImport}
              style={styles.importSubmit}
            >
              Import Data
            </button>
            <button 
              type="button" 
              onClick={() => setShowImport(false)}
              style={styles.importCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {error && <div style={styles.alertError}>{error}</div>}
      {success && <div style={styles.alertSuccess}>{success}</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Basic Information */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Basic Information</h2>
          <div style={styles.formGroup}>
            <label style={styles.label}>Topic Title *</label>
            <input
              type="text"
              name="title"
              placeholder="e.g., React Hooks"
              value={formData.title}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>URL Path *</label>
            <input
              type="text"
              name="path"
              placeholder="e.g., /hooks"
              value={formData.path}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Introduction</label>
            <textarea
              name="intro"
              placeholder="Brief introduction about the topic..."
              value={formData.intro}
              onChange={handleChange}
              rows="4"
              style={styles.textarea}
            />
          </div>
        </section>

        {/* Why Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Why Learn This?</h2>
          <div style={styles.formGroup}>
            <label style={styles.label}>Section Title</label>
            <input
              type="text"
              placeholder="Why learn about this topic?"
              value={formData.why.title}
              onChange={e => setFormData(prev => ({ ...prev, why: { ...prev.why, title: e.target.value } }))}
              style={styles.input}
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Key Points</label>
            {formData.why.points.map((point, index) => (
              <div key={index} style={styles.pointItem}>
                <input
                  type="text"
                  placeholder={`Point ${index + 1}`}
                  value={point}
                  onChange={e => handleNestedChange("why", index, null, e.target.value)}
                  style={styles.input}
                />
                <button 
                  type="button" 
                  onClick={() => removePoint("why", index)}
                  disabled={formData.why.points.length === 1}
                  style={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addPoint("why")} style={styles.addButton}>
              + Add Point
            </button>
          </div>
        </section>

        {/* Examples Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Code Examples</h2>
          {formData.examples.map((example, index) => (
            <div key={index} style={styles.exampleContainer}>
              <div style={styles.exampleHeader}>
                <h3 style={styles.exampleTitle}>Example {index + 1}</h3>
                <button 
                  type="button" 
                  onClick={() => removePoint("examples", index)}
                  disabled={formData.examples.length === 1}
                  style={styles.removeButton}
                >
                  Remove Example
                </button>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Example Title</label>
                <input
                  type="text"
                  placeholder="e.g., Basic Usage"
                  value={example.title}
                  onChange={e => handleNestedChange("examples", index, "title", e.target.value)}
                  style={styles.input}
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Code</label>
                <textarea
                  placeholder="Paste your code here..."
                  value={example.code}
                  onChange={e => handleNestedChange("examples", index, "code", e.target.value)}
                  rows="6"
                  style={{...styles.textarea, ...styles.codeTextarea}}
                />
              </div>
            </div>
          ))}
          <button type="button" onClick={() => addPoint("examples")} style={styles.addButton}>
            + Add Another Example
          </button>
        </section>

        {/* Best Practices Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Best Practices</h2>
          <div style={styles.formGroup}>
            <label style={styles.label}>Section Title</label>
            <input
              type="text"
              placeholder="Best Practices and Guidelines"
              value={formData.best.title}
              onChange={e => setFormData(prev => ({ ...prev, best: { ...prev.best, title: e.target.value } }))}
              style={styles.input}
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Practice Points</label>
            {formData.best.points.map((point, index) => (
              <div key={index} style={styles.pointItem}>
                <input
                  type="text"
                  placeholder={`Practice ${index + 1}`}
                  value={point}
                  onChange={e => handleNestedChange("best", index, "points", e.target.value)}
                  style={styles.input}
                />
                <button 
                  type="button" 
                  onClick={() => removePoint("best", index)}
                  disabled={formData.best.points.length === 1}
                  style={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addPoint("best")} style={styles.addButton}>
              + Add Practice
            </button>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Conclusion</label>
            <textarea
              placeholder="Summary and final thoughts..."
              value={formData.best.conclusion}
              onChange={e => setFormData(prev => ({ ...prev, best: { ...prev.best, conclusion: e.target.value } }))}
              rows="3"
              style={styles.textarea}
            />
          </div>
        </section>

        {/* Form Actions */}
        <section style={styles.actionsSection}>
          <button 
            type="button" 
            onClick={handleReset} 
            style={styles.secondaryButton}
            disabled={loading}
          >
            Reset Form
          </button>
          <button 
            type="submit" 
            disabled={loading}
            style={styles.primaryButton}
          >
            {loading ? "Saving..." : "Publish Topic"}
          </button>
        </section>
      </form>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  title: {
    color: '#2c3e50',
    marginBottom: '10px',
    fontSize: '2.5rem',
    fontWeight: '700'
  },
  subtitle: {
    color: '#7f8c8d',
    fontSize: '1.1rem',
    margin: 0
  },
  importSection: {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px',
    justifyContent: 'center'
  },
  importButton: {
    background: '#9b59b6',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600'
  },
  sampleButton: {
    background: '#e67e22',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600'
  },
  importModal: {
    background: 'white',
    border: '2px solid #3498db',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px'
  },
  importTitle: {
    margin: '0 0 15px 0',
    color: '#2c3e50'
  },
  importTextarea: {
    width: '100%',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontFamily: 'monospace',
    fontSize: '14px',
    resize: 'vertical',
    marginBottom: '15px'
  },
  importActions: {
    display: 'flex',
    gap: '10px'
  },
  importSubmit: {
    background: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  importCancel: {
    background: '#95a5a6',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  },
  section: {
    background: 'white',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e1e8ed'
  },
  sectionTitle: {
    color: '#2c3e50',
    borderBottom: '3px solid #3498db',
    paddingBottom: '12px',
    marginBottom: '25px',
    fontSize: '1.5rem',
    fontWeight: '600'
  },
  formGroup: {
    marginBottom: '25px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#2c3e50',
    fontSize: '14px'
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #e1e8ed',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box'
  },
  textarea: {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #e1e8ed',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'border-color 0.3s ease',
    resize: 'vertical',
    boxSizing: 'border-box',
    fontFamily: 'inherit'
  },
  codeTextarea: {
    fontFamily: '"Courier New", monospace',
    backgroundColor: '#f8f9fa'
  },
  pointItem: {
    display: 'flex',
    gap: '12px',
    marginBottom: '12px',
    alignItems: 'center'
  },
  exampleContainer: {
    background: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    borderLeft: '4px solid #3498db'
  },
  exampleHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px'
  },
  exampleTitle: {
    margin: 0,
    color: '#2c3e50',
    fontSize: '1.2rem'
  },
  addButton: {
    background: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600'
  },
  removeButton: {
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
    whiteSpace: 'nowrap'
  },
  primaryButton: {
    background: '#3498db',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    minWidth: '150px'
  },
  secondaryButton: {
    background: '#95a5a6',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    minWidth: '150px'
  },
  actionsSection: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '15px',
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '1px solid #e1e8ed'
  },
  alertError: {
    background: '#ffeaea',
    color: '#e74c3c',
    border: '1px solid #e74c3c',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontWeight: '600'
  },
  alertSuccess: {
    background: '#eaffea',
    color: '#27ae60',
    border: '1px solid #27ae60',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontWeight: '600'
  }
};

export default AddTopicForm;