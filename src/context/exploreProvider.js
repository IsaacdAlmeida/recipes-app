import React, { useState } from 'react';
import PropTypes from 'prop-types';
import explorerContext from './exploreContext';
import { randomApi, getIdRecipes } from '../services/themealdbApi';

function ExplorerProvider({ children }) {
  const [recipes, setRecipes] = useState();
  const [idMealRecipes, setIdMealRecipes] = useState();

  // Req 74 - Paginas ExploreDrinks/Foods envia o tipo da receita
  // E fazemos a condição encima do tipo, para pode passar qual API
  // iremos utilizar, ja que ambos tem o mesmo endpoint.
  async function sendTypeRecipe(typeRecipe) {
    if (typeRecipe === 'food') {
      setRecipes(await randomApi('themealdb'));
    } setRecipes(await randomApi('thecocktaildb'));
  }

  // Req 77 - Realiza a consulta na API e retorna as receitas
  // que possuem o ingrediente clicado
  async function getRecipes(site, ingredientSelected) {
    setIdMealRecipes(
      await getIdRecipes(site, ingredientSelected),
    );
  }

  const contextValue = {
    recipes,
    idMealRecipes,
    getRecipes,
    sendTypeRecipe,
  };

  return (
    <explorerContext.Provider value={ contextValue }>
      { children }
    </explorerContext.Provider>
  );
}

ExplorerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ExplorerProvider;
