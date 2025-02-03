import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import ToggleTheme from '../components/ToggleTheme';
import { LocaleConsumer } from '../contexts/LocaleContext';
import PropTypes from 'prop-types';

const HeaderLogin = ({ title }) => {
  const storedTheme = localStorage.getItem('theme') || 'light';
  const [theme, setTheme] = useState(storedTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <LocaleConsumer>
      {({ locale, toggleLocale }) => (
        <ThemeProvider value={{ theme, toggleTheme }}>
          <header>
            <h1><Link to="/">{title}</Link></h1>
            <div className="toggle-theme">
              <ToggleTheme />
            </div>
            <button onClick={toggleLocale}>
              {locale === 'id' ? 'en' : 'id'}
            </button>
          </header>
        </ThemeProvider>
      )}
    </LocaleConsumer>
  );
};

HeaderLogin.propTypes = {
  title: PropTypes.string.isRequired, 
};

export default HeaderLogin;
