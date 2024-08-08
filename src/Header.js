import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
   <h1>Pokemon bid</h1>
   <ul className="top-nav">
      <li><NavLink to="/">Pokemons</NavLink></li>
      <li><NavLink to="/more-pokemon">Add Pokemons</NavLink></li>
      <li><NavLink to="/about">About</NavLink></li>
    </ul> 
  </header>
);

export default Header;