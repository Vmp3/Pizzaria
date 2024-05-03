import React, { useState } from "react";
import "./Menu.css";
import logoPizza from "./pizza_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="header-container">
      <header className="header-bottom">
        <div className="header-left">
          <div className="header-logo">
            <img src={logoPizza} alt="Logotipo Senac" />
          </div>
          <div className="header-title">
            <h1>Pizza</h1>
            <span>Gurizada</span>
          </div>
        </div>
        <div className="header-right">
          <div className="header-actions">
            <button className="header-action-button">
              <FontAwesomeIcon icon={faUser} />
            </button>
            <button className="header-action-button">
              <FontAwesomeIcon icon={faShoppingCart} />
            </button>
          </div>
          <div className="menu-toggle-container">
            <button className="menu-toggle" onClick={toggleMenu}>
              <div className="menu-bar"></div>
              <div className="menu-bar"></div>
              <div className="menu-bar"></div>
            </button>
            {menuOpen && (
              <nav className="menu-hamburger">
                <a href="/inicio">Início</a>
                <a href="/sobre">Sobre</a>
                <a href="/contato">Contato</a>
              </nav>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Menu;
