import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import explorerContext from '../context/exploreContext';
import { getIngredientOrNationality } from '../services/themealdbApi';
import Footer from '../components/Footer';
import '../styles/main.css';
import '../styles/recipecard.css';

const MAX_RECIPES = 12;

function ExploreFoodsIngredients() {
  const [ingredient, setIngredient] = useState();
  const { getRecipes } = useContext(explorerContext);

  // Req 76 - Retorna os ingredientes de drink
  // o parametro é o site que será utilizado, já que o exploreFoods
  // também utiliza essa função do provider
  async function sendSearch() {
    setIngredient(await getIngredientOrNationality('themealdb', 'list', 'i', 'list'));
  }

  useEffect(() => {
    sendSearch();
  }, []);

  return (
    <div>
      <Header pageName="Explore Ingredients" isEnable={ false } />
      <div className="body-container">
        { ingredient && ingredient.meals.slice(0, MAX_RECIPES)
          .map(({ strIngredient, idIngredient }, index) => (
            <div key={ idIngredient } className="recipe-container">

              <Link
                onClick={
                  async () => getRecipes('themealdb', 'filter', 'i', strIngredient)
                }
                to="/foods/"
              >
                <div
                  data-testid={ `${index}-ingredient-card` }
                  className="card-container"
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                    alt={ `${strIngredient}` }
                  />
                  <div className="text-container">
                    <h4 data-testid={ `${index}-card-name` }>{ strIngredient }</h4>
                  </div>
                </div>
              </Link>
            </div>
          )) }
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default ExploreFoodsIngredients;
