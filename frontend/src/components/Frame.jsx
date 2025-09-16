import React from "react";
import "../CSS/Frame.css"

const Frame = (props) => {
  // Function to copy code to clipboard
  const copyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      alert("Code copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="entire">
      <h1 className="head">{props.title}</h1>
      <p className="intro">{props.intro}</p>
      <h2 className="why">{props.why.title}</h2>
      <ul className="why-list">
       {props.why.points.map((w, i) => (
              <li key={i}>{w}</li>
            ))}


      </ul>
      
      {props.examples.map((example, idx) => (
        <div key={idx} className="example">
          <h3 className="heading">{example.title}</h3>
          <div className="code">
            <pre className="code-bg">
              <code>{example.code}</code>
            </pre>
            <button className="copy-btn" onClick={() => copyCode(example.code)}>
              Copy
            </button>
          </div>
        </div>
      ))}
      <h2 className="tips">{props.best.title}</h2>
      <ul className="tip-list">
       {props.best.points.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}


      </ul>
       <p className="conlcusion">
            {props.best.conclusion}
          </p>
    </div>
  );
};

export default Frame;
