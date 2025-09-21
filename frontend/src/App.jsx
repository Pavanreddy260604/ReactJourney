import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Topics from "./components/Topics.jsx";
import Frame from "./components/Frame.jsx";
import HomePage from './components/HomePage.jsx';
import { HomePageSkeleton } from "./components/HomePageSkeleton";
import NProgress from "nprogress";
import "nprogress/nprogress.css";  // default style
import "./App.css";
import Skeleton from "react-loading-skeleton";


function App() {
  const [allTopics, setAllTopics] = useState([]);
  const [loading, setLoading] = useState(true); // track loading state
  const [error, setError] = useState(false);

  useEffect(() => {
    NProgress.start(); // start progress bar

    fetch("https://reactjourney.onrender.com/api/items")
      .then(res => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then(data => {
        setAllTopics(data);
        setLoading(false); // stop loading
        NProgress.done();  // stop progress bar
      })
      .catch(err => {
        console.error(err);
        setError(true);
        setLoading(false);
        NProgress.done();
      });
  }, []);

  if (loading) return <HomePageSkeleton />; // show skeleton while loading

  if (error) {
    return (
      <div style={{ textAlign: "center", paddingTop: "100px", color: "red" }}>
        <h2>Backend is not responding. Please try again later.</h2>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", position: "relative", backgroundColor: "#fff" }}>
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
      <div style={{ position: "relative", zIndex: 1 }}>
        <NavBar />
        <div style={{ padding: "80px" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Topics" element={<Topics />} />
            <Route path="/projects" element={<h1>Projects Page</h1>} />
            <Route path="/contact" element={<h1>Contact Page</h1>} />
            <Route path="/about" element={<h1>About Page</h1>} />

            {allTopics.map((topic) => (
              <Route
                key={topic._id}
                path={topic.path}
                element={
                  <Frame
                    title={topic.title}
                    intro={topic.intro}
                    why={topic.why}
                    examples={topic.examples}
                    best={topic.best}
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
