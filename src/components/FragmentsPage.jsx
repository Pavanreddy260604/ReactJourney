import React from "react";

const FragmentsPage = () => {
  const examples = [
    {
      title: "Basic Fragment Example",
      code: `import React from "react";

function Example() {
  return (
    <>
      <h1>Hello, React!</h1>
      <p>This paragraph is inside a Fragment, keeping the DOM clean.</p>
    </>
  );
}

export default Example;`,
    },
    {
      title: "Mapping Arrays with React.Fragment",
      code: `import React from "react";

const items = ["Apple", "Banana", "Cherry"];

function ItemList() {
  return (
    <>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <h3>{item}</h3>
          <p>This is a fruit from the array.</p>
        </React.Fragment>
      ))}
    </>
  );
}

export default ItemList;`,
    },
    {
      title: "Conditional Rendering with Fragments",
      code: `import React from "react";

function ConditionalFragment({ show }) {
  return (
    <>
      <h1>Main Header</h1>
      {show && (
        <>
          <p>This paragraph appears only if 'show' is true.</p>
          <p>Fragments help avoid extra wrapper divs, keeping your layout clean.</p>
        </>
      )}
    </>
  );
}

export default ConditionalFragment;`,
    },
    {
      title: "Fragments with Keys in Nested Components",
      code: `import React from "react";

const data = [
  { title: "React", description: "A JavaScript library for building UIs" },
  { title: "Vue", description: "A progressive JavaScript framework" },
];

function TechList() {
  return (
    <>
      {data.map((tech, idx) => (
        <React.Fragment key={idx}>
          <h2>{tech.title}</h2>
          <p>{tech.description}</p>
        </React.Fragment>
      ))}
    </>
  );
}

export default TechList;`,
    },
  ];

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  return (
    <div style={{ fontFamily: "'Roboto', sans-serif", padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px", textAlign: "center" }}>Mastering React Fragments</h1>
      
      <p style={{ fontSize: "1.1rem", lineHeight: "1.8", marginBottom: "30px" }}>
        React Fragments are an elegant solution to a common problem: how to group multiple elements
        in a component without introducing unnecessary <code>&lt;div&gt;</code> wrappers.
        Proper use of fragments improves readability, reduces DOM complexity, and keeps your UI flexible.
      </p>

      <h2 style={{ fontSize: "1.8rem", marginBottom: "15px" }}>Why Fragments Matter</h2>
      <ul style={{ fontSize: "1.1rem", lineHeight: "1.7", marginBottom: "30px" }}>
        <li>Eliminate unnecessary HTML nodes and keep the DOM clean.</li>
        <li>Shorthand syntax <code>&lt;&gt;&lt;/&gt;</code> is concise and perfect when keys aren’t needed.</li>
        <li>Use <code>&lt;React.Fragment key="unique"&gt;</code> when rendering lists with keys.</li>
        <li>Fragments can wrap multiple elements in JSX without affecting styling or layout.</li>
        <li>Combine fragments with conditional rendering to handle complex UI structures gracefully.</li>
      </ul>

      {examples.map((example, idx) => (
        <div key={idx} style={{ marginBottom: "50px" }}>
          <h3 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>{example.title}</h3>
          <div style={{ position: "relative" }}>
            <pre
              style={{
                backgroundColor: "#1e1e1e",
                color: "#d4d4d4",
                padding: "20px",
                borderRadius: "10px",
                overflowX: "auto",
              }}
            >
              <code>{example.code}</code>
            </pre>
            <button
              onClick={() => copyCode(example.code)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                padding: "6px 12px",
                border: "none",
                borderRadius: "6px",
                backgroundColor: "#1E93AB",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Copy
            </button>
          </div>
        </div>
      ))}

      <h2 style={{ fontSize: "1.8rem", marginBottom: "15px" }}>Advanced Tips & Best Practices</h2>
      <ul style={{ fontSize: "1.1rem", lineHeight: "1.7", marginBottom: "30px" }}>
        <li>Always prefer fragments over unnecessary wrapper divs to reduce DOM clutter.</li>
        <li>Shorthand <code>&lt;&gt;&lt;/&gt;</code> improves readability in simple scenarios.</li>
        <li>Use full <code>&lt;React.Fragment&gt;</code> syntax when keys are needed for lists.</li>
        <li>Nested fragments can handle complex conditional renderings without adding extra nodes.</li>
        <li>Fragments keep your JSX clean, which is crucial when scaling large applications.</li>
      </ul>

      <p style={{ fontSize: "1.1rem", lineHeight: "1.7" }}>
        By mastering React Fragments, you are not just learning a small feature—you are learning
        how to write cleaner, maintainable, and professional React code. This skill alone
        will make your components lighter, easier to read, and more performant.
      </p>
    </div>
  );
};

export default FragmentsPage;
