import React, { useState, useEffect } from "react";
import "./Menu.css";
import logoPizza from "./pizza_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Menu = () => {
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    const path = window.location.pathname;
    setCurrentPage(path);

    if (window.location.hash === "#sobre") {
      window.history.replaceState(null, null, window.location.pathname);
    }

    if (window.location.hash === "#contato") {
      window.history.replaceState(null, null, window.location.pathname);
    }
  }, []);

  const handleSobreClick = (event) => {
    event.preventDefault();
    const sobreSection = document.getElementById("sobre");
    if (sobreSection) {
      sobreSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContatoClick = (event) => {
    event.preventDefault();
    const contatoSection = document.getElementById("contato");
    if (contatoSection) {
      contatoSection.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <div className="header-container">
      <header className="header-bottom">
        <div className="header-left">
          <div className="header-logo">
            <a href="/home">
              <img src={logoPizza} alt="Logotipo Senac" />
            </a>
          </div>

          <div className="header-title">
            <h1>Pizza</h1>
            <span className="highlight">Gurizada</span>
          </div>
          <div className="header-links">
            <a href="/home" className={currentPage === "/home" ? "active" : ""}>
              Home
            </a>
            <a href="/menu" className={currentPage === "/menu" ? "active" : ""}>
              Menu
            </a>
            <a
              href="/sobre"
              onClick={handleSobreClick}
              className={currentPage === "/sobre" ? "active" : ""}
            >
              Sobre
            </a>
            <a
              href="/contato"
              onClick={handleContatoClick}
              className={currentPage === "/contato" ? "active" : ""}
            >
              Contato
            </a>
            <a
              href="/account"
              className={currentPage === "/account" ? "active" : ""}
            >
              <FontAwesomeIcon icon={faUser} />
            </a>
            <a
              href="/carrinho"
              className={currentPage === "/carrinho" ? "active" : ""}
            >
              <FontAwesomeIcon icon={faShoppingCart} />
            </a>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Menu;
