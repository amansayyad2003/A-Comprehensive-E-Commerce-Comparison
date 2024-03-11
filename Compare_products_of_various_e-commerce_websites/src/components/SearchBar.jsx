import React from 'react';
import './searchBar.css';

export default function SearchBar() {
  return (
    <div className="search-container">
      <div className="box">
        <input type="text" placeholder="Search..." />
        <a href="#">
          <i className="fas fa-search"></i>
        </a>
      </div>
    </div>
  );
}
