import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import MainContext from '../context/MainContext';
import RecipeCard from '../components/RecipeCard';
import ButtonCategoriesDrinksFilter from '../components/ButtonCategoriesDrinksFilter';
import explorerContext from '../context/exploreContext';
import Footer from '../components/Footer';
import '../styles/main.css';

const MAX_RECIPES = 12;

function Drinks() {
  const { drinks, handleAllDrinks } = useContext(MainContext);
  const { recipesClicked } = useContext(explorerContext);
  return (
    <div>
      <div>
        <Header pageName="Drinks" />
      </div>
      <div className="button-container">
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ handleAllDrinks }
        >
          All
        </button>
        <ButtonCategoriesDrinksFilter />
      </div>
      <div className="body-container">
        {/* Req 77 - RecipesClicked para caso ao iniciar a tela com o array preenchido
        deve montar encima dessa informação, do contrário, mantem a informação inicial da tela
        principal */}
        { recipesClicked
          ? recipesClicked.drinks.slice(0, MAX_RECIPES).map((ingredient, index) => (
            <div key={ index } className="recipe-container">
              <Link to={ `/drinks/${ingredient.idDrink}` }>
                <RecipeCard
                  drinks={ ingredient }
                  index={ index }
                  foods={ undefined }
                />
              </Link>
            </div>
          )) : drinks.map((item, index) => (
            <div key={ index } className="recipe-container">
              <Link to={ `/drinks/${item.idDrink}` }>
                <RecipeCard
                  drinks={ item }
                  index={ index }
                  foods={ undefined }
                />
              </Link>
              <RecipeCard
                drinks={ ingredient }
                index={ index }
                foods={ undefined }
              />
            </div>
          )) : drinks.map((item, index) => (
            <div key={ index } className="recipe-container">
              <RecipeCard
                drinks={ item }
                index={ index }
                foods={ undefined }
              />
            </div>
          )) }
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Drinks;
