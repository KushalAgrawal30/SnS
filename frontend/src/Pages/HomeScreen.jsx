import React, { useState } from 'react';
import './HomeScreen.css';

const HomeScreen = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    console.log('Logged Out');
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setIsConfirming(true); // Show the confirm screen
      };
      reader.readAsDataURL(file);
    }
  };

  const goToHome = () => {
    console.log('Going to Home');
    setIsConfirming(false);
    setImage(null); // Clear image if going home
  };

  const retakePicture = () => {
    setIsConfirming(false); // Allow user to retake picture
    setImage(null); // Clear the previous image
  };

  return (
    <div className="home-container">
      <div className="background-logo"></div>
      <header className="header">
        <h2>Ready to take a snapshot?...</h2>
      </header>

      {isConfirming ? (
        <div className="confirm-container">
          <div className="background-logo"></div>

          {/* Top Right Icon to go Home */}
          

          {/* Image Preview */}
          <div className="image-preview">
            <img src={image} alt="Preview" className="uploaded-image" />
          </div>

          {/* Confirm Button */}
          <button className="confirm-button">
            <img
              src="../Components/confirm1.png"
              alt="Confirm Button"
              className="confirm-initial"
            />
          </button>

          {/* Take Another Picture */}
          <p className="retake" onClick={retakePicture}>
            Take another picture
          </p>
        </div>
      ) : (
        <>
          {/* Take Snap Button */}
          <label htmlFor="file-input" className="take-snap-button">
            <img
              src="/path_to_image/Group_17.png"
              alt="Take Snap"
              className="take-snap-initial"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }} // Hide the default file input
              id="file-input"
              capture="environment" // Use this for opening the camera
            />
          </label>
        </>
      )}

      {/* Top Right Icon */}
      <button className="top-right-button">
        <img src="../Components/topright.png" alt="Home Logo" />
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
