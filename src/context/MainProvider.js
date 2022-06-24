import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MainContext from './MainContext';
import requestFoods from '../services/requestFoods';
import requestDrinks from '../services/requestDrinks';
import requestFoodsCategories from '../services/requestFoodsCategories';
import requestDrinksCategories from '../services/requestDrinksCategories';
import requestFoodsFromCategories from '../services/requestFoodsFromCategories';
import requestDrinksFromCategories from '../services/requestDrinksFromCategories';
import { apiAttributes } from '../services/themealdbApi';

function MainProvider({ children }) {
  /* -----------------------<MainProvider>---------------------------- */

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
  /* -----------------------<MainProvider>---------------------------- */
  /* ----------------------<HeaderProvider>--------------------------- */

  const [search, setSearch] = useState('');

  function handleChange({ target: { value } }) {
    setSearch(value);
  }

  /* ----------------------<HeaderProvider>--------------------------- */
  /* ----------------------<SearchProvider>--------------------------- */

  const [typeSearch, setTypeSearch] = useState(''); // repassa o tipo da pesquisa, se eh ingrediente(i), name(s) ou firs letter(f)
  const [drinkApi, setDrinkApi] = useState(''); // recebe retorno para bebidas
  const [mealApi, setMealApi] = useState(''); // recebe retorno para comidas

  // responsável por passar para a API, o tipo da consulta, o ingrediente escolhido e a rota selecionada
  async function sendSearch(type, ingredient, page) {
    if (type === 'f' && ingredient.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    if (page === '/drinks') {
      setDrinkApi(await apiAttributes(type, ingredient, page)); // add o retorno da API de bebidas no globalState(drinkApi)
    } setMealApi(await apiAttributes(type, ingredient, page)); // add o retorno da API de comidas no globalState(mealApi)
  }

  // Com auxilio do Henrique, aplicamos no useEffect a validação se não existir bebida ou comida
  useEffect(() => {
    if (drinkApi.drinks === null || mealApi.meals === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [drinkApi, mealApi]);

  // Funcao grava o valor do radio button escolhido
  function handleChangeRadio({ target: { value } }) {
    setTypeSearch(value);
  }

  /* ----------------------<SearchProvider>--------------------------- */

  const context = {
    foods,
    drinks,
    foodsCategories,
    drinksCategories,
    handleCategoriesFoodsFilter,
    handleCategoriesDrinksFilter,
    search,
    handleChange,
    typeSearch,
    drinkApi,
    mealApi,
    sendSearch,
    handleChangeRadio,
  };

  return (
    <MainContext.Provider value={ context }>
      { children }
    </MainContext.Provider>
  );
}

MainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainProvider;
