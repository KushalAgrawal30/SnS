import React, { useState } from 'react';
import "./CreateAccount.css";


const CreateAccount = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    gender: '',
    age: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCreateAccount = () => {
    // Basic validation before showing the profile
    if (userData.name && userData.gender && userData.age && userData.email && userData.password && confirmPassword) {
      if (userData.password === confirmPassword) {
        setShowProfile(true);
      } else {
        alert('Passwords do not match');
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  if (showProfile) {
    return <ProfilePage userData={userData} />;
  }

  return (
    <div className="create-account-container">
      <div className="background-logo" />
      <h2 className="create-account-heading">Create Account</h2>
      <input
        type="text"
        placeholder="Enter your name..."
        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Enter your gender..."
        onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
      />
      <input
        type="number"
        placeholder="Enter your age..."
        onChange={(e) => setUserData({ ...userData, age: e.target.value })}
      />
      <input
        type="email"
        placeholder="Enter your e-mail id..."
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Enter Password..."
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      />
      <input
        type="password"
        placeholder="Confirm Password..."
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button className="create-account-button" onClick={handleCreateAccount}>
        <img src="/path_to_svg/create-account.svg" alt="Create Account" />
      </button>
    </div>
  );
};

const ProfilePage = ({ userData }) => {
  return (
    <div className="profile-page">
      <nav className="sidebar">
        <ul>
          <li>Home</li>
          <li>History</li>
          <li>Profile</li>
          <li>Log Out</li>
        </ul>
      </nav>
      <div className="profile-content">
        <h2>Profile</h2>
        <p>Name: {userData.name}</p>
        <p>Email id: {userData.email}</p>
      </div>
    </div>
  );
};

export default CreateAccount;
