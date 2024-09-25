import React from 'react';
import './ConfirmScreen.css';

const ConfirmScreen = ({ goToHome, retakePicture }) => {
  return (
    <div className="confirm-container">
      <div className="background-logo"></div>

      {/* Top Right Icon to go Home */}
      <button className="top-right-button" onClick={goToHome}>
        <img src="/path_to_logo/Group_(2).png" alt="Home Logo" />
      </button>

      {/* Image Preview */}
      <div className="image-preview">
        {/* Placeholder for the captured image */}
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
  );
};

export default ConfirmScreen;