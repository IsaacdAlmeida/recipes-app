import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import explorerContext from '../context/exploreContext';
import Footer from '../components/Footer';
import '../styles/main.css';
import '../styles/recipecard.css';

const MAX_RECIPES = 12;

function ExploreFoodsNationalities() {
  const {
    getRecipes,
    recipesSelectedArea,
    nationality,
    handleChangeArea } = useContext(explorerContext);

  return (
    <div>
      <Header pageName="Explore Ingredients" isEnable={ false } />
      {/* Req 79 - Criado select option contendo as opçoẽs das nacionalidades e com uma opção All  */ }
      <div>
        <div>

          <select
            data-testid="explore-by-nationality-dropdown"
            onChange={ handleChangeArea }
          >
            <option
              data-testid="All-option"
              value="All"
            >
              All
            </option>
            { nationality && nationality.meals.map(({ strArea }, index) => (
              <option
                data-testid={ `${strArea}-option` }
                key={ index }
                value={ strArea }
              >
                { strArea }
              </option>
            )) }
          </select>
        </div>
        {/* Req 79 - Monta na tela as 12 primeiras receitas da Api */ }
        <div className="body-container">
          { recipesSelectedArea && recipesSelectedArea.meals.slice(0, MAX_RECIPES)
            .map(({ strMeal, strMealThumb, idMeal }, index) => (
              <div
                className="recipe-container"
                key={ idMeal }
                data-testid={ `${index}-recipe-card` }
              >
                <Link
                  onClick={ async () => getRecipes('themealdb', strMeal) }
                  to={ `/foods/${idMeal}` }
                >
                  <div
                    className="card-container"
                    data-testid={ `${index}-ingredient-card` }
                  >
                    <img
                      data-testid={ `${index}-card-img` }
                      src={ `${strMealThumb}` }
                      alt={ `${strMeal}` }
                    />
                    <div className="text-container">
                      <h4 data-testid={ `${index}-card-name` }>{ strMeal }</h4>
                    </div>
                  </div>
                </Link>
              </div>
            )) }
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default ExploreFoodsNationalities;
