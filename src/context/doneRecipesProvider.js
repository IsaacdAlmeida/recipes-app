import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import doneRecipesContext from './doneRecipesContext';

const DEFAULT_STORAGE = { cocktails: {}, meals: {} };

function DoneRecipesProvider({ children }) {
  const recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
  const { location: { pathname } } = useHistory();
  const id = pathname.split('/')[2];
  const [indexMessage, setIndexMessage] = useState(recipesDone);
  const [filtered, setFiltered] = useState(recipesDone);
  const [isChecked, setIsChecked] = useState(false);
  const [qtdChecked, setQtdChecked] = useState(0);

  // Req 57 - Aplicado a funcionalidade de copiar o link da receita clicada
  function clipboard({ target }) {
    setIndexMessage(target.id); // Recebe index da receita clicada
    // https://blog.logrocket.com/implementing-copy-clipboard-react-clipboard-api/
    navigator.clipboard.writeText(target.value);
  }

  // Req 58 - Implentado a logica para filtrar pelo tipo da receita
  function filterRecipes(type, array) {
    setFiltered(array.filter((recipes) => {
      if (type === 'all') return true;
      return recipes.type === type;
    }));
  }

  const handleOnChange = (event, ingredient, type) => {
    setIsChecked(!isChecked);
    if (event.target.checked === true) {
      setQtdChecked((prevState) => prevState + 1);
    } else {
      setQtdChecked((prevState) => prevState - 1);
    }

    const inProgressRecipes = JSON
      .parse(localStorage.getItem('inProgressRecipes')) || DEFAULT_STORAGE;

    let newIngredientList = [];
    if (inProgressRecipes[type][id]) {
      newIngredientList = [...inProgressRecipes[type][id]];
    }
    if (!newIngredientList.includes(ingredient)) {
      newIngredientList.push(ingredient);
    }

    const newObjStorage = {
      ...inProgressRecipes,
      [type]: {
        ...inProgressRecipes[type],
        [id]: newIngredientList,
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(newObjStorage));
  };

  const contextValue = {
    filtered,
    indexMessage,
    clipboard,
    filterRecipes,
    handleOnChange,
    isChecked,
    setIsChecked,
    qtdChecked,
    setQtdChecked,
  };

  return (
    <doneRecipesContext.Provider value={ contextValue }>
      { children }
    </doneRecipesContext.Provider>
  );
}

DoneRecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DoneRecipesProvider;
