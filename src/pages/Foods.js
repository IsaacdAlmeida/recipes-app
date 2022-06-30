import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MainContext from '../context/MainContext';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import ButtonCategoriesFoodsFilter from '../components/ButtonCategoriesFoodsFilter';
import explorerContext from '../context/exploreContext';
import Footer from '../components/Footer';
import '../styles/main.css';

const MAX_RECIPES = 12;

function Foods() {
  const { foods, handleAllFoods } = useContext(MainContext);
  const { recipesClicked } = useContext(explorerContext);
  return (
    <div>
      <div>
        <Header pageName="Foods" />
      </div>
      <div className="button-container">
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ handleAllFoods }
        >
          All
        </button>
        <ButtonCategoriesFoodsFilter />
      </div>
      <div className="body-container">
        {/* Req 77 - RecipesClicked para caso ao iniciar a tela com o array preenchido
        deve montar encima dessa informação, do contrário, mantem a informação inicial da tela
        principal */}
        { recipesClicked
          ? recipesClicked.meals.slice(0, MAX_RECIPES).map((ingredient, index) => (
            <div key={ index } className="recipe-container">
              <Link to={ `/foods/${ingredient.idMeal}` }>
                <RecipeCard
                  foods={ ingredient }
                  index={ index }
                  drinks={ undefined }
                />
              </Link>
            </div>
          )) : foods.map((item, index) => (
            <div key={ index } className="recipe-container">
              <Link to={ `/foods/${item.idMeal}` }>
                <RecipeCard
                  foods={ item }
                  index={ index }
                  drinks={ undefined }
                />
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

export default Foods;
