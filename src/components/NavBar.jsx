import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const [hovered, setHovered] = useState(null);
  const [dropdownHovered, setDropdownHovered] = useState(false);
  const [dropdownItemHovered, setDropdownItemHovered] = useState(null);
  const [showNav, setShowNav] = useState(true); // show/hide state
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll listener
  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const linkStyle = {
    display: "block",
    padding: "14px 20px",
    textDecoration: "none",
    cursor: "pointer",
    fontFamily: "'Roboto', sans-serif",
  };

  const dropdownLinkStyle = {
    display: "block",
    padding: "8px 16px",
    textDecoration: "none",
    cursor: "pointer",
    borderRadius: "4px",
    fontFamily: "'Roboto', sans-serif",
  };

  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
          backgroundColor: "white",
          boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
          position: "fixed",
          top: showNav ? "0" : "-80px",
          width: "100%",
          transition: "top 0.3s ease-in-out",
          zIndex: 1000,
        }}
      >
        {/* Logo + site name clickable */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <img src="/assets/react.svg" alt="logo" style={{ height: "40px" }} />
          <span
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              fontFamily: "'Roboto', sans-serif",
              color: "black",
            }}
          >
            My React Journey
          </span>
        </Link>

        {/* Nav links */}
        <ul
          style={{
            listStyleType: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            alignItems: "center",
            gap: "5px",
            paddingRight: "20px",
          }}
        >
          {/* Topics dropdown */}
          <li
            style={{ position: "relative" }}
            onMouseEnter={() => setDropdownHovered(true)}
            onMouseLeave={() => setDropdownHovered(false)}
          >
            <span
              style={{
                ...linkStyle,
                backgroundColor: dropdownHovered ? "#b3f2ffff" : "transparent",
                color: "black",
                borderRadius: "6px",
                transition: "0.3s",
              }}
            >
              Topics ▾
            </span>

            {dropdownHovered && (
              <ul
                style={{
                  listStyleType: "none",
                  margin: 0,
                  padding: "10px 0",
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  backgroundColor: "white",
                  boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                  borderRadius: "6px",
                  minWidth: "160px",
                  zIndex: 1000,
                }}
              >
                {[
                  { name: "Fragments", path: "/fragments" },
                  { name: "Hooks", path: "/hooks" },
                  { name: "Props", path: "/props" },
                  { name: "State", path: "/state" },
                ].map((concept, index) => (
                  <li
                    key={concept.name}
                    onMouseEnter={() => setDropdownItemHovered(index)}
                    onMouseLeave={() => setDropdownItemHovered(null)}
                  >
                    <Link
                      to={concept.path}
                      style={{
                        ...dropdownLinkStyle,
                        backgroundColor: dropdownItemHovered === index ? "#b3f2ffff" : "transparent",
                        color: "black",
                        transition: "0.3s",
                      }}
                    >
                      {concept.name}
                    </Link>
                  </li>
                ))}
                 <li>
      <Link
  to="/topics"
  style={{
    ...dropdownLinkStyle,
    backgroundColor: "#1E93AB",
    color: "white",       // text white
    fontWeight: "bold",   // bold text
    borderRadius: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "6px 12px", // a bit more padding for a button look
    textDecoration: "none",
    transition: "0.3s",
  }}
>
  More
</Link>
      </li>
              </ul>
            )}
          </li>

          {/* Other nav links */}
          {[
            { name: "Projects", path: "/projects" },
            { name: "Contact", path: "/contact" },
            { name: "About", path: "/about" },
          ].map((item, index) => (
            <li key={item.name}>
              <Link
                to={item.path}
                style={{
                  ...linkStyle,
                  backgroundColor: hovered === index ? "#b3f2ffff" : "transparent",
                  color: "black",
                  borderRadius: "6px",
                  transition: "0.3s",
                }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
