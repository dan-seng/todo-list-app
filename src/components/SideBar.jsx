import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars, FaSignOutAlt, FaCog, FaRegCalendarAlt, FaRegStickyNote, FaSun, FaMoon, FaCalendarWeek } from "react-icons/fa";
import { useDarkMode } from "../context/DarkModeContext";
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

  const { isDarkMode, toggleDarkMode } = useDarkMode();

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
        
        <nav onClick={handleNavClick}>
          <p className="tasks-links">Tasks</p>
          <ul>
            <li><NavLink to="upcoming" className={({ isActive }) => isActive ? 'active' : ''}> &gt;&gt; Upcoming</NavLink></li>
            <li><NavLink to="today" className={({ isActive }) => isActive ? 'active' : ''}><FaSun size={17} />Today</NavLink></li>
            <li><NavLink to="sticky" className={({ isActive }) => isActive ? 'active' : ''}><FaRegStickyNote size={17} />Sticky Wall</NavLink></li>
            <li><NavLink to="calendarview" className={({ isActive }) => isActive ? 'active' : ''}><FaRegCalendarAlt size={17} />Calendar</NavLink></li>
            <li><NavLink to="week" className={({ isActive }) => isActive ? 'active' : ''}><FaCalendarWeek size={17} />This Week</NavLink></li>
            </ul>
          <p className="tasks-links">Settings</p>
          <ul>
            <li>
              <button 
                onClick={toggleDarkMode} 
                className="dark-mode-toggle"
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <FaSun size={17} /> : <FaMoon size={17} />}
                <span>{isDarkMode ? 'Light' : 'Dark'}</span>
              </button>
            </li>
            <li><NavLink to="settings" className={({ isActive }) => isActive ? 'active' : ''}><FaCog size={17} />Settings</NavLink></li>
          </ul>
          <Link to="/" className="sign-out"><FaSignOutAlt size={17} />Sign out</Link>
        </nav>
      </div>
    </>
  );
}
