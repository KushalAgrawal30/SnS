import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Route to render Login component on the root ("/") path */}
          <Route index element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
