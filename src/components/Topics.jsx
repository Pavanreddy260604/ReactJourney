import React from "react";
import { Link } from "react-router-dom";

const Topics = () => {
  const topics = [
    { name: "Fragments", path: "/fragments" },
    { name: "Hooks", path: "/hooks" },
    { name: "Props", path: "/props" },
    { name: "State", path: "/state" },
    { name: "Styling", path: "/style" },
   
    
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "'Roboto', sans-serif" }}>
      <h1>Topics</h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {topics.map((topic, idx) => (
          <li key={idx} style={{ marginBottom: "10px" }}>
            <Link
              to={topic.path}
              style={{
                textDecoration: "none",
                color: "#1E93AB",
                fontWeight: "bold",
              }}
            >
              {topic.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Topics;
