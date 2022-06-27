import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import favoriteRecipesContext from '../context/favoriteRecipesContext';

function FavoriteRecipes() {
  const {
    filtered,
    clipboard,
    indexMessage,
    filterRecipes,
    unfavoriteBtn } = useContext(favoriteRecipesContext);

  return (
    <div>
      <Header pageName="Favorite Recipes" isEnable={ false } />
      {/* /* implementação dos botões já feita pelo Vitor no DoneRecipes.js */}
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => filterRecipes('all') }
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ () => filterRecipes('food') }
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => filterRecipes('drink') }
      >
        Drinks
      </button>
      { filtered && filtered.map((recipes, index) => (
        <div key={ recipes.id }>
          {/* Lógica implementada no Header pelo Isaac e no DoneRecipes pelo Vitor */}
          <input
            type="image"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            id={ index }
            onClick={ clipboard }
            value={ `http://localhost:3000/${recipes.type}s/${recipes.id}` }
            alt="share button"
          />
          { Number(indexMessage) === Number(index) && (
            <span>
              Link copied!
            </span>
          )}
          <input
            type="image"
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
            id={ index }
            alt="favorite button"
            onClick={ () => unfavoriteBtn(recipes) }
          />
          <Link to={ `/${recipes.type}s/${recipes.id}` }>
            <p data-testid={ `${index}-horizontal-name` }>
              {recipes.name}
            </p>
          </Link>
          <Link to={ `/${recipes.type}s/${recipes.id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              style={ { width: '100px' } }
              src={ `${recipes.image}` }
              alt={ `${recipes.name}` }
            />
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            { recipes.type === 'food'
              ? `${recipes.nationality} - ${recipes.category}`
              : recipes.alcoholicOrNot }
          </p>
        </div>
      )) }
    </div>
  );
}

export default FavoriteRecipes;
