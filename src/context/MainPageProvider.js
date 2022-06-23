import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MainPageContext from './MainPageContext';
import requestFoods from '../services/requestFoods';
import requestDrinks from '../services/requestDrinks';
import requestFoodsCategories from '../services/requestFoodsCategories';
import requestDrinksCategories from '../services/requestDrinksCategories';
import requestFoodsFromCategories from '../services/requestFoodsFromCategories';
import requestDrinksFromCategories from '../services/requestDrinksFromCategories';

function MainPageProvider({ children }) {
  const MAX_RECIPE_NUMBER = 12;
  const MAX_CATEGORIES_NUMBER = 5;
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [foodsCategories, setFoodsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);

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

  const foodsCategoriesSliced = async () => {
    const categoriesFoodsArray = await requestFoodsCategories();
    const categoriesFoodsArraySliced = categoriesFoodsArray
      .slice(0, MAX_CATEGORIES_NUMBER);
    setFoodsCategories(categoriesFoodsArraySliced);
  };

  const drinksCategoriesSliced = async () => {
    const categoriesDrinksArray = await requestDrinksCategories();
    const categoriesDrinksArraySliced = categoriesDrinksArray
      .slice(0, MAX_CATEGORIES_NUMBER);
    setDrinksCategories(categoriesDrinksArraySliced);
  };

  useEffect(() => {
    foodsArraySliced();
  }, []);

  useEffect(() => {
    drinksArraySliced();
  }, []);

  useEffect(() => {
    foodsCategoriesSliced();
  }, []);

  useEffect(() => {
    drinksCategoriesSliced();
  }, []);

  const handleCategoriesFoodsFilter = async (category) => {
    const categoriesFoodsFiltered = await requestFoodsFromCategories(category);
    const categoriesFromFoodsSliced = categoriesFoodsFiltered
      .slice(0, MAX_RECIPE_NUMBER);
    setFoods(categoriesFromFoodsSliced);
  };

  const handleCategoriesDrinksFilter = async (category) => {
    const categoriesDrinksFiltered = await requestDrinksFromCategories(category);
    const categoriesFromDrinksSliced = categoriesDrinksFiltered
      .slice(0, MAX_RECIPE_NUMBER);
    setDrinks(categoriesFromDrinksSliced);
  };

  const context = {
    foods,
    drinks,
    foodsCategories,
    drinksCategories,
    handleCategoriesFoodsFilter,
    handleCategoriesDrinksFilter,
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
