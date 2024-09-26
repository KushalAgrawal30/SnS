import React, { useRef, useState, useEffect } from 'react';
import './HomeScreen.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import topright from '../Components/rightg.png'

const HomeScreen = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const sidebarRef = useRef(null);

  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false); // Close sidebar
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);
  const gotoProduct = () => {
    navigate('/ProductListingPage')
  }
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    console.log('Logged Out');
    navigate('/');
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setIsConfirming(true); // Show the confirm screen
      };
      const formdata = new FormData();
      formdata.append('image', file);
      const response = axios.post('http://localhost:8000/upload', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
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

          {/* Image Preview */}
          <div className="image-preview">
            <img src={image} alt="Preview" className="uploaded-image" />
          </div>
          {/* Confirm Button */}
          <button onClick={gotoProduct} className="confirm-button">
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
        
      </button>

      {/* Left Sidebar Icon */}
      <button className="sidebar-toggle" onClick={handleToggleSidebar}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30px"
          height="30px"
          viewBox="0 0 24 24"
          fill="#76abae"
        >
          <path
            fill="#76abae"
            d="M3.75 5.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5zm0 6a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5zm0 6a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5z"
          />
        </svg>
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
