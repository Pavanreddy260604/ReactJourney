import React from "react";

const PropsPage = () => {
  // ✅ Utility to copy code
  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  // ✅ All examples (Zero ➝ Hero progression)
  const examples = [
    {
      title: "1. What Are Props?",
      description:
        "Props are how you pass data from parent to child components. They make components reusable and dynamic.",
      code: `function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Usage
<Greeting name="Pavan" />`,
    },
    {
      title: "2. Props with Destructuring",
      description:
        "You can destructure props directly in the function signature for cleaner code.",
      code: `function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Usage
<Greeting name="Alice" />`,
    },
    {
      title: "3. Passing Multiple Props",
      description: "Pass multiple props to fully customize a component.",
      code: `function UserCard({ name, age, city }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>City: {city}</p>
    </div>
  );
}

// Usage
<UserCard name="John" age={28} city="New York" />`,
    },
    {
      title: "4. Default Props",
      description:
        "You can set default values so the component works even if a prop is missing.",
      code: `function Welcome({ message = "Welcome to React!" }) {
  return <h1>{message}</h1>;
}

// Usage
<Welcome />`,
    },
    {
      title: "5. Props with Callback Functions",
      description:
        "Props can be functions to handle events in the parent component.",
      code: `function Button({ onClick, label }) {
  return <button onClick={onClick}>{label}</button>;
}

const handleClick = () => alert("Button clicked!");

// Usage
<Button onClick={handleClick} label="Click Me" />`,
    },
    {
      title: "6. Passing Objects as Props",
      description:
        "Pass complex data like objects and access them in child components.",
      code: `function Product({ product }) {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: {product.price}</p>
      <p>Category: {product.category}</p>
    </div>
  );
}

const item = { name: "Laptop", price: "$1200", category: "Electronics" };

// Usage
<Product product={item} />`,
    },
    {
      title: "7. Conditional Rendering with Props",
      description:
        "Use props to conditionally display content based on state or logic.",
      code: `function Message({ isLoggedIn }) {
  return (
    <p>{isLoggedIn ? "Welcome back!" : "Please log in."}</p>
  );
}

// Usage
<Message isLoggedIn={true} />`,
    },
    {
      title: "8. Passing Arrays as Props",
      description:
        "Pass arrays as props and map over them inside the component.",
      code: `function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo, i) => <li key={i}>{todo}</li>)}
    </ul>
  );
}

const tasks = ["Learn React", "Practice Props", "Build Projects"];

// Usage
<TodoList todos={tasks} />`,
    },
    {
      title: "9. Advanced: Function Returning Values",
      description:
        "Props can also be functions that return values for dynamic behavior.",
      code: `function Calculator({ operation, a, b }) {
  return <h2>Result: {operation(a, b)}</h2>;
}

const sum = (x, y) => x + y;

// Usage
<Calculator operation={sum} a={5} b={10} />`,
    },
    {
      title: "10. Prop Aliases & Renaming",
      description:
        "You can rename props while destructuring for more meaningful names.",
      code: `function Profile({ name: username, age: years }) {
  return <p>{username} is {years} years old</p>;
}

// Usage
<Profile name="Ravi" age={22} />`,
    },
  ];

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', sans-serif",
        padding: "30px 20px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "15px", textAlign: "center" }}>
        React Props: Zero ➝ Hero 🚀
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "30px", textAlign: "center" }}>
        Learn React props step by step, starting from basics and moving to
        advanced patterns.
      </p>

      {examples.map((example, idx) => (
        <div key={idx} style={{ marginBottom: "40px" }}>
          <h3 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
            {example.title}
          </h3>
          <p style={{ marginBottom: "10px" }}>{example.description}</p>
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

      <h2 style={{ marginTop: "40px" }}>Best Practices 📝</h2>
      <ul style={{ fontSize: "1.1rem", lineHeight: "1.7" }}>
        <li>Always use descriptive and meaningful prop names.</li>
        <li>Use default props or optional chaining to avoid errors.</li>
        <li>Group related values in objects/arrays instead of many props.</li>
        <li>Pass functions as props for event handling.</li>
        <li>Remember: props are immutable. Never modify them in child components.</li>
      </ul>
    </div>
  );
};

export default PropsPage;
