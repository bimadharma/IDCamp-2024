import React from "react";
import PropTypes from "prop-types";

const SearchBar = ({ title, searchQuery, onSearchChange }) => {
  return (
    <div className="search-bar-container">
      <h1>{title}</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Cari catatan..."
          value={searchQuery} 
          onChange={(e) => onSearchChange(e.target.value)} 
        />
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default SearchBar;
