import React, { useContext } from 'react';
import MainContext from '../context/MainContext';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import ButtonCategoriesFoodsFilter from '../components/ButtonCategoriesFoodsFilter';
import explorerContext from '../context/exploreContext';

const MAX_RECIPES = 12;

function Foods() {
  const { foods } = useContext(MainContext);
  const { idMealRecipes } = useContext(explorerContext);
  return (
    <div>
      <div>
        <Header pageName="Foods" />
      </div>
      <div>
        <ButtonCategoriesFoodsFilter />
      </div>
      <div>
        {/* Req 77 - Add IdMealRecipes para caso ao iniciar a tela com o array preenchido
        deve montar encima dessa informação, do contrário, mantem a informação inicial da tela
        principal */}
        { idMealRecipes
          ? idMealRecipes.meals.slice(0, MAX_RECIPES).map((ingredient, index) => (
            <div key={ index }>
              <RecipeCard
                foods={ ingredient }
                index={ index }
                drinks={ undefined }
              />
            </div>
          )) : foods.map((item, index) => (
            <div key={ index }>
              <RecipeCard
                foods={ item }
                index={ index }
                drinks={ undefined }
              />
            </div>
          )) }
      </div>
    </div>
  );
}

export default Foods;
