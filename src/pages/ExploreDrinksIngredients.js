import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import explorerContext from '../context/exploreContext';
import { getIngredient } from '../services/themealdbApi';

const MAX_RECIPES = 12;

function ExploreDrinksIngredients() {
  const [ingredient, setIngredient] = useState();
  const { getRecipes } = useContext(explorerContext);

  // Req 76 - Retorna os ingredientes de drink
  // o parametro é o site que será utilizado, já que o exploreFoods
  // também utiliza essa função do provider
  async function sendSearch() {
    setIngredient(await getIngredient('thecocktaildb'));
  }

  useEffect(() => {
    sendSearch();
  }, []);

  return (
    <div>
      <Header pageName="Explore Ingredients" isEnable={ false } />
      { ingredient && ingredient.drinks.slice(0, MAX_RECIPES)
        .map(({ strIngredient1 }, index) => (
          <Link
            key={ strIngredient1 }
            onClick={ async () => getRecipes('thecocktaildb', strIngredient1) }
            to="/drinks/"
          >
            <div
              data-testid={ `${index}-ingredient-card` }
            >
              <img
                style={ { width: '100px' } }
                data-testid={ `${index}-card-img` }
                src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                alt={ `${strIngredient1}` }
              />
              <p data-testid={ `${index}-card-name` }>{ strIngredient1 }</p>
            </div>
          </Link>
        )) }
    </div>
  );
}

export default ExploreDrinksIngredients;
