import React from 'react';
import HomeScreen from './Pages/HomeScreen';
import './App.css';
import Login from './Pages/Login';
import CreateAccount from './Pages/CreateAccount';
import ConfirmScreen from './Pages/ConfirmScreen';
import ProductListingPage from './Pages/ProductListingPage';
import DataSavedScreen from './Pages/DataSavedScreen';

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
          <Route path='/ConfirmScreen' element = {<ConfirmScreen/>}/>
          <Route path='/ProductListingPage' element = {<ProductListingPage/>}/>
          <Route path='/DataSavedScreen' element = {<DataSavedScreen/>}/>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
