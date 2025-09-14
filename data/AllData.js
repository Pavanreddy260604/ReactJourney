
export const stylingData = {
  title: "Styling in React",
  intro: `Styling is essential in modern web apps. In React, components manage their own styles, giving you multiple ways to organize them efficiently.`,

  why: {
    title: "Why Styling Matters in React",
    points: [
      "Keeps UI consistent and maintainable.",
      "Allows modular, reusable components.",
      "Helps separate logic from presentation.",
      "Supports various styling approaches: inline, CSS modules, Styled Components, Tailwind, etc."
    ]
  },

  examples: [
    {
      title: "Inline Styling",
      code: `function InlineStyling() {
  return (
    <div>
      <h2 style={{ color: "red", fontSize: "24px" }}>Inline Styling</h2>
      <p style={{ backgroundColor: "lightyellow" }}>
        This text is styled directly inside the component.
      </p>
    </div>
  );
}`
    },
    {
      title: "External CSS (Traditional way)",
      code: `.headline {
  color: blue;
  text-align: center;
  font-size: 28px;
}

.paragraph {
  background-color: lightgray;
  padding: 10px;
  font-size: 16px;
}`
    },
    {
      title: "CSS Modules",
      code: `/* Styling.module.css */
.moduleHead {
  color: green;
  font-size: 26px;
  border-bottom: 2px solid black;
}

.modulePara {
  font-size: 18px;
  line-height: 1.6;
}`
    },
    {
      title: "Styled Components (CSS-in-JS)",
      code: `import styled from 'styled-components';

const Title = styled.h2\`
  color: purple;
  font-size: 24px;
  text-align: center;
\`;

const Text = styled.p\`
  background-color: #f0f0f0;
  padding: 10px;
  font-size: 16px;
\`;

function StyledComponentExample() {
  return (
    <div>
      <Title>Styled Components</Title>
      <Text>This paragraph is styled using styled-components.</Text>
    </div>
  );
}`
    },
    {
      title: "Tailwind CSS (Utility-first approach)",
      code: `function TailwindExample() {
  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-100 rounded-lg">
      <h2 className="text-blue-600 text-2xl font-bold mb-4">Tailwind CSS</h2>
      <p className="text-gray-800 text-base">
        This paragraph is styled using Tailwind CSS utility classes.
      </p>
    </div>
  );
}`
    }
  ],

  best: {
    title: "Styling Best Practices in React",
    points: [
      "Choose the right styling approach: inline for dynamic styles, CSS Modules for scoped styles, or Styled Components/Tailwind for reusable components.",
      "Keep styles modular: separate CSS from component logic.",
      "Ensure responsive design using flexbox, grid, or Tailwind utilities.",
      "Create reusable styled components like buttons, cards, and headings.",
      "Maintain accessibility and readability with proper contrast, font sizes, and semantic HTML.",
      "Keep JSX clean: use React Fragments to avoid extra wrapper divs."
    ],
    conclusion: "Following these best practices ensures clean, maintainable, and scalable React applications."
  }
};


export const fragmentsData = {
  title: "Mastering React Fragments",
  intro: `React Fragments are an elegant solution to a common problem: 
  how to group multiple elements in a component without introducing unnecessary <div> wrappers. 
  Proper use of fragments improves readability, reduces DOM complexity, and keeps your UI flexible.`,
  
  why: {
    title: "Why Fragments Matter",
    points: [
      "Eliminate unnecessary HTML nodes and keep the DOM clean.",
      "Shorthand syntax <>...</> is concise and perfect when keys aren’t needed.",
      "Use <React.Fragment key='unique'> when rendering lists with keys.",
      "Fragments can wrap multiple elements in JSX without affecting styling or layout.",
      "Combine fragments with conditional rendering to handle complex UI structures gracefully."
    ]
  },

  examples: [
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

export default Example;`
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

export default ItemList;`
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

export default ConditionalFragment;`
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

export default TechList;`
    }
  ],

  best: {
    title: "Advanced Tips & Best Practices",
    points: [
      "Always prefer fragments over unnecessary wrapper divs to reduce DOM clutter.",
      "Shorthand <>...</> improves readability in simple scenarios.",
      "Use full <React.Fragment> syntax when keys are needed for lists.",
      "Nested fragments can handle complex conditional renderings without adding extra nodes.",
      "Fragments keep your JSX clean, which is crucial when scaling large applications."
    ],
    conclusion: "By mastering React Fragments, you write cleaner, maintainable, and professional React code, making your components lighter, easier to read, and more performant."
  }
};


