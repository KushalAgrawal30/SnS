import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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

  
  

  const handleSubmit = () => {
    // Check for errors before sending the request
    if (!validateEmail(email) || password.length < 6) {
      setError('Please enter valid email and password.');
      return;
    }

    // Send login data to the server
    fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }), // Send email and password
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        // Navigate to the upload page if login is successful
        if (data.success) {
          navigate('/homescreen');
        } else {
          setError('Invalid login credentials.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('An error occurred. Please try again.');
      });
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
      <br />
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
        onClick={handleSubmit}
        disabled={!email || !validateEmail(email) || password.length < 6} // Disable if email is invalid or password is too short
      >
        Get Started
      </button>
      <br />
      <Link to="./CreateAccount">Create Account Link</Link>
    </>
  );
};

export default Login;
