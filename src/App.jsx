import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage.jsx";
import FragmentsPage from "./components/FragmentsPage.jsx";
import HooksPage from  "./components/HooksPage.jsx";
import PropsPage from "./components/PropsPage"
import StatePage from "./components/StatePage"

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
            <Route path="/fragments" element={<FragmentsPage/>} />
            <Route path="/hooks" element={<HooksPage/>} />
            <Route path="/props" element={<PropsPage/>} />
            <Route path="/state" element={<StatePage/>} />
            <Route path="/projects" element={<h1>Projects Page</h1>} />
            <Route path="/contact" element={<h1>Contact Page</h1>} />
            <Route path="/about" element={<h1>About Page</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
