import React, { useState } from "react";
import "../style/Navbar.css";

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <h3 className="logo">BIGBOX</h3>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isCollapsed ? ">" : "<"}
        </button>
      </div>
      <ul className="sidebar-menu">
        <li className="menu-item">
          <i className="icon dashboard-icon" /> {isCollapsed ? "" : "Dashboard"}
        </li>
        <li className="menu-item">
          <i className="icon leads-icon" /> {isCollapsed ? "" : "Data Leads"}
        </li>
        <li className="menu-item">
          <i className="icon pic-icon" /> {isCollapsed ? "" : "PIC Leads"}
        </li>
        <li className="menu-item logout">
          <i className="icon logout-icon" /> {isCollapsed ? "" : "Log Out"}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
