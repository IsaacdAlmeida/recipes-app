import React, { useContext } from 'react';
import MainPageContext from '../context/MainPageContext';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

function Foods() {
  const { foods } = useContext(MainPageContext);
  return (
    <div>
      <div>
        <Header pageName="Foods" />
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
