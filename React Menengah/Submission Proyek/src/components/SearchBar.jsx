import React from "react";
import { LocaleConsumer } from "../contexts/LocaleContext";
import PropTypes from "prop-types";

const SearchBar = ({ title, searchQuery, onSearchChange }) => {
  return (
    <LocaleConsumer>
      {({ locale }) => (
        <div className="search-bar-container">
          <h1>{title}</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder={locale === "id" ? "Cari catatan..." : "Search notes..."}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
      )}
    </LocaleConsumer>
  );
};

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,      
  searchQuery: PropTypes.string.isRequired, 
  onSearchChange: PropTypes.func.isRequired, 
};

export default SearchBar;
