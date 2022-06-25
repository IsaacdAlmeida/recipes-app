import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import explorerContext from '../context/exploreContext';
import { getIngredientOrNationality } from '../services/themealdbApi';

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
      { ingredient && ingredient.meals.slice(0, MAX_RECIPES)
        .map(({ strIngredient, idIngredient }, index) => (
          <Link
            key={ idIngredient }
            onClick={ async () => getRecipes('themealdb', strIngredient) }
            to="/foods/"
          >
            <div
              data-testid={ `${index}-ingredient-card` }
            >
              <img
                style={ { width: '100px' } }
                data-testid={ `${index}-card-img` }
                src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                alt={ `${strIngredient}` }
              />
              <p data-testid={ `${index}-card-name` }>{ strIngredient }</p>
            </div>
          </Link>
        )) }
    </div>
  );
}

export default ExploreFoodsIngredients;
