import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

// useState provisório enquanto não cria o provider necessário

function Header() {
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <div>
      <Link to="/profile">
        <button
          type="button"
          data-testid="profile-top-btn"
        >
          <img src={ profileIcon } alt="profile button" />
        </button>
      </Link>

      <h3 data-testid="page-title">Component Name</h3>

      <div>
        <button
          type="button"
          data-testid="search-top-btn"
          onClick={ () => setShowSearchBar(!showSearchBar) }
        >
          <img src={ searchIcon } alt="search button" />
        </button>
        { showSearchBar ? <p data-testid="search-input">Mostrar Barra</p> : null }
      </div>
    </div>
  );
}

export default Header;
