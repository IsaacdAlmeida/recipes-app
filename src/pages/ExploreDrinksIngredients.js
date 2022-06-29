import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import explorerContext from '../context/exploreContext';
import { getIngredientOrNationality } from '../services/themealdbApi';
import Footer from '../components/Footer';
import '../styles/main.css';
import '../styles/recipecard.css';

const MAX_RECIPES = 12;

function ExploreDrinksIngredients() {
  const [ingredient, setIngredient] = useState();
  const { getRecipes } = useContext(explorerContext);

  // Req 76 - Retorna os ingredientes de drink
  // o parametro é o site que será utilizado, já que o exploreFoods
  // também utiliza essa função do provider
  async function sendSearch() {
    setIngredient(await getIngredientOrNationality('thecocktaildb', 'list', 'i', 'list'));
  }

  useEffect(() => {
    sendSearch();
  }, []);

  return (
    <div>
      <Header pageName="Explore Ingredients" isEnable={ false } />
      <div className="body-container">
        { ingredient && ingredient.drinks.slice(0, MAX_RECIPES)
          .map(({ strIngredient1 }, index) => (
            <div className="recipe-container" key={ strIngredient1 }>
              <Link
                onClick={
                  async () => getRecipes('thecocktaildb', 'filter', 'i', strIngredient1)
                }
                to="/drinks/"
              >
                <div
                  className="card-container"
                  data-testid={ `${index}-ingredient-card` }
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                    alt={ `${strIngredient1}` }
                  />
                  <div className="text-container">
                    <h4 data-testid={ `${index}-card-name` }>{ strIngredient1 }</h4>
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

export default ExploreDrinksIngredients;
