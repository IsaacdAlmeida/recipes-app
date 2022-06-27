import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MainContext from './MainContext';
import requestFoods from '../services/requestFoods';
import requestDrinks from '../services/requestDrinks';
import requestFoodsCategories from '../services/requestFoodsCategories';
import requestDrinksCategories from '../services/requestDrinksCategories';
import requestFoodsFromCategories from '../services/requestFoodsFromCategories';
import requestDrinksFromCategories from '../services/requestDrinksFromCategories';
import { apiRecipes } from '../services/themealdbApi';

function MainProvider({ children }) {
  /* -----------------------<MainProvider>---------------------------- */

  const MAX_RECIPE_NUMBER = 12;
  const MAX_CATEGORIES_NUMBER = 5;
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [foodsCategories, setFoodsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [buttonToggle, setButtonToggle] = useState(false);

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

    setButtonToggle(!buttonToggle);
    if (buttonToggle === false) {
      setFoods(categoriesFromFoodsSliced);
      setButtonToggle(true);
    }
    if (buttonToggle === true) {
      const foodsArray = await requestFoods();
      const foodsSliced = foodsArray.slice(0, MAX_RECIPE_NUMBER);
      setFoods(foodsSliced);
      setButtonToggle(false);
    }
  };

  const handleCategoriesDrinksFilter = async (category) => {
    const categoriesDrinksFiltered = await requestDrinksFromCategories(category);
    const categoriesFromDrinksSliced = categoriesDrinksFiltered
      .slice(0, MAX_RECIPE_NUMBER);
    setDrinks(categoriesFromDrinksSliced);

    setButtonToggle(!buttonToggle);
    if (buttonToggle === false) {
      setDrinks(categoriesFromDrinksSliced);
      setButtonToggle(true);
    }
    if (buttonToggle === true) {
      const drinksArray = await requestDrinks();
      const drinksSliced = drinksArray.slice(0, MAX_RECIPE_NUMBER);
      setDrinks(drinksSliced);
      setButtonToggle(false);
    }
  };
  /* -----------------------<MainProvider>---------------------------- */
  /* ----------------------<HeaderProvider>--------------------------- */

  const [searchTyping, setSearchTyping] = useState('');

  function handleChange({ target: { value } }) {
    setSearchTyping(value);
  }

  /* ----------------------<HeaderProvider>--------------------------- */
  /* ----------------------<SearchProvider>--------------------------- */

  const [searchType, setSearchType] = useState(''); // repassa o tipo da pesquisa, se eh ingrediente(i), name(s) ou firs letter(f)
  // const [drinkApi, setDrinkApi] = useState(''); // recebe retorno para bebidas
  // const [mealApi, setMealApi] = useState(''); // recebe retorno para comidas

  // responsável por passar para a API, o tipo da consulta, o ingrediente escolhido e a rota selecionada
  async function sendSearch(type, searchRecipe, page) {
    // Valida o tipo da pesquisa, e se existe mais de um ingrediente
    // caso true, enviamos um alerta.
    if (type === 'f' && searchRecipe.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    // Bloco food, valida a pagina + o tipo da pesquisa
    // para enviarmos para a API trazer o resultado e adicionar no globalState
    if (page === '/foods' && (type === 'f' || type === 's')) {
      const foodRecipe = await apiRecipes('themealdb', 'search', type, searchRecipe);
      setFoods(foodRecipe.meals.slice(0, MAX_RECIPE_NUMBER));
    } else if (type === 'i') {
      const foodRecipe = await apiRecipes('themealdb', 'filter', type, searchRecipe);
      setFoods(foodRecipe.meals.slice(0, MAX_RECIPE_NUMBER));
    }
    // Bloco Bebidas, segue o mesmo padrão do comentário anterior
    if (page === '/drinks' && (type === 'f' || type === 's')) {
      const drinkRecipe = await apiRecipes('thecocktaildb', 'search', type, searchRecipe);
      setDrinks(drinkRecipe.drinks.slice(0, MAX_RECIPE_NUMBER));
    } else if (type === 'i') {
      const drinkRecipe = await apiRecipes('thecocktaildb', 'filter', type, searchRecipe);
      setDrinks(drinkRecipe.drinks.slice(0, MAX_RECIPE_NUMBER));
    }
  }

  // Com auxilio do Henrique, aplicamos no useEffect a validação se não existir bebida ou comida
  useEffect(() => {
    console.log(foods);
    if (foods === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [foods]);

  // Funcao grava o valor do radio button escolhido
  function handleChangeRadio({ target: { value } }) {
    setSearchType(value);
  }

  /* ----------------------<SearchProvider>--------------------------- */

  /* ----------------------<Details>---------------------------------- */

  const setRecipeFavorite = (newFavoriteRecipe) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (favoriteRecipes.length !== 0) {
      if (favoriteRecipes.some(({ id }) => id !== newFavoriteRecipe.id)) {
        const newFavoriteRecipes = [...favoriteRecipes, newFavoriteRecipe];
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      }
    } else {
      const newFavoriteRecipes = [newFavoriteRecipe];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    }
  };

  /* ----------------------<Details>---------------------------------- */

  const context = {
    foods,
    drinks,
    foodsCategories,
    drinksCategories,
    handleCategoriesFoodsFilter,
    handleCategoriesDrinksFilter,
    searchTyping,
    handleChange,
    searchType,
    sendSearch,
    handleChangeRadio,
    setRecipeFavorite,
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
