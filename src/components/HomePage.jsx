import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const topics = [
    { name: "Fragments", path: "/fragments", description: "Learn how to use React Fragments for cleaner JSX." },
    { name: "Hooks", path: "/hooks", description: "Understand React Hooks like useState and useEffect." },
    { name: "Props", path: "/props", description: "Pass data between components using props." },
    { name: "State", path: "/state", description: "Manage component state effectively." },
  ];

  const projects = [
    { name: "Project 1", path: "/projects/project1", description: "A small React project example." },
    { name: "Project 2", path: "/projects/project2", description: "Another React project demo." },
  ];

  return (
    <div style={{ fontFamily: "'Roboto', sans-serif" }}>
      {/* Hero Section */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "100px 20px 60px 20px",
         // professional gradient
          borderRadius: "20px",
          
          color: "#1b2a47", // darker text
          maxWidth: "1200px",
          margin: "40px auto",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>Welcome to My React Journey</h1>
        <p style={{ fontSize: "1.2rem", maxWidth: "600px", marginBottom: "30px" }}>
          Learn React concepts, build projects, and enhance your frontend skills.
        </p>
        <Link
          to="/Topics"
          style={{
            padding: "14px 28px",
            backgroundColor: "#1E93AB",
            color: "white",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            boxShadow: "0 6px 15px rgba(30, 147, 171, 0.3)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(30, 147, 171, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 6px 15px rgba(30, 147, 171, 0.3)";
          }}
        >
          Start Learning
        </Link>
      </section>

    {/* Topics Section */}
<section id="topics" style={{ padding: "60px 20px", textAlign: "center" }}>
  <h2 style={{ fontSize: "2rem", marginBottom: "40px" }}>React Topics</h2>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "20px",
      maxWidth: "1000px",
      margin: "0 auto",
    }}
  >
    {topics.map((topic) => (
      <Link
        key={topic.name}
        to={topic.path}
        style={{
          padding: "20px",
          borderRadius: "12px",
          background: "rgba(255, 255, 255, 0.15)", // transparent card
          backdropFilter: "blur(10px)", // glass effect
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          textDecoration: "none",
          color: "#1b2a47", // dark text
          transition: "transform 0.3s, box-shadow 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
        }}
      >
        <h3 style={{ marginBottom: "10px" }}>{topic.name}</h3>
        <p>{topic.description}</p>
      </Link>
    ))}
  </div>
</section>

{/* Projects Section */}
<section style={{ padding: "60px 20px", textAlign: "center", backgroundColor: "#f0f4f8" }}>
  <h2 style={{ fontSize: "2rem", marginBottom: "40px" }}>Projects</h2>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "20px",
      maxWidth: "1000px",
      margin: "0 auto",
    }}
  >
    {projects.map((project) => (
      <Link
        key={project.name}
        to={project.path}
        style={{
          padding: "20px",
          borderRadius: "12px",
          background: "rgba(255, 255, 255, 0.15)", // transparent glass card
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          textDecoration: "none",
          color: "#1b2a47",
          transition: "transform 0.3s, box-shadow 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
        }}
      >
        <h3 style={{ marginBottom: "10px" }}>{project.name}</h3>
        <p>{project.description}</p>
      </Link>
    ))}
  </div>
</section>

    </div>
  );
}

export default HomePage;
