import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Topics from "./components/Topics.jsx";
import Frame from "./components/Frame.jsx";
import { allTopics } from "../data/allTopics";
import HomePage from './components/HomePage.jsx'

function App() {
  return (
    <div style={{ minHeight: "100vh", position: "relative", backgroundColor: "#fff" }}>
      {/* Subtle React logo watermark */}
      <img
        src="/assets/react.svg"
        alt="background logo"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "40%",
          maxWidth: "600px",
          opacity: 0.1,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <NavBar />
        <div style={{ padding: "80px" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path = "/Topics" element= { <Topics/>}/>
            <Route path="/projects" element={<h1>Projects Page</h1>} />
            <Route path="/contact" element={<h1>Contact Page</h1>} />
            <Route path="/about" element={<h1>About Page</h1>} />
            {allTopics.map((topic, idx) => (
            <Route
              key={idx}
              path={topic.path}
              element={
                <Frame
                  title={topic.data.title}
                  intro={topic.data.intro}
                  why={topic.data.why}
                  examples={topic.data.examples}
                  best={topic.data.best}
                />
              }
            />
          ))}


          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
