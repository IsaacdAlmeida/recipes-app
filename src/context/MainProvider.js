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

const MSG_RECIPES_NOT_FOUND = 'Sorry, we haven\'t found any recipes for these filters.';

function MainProvider({ children }) {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  /* -----------------------<MainProvider>---------------------------- */

  const MAX_RECIPE_NUMBER = 12;
  const MAX_CATEGORIES_NUMBER = 5;
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [foodsCategories, setFoodsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [buttonToggle, setButtonToggle] = useState(false);
  const [favoritesStorage, setFavorites] = useState(favoriteRecipes);

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

  // responsável por passar para a API foods, o tipo da consulta, o ingrediente escolhido
  async function sendSearchFoods(type, searchRecipe) {
    // Valida o tipo da pesquisa, e se existe mais de um ingrediente
    // caso true, enviamos um alerta.
    if (type === 'f' && searchRecipe.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    // Bloco food, valida a pagina + o tipo da pesquisa
    // para enviarmos para a API trazer o resultado e adicionar no globalState
    if (type === 'f' || type === 's') {
      const foodRecipe = await apiRecipes('themealdb', 'search', type, searchRecipe);
      if (foodRecipe.meals === null) {
        return global.alert(MSG_RECIPES_NOT_FOUND);
      } setFoods(foodRecipe.meals.slice(0, MAX_RECIPE_NUMBER));
    } else if (type === 'i') {
      const foodRecipe = await apiRecipes('themealdb', 'filter', type, searchRecipe);
      if (foodRecipe.meals === null) {
        return global.alert(MSG_RECIPES_NOT_FOUND);
      }
      setFoods(foodRecipe.meals.slice(0, MAX_RECIPE_NUMBER));
    }
  }

  // responsável por passar para a API drinks, o tipo da consulta, o ingrediente escolhido
  async function sendSearchDrinks(type, searchRecipe) {
    if (type === 'f' && searchRecipe.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    // Bloco Bebidas, segue o mesmo padrão do comentário anterior
    if (type === 'f' || type === 's') {
      const drinkRecipe = await apiRecipes('thecocktaildb', 'search', type, searchRecipe);
      if (drinkRecipe.drinks === null) {
        return global.alert(MSG_RECIPES_NOT_FOUND);
      }
      setDrinks(drinkRecipe.drinks.slice(0, MAX_RECIPE_NUMBER));
    } else if (type === 'i') {
      const drinkRecipe = await apiRecipes('thecocktaildb', 'filter', type, searchRecipe);
      if (drinkRecipe.drinks === null) {
        return global.alert(MSG_RECIPES_NOT_FOUND);
      }
      setDrinks(drinkRecipe.drinks.slice(0, MAX_RECIPE_NUMBER));
    }
  }

  // Funcao grava o valor do radio button escolhido
  function handleChangeRadio({ target: { value } }) {
    setSearchType(value);
  }

  /* ----------------------<SearchProvider>--------------------------- */

  /* ----------------------<Details>---------------------------------- */

  const setRecipeFavorite = (newFavoriteRecipe) => {
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

  function unfavoriteBtn(objRecipes) {
    console.log(objRecipes);
    const Storage = localStorage.getItem('favoriteRecipes');
    const newStorage = JSON.parse(Storage).filter((e) => e.id !== objRecipes.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
    setFavorites(newStorage);
  }

  function filterRecipes(type, array) {
    console.log(array);
    setFavorites(array.filter((recipes) => {
      if (type === 'all') return true;
      return recipes.type === type;
    }));
  }

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
    sendSearchFoods,
    sendSearchDrinks,
    handleChangeRadio,
    setRecipeFavorite,
    unfavoriteBtn,
    filterRecipes,
    favoritesStorage,
    favoriteRecipes,
    doneRecipes,
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
