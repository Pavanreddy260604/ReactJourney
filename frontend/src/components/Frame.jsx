import React from "react";
import "../CSS/Frame.css"

const Frame = (props) => {
  // Safely access props with fallbacks
  const title = props?.title || "Untitled Topic";
  const intro = props?.intro || "";
  const why = props?.why || { title: "", points: [] };
  const examples = props?.examples || [];
  const best = props?.best || { title: "", points: [], conclusion: "" };

  // Function to copy code to clipboard
  const copyCode = async (code) => {
    if (!code) return;
    
    try {
      await navigator.clipboard.writeText(code);
      alert("Code copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert("Code copied to clipboard!");
    }
  };

  return (
    <div className="entire">
      <h1 className="head">{title}</h1>
      
      {intro && <p className="intro">{intro}</p>}
      
      {why.title && (
        <>
          <h2 className="why">{why.title}</h2>
          {why.points && why.points.length > 0 && (
            <ul className="why-list">
              {why.points.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          )}
        </>
      )}
      
      {examples && examples.length > 0 && (
        <>
          {examples.map((example, idx) => (
            <div key={idx} className="example">
              <h3 className="heading">{example?.title || `Example ${idx + 1}`}</h3>
              {example?.code && (
                <div className="code">
                  <pre className="code-bg">
                    <code>{example.code}</code>
                  </pre>
                  <button 
                    className="copy-btn" 
                    onClick={() => copyCode(example.code)}
                  >
                    Copy
                  </button>
                </div>
              )}
            </div>
          ))}
        </>
      )}
      
      {best.title && (
        <>
          <h2 className="tips">{best.title}</h2>
          {best.points && best.points.length > 0 && (
            <ul className="tip-list">
              {best.points.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          )}
          {best.conclusion && (
            <p className="conclusion">{best.conclusion}</p>
          )}
        </>
      )}
    </div>
  );
};

export default Frame;