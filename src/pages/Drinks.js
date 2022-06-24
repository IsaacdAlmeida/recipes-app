import React, { useContext } from 'react';
import Header from '../components/Header';
import MainContext from '../context/MainContext';
import RecipeCard from '../components/RecipeCard';
import ButtonCategoriesDrinksFilter from '../components/ButtonCategoriesDrinksFilter';

function Drinks() {
  const { drinks } = useContext(MainContext);

  return (
    <div>
      <div>
        <Header pageName="Drinks" />
      </div>
      <div>
        <ButtonCategoriesDrinksFilter />
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
