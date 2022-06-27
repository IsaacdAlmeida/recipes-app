import React, { useState } from 'react';
import PropTypes from 'prop-types';
import favoriteRecipesContext from './favoriteRecipesContext';

// const pathN1 = 29;
// const pathN2 = 33;

const favoriteRecipes = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];
localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
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

  function unfavoriteBtn(objRecipes) {
    const Storage = localStorage.getItem('favoriteRecipes');
    const newStorage = JSON.parse(Storage).filter((e) => e.id !== objRecipes.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
    setFiltered(newStorage);
    // // busca pai do target (receita clicada)
    // const removeRecipe = target.parentNode;
    // console.log(target);
    // // busca primeiro filho do elemento pai, um input que possui um value com um link
    // const pathId = removeRecipe.firstChild.value;
    // console.log(pathId);
    // // extrai ultimos numeros do link q sao o id da receita, substring corta a string toda pra esse id
    // const pathFinal = pathId.substring(pathN1);
    // console.log(pathFinal);
    // // busca o LocalStorage e armazena na const abaixo
    // const Storage = localStorage.getItem('favoriteRecipes');
    // // filtra Storage transformado em objeto excluindo o elemento q possuir o id da receita clicada, armazenando na const abaixo um novo array
    // const newStorage = JSON.parse(Storage).filter((e) => e.id !== pathFinal);
    // console.log(newStorage);
    // if (newStorage.length === 0) {
    // // se o array estiver vazio, o favoriteRecipes ficará vazio
    //   localStorage.setItem('favoriteRecipes', '');
    // } else {
    // // se não estiver vazio, o favoriteRecipes será substituído por um novo Storage q não contém mais a receita clicada
    //   localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
    // }
    // // remove a receita clicada
    // removeRecipe.remove();
  }

  const contextValue = {
    filtered,
    indexMessage,
    clipboard,
    filterRecipes,
    unfavoriteBtn,
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
