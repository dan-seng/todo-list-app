import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar() {
  const [open, setOpen] = useState(true)
 
  return (

    <> 
    {
      !open && (
         <button
          className="fixed-toggle"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <FaBars />
        </button>
      ) 
    }
       <div className={`sidebar${open ? " open" : " closed"}`}>
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
      <nav>
          <p className="tasks-links">Tasks</p>
        <ul> 
          <li><NavLink to="upcoming">Upcoming</NavLink></li>
          <li><NavLink to="today">Today</NavLink></li>
          <li><NavLink to="sticky">Sticky Wall</NavLink></li>
          <li><NavLink to="calendarview">Calendar</NavLink></li>
              <hr />
          <li><NavLink to="settings">Settings</NavLink></li>
        </ul>
        <Link to= "/signin">Log Out</Link>
      </nav>
    </div>
  </>
  );
}
