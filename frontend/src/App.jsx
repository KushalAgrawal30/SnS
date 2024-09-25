import React from 'react';
import HomeScreen from './Pages/HomeScreen';
import './App.css';
import Login from './Pages/Login';
import CreateAccount from './Pages/CreateAccount';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Route to render Login component on the root ("/") path */}
          <Route index element={<Login />} />
          <Route path='/CreateAccount' element={<CreateAccount/>}/>
          <Route path='/HomeScreen' element = {<HomeScreen/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
