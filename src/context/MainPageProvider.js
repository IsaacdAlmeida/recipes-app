import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MainPageContext from './MainPageContext';
import requestFoods from '../services/requestFoods';
import requestDrinks from '../services/requestDrinks';

function MainPageProvider({ children }) {
  const MAX_RECIPE_NUMBER = 12;
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const foodsArraySliced = async () => {
    const foodsArray = await requestFoods();
    const foodsSliced = foodsArray.slice(0, MAX_RECIPE_NUMBER);
    setFoods(foodsSliced);
  };

  const drinksArraySliced = async () => {
    const drinksArray = await requestDrinks();
    const drinksSliced = drinksArray.slice(0, MAX_RECIPE_NUMBER);
    setDrinks(drinksSliced);
  };

  useEffect(() => {
    foodsArraySliced();
  }, []);

  useEffect(() => {
    drinksArraySliced();
  }, []);

  const context = {
    foods,
    drinks,
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
