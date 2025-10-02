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
  const userDropdownRef = useRef(null);

  const menuItems = [
    { 
      name: "Learning Topics", 
      path: "/topics", 
      icon: "📚", 
      color: "#007ACC",
      description: "Explore React concepts"
    },
    { 
      name: "Project Examples", 
      path: "/projects", 
      icon: "💼", 
      color: "#10B981",
      description: "Real-world applications"
    },
    { 
      name: "Get in Touch", 
      path: "/contact", 
      icon: "📞", 
      color: "#F59E0B",
      description: "Contact our team"
    },
    { 
      name: "About Platform", 
      path: "/about", 
      icon: "ℹ️", 
      color: "#8B5CF6",
      description: "Learn about our mission"
    },
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
      // Close mobile menu
      if (
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }

      // Close user dropdown
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setShowUserDropdown(false);
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

  const handleUserProfileEnter = () => {
    setShowUserDropdown(true);
  };

  const handleUserProfileLeave = () => {
    setTimeout(() => {
      if (!userDropdownRef.current?.matches(':hover')) {
        setShowUserDropdown(false);
      }
    }, 150);
  };

  const handleDropdownEnter = () => {
    setShowUserDropdown(true);
  };

  const handleDropdownLeave = () => {
    setShowUserDropdown(false);
  };

  // Enhanced Nav Styles
  const navStyle = {
    position: "fixed",
    top: showNav ? 0 : "-80px",
    left: 0,
    right: 0,
    height: "60px",
    background: "rgba(255, 255, 255, 0.98)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    zIndex: 1000,
    transition: "top 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 2px 20px rgba(0, 0, 0, 0.08)",
  };

  // Professional Hamburger Menu
  const HamburgerButton = () => (
    <button
      ref={hamburgerRef}
      onClick={toggleMobileMenu}
      style={{
        width: "44px",
        height: "44px",
        border: "none",
        background: mobileMenuOpen ? "#007ACC" : "transparent",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        padding: "10px",
      }}
      aria-label="Toggle navigation menu"
      aria-expanded={mobileMenuOpen}
    >
      <div style={{
        width: "20px",
        height: "2px",
        background: mobileMenuOpen ? "white" : "#374151",
        margin: "2px 0",
        transform: mobileMenuOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        borderRadius: "1px",
      }} />
      <div style={{
        width: "20px",
        height: "2px",
        background: mobileMenuOpen ? "white" : "#374151",
        margin: "2px 0",
        opacity: mobileMenuOpen ? 0 : 1,
        transform: mobileMenuOpen ? "translateX(-10px)" : "none",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        borderRadius: "1px",
      }} />
      <div style={{
        width: "20px",
        height: "2px",
        background: mobileMenuOpen ? "white" : "#374151",
        margin: "2px 0",
        transform: mobileMenuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        borderRadius: "1px",
      }} />
    </button>
  );

  // Professional Mobile Menu Overlay
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
      <div style={{
        padding: "32px 24px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
      }}>
        {/* User Profile Section */}
        {user && (
          <div style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
            borderRadius: "16px",
            padding: "20px",
            marginBottom: "32px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #007ACC, #005a9e)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "600",
                fontSize: "16px",
                border: "2px solid rgba(255, 255, 255, 0.3)",
              }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div style={{ color: "white", fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>
                  {user.name}
                </div>
                <div style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "13px", fontWeight: "400" }}>
                  {user.email}
                </div>
              </div>
            </div>
            
            {/* Sign Out Button */}
            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                padding: "14px 20px",
                background: "rgba(239, 68, 68, 0.9)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "10px",
                color: "white",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                transition: "all 0.3s ease",
                marginTop: "12px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(239, 68, 68, 1)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(239, 68, 68, 0.9)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span style={{ fontSize: "16px" }}>↩️</span>
              Sign Out
            </button>
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
                borderRadius: "14px",
                marginBottom: "12px",
                textDecoration: "none",
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                background: item.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: "500",
              }}>
                {item.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>
                  {item.name}
                </div>
                <div style={{ fontSize: "13px", opacity: 0.8, fontWeight: "400" }}>
                  {item.description}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Sign In Button */}
        {!user && (
          <div style={{ marginTop: "auto", paddingTop: "20px" }}>
            <Link
              to="/Login"
              onClick={handleLinkClick}
              style={{
                display: "block",
                width: "100%",
                padding: "16px 24px",
                background: "rgba(255, 255, 255, 0.95)",
                border: "none",
                borderRadius: "14px",
                color: "#007ACC",
                fontSize: "16px",
                fontWeight: "600",
                textDecoration: "none",
                textAlign: "center",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.95)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Sign In to Account
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  // Professional Desktop User Profile
  const DesktopUserProfile = () => (
    <div 
      ref={userDropdownRef}
      style={{ position: "relative" }}
      onMouseEnter={handleDropdownEnter}
      onMouseLeave={handleDropdownLeave}
    >
      <div 
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "8px 16px",
          borderRadius: "10px",
          background: showUserDropdown ? "#F8FAFC" : "transparent",
          border: "1px solid transparent",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onClick={() => setShowUserDropdown(!showUserDropdown)}
        onMouseEnter={handleUserProfileEnter}
        onMouseLeave={handleUserProfileLeave}
      >
        <div style={{
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #007ACC, #005a9e)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "600",
          fontSize: "14px",
          border: "2px solid #E5E7EB"
        }}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div style={{ fontSize: "14px", fontWeight: "600", color: "#1F2937" }}>
            {user.name}
          </div>
          <div style={{ fontSize: "12px", color: "#6B7280", fontWeight: "400" }}>
            {user.email}
          </div>
        </div>
      </div>

      {showUserDropdown && (
        <div 
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            marginTop: "8px",
            background: "white",
            border: "1px solid #E5E7EB",
            borderRadius: "14px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
            padding: "8px",
            minWidth: "220px",
            zIndex: 1001,
            animation: "dropdownFade 0.2s ease-out",
          }}
          onMouseEnter={handleDropdownEnter}
          onMouseLeave={handleDropdownLeave}
        >
          <div style={{ 
            padding: "8px 16px 6px", 
            color: "#6B7280", 
            fontSize: "11px", 
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}>
            Account Management
          </div>
          
          <div style={{ 
            padding: "12px 16px", 
            cursor: "pointer", 
            borderRadius: "8px", 
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "14px",
            color: "#374151",
            fontWeight: "500"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#F3F4F6";
            e.currentTarget.style.color = "#007ACC";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#374151";
          }}
          >
            <span style={{ fontSize: "16px" }}>👤</span>
            Profile Settings
          </div>
          
          <div style={{ 
            padding: "12px 16px", 
            cursor: "pointer", 
            borderRadius: "8px", 
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "14px",
            color: "#374151",
            fontWeight: "500"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#F3F4F6";
            e.currentTarget.style.color = "#007ACC";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#374151";
          }}
          >
            <span style={{ fontSize: "16px" }}>⚙️</span>
            Preferences
          </div>
          
          <div style={{ 
            height: "1px", 
            background: "#E5E7EB", 
            margin: "8px 12px" 
          }} />
          
          <button 
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "12px 16px",
              background: "transparent",
              border: "none",
              color: "#DC2626",
              textAlign: "left",
              cursor: "pointer",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "500",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#FEF2F2";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <span style={{ fontSize: "16px" }}>↩️</span>
            Sign Out
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
            alt="React Journey Logo" 
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
            <div style={{ display: "flex", gap: "4px" }}>
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  style={{
                    padding: "10px 16px",
                    textDecoration: "none",
                    color: "#374151",
                    fontWeight: "500",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    fontSize: "14px",
                    letterSpacing: "-0.01em",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F3F4F6";
                    e.currentTarget.style.color = item.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#374151";
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

          /* Better touch targets for mobile */
          @media (max-width: 768px) {
            button, a {
              min-height: 44px;
              min-width: 44px;
            }
          }
        `}
      </style>
    </>
  );
}

export default NavBar;