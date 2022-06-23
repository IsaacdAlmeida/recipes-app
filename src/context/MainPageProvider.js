import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MainPageContext from './MainPageContext';
import requestFoods from '../services/requestFoods';

function MainPageProvider({ children }) {
  const MAX_RECIPE_NUMBER = 12;
  const [foods, setFoods] = useState([]);

  const foodsArraySliced = async () => {
    const foodsArray = await requestFoods();
    const sliced = foodsArray.slice(0, MAX_RECIPE_NUMBER);
    setFoods(sliced);
  };

  useEffect(() => {
    foodsArraySliced();
  }, []);

  const context = {
    foods,
  };

  return (
    <MainPageContext.Provider value={ context }>
      { children }
    </MainPageContext.Provider>
  );
}

MainPageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainPageProvider;
