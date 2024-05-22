import React, { useState, useEffect } from "react";
import "./Menu.css";
import logoPizza from "./pizza_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from 'react-router-dom';

const Logo = () => {
  return (
    <div className="header-logo">
      <Link to="/home">
        <img src={logoPizza} alt="Logotipo Senac" />
      </Link>
    </div>
  );
};

const Title = () => {
  return (
    <div className="header-title">
      <h1>Pizza</h1>
      <span className="highlight">Gurizada</span>
    </div>
  );
};

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link to={to} className={isActive ? "active" : ""}>
      {children}
    </Link>
  );
};

const NavigationLinks = () => {
  return (
    <div className="header-links">
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/menu">Menu</NavLink>
      <NavLink to="/sobre">Sobre</NavLink>
      <NavLink to="/contato">Contato</NavLink>
      <NavLink to="/criar-conta">
        <FontAwesomeIcon icon={faUser} />
      </NavLink>
      <NavLink to="/carrinho">
        <FontAwesomeIcon icon={faShoppingCart} />
      </NavLink>
    </div>
  );
};

const Menu = () => {
  return (
    <div className="header-container">
      <header className="header-bottom">
        <div className="header-left">
          <Logo />
          <Title />
          <NavigationLinks />
        </div>
      </header>
    </div>
  );
};

export default Menu;