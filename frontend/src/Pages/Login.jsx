import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    if (passwordValue.length < 6) {
      setError('Password must be at least 6 characters long');
    } else {
      setError('');
    }
  };

  const handleSubmit = () => {
    if (!validateEmail(email) || password.length < 6) {
      setError('Please enter valid email and password.');
      return;
    }

    fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          navigate('/homescreen');
        } else {
          setError('Invalid login credentials.');
        }
      })
      .catch((error) => {
        setError('An error occurred. Please try again.');
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter Email Address"
        value={email}
        onChange={handleEmailChange}
        className="login-input"
      />
      <br />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={handlePasswordChange}
        className="login-input"
      />
      {error && <p className="error-message">{error}</p>}
      <br />
      
      {/* Replace button with a div styled as a button */}
      <div 
        className="login-button" 
        onClick={handleSubmit} 
      />
      
      <br />
      <Link to="./CreateAccount" className="create-account">Create Account</Link>
    </div>
  );
};

export default Login;
