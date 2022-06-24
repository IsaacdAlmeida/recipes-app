import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MainContext from '../context/MainContext';

const QUANTITY_OF_ITEM = 12;

function HeaderSearch() {
  const {
    typeSearch,
    drinkApi,
    mealApi,
    handleChangeRadio,
    sendSearch,
    search,
  } = useContext(MainContext); // Recupera as informações do Provider

  const { push, location: { pathname } } = useHistory(); // pega a rota da pagina, se esta em drinks ou foods

  // aplicado com ajuda do Carlos na mentoria, devido o push dentro do return estava quebrando a pagina
  useEffect(() => {
    if (drinkApi.drinks && drinkApi.drinks.length === 1) {
      push(`/drinks/${drinkApi.drinks[0].idDrink}`); // Req 16, caso haja uma bebida, direciona para detalhes o ID
    } else if (mealApi.meals && mealApi.meals.length === 1) {
      push(`/foods/${mealApi.meals[0].idMeal}`); // Req 16, caso haja uma comida, direciona para detalhes o ID
    }
  }, [drinkApi, mealApi, push]);

  return (
    // Req 13
    <div>
      <label htmlFor="ingredients">
        Ingredients
        <input
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
        onClick={ () => sendSearch(typeSearch, search, pathname) }
      >
        Search
      </button>
      {
        drinkApi.drinks
        && drinkApi.drinks.slice(0, QUANTITY_OF_ITEM).map((drink, index) => ( // Req 17, caso haja mais de uma bebida, mostra as 12 primeiras
          <div
            data-testid={ `${index}-recipe-card` }
            key={ drink.idDrink }
          >
            <p data-testid={ `${index}-card-name` }>
              { drink.strDrink }
            </p>
            <img
              data-testid={ `${index}-card-img` }
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
            />
          </div>

        ))
      }
      {
        mealApi.meals
        && mealApi.meals.slice(0, QUANTITY_OF_ITEM).map((meal, index) => ( // Req 17, caso haja mais de uma comida, mostra as 12 primeiras
          <div
            data-testid={ `${index}-recipe-card` }
            key={ meal.idMeal }
          >
            <p data-testid={ `${index}-card-name` }>
              { meal.strMeal }
            </p>
            <img
              data-testid={ `${index}-card-img` }
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
            />
          </div>
        ))
      }
    </div>
  );
}

export default HeaderSearch;
