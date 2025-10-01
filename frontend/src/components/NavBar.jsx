import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar({ user, setUser }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const menuItems = [
    { name: "Topics", path: "/topics", icon: "📚", color: "#007ACC" },
    { name: "Projects", path: "/projects", icon: "💼", color: "#10B981" },
    { name: "Contact", path: "/contact", icon: "📞", color: "#F59E0B" },
    { name: "About", path: "/about", icon: "ℹ️", color: "#8B5CF6" },
  ];

  // Enhanced mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setMobileMenuOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Hide/show nav on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = isMobile ? 50 : 100;
      
      if (currentScrollY > scrollThreshold) {
        setShowNav(currentScrollY < lastScrollY.current);
      } else {
        setShowNav(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    if (setUser) setUser(null);
    navigate('/Login');
    setMobileMenuOpen(false);
    setShowUserDropdown(false);
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    setShowUserDropdown(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Enhanced Nav Styles
  const navStyle = {
    position: "fixed",
    top: showNav ? 0 : "-80px",
    left: 0,
    right: 0,
    height: "60px",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px",
    zIndex: 1000,
    transition: "top 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 2px 20px rgba(0, 0, 0, 0.08)",
  };

  // Enhanced Hamburger Menu - Modern Design
  const HamburgerButton = () => (
    <button
      ref={hamburgerRef}
      onClick={toggleMobileMenu}
      style={{
        width: "44px",
        height: "44px",
        border: "none",
        background: mobileMenuOpen ? "#007ACC" : "transparent",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        padding: "10px",
      }}
      aria-label="Toggle menu"
      aria-expanded={mobileMenuOpen}
    >
      <div style={{
        width: "20px",
        height: "2px",
        background: mobileMenuOpen ? "white" : "#2D3748",
        margin: "2px 0",
        transform: mobileMenuOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        borderRadius: "2px",
      }} />
      <div style={{
        width: "20px",
        height: "2px",
        background: mobileMenuOpen ? "white" : "#2D3748",
        margin: "2px 0",
        opacity: mobileMenuOpen ? 0 : 1,
        transform: mobileMenuOpen ? "translateX(-10px)" : "none",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        borderRadius: "2px",
      }} />
      <div style={{
        width: "20px",
        height: "2px",
        background: mobileMenuOpen ? "white" : "#2D3748",
        margin: "2px 0",
        transform: mobileMenuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        borderRadius: "2px",
      }} />
    </button>
  );

  // Modern Mobile Menu Overlay
  const MobileMenu = () => (
    <div
      ref={mobileMenuRef}
      style={{
        position: "fixed",
        top: "60px",
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        zIndex: 999,
        transform: mobileMenuOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: "hidden",
      }}
    >
      {/* Animated Background */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "radial-gradient(circle at 30% 20%, rgba(120, 119, 198, 0.3) 0%, rgba(255, 255, 255, 0) 50%)",
      }} />
      
      <div style={{
        padding: "32px 24px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
      }}>
        {/* Welcome Section */}
        {user && (
          <div style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            padding: "20px",
            marginBottom: "32px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #007ACC, #005a9e)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "600",
                fontSize: "18px",
                border: "3px solid rgba(255, 255, 255, 0.3)",
              }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div style={{ color: "white", fontSize: "16px", fontWeight: "600" }}>
                  {user.name}
                </div>
                <div style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "14px" }}>
                  {user.email}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <div style={{ flex: 1 }}>
          {menuItems.map((item, index) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={handleLinkClick}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "20px 16px",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                borderRadius: "16px",
                marginBottom: "12px",
                textDecoration: "none",
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                transition: "all 0.3s ease",
                transform: "translateX(0)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
                e.currentTarget.style.transform = "translateX(8px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              <div style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: item.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
              }}>
                {item.icon}
              </div>
              <div>
                <div style={{ fontSize: "16px", fontWeight: "600" }}>
                  {item.name}
                </div>
                <div style={{ fontSize: "12px", opacity: 0.8 }}>
                  Explore {item.name.toLowerCase()}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: "auto", paddingTop: "20px" }}>
          {user ? (
            <>
              <button
                onClick={handleLogout}
                style={{
                  width: "100%",
                  padding: "18px 24px",
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "16px",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  transition: "all 0.3s ease",
                  marginBottom: "12px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(239, 68, 68, 0.8)";
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <span>🚪</span>
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/Login"
              onClick={handleLinkClick}
              style={{
                display: "block",
                width: "100%",
                padding: "18px 24px",
                background: "rgba(255, 255, 255, 0.9)",
                border: "none",
                borderRadius: "16px",
                color: "#007ACC",
                fontSize: "16px",
                fontWeight: "600",
                textDecoration: "none",
                textAlign: "center",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.9)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  // Desktop User Profile
  const DesktopUserProfile = () => (
    <div style={{ position: "relative" }}>
      <div 
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "8px 16px",
          borderRadius: "12px",
          background: showUserDropdown ? "#F7FAFC" : "transparent",
          border: "1px solid transparent",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onClick={() => setShowUserDropdown(!showUserDropdown)}
        onMouseEnter={() => setShowUserDropdown(true)}
        onMouseLeave={() => setTimeout(() => setShowUserDropdown(false), 300)}
      >
        <div style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #007ACC, #005a9e)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "600",
          fontSize: "16px",
        }}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div style={{ fontSize: "14px", fontWeight: "600", color: "#2D3748" }}>
            {user.name}
          </div>
          <div style={{ fontSize: "12px", color: "#718096" }}>
            {user.email}
          </div>
        </div>
      </div>

      {showUserDropdown && (
        <div style={{
          position: "absolute",
          top: "100%",
          right: 0,
          marginTop: "8px",
          background: "white",
          border: "1px solid #E2E8F0",
          borderRadius: "16px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
          padding: "8px",
          minWidth: "200px",
          zIndex: 1001,
          animation: "dropdownFade 0.2s ease-out",
        }}>
          <div style={{ padding: "8px 16px 4px", color: "#A0AEC0", fontSize: "12px", fontWeight: "600" }}>
            ACCOUNT
          </div>
          <div style={{ padding: "12px 16px", cursor: "pointer", borderRadius: "8px", transition: "background 0.2s" }}>
            👤 Profile Settings
          </div>
          <div style={{ padding: "12px 16px", cursor: "pointer", borderRadius: "8px", transition: "background 0.2s" }}>
            ⚙️ Preferences
          </div>
          <div style={{ height: "1px", background: "#E2E8F0", margin: "8px 0" }} />
          <button 
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "12px 16px",
              background: "transparent",
              border: "none",
              color: "#E53E3E",
              textAlign: "left",
              cursor: "pointer",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "500",
              transition: "background 0.2s",
            }}
          >
            🚪 Sign Out
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <nav style={navStyle}>
        {/* Logo */}
        <Link
          to="/"
          onClick={handleLinkClick}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <img 
            src="/assets/react.svg" 
            alt="React Journey" 
            style={{ 
              height: "32px", 
              width: "32px",
              filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))"
            }} 
          />
          <span style={{
            fontWeight: "700",
            fontSize: "18px",
            background: "linear-gradient(135deg, #007ACC 0%, #005a9e 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            React Journey
          </span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            <div style={{ display: "flex", gap: "8px" }}>
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  style={{
                    padding: "10px 20px",
                    textDecoration: "none",
                    color: "#4A5568",
                    fontWeight: "500",
                    borderRadius: "10px",
                    transition: "all 0.3s ease",
                    fontSize: "15px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F7FAFC";
                    e.currentTarget.style.color = item.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#4A5568";
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {user && <DesktopUserProfile />}
          </div>
        )}

        {/* Mobile Hamburger */}
        {isMobile && <HamburgerButton />}
      </nav>

      {/* Mobile Menu */}
      {isMobile && <MobileMenu />}

      {/* Global Styles */}
      <style>
        {`
          @keyframes dropdownFade {
            from {
              opacity: 0;
              transform: translateY(-8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Improve mobile scrolling */
          .mobile-menu-scroll {
            -webkit-overflow-scrolling: touch;
            scroll-behavior: smooth;
          }

          /* Prevent blue highlight on tap */
          * {
            -webkit-tap-highlight-color: transparent;
          }

          /* Smooth transitions for all interactive elements */
          button, a {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
        `}
      </style>
    </>
  );
}

export default NavBar;