// Em Menu.js
import React, { useState, useEffect } from "react";
import "./Menu.css";
import logoPizza from "./pizza_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(location.pathname);

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  return (
    <div className="header-container">
      <header className="header-bottom">
        <div className="header-left">
          <div className="header-logo">
            <Link to="/home">
              <img src={logoPizza} alt="Logotipo Senac" />
            </Link>
          </div>

          <div className="header-title">
            <h1>Pizza</h1>
            <span className="highlight">Gurizada</span>
          </div>
          <div className="header-links">
            <Link to="/home" className={currentPage === "/home" ? "active" : ""}>
              Home
            </Link>
            <Link to="/menu" className={currentPage === "/menu" ? "active" : ""}>
              Menu
            </Link>
            <Link to="/sobre" className={currentPage === "/sobre" ? "active" : ""}>
              Sobre
            </Link>
            <Link to="/contato" className={currentPage === "/contato" ? "active" : ""}>
              Contato
            </Link>
            <Link to="/criar-conta" className={currentPage === "/criar-conta" ? "active" : ""}>
              <FontAwesomeIcon icon={faUser} />
            </Link>
            <Link to="/carrinho" className={currentPage === "/carrinho" ? "active" : ""}>
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Menu;