import React from "react";

const StatePage = () => {
  const examples = [
    {
      title: "Basic State with useState",
      code: `import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </>
  );
}

export default Counter;`,
    },
    {
      title: "Multiple State Variables",
      code: `import React, { useState } from "react";

function UserInfo() {
  const [name, setName] = useState("Pavan");
  const [age, setAge] = useState(21);

  return (
    <>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <button onClick={() => setAge(age + 1)}>Increase Age</button>
    </>
  );
}

export default UserInfo;`,
    },
    {
      title: "Updating State with Objects",
      code: `import React, { useState } from "react";

function Profile() {
  const [user, setUser] = useState({ name: "Pavan", age: 21 });

  const updateName = () => {
    setUser({ ...user, name: "Reddy" });
  };

  return (
    <>
      <p>{user.name} is {user.age} years old.</p>
      <button onClick={updateName}>Update Name</button>
    </>
  );
}

export default Profile;`,
    },
  ];

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  return (
    <div
      style={{
        fontFamily: "'Roboto', sans-serif",
        padding: "40px 20px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Understanding React State
      </h1>

      <p style={{ fontSize: "1.1rem", lineHeight: "1.8", marginBottom: "30px" }}>
        State in React represents data that can change over time. Unlike props,
        which are read-only and passed from parent to child, state is managed
        within a component and can be updated to trigger re-renders. Mastering
        state management is key to building dynamic, interactive applications.
      </p>

      <h2 style={{ fontSize: "1.8rem", marginBottom: "15px" }}>
        Why State is Important
      </h2>
      <ul style={{ fontSize: "1.1rem", lineHeight: "1.7", marginBottom: "30px" }}>
        <li>
          Allows components to keep track of changing data (like counters, forms, or timers).
        </li>
        <li>
          Makes apps interactive — updating UI automatically when state changes.
        </li>
        <li>
          Provides local memory to a component without relying on external variables.
        </li>
        <li>
          Works seamlessly with hooks like <code>useEffect</code> and <code>useContext</code>.
        </li>
      </ul>

      {examples.map((example, idx) => (
        <div key={idx} style={{ marginBottom: "50px" }}>
          <h3 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
            {example.title}
          </h3>
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

      <h2 style={{ fontSize: "1.8rem", marginBottom: "15px" }}>
        Best Practices with State
      </h2>
      <ul style={{ fontSize: "1.1rem", lineHeight: "1.7", marginBottom: "30px" }}>
        <li>Keep state as simple as possible — avoid unnecessary nesting.</li>
        <li>Always update state immutably (never modify it directly).</li>
        <li>Group related values into objects, but avoid deeply nested state.</li>
        <li>Use multiple <code>useState</code> calls for unrelated data.</li>
        <li>For complex logic, consider <code>useReducer</code> instead of state.</li>
      </ul>

      <p style={{ fontSize: "1.1rem", lineHeight: "1.7" }}>
        React state is one of the most powerful concepts that makes your UI
        truly dynamic. By understanding and using it properly, you’ll be able to
        build responsive, interactive, and modern web applications.
      </p>
    </div>
  );
};

export default StatePage;
