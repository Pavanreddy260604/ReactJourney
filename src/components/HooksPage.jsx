import React from "react";

const HooksPage = () => {
  const examples = [
    {
      title: "useState: State Management in Functional Components",
      code: `import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </>
  );
}

export default Counter;`,
    },
    {
      title: "useEffect: Side Effects and Lifecycle",
      code: `import React, { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return <h1>Seconds Elapsed: {seconds}</h1>;
}

export default Timer;`,
    },
    {
      title: "useContext: Sharing State Across Components",
      code: `import React, { createContext, useContext } from "react";

const ThemeContext = createContext("light");

function ThemedText() {
  const theme = useContext(ThemeContext);
  return <p>The current theme is: {theme}</p>;
}

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedText />
    </ThemeContext.Provider>
  );
}

export default App;`,
    },
    {
      title: "useReducer: Complex State Management",
      code: `import React, { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <h1>Count: {state.count}</h1>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </>
  );
}

export default Counter;`,
    },
    {
      title: "useRef: Accessing DOM Elements",
      code: `import React, { useRef } from "react";

function TextInputFocus() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} type="text" placeholder="Type something..." />
      <button onClick={focusInput}>Focus Input</button>
    </>
  );
}

export default TextInputFocus;`,
    },
  ];

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  return (
    <div style={{ fontFamily: "'Roboto', sans-serif", padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px", textAlign: "center" }}>Mastering React Hooks</h1>
      
      <p style={{ fontSize: "1.1rem", lineHeight: "1.8", marginBottom: "30px" }}>
        React Hooks revolutionized functional components by allowing you to manage state, side effects, context, and references
        without writing a single class. Hooks make components cleaner, more readable, and easier to maintain.
        Understanding hooks deeply is essential to building modern React applications.
      </p>

      <h2 style={{ fontSize: "1.8rem", marginBottom: "15px" }}>Why Hooks Are Important</h2>
      <ul style={{ fontSize: "1.1rem", lineHeight: "1.7", marginBottom: "30px" }}>
        <li>Manage state in functional components with <code>useState</code>.</li>
        <li>Perform side effects like API calls or subscriptions using <code>useEffect</code>.</li>
        <li>Share state across components easily with <code>useContext</code>.</li>
        <li>Handle complex state transitions with <code>useReducer</code>.</li>
        <li>Directly interact with DOM elements using <code>useRef</code>.</li>
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

      <h2 style={{ fontSize: "1.8rem", marginBottom: "15px" }}>Best Practices & Tips</h2>
      <ul style={{ fontSize: "1.1rem", lineHeight: "1.7", marginBottom: "30px" }}>
        <li>Always keep hooks at the top level of the component.</li>
        <li>Do not call hooks inside loops, conditions, or nested functions.</li>
        <li>Use <code>useEffect</code> cleanup to avoid memory leaks.</li>
        <li>Prefer <code>useReducer</code> for complex state logic instead of multiple <code>useState</code> calls.</li>
        <li>Combine <code>useRef</code> with <code>useEffect</code> for advanced DOM manipulations.</li>
      </ul>

      <p style={{ fontSize: "1.1rem", lineHeight: "1.7" }}>
        Mastering React Hooks will elevate your React skills, making you capable of building scalable, clean,
        and maintainable applications. Hooks are the future of React development, and understanding them is
        non-negotiable for any modern React developer.
      </p>
    </div>
  );
};

export default HooksPage;
