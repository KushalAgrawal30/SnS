import React, { useState, useEffect } from 'react';
import './ProductListingPage.css';
import axios from 'axios';

const ProductListingPage = ({ goToHome, goToHistory, goToProfile, handleLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [priceCheck, setPriceCheck] = useState('');
  const [items, setItems] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState(null);


  useEffect(() => {
    axios.get('http://localhost:8000/getData')
      .then((response) => {
        console.log("This is the respone",response)
        setItems(response.data.data);
      })
      .catch((error) => {
        console.error("API fetch failed", error);
        setError("Failed to load data from API");
      })
      .finally(() => {
        setLoading(false);
      });;
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePriceCheck = () => {
    // Function to handle price check and send notification
    console.log(`Price check set at: ${priceCheck}`);
    alert(`Price alert set at: ${priceCheck}`);
  };

  return (
    <div className="product-listing-container">
      <div className="background-logo"></div>

      {/* Top Right Icon to go Home */}
      <button className="top-right-button" onClick={goToHome}>
        <img src="/path_to_logo/Group_(2).png" alt="Home Logo" />
      </button>

      {/* Left Sidebar Toggle Button */}
      <button className="sidebar-toggle" onClick={handleToggleSidebar}>
        <div className="three-line-icon"></div>
      </button>

      {/* Search Price Input and Notification Bell */}
      <div className="price-check-container">
        <input
          type="text"
          placeholder="Enter price"
          value={priceCheck}
          onChange={(e) => setPriceCheck(e.target.value)}
        />
        <button className="bell-icon" onClick={handlePriceCheck}>
          <img src="/path_to_bell_icon/bell.png" alt="Set Price Alert" />
        </button>
      </div>
            {/* Listings Section */}
            {items.map((item, index) => (
            <div className="listings-container">
        {/* Example of a listing */}
        <div className="listing">
          <div className="listing-image">
            {/* Placeholder for product image */}
            <img src="/path_to_image/product_image_1.png" alt="Product 1" />
          </div>
          <div className="listing-details">
            <p>{item.title}</p>
            <p>{item.price}</p>
            <p>{item.price}</p>
            <a href="/path_to_listing_1">View Listing</a>
          </div>
        </div>
      

        {/* Additional listings can be added similarly */}
      </div>
    ))}
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <ul>
          <li onClick={goToHome}>Home</li>
          <li onClick={goToHistory}>History</li>
          <li onClick={goToProfile}>Profile</li>
          <li onClick={handleLogout}>Log Out</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductListingPage;