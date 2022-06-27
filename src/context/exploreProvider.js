import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import explorerContext from './exploreContext';
import {
  randomApi,
  apiRecipes,
  getIngredientOrNationality,
} from '../services/themealdbApi';

function ExplorerProvider({ children }) {
  const [randomRecipes, setRandomRecipes] = useState();
  const [recipesClicked, setRecipesClicked] = useState();
  const [recipesSelectedArea, setRecipesSelectedArea] = useState();
  const [nationality, setNationality] = useState();
  const [changeNationality, setChangeNationality] = useState('All');

  // Req 74 - Paginas ExploreDrinks/Foods envia o tipo da receita
  // E fazemos a condição encima do tipo, para pode passar qual API
  // iremos utilizar, ja que ambos tem o mesmo endpoint.
  async function sendRecipeType(typeRecipe) {
    if (typeRecipe === 'food') {
      setRandomRecipes(await randomApi('themealdb'));
    } setRandomRecipes(await randomApi('thecocktaildb'));
  }

  // Req 77 - Realiza a consulta na API e retorna as receitas
  // que possuem o ingrediente clicado
  async function getRecipes(site, modulo, type, ingredientSelected) {
    setRecipesClicked(
      await apiRecipes(site, modulo, type, ingredientSelected),
    );
  }

  // Req 79 - Retorna os paises para montar o select option
  // os parametros utilizados, são o site, o endpoint, o tipo e o atributo
  // como a Api eh reutilizavel, foi necessário passa-los desse jeito
  // do contrário, seria criado N Api's
  async function sendSearchNationality() {
    setNationality(await getIngredientOrNationality('themealdb', 'list', 'a', 'list'));
  }

  // Req 80 - Retorna se for diferente de All, ele chama a Api passando a informação do option select
  // recebida, do contrário, é feita uma outra chamada de Api 'generica' carregando todas as
  // receitas no inicio do carregamento da pagina explore/foods/nationality
  async function sendSearchIngredient() {
    if (changeNationality !== 'All') {
      setRecipesSelectedArea(
        await getIngredientOrNationality('themealdb', 'filter', 'a', changeNationality),
      );
    } else {
      setRecipesSelectedArea(
        await getIngredientOrNationality('themealdb', 'search', 's', ''),
      );
    }
  }

  // 79 - Ao carregar a pagina, o evento da função é chamada
  useEffect(() => {
    sendSearchNationality();
  }, []);

  // Req 80 - Ao carregar valida a opção do select option,
  // caso All, o evento da função e chamada, do contrário,
  // espera a o evento do select option alterar a informação
  useEffect(() => {
    sendSearchIngredient();
  }, [changeNationality]);

  // Req 79 - Funcao grava em changeArea o valor selecionado no select option
  // que serve para realizar o filtro das receitas por naticionalidade
  function handleChangeArea({ target }) {
    setChangeNationality(target.value);
  }

  const contextValue = {
    randomRecipes,
    recipesClicked,
    recipesSelectedArea,
    nationality,
    getRecipes,
    sendRecipeType,
    handleChangeArea,
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
