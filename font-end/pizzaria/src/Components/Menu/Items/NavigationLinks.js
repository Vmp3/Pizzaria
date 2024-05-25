import React from 'react';
import NavLink from './NavLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

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

export default NavigationLinks;
