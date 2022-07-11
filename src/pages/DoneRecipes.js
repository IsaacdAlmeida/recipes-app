import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import Header from '../components/Header';
import doneRecipesContext from '../context/doneRecipesContext';
import MainContext from '../context/MainContext';
import '../styles/explore.css';

function DoneRecipes() {
  const {
    filtered,
    clipboard,
    indexMessage,
    filterRecipes } = useContext(doneRecipesContext);

  const { doneRecipes } = useContext(MainContext);

  return (
    <div>
      <Header pageName="Done Recipes" isEnable={ false } />
      <div className="app-container">
        <div className="explore-container">
          <button
            data-testid="filter-by-all-btn"
            type="button"
            onClick={ () => filterRecipes('all', doneRecipes) }
          >
            All
          </button>
          <button
            data-testid="filter-by-food-btn"
            type="button"
            onClick={ () => filterRecipes('food', doneRecipes) }
          >
            Food
          </button>
          <button
            data-testid="filter-by-drink-btn"
            type="button"
            onClick={ () => filterRecipes('drink', doneRecipes) }
          >
            Drinks
          </button>
        </div>
        <div>
          { filtered && filtered.map((recipes, index) => (
            <div key={ recipes.id }>
              {/* Req 56 - copiado a msm logica aplicada pelo Issac no component Header */ }
              <input
                type="image"
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                id={ index }
                onClick={ clipboard }
                value={ `http://localhost:3000/${recipes.type}s/${recipes.id}` }
                alt="share button"
              />
              {/* Req 57 - Validação para apresentar o texto apenas na receita clicada */ }
              { Number(indexMessage) === Number(index) && <p>Link copied!</p> }
              {/* Req 59 - Aplicado o redirect para a pagina da receita */ }
              <Link to={ `/${recipes.type}s/${recipes.id}` }>
                <img
                  style={ { width: '100px' } }
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipes.image }
                  alt={ recipes.name }
                />
              </Link>
              <Link to={ `/${recipes.type}s/${recipes.id}` }>
                <h3 data-testid={ `${index}-horizontal-name` }>{ recipes.name }</h3>
              </Link>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                { recipes.type === 'food'
                  ? `${recipes.nationality} - ${recipes.category}`
                  : `${recipes.alcoholicOrNot}` }
              </p>
              {/* Req 59 - Aplicado o redirect para a pagina da receita */ }
              <p
                data-testid={ `${index}-horizontal-done-date` }
              >
                { recipes.doneDate }
              </p>
              {/* Necessário criar um novo map, pois o retorno recebido no LocalStore tem um array dentro do Obj */ }
              { Object.values(recipes.tags)
                .map((tag, indexTag) => (
                  <p
                    data-testid={ `${index}-${recipes.tags[indexTag]}-horizontal-tag` }
                    key={ indexTag }
                  >
                    { tag }
                  </p>
                )) }
            </div>
          )) }
        </div>
      </div>
    </div>
  );
}

export default DoneRecipes;
