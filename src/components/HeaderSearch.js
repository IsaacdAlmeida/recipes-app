import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MainContext from '../context/MainContext';
import '../styles/header.css';

function HeaderSearch() {
  const {
    searchType,
    drinks,
    foods,
    handleChangeRadio,
    sendSearchFoods,
    sendSearchDrinks,
    searchTyping,
  } = useContext(MainContext); // Recupera as informações do Provider

  const { push, location: { pathname } } = useHistory(); // pega a rota da pagina, se esta em drinks ou foods

  // aplicado com ajuda do Carlos na mentoria, devido o push dentro do return estava quebrando a pagina
  useEffect(() => {
    if (drinks && drinks.length === 1) {
      push(`/drinks/${drinks[0].idDrink}`); // Req 16, caso haja uma bebida, direciona para detalhes o ID
    } else if (foods && foods.length === 1) {
      push(`/foods/${foods[0].idMeal}`); // Req 16, caso haja uma comida, direciona para detalhes o ID
    }
  }, [drinks, foods, push]);

  return (
    // Req 13
    <div className="search-container">
      <label htmlFor="ingredients">
        Ingredients
        <input
          className="radio"
          data-testid="ingredient-search-radio"
          type="radio"
          name="attributos"
          value="i"
          onChange={ handleChangeRadio }
          id="ingredients"
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          className="radio"
          data-testid="name-search-radio"
          type="radio"
          name="attributos"
          value="s"
          onChange={ handleChangeRadio }
          id="name"
        />
      </label>
      <label htmlFor="letter">
        First letter
        <input
          className="radio"
          data-testid="first-letter-search-radio"
          type="radio"
          name="attributos"
          value="f"
          onChange={ handleChangeRadio }
          id="letter"
        />
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ pathname === '/foods'
          ? () => sendSearchFoods(searchType, searchTyping, pathname)
          : () => sendSearchDrinks(searchType, searchTyping, pathname) }
      >
        Search
      </button>
    </div>
  );
}

export default HeaderSearch;
