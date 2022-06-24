import React, { useContext } from 'react';
import MainContext from '../context/MainContext';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import ButtonCategoriesFoodsFilter from '../components/ButtonCategoriesFoodsFilter';

function Foods() {
  const { foods } = useContext(MainContext);
  return (
    <div>
      <div>
        <Header pageName="Foods" />
      </div>
      <div>
        <ButtonCategoriesFoodsFilter />
      </div>
      <div>
        { foods.map((item, index) => (
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
