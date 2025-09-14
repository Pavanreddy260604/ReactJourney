import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const [hovered, setHovered] = useState(null);
  const [showNav, setShowNav] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const lastScrollY = useRef(0);

  const menuItems = [
    { name: "Topics", path: "/topics" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
  ];

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth <= 768);
    updateIsMobile();

    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setShowNav(currentScrollY < lastScrollY.current || currentScrollY < 10);
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    backgroundColor: "white",
    boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
    position: "fixed",
    top: showNav ? 0 : "-100px",
    width: "100%",
    transition: "top 0.3s ease-in-out",
    zIndex: 1000,
    height: "80px",
    boxSizing: "border-box",
  };

  const menuListStyle = {
    listStyleType: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: isMobile ? "flex-start" : "center",
    gap: isMobile ? "0" : "10px",
    paddingRight: isMobile ? 0 : "20px",
    backgroundColor: isMobile ? "white" : "transparent",
    position: isMobile ? "fixed" : "static",
    top: "80px",
    right: 0,
    width: isMobile ? "200px" : "auto",
    boxShadow: isMobile ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
    borderRadius: isMobile ? "0 0 0 8px" : "0",
    transform: isMobile
      ? mobileMenuOpen
        ? "translateX(0)"
        : "translateX(100%)"
      : "none",
    transition: "transform 0.3s ease-in-out",
    zIndex: 999,
  };

  const linkStyle = (index) => ({
    display: "block",
    textDecoration: "none",
    cursor: "pointer",
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: hovered === index ? "#b3f2ffff" : "transparent",
    color: "black",
    borderRadius: "6px",
    transition: "0.3s",
    padding: isMobile ? "12px 20px" : "14px 20px",
    width: isMobile ? "100%" : "auto",
  });

  const hamburgerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    width: "30px",
    height: "25px",
    cursor: "pointer",
    
    padding: "5px",
    borderRadius: "4px",
  };

  const barStyle = {
    width: "100%",
    height: "6px",
    backgroundColor: "black",
    borderRadius: "2px",
    transition: "all 0.3s ease",
  };

  return (
    <nav style={navStyle}>
      {/* Logo */}
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          textDecoration: "none",
        }}
        onClick={() => setMobileMenuOpen(false)}
      >
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

      {/* Hamburger Icon (Mobile Only) */}
      {isMobile && (
        <div
          role="button"
          aria-label="Toggle menu"
          tabIndex={0}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          onKeyDown={(e) => e.key === "Enter" && setMobileMenuOpen(!mobileMenuOpen)}
          style={hamburgerStyle}
        >
          <div
            style={{
              ...barStyle,
              transform: mobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
            }}
          />
          <div style={{ ...barStyle, opacity: mobileMenuOpen ? 0 : 1 }} />
          <div
            style={{
              ...barStyle,
              transform: mobileMenuOpen ? "rotate(-45deg) translate(7px, -6px)" : "none",
            }}
          />
        </div>
      )}

      {/* Menu Items */}
      <ul style={menuListStyle}>
        {menuItems.map((item, index) => (
          <li key={item.name} style={{ width: "100%" }}>
            <Link
              to={item.path}
              style={linkStyle(index)}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => isMobile && setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
