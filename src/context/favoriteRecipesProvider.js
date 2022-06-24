import React, { useState } from 'react';
import PropTypes from 'prop-types';
import favoriteRecipesContext from './favoriteRecipesContext';

function FavoriteRecipesProvider({ children }) {
  const recipesDone = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [indexMessage, setIndexMessage] = useState(recipesDone);
  const [filtered, setFiltered] = useState(recipesDone);

  // Req 57 - Aplicado a funcionalidade de copiar o link da receita clicada
  function clipboard({ target }) {
    setIndexMessage(target.id); // Recebe index da receita clicada
    // https://blog.logrocket.com/implementing-copy-clipboard-react-clipboard-api/
    navigator.clipboard.writeText(target.value);
  }

  // Req 58 - Implentado a logica para filtrar pelo tipo da receita
  function filterRecipes(type) {
    setFiltered(recipesDone.filter((recipes) => {
      if (type === 'all') return true;
      return recipes.type === type;
    }));
  }

  const contextValue = {
    filtered,
    indexMessage,
    clipboard,
    filterRecipes,
  };

  return (
    <favoriteRecipesContext.Provider value={ contextValue }>
      { children }
    </favoriteRecipesContext.Provider>
  );
}

FavoriteRecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FavoriteRecipesProvider;
