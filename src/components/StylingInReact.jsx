import React from 'react';
import './Styling.css';   // ✅ make sure Styling.css exists in the same folder or adjust path
const examples = [
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
}`,
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
}`,
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
}`,
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
}`,
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
}`,
  },
];


function StylingInReact() {
     const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  return (
    <div id="entire">
      <h1 className="Head">Styling In React</h1>
      <p id = "intro"> Styling is an essential part of building modern web applications. In React, styling is slightly different from plain HTML + CSS because React uses components. Each component can have its own design, and React gives us multiple ways to manage and organize styles.

When you start learning React, you might wonder: “Should I use normal CSS files, inline styles, or something like Tailwind or Styled Components?”
The answer is — React supports many styling approaches, and each has its advantages.

In this guide, we’ll go from Zero to Hero and learn all the major techniques to style React applications, including:</p>
<h2>1. Inline Styling</h2>
<p>Directly apply styles using the style prop (uses a JS object).</p>

{examples.map((example, idx) => (
        <div key={idx}  id = " Example" >
          <h3  id = "heading">{example.title}</h3>
          <div  id = "code">
            <pre id = "code-bg"
            
            >
              <code>{example.code}</code>
            </pre>
            <button id = "Button"
              onClick={() => copyCode(example.code)}
             
            >
              Copy
            </button>
          </div>
        </div>
      ))}

      <h2 style={{ fontSize: "1.8rem", marginBottom: "15px" }}>Styling Best Practices in React</h2>
<ul style={{ fontSize: "1.1rem", lineHeight: "1.7", marginBottom: "30px" }}>
  <li>Choose the right styling approach: inline for dynamic styles, CSS Modules for scoped styles, or Styled Components/Tailwind for reusable components.</li>
  <li>Keep styles modular: separate CSS from component logic to improve maintainability.</li>
  <li>Ensure responsive design using flexbox, grid, percentages, or Tailwind utilities.</li>
  <li>Create reusable styled components like buttons, cards, and headings to maintain consistency.</li>
  <li>Maintain accessibility and readability: proper contrast, font sizes, line heights, and semantic HTML.</li>
  <li>Keep your JSX clean: use React Fragments to avoid extra wrapper divs and improve maintainability.</li>
</ul>

<p style={{ fontSize: "1.1rem", lineHeight: "1.7" }}>
  Following these best practices will help you write clean, maintainable, and professional React code. Proper styling makes your components scalable, readable, and easier to maintain.
</p>


    </div>
  );
}

export default StylingInReact;
