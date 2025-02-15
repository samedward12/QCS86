import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Container } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaCog } from "react-icons/fa"; // Import the settings icon
import "./header.css";
import logo from "../../assets/logo.png";

const Header = ({ onLoginClick }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const checkAuthToken = () => {
    const token = Cookies.get("authToken");
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkAuthToken();
  }, [isLoggedIn]);

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  const handleLogout = () => {
    Cookies.remove("authToken");
    checkAuthToken();
    navigate("/");
  };

  const handlesignup = () => {
    navigate("/signup");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <Container>
        <div className="navigation d-flex align-items-center justify-content-between">
          <div className="logo d-flex align-items-center gap-2">
           <div className="logo-wrapper">   
            <img
              src={logo}
              alt="Logo"
              style={{ height: "70px", marginLeft: "-50px" }}
            />
            <h2 className="mb-0">QCS86</h2>
            </div>
            
          </div>

          <div className={`nav__list ${menuOpen ? "active" : ""}`}>
            <li className="nav__item">
              <Link to="/">Home</Link>
            </li>
            <li className="nav__item">
              <Link to="/courses">Courses</Link>
            </li>
          </div>

          <div className="search-bar-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
            />
            <button className="search-button">Search</button>
          </div>

          <div className="nav__right d-flex align-items-center">
            {isLoggedIn ? (
              <div
                className="settings-icon-container"
                onClick={handleSettingsClick}
              >
                <FaCog className="settings-icon" size={24} title="Settings" />
                <button className="btn btn-logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button className="btn btn-login" onClick={onLoginClick}>
                  Login
                </button>
                <button className="btn btn-signup" onClick={handlesignup}>
                  Signup
                </button>
              </>
            )}
          </div>

          <div className="mobile__menu" onClick={toggleMenu}>
            <span>
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};


export default Header;
