import React, { useState } from "react";
import { scroller } from "react-scroll";
import NavLink from "./NavLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";

const NavigationLinks = () => {
  const [activeLink, setActiveLink] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSetActive = (link) => {
    setActiveLink(link);
  };

  const handleNavigateAndScroll = (path, section) => {
    navigate(path);
    setActiveLink(section);
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
      <a
        to="/home"
        className={activeLink === "home" ? "active" : ""}
        onClick={() => handleSetActive("home")}
      >
        Home
      </a>
      <a
        className={activeLink === "sobre" ? "active" : ""}
        onClick={() => handleNavigateAndScroll("/home", "sobre")}
      >
        Sobre
      </a>
      <a
        className={activeLink === "sabores" ? "active" : ""}
        onClick={() => handleNavigateAndScroll("/home", "sabores")}
      >
        Sabores
      </a>
      <a
        className={activeLink === "contato" ? "active" : ""}
        onClick={() => handleNavigateAndScroll("/home", "contato")}
      >
        Contato
      </a>
      <NavLink
        to="/criar-conta"
        className={activeLink === "criar-conta" ? "active" : ""}
        onClick={() => handleSetActive("criar-conta")}
      >
        <FontAwesomeIcon icon={faUser} />
      </NavLink>
      <NavLink
        to="/carrinho"
        className={activeLink === "carrinho" ? "active" : ""}
        onClick={() => handleSetActive("carrinho")}
      >
        <FontAwesomeIcon icon={faShoppingCart} />
      </NavLink>
    </div>
  );
};

export default NavigationLinks;
