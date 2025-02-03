import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { ThemeProvider } from "../contexts/ThemeContext";
import ToggleTheme from "../components/ToggleTheme";
import { LocaleConsumer } from "../contexts/LocaleContext";

const Header = ({ title, navigationLinks, onLogout, name }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const storedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(storedTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <LocaleConsumer>
      {({ locale, toggleLocale }) => (
        <ThemeProvider value={{ theme, toggleTheme }}>
          <header>
            <h1>
              <Link to="/">{title}</Link>
            </h1>
            <div className="menu">
              <div className="navigation">
                <ul>
                  {navigationLinks.map((link, index) => (
                    <li key={index}>
                      <Link to={link.path}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="toggle-theme">
                <ToggleTheme />
              </div>
              <button onClick={toggleLocale}>{locale === "id" ? "en" : "id"}</button>
              <button onClick={onLogout}>
                {name} <FiLogOut />
              </button>
            </div>

            {/* Hamburger Menu Button */}
            <div className="hamburger-menu" onClick={toggleSidebar}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          </header>

          {/* Sidebar Menu */}
          <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
            <div className="close-btn" onClick={toggleSidebar}>
              ×
            </div>
            <ul>
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
            <div className="sidebar-footer">
              <div className="toggle-theme">
                <ToggleTheme />
              </div>
              <button onClick={toggleLocale}>{locale === "id" ? "en" : "id"}</button>
              <button onClick={onLogout}>
                {name} <FiLogOut />
              </button>
            </div>
          </div>
        </ThemeProvider>
      )}
    </LocaleConsumer>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  navigationLinks: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onLogout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Header;
