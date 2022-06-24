import React, { useContext } from 'react';
import Header from '../components/Header';
import MainContext from '../context/MainContext';
import RecipeCard from '../components/RecipeCard';
import ButtonCategoriesDrinksFilter from '../components/ButtonCategoriesDrinksFilter';
import explorerContext from '../context/exploreContext';

const MAX_RECIPES = 12;

function Drinks() {
  const { drinks } = useContext(MainContext);
  const { idMealRecipes } = useContext(explorerContext);
  return (
    <div>
      <div>
        <Header pageName="Drinks" />
      </div>
      <div>
        <ButtonCategoriesDrinksFilter />
      </div>
      <div>
        {/* Req 77 - Add IdMealRecipes para caso ao iniciar a tela com o array preenchido
        deve montar encima dessa informação, do contrário, mantem a informação inicial da tela
        principal */}
        { idMealRecipes
          ? idMealRecipes.drinks.slice(0, MAX_RECIPES).map((ingredient, index) => (
            <div key={ index }>
              <RecipeCard
                drinks={ ingredient }
                index={ index }
                foods={ undefined }
              />
            </div>
          )) : drinks.map((item, index) => (
            <div key={ index }>
              <RecipeCard
                drinks={ item }
                index={ index }
                foods={ undefined }
              />
            </div>
          )) }
      </div>
    </div>
  );
}

export default Drinks;
