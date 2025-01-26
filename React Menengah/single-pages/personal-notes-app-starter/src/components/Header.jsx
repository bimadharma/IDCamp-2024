import React from 'react';
import PropTypes from 'prop-types'; 
import { Link } from 'react-router-dom';

const Header = ({ title, navigationLinks }) => {
  return (
    <header>
      <h1><Link to="/">{title}</Link></h1>
      <div className="navigation">
        <ul>
          {navigationLinks.map((link, index) => (
            <li key={index}><Link to={link.path}>{link.label}</Link></li>
          ))}
        </ul>
      </div>
    </header>
  );
};

Header.defaultProps = {
  title: 'App Catatan',
  navigationLinks: [
    { path: '/notes/archived', label: 'Arsip' }
  ],
};

Header.propTypes = {
  title: PropTypes.string, 
  navigationLinks: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired, 
      label: PropTypes.string.isRequired 
    })
  ),
};

export default Header;
