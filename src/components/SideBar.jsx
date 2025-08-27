import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  
  // Close sidebar on mobile when a link is clicked
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };
    
    // Set initial state based on screen size
    handleResize();
    
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Close sidebar when a link is clicked on mobile
  const handleNavClick = () => {
    if (window.innerWidth <= 768) {
      setOpen(false);
    }
  };

  return (
    <>
      {!open && (
        <button
          className="fixed-toggle"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <FaBars />
        </button>
      )}
      
      <div className={`sidebar ${open ? 'open' : 'closed'}`}>
        <div className="menu-bar-row">
          <h3 className="menu-heading">Menu</h3>
          {open && (
            <button
              className="sidebar-toggle"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <FaBars />
            </button>
          )}
        </div>
        
        <div className="sidebar-search">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
          />
        </div>
        
        <nav onClick={handleNavClick}>
          <p className="tasks-links">Tasks</p>
          <ul>
            <li><NavLink to="upcoming" className={({ isActive }) => isActive ? 'active' : ''}>Upcoming</NavLink></li>
            <li><NavLink to="today" className={({ isActive }) => isActive ? 'active' : ''}>Today</NavLink></li>
            <li><NavLink to="sticky" className={({ isActive }) => isActive ? 'active' : ''}>Sticky Wall</NavLink></li>
            <li><NavLink to="calendarview" className={({ isActive }) => isActive ? 'active' : ''}>Calendar</NavLink></li>
            <li><NavLink to="week" className={({ isActive }) => isActive ? 'active' : ''}>This Week</NavLink></li>
            <li><NavLink to="month" className={({ isActive }) => isActive ? 'active' : ''}>This Month</NavLink></li>
          </ul>
          <p className="tasks-links">Settings</p>
          <ul>
            <li><NavLink to="settings" className={({ isActive }) => isActive ? 'active' : ''}>Settings</NavLink></li>
          </ul>
          <Link to="/signin">Log Out</Link>
        </nav>
      </div>
    </>
  );
}
