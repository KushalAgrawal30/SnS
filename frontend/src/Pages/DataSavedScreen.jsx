import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DataSavedScreen.css';
import takeSnap from '../Components/anosnap1.png';
import takeSnapHover from '../Components/anosnap2.png';

const DataSavedScreen = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/home');
  };

  const goToHistory = () => {
    navigate('/history');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleTakeAnotherSnap = () => {
    navigate('/HomeScreen');
  };

  return (
    <div className="data-saved-container">
      <div className="background-logo"></div>
      <button className="sidebar-toggle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="#76abae"
        >
          <path
            fill="#76abae"
            d="M3.75 5.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5zm0 6a.75.75 0 0 0 0 1.5h16.5a.75.75.75 0 0 0 0-1.5zm0 6a.75.75.75 0 0 0 0 1.5h16.5a.75.75.75 0 0 0 0-1.5z"
          />
        </svg>
      </button>
      <div className="sidebar">
        <ul>
          <li onClick={goToHome}>Home</li>
          <li onClick={goToHistory}>History</li>
          <li onClick={goToProfile}>Profile</li>
          <li onClick={handleLogout}>Log Out</li>
        </ul>
      </div>
      <div className="message-container">
        <h1>Your data was saved successfully!</h1>
        <p>
          You will get an e-mail as soon as the price drops to what you asked for.
          Thank you for choosing us!
        </p>
        <button className="take-snap-button" onClick={handleTakeAnotherSnap}>
          <img
            src={takeSnap}
            alt="Take Another Snap"
            onMouseOver={(e) => (e.currentTarget.src = takeSnapHover)}
            onMouseOut={(e) => (e.currentTarget.src = takeSnap)}
          />
        </button>
      </div>
    </div>
  );
};

export default DataSavedScreen;