import React, { useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import explorerContext from '../context/exploreContext';
import Footer from '../components/Footer';

function ExploreFoods() {
  const { randomRecipes, sendRecipeType } = useContext(explorerContext);

  const { push } = useHistory();

  // Req 74 - Aplicado useEffect para checar se temos retorno da receita
  // caso true, pegamos o id da receita e redirecionamos para a rota correta
  useEffect(() => {
    if (randomRecipes) {
      const id = randomRecipes.meals.map((e) => e.idMeal);
      push(`/foods/${id}`);
    }
  }, [randomRecipes, push]);

  return (
    <div>
      <Header pageName="Explore Foods" isEnable={ false } />
      {/* Req 71 - Add botões ingredient e nationality
       para filtro e Req 72/73 criado rotas para suas respectivas paginas */}
      <Link to="/explore/foods/ingredients">
        <button
          data-testid="explore-by-ingredient"
          type="button"
        >
          By Ingredient
        </button>
      </Link>
      <Link to="/explore/foods/nationalities">
        <button
          data-testid="explore-by-nationality"
          type="button"
        >
          By Nationality
        </button>
      </Link>
      {/* Req 74 - Chama função passando o tipo da receita para o provider  */ }
      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ () => sendRecipeType('food') }
      >
        Surprise me!
      </button>

      <div>
        <Footer />
      </div>

    </div>
  );
}

export default ExploreFoods;
