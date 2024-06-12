import React, { useState, useEffect } from "react";
import { scroller } from "react-scroll";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const NavigationLinks = () => {
  const [activeLink, setActiveLink] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/home" && !activeLink) {
      setActiveLink("home");
    }
  }, [location, activeLink]);

  const handleSetActive = (link) => {
    setActiveLink(link);
  };

  const handleNavigateAndScroll = (path, section) => {
    navigate(path);
    handleSetActive(section);
    setTimeout(() => {
      scroller.scrollTo(section, {
        smooth: true,
        duration: 500,
        offset: -70,
      });
    }, 100);
  };

  return (
    <div className="header-links">
      <Link
        to="/home"
        className={activeLink === "home" ? "active" : ""}
        onClick={() => handleSetActive("home")}
      >
        Home
      </Link>
      <a
        className={activeLink === "sobre" ? "active" : ""}
        onClick={() => handleNavigateAndScroll("/home", "sobre")}
      >
        Sobre
      </a>
      <a
        className={activeLink === "contato" ? "active" : ""}
        onClick={() => handleNavigateAndScroll("/home", "contato")}
      >
        Contato
      </a>
      <Link
        to="/sabores"
        className={activeLink === "sabores" ? "active" : ""}
        onClick={() => handleSetActive("sabores")}
      >
        Sabores
      </Link>
      <Link
        to="/montar-pizza"
        className={activeLink === "montar-pizza" ? "active" : ""}
        onClick={() => handleSetActive("montar-pizza")}
      >
        Fazer pedido
      </Link>
      <Link
        to="/criar-conta"
        className={activeLink === "criar-conta" ? "active" : ""}
        onClick={() => handleSetActive("criar-conta")}
      >
        <FontAwesomeIcon icon={faUser} />
      </Link>
      <Link
        to="/carrinho"
        className={activeLink === "carrinho" ? "active" : ""}
        onClick={() => handleSetActive("carrinho")}
      >
        <FontAwesomeIcon icon={faShoppingCart} />
      </Link>
    </div>
  );
};

export default NavigationLinks;
