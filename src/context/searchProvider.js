import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { apiAttributes } from '../services/themealdbApi';
import searchContext from './searchContext';

function SearchProvider({ children }) {
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
  function handleChange({ target: { value } }) {
    setTypeSearch(value);
  }

  const contextValue = {
    typeSearch,
    drinkApi,
    mealApi,
    sendSearch,
    handleChange,
  };

  return (
    <searchContext.Provider value={ contextValue }>
      { children }
    </searchContext.Provider>
  );
}

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchProvider;
