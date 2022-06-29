import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import MainContext from '../context/MainContext';
import HeaderSearch from './HeaderSearch';
import '../styles/header.css';

// useState provisório enquanto não cria o provider necessário

function Header({ pageName, isEnable }) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { handleChange, search } = useContext(MainContext);
  return (
    <div>
      <div className="header-container">
        <div>
          <Link to="/profile">
            <input // https://www.w3schools.com/tags/att_input_src.asp#:~:text=The%20src%20attribute%20specifies%20the,type%3D%22image%22%3E%20.
              type="image"
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="profile button"
            />
          </Link>
        </div>
        <div>
          <h3 data-testid="page-title">{ pageName }</h3>
        </div>
        <div>
          { isEnable && (
            <div>
              <div>
                <input
                  type="image"
                  data-testid="search-top-btn"
                  src={ searchIcon }
                  alt="search button"
                  onClick={ () => setShowSearchBar(!showSearchBar) }
                />
              </div>
            </div>
          ) }
        </div>

      </div>
      <div className="inpunt-container">
        { showSearchBar
                  && (
                    <div className="xablau">
                      <input
                        data-testid="search-input"
                        type="text"
                        value={ search }
                        onChange={ handleChange }
                      />
                      <HeaderSearch />
                    </div>
                  )}
      </div>
    </div>
  );
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
  isEnable: PropTypes.bool,
};

Header.defaultProps = {
  isEnable: true,
};

export default Header;
