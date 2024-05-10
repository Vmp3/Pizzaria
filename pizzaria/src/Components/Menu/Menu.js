import React, { useState, useEffect } from "react";
import "./Menu.css";
import logoPizza from "./pizza_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Menu = () => {
  // Estado para armazenar o link da página atual
  const [currentPage, setCurrentPage] = useState("");

  // Atualizar o link da página atual com base na URL
  useEffect(() => {
    const path = window.location.pathname;
    setCurrentPage(path);
  }, []);

  // Manipular o clique do link "Sobre"
  const handleSobreClick = (event) => {
    event.preventDefault(); // Evita o comportamento padrão de redirecionamento
    const sobreSection = document.getElementById("sobre");
    if (sobreSection) {
      sobreSection.scrollIntoView({ behavior: "smooth" }); // Rola até a seção "Sobre" suavemente
    }
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
            <span className="highlight">Gurizada</span>
          </div>
          <div className="header-links">
            <a href="/home" className={currentPage === "/home" ? "active" : ""}>
              Home
            </a>
            <a href="/menu" className={currentPage === "/menu" ? "active" : ""}>
              Menu
            </a>
            <a href="/sobre" onClick={handleSobreClick} className={currentPage === "/sobre" ? "active" : ""}>
              Sobre
            </a>
            <a href="/contato" className={currentPage === "/contato" ? "active" : ""}>
              Contato
            </a>
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
