import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // New state for password
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    if (!validateEmail(emailValue)) {
      setError('Invalid Email Address Format');
    } else {
      setError('');
    }
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    // Optionally, add any password validation here
    if (passwordValue.length < 6) {
      setError('Password must be at least 6 characters long');
    } else {
      setError('');
    }
  };

  const handleNavigate = () => {
    navigate('/upload');
  };

  return (
    <>
      {/* Input for Email */}
      <input
        type="text"
        placeholder="Enter Email Address"
        value={email}
        onChange={handleEmailChange}
        className="txt-input"
      />
      {/* Input for Password */}
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={handlePasswordChange}
        className="txt-input"
      />
      {/* Display any validation errors */}
      {error && <p className="error-message">{error}</p>}
      <br />
      <button
        onClick={handleNavigate}
        disabled={!email || !validateEmail(email) || password.length < 6} // Disable if email is invalid or password is too short
      >
        Get Started
      </button>
    </>
  );
};

export default Login;
