import React, { useState } from 'react';
import './HomeScreen.css';

const HomeScreen = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logged Out');
  };

  return (
    <div className="home-container">
      <div className="background-logo"></div>
      <header className="header">
        <h2>Ready to take a snapshot?...</h2>
      </header>

      {/* Take Snap Button */}
      <button className="take-snap-button">
        <img
          src="/path_to_image/Group_17.png"
          alt="Take Snap"
          className="take-snap-initial"
        />
      </button>

      {/* Top Right Icon */}
      <button className="top-right-button">
        <img src="/path_to_image/logo.png" alt="Home Logo" />
      </button>

      {/* Left Sidebar Icon */}
      <button className="sidebar-toggle" onClick={handleToggleSidebar}>
        <div className="three-line-icon"></div>
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <ul>
          <li onClick={() => console.log('Go to Home')}>Home</li>
          <li onClick={() => console.log('Go to History')}>History</li>
          <li onClick={() => console.log('Go to Profile')}>Profile</li>
          <li onClick={handleLogout}>Log Out</li>
        </ul>
      </div>
    </div>
  );
};

export default HomeScreen;