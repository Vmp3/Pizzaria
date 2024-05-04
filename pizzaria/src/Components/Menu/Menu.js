import React from "react";
import "./Menu.css";
import logoPizza from "./pizza_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Menu = () => {
  return (
    <div className="header-container">
      <header className="header-bottom">
        <div className="header-left">
          <div className="header-logo">
            <img src={logoPizza} alt="Logotipo Senac" />
          </div>
          <div className="header-title">
            <h1>Pizza</h1>
            <span className="highlight">Gurizada</span>
          </div>
          <div className="header-links">
            <a href="/home" className="active">Home</a>
            <a href="/menu">Menu</a>
            <a href="/sobre">Sobre</a>
            <a href="/contato">Contato</a>
          </div>
        </div>
        <div className="header-right">
          <button className="header-action-button">
            <FontAwesomeIcon icon={faUser} />
          </button>
          <button className="header-action-button">
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>
        </div>
      </header>
    </div>
  );
};

export default Menu;