export const hooksData = {
  title: "Mastering React Hooks",
  intro: `React Hooks revolutionized functional components by allowing you to manage state, side effects, context, and references
  without writing a single class. Hooks make components cleaner, more readable, and easier to maintain.`,

  why: {
    title: "Why Hooks Are Important",
    points: [
      "Manage state in functional components with useState.",
      "Perform side effects like API calls or subscriptions using useEffect.",
      "Share state across components easily with useContext.",
      "Handle complex state transitions with useReducer.",
      "Directly interact with DOM elements using useRef."
    ]
  },

  examples: [
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

export default Counter;`
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

    return () => clearInterval(interval);
  }, []);

  return <h1>Seconds Elapsed: {seconds}</h1>;
}

export default Timer;`
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

export default App;`
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

export default Counter;`
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

export default TextInputFocus;`
    }
  ],

  best: {
    title: "Best Practices & Tips",
    points: [
      "Always keep hooks at the top level of the component.",
      "Do not call hooks inside loops, conditions, or nested functions.",
      "Use useEffect cleanup to avoid memory leaks.",
      "Prefer useReducer for complex state logic instead of multiple useState calls.",
      "Combine useRef with useEffect for advanced DOM manipulations."
    ],
    conclusion: "Mastering React Hooks will elevate your React skills, making you capable of building scalable, clean, and maintainable applications."
  }
};



export const propsData = {
  title: "React Props: Zero ➝ Hero 🚀",
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
      code: `function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Usage
<Greeting name="Pavan" />`
    },
    {
      title: "2. Props with Destructuring",
      code: `function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Usage
<Greeting name="Alice" />`
    },
    {
      title: "3. Passing Multiple Props",
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
<UserCard name="John" age={28} city="New York" />`
    },
    {
      title: "4. Default Props",
      code: `function Welcome({ message = "Welcome to React!" }) {
  return <h1>{message}</h1>;
}

// Usage
<Welcome />`
    },
    {
      title: "5. Props with Callback Functions",
      code: `function Button({ onClick, label }) {
  return <button onClick={onClick}>{label}</button>;
}

const handleClick = () => alert("Button clicked!");

// Usage
<Button onClick={handleClick} label="Click Me" />`
    },
    {
      title: "6. Passing Objects as Props",
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
<Product product={item} />`
    },
    {
      title: "7. Conditional Rendering with Props",
      code: `function Message({ isLoggedIn }) {
  return (
    <p>{isLoggedIn ? "Welcome back!" : "Please log in."}</p>
  );
}

// Usage
<Message isLoggedIn={true} />`
    },
    {
      title: "8. Passing Arrays as Props",
      code: `function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo, i) => <li key={i}>{todo}</li>)}
    </ul>
  );
}

const tasks = ["Learn React", "Practice Props", "Build Projects"];

// Usage
<TodoList todos={tasks} />`
    },
    {
      title: "9. Advanced: Function Returning Values",
      code: `function Calculator({ operation, a, b }) {
  return <h2>Result: {operation(a, b)}</h2>;
}

const sum = (x, y) => x + y;

// Usage
<Calculator operation={sum} a={5} b={10} />`
    },
    {
      title: "10. Prop Aliases & Renaming",
      code: `function Profile({ name: username, age: years }) {
  return <p>{username} is {years} years old</p>;
}

// Usage
<Profile name="Ravi" age={22} />`
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


export const stateData = {
  title: "Understanding React State",
  intro: "State in React represents data that can change over time. Unlike props, state is managed within a component and can trigger re-renders.",

  why: {
    title: "Why State is Important",
    points: [
      "Allows components to track changing data (counters, forms, timers).",
      "Makes apps interactive — updating UI automatically when state changes.",
      "Provides local memory to a component without relying on external variables.",
      "Works seamlessly with hooks like useEffect and useContext."
    ]
  },

  examples: [
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

export default Counter;`
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

export default UserInfo;`
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

export default Profile;`
    }
  ],

  best: {
    title: "Best Practices with State",
    points: [
      "Keep state as simple as possible — avoid unnecessary nesting.",
      "Always update state immutably (never modify it directly).",
      "Group related values into objects, but avoid deeply nested state.",
      "Use multiple useState calls for unrelated data.",
      "For complex logic, consider useReducer instead of state."
    ],
    conclusion: "React state is powerful for building dynamic, interactive, and modern web applications."
  }
};
