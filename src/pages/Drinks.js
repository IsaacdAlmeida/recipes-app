import React, { useContext } from 'react';
import Header from '../components/Header';
import MainPageContext from '../context/MainPageContext';
import RecipeCard from '../components/RecipeCard';
import ButtonCategoriesFilter from '../components/ButtonCategoriesFilter';

function Drinks() {
  const { drinks } = useContext(MainPageContext);

  return (
    <div>
      <div>
        <Header pageName="Drinks" />
      </div>
      <div>
        <ButtonCategoriesFilter category="drinksCategories" />
      </div>
      <div>
        { drinks.map((item, index) => (
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
