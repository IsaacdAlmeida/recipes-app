import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import doneRecipesContext from '../context/doneRecipesContext';
import FavoriteIcon from '../components/FavoriteIcon';
import MainContext from '../context/MainContext';
import '../styles/explore.css';

function FavoriteRecipes() {
  const {
    clipboard,
    indexMessage,
  } = useContext(doneRecipesContext);

  const { favoritesStorage, favoriteRecipes, filterRecipes } = useContext(MainContext);

  return (
    <div>
      <Header pageName="Favorite Recipes" isEnable={ false } />
      {/* /* implementação dos botões já feita pelo Vitor no DoneRecipes.js */ }
      <div className="app-container">
        <div className="explore-container">
          <button
            data-testid="filter-by-all-btn"
            type="button"
            onClick={ () => filterRecipes('all', favoriteRecipes) }
          >
            All
          </button>
          <button
            data-testid="filter-by-food-btn"
            type="button"
            onClick={ () => filterRecipes('food', favoriteRecipes) }
          >
            Food
          </button>
          <button
            data-testid="filter-by-drink-btn"
            type="button"
            onClick={ () => filterRecipes('drink', favoriteRecipes) }
          >
            Drinks
          </button>
        </div>
        <div>
          { favoritesStorage.length !== 0 && favoritesStorage.map((recipes, index) => (
            <div key={ recipes.id }>
              {/* Lógica implementada no Header pelo Isaac e no DoneRecipes pelo Vitor */ }
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
              ) }
              <FavoriteIcon page="favorite" index={ index } data={ recipes } />
              <Link to={ `/${recipes.type}s/${recipes.id}` }>
                <p data-testid={ `${index}-horizontal-name` }>
                  { recipes.name }
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
      </div>
    </div>
  );
}

export default FavoriteRecipes;
