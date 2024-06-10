import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import NavLink from './NavLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const NavigationLinks = () => {
  const [activeLink, setActiveLink] = useState('');

  const handleSetActive = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="header-links">
      <NavLink to="/home" className={activeLink === 'home' ? 'active' : ''} onClick={() => handleSetActive('home')}>Home</NavLink>
      <ScrollLink 
        to="sobre" 
        smooth={true} 
        duration={500} 
        offset={-70}
        className={activeLink === 'sobre' ? 'active' : ''}
        onSetActive={() => handleSetActive('sobre')}
      >
        Sobre
      </ScrollLink>
      <ScrollLink 
        to="sabores" 
        smooth={true} 
        duration={500} 
        offset={-70}
        className={activeLink === 'sabores' ? 'active' : ''}
        onSetActive={() => handleSetActive('sabores')}
      >
        Sabores
      </ScrollLink>
      <ScrollLink 
        to="contato" 
        smooth={true} 
        duration={500} 
        offset={-70}
        className={activeLink === 'contato' ? 'active' : ''}
        onSetActive={() => handleSetActive('contato')}
      >
        Contato
      </ScrollLink>
      <NavLink to="/criar-conta" className={activeLink === 'criar-conta' ? 'active' : ''} onClick={() => handleSetActive('criar-conta')}>
        <FontAwesomeIcon icon={faUser} />
      </NavLink>
      <NavLink to="/carrinho" className={activeLink === 'carrinho' ? 'active' : ''} onClick={() => handleSetActive('carrinho')}>
        <FontAwesomeIcon icon={faShoppingCart} />
      </NavLink>
    </div>
  );
};

export default NavigationLinks;
