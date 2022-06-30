import React, { useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import explorerContext from '../context/exploreContext';
import Footer from '../components/Footer';
import '../styles/explore.css';

function ExploreDrinks() {
  const { randomRecipes, sendRecipeType } = useContext(explorerContext);

  const { push } = useHistory();

  // Req 74 - Aplicado useEffect para checar se temos retorno da receita
  // caso true, pegamos o id da receita e redirecionamos para a rota correta
  useEffect(() => {
    if (randomRecipes) {
      const id = randomRecipes.drinks.map((e) => e.idDrink);
      push(`/drinks/${id}`);
    }
  }, [randomRecipes, push]);

  return (
    <div>
      <Header pageName="Explore Drinks" isEnable={ false } />
      {/* Req 71 - Add botão para filtro e Req 72 criado rota para a pagina de ingrediente */ }
      <div className="explore-container">
        <Link to="/explore/drinks/ingredients">
          <button
            data-testid="explore-by-ingredient"
            type="button"
          >
            By Ingredient
          </button>
        </Link>
        {/* Req 74 - Chama função passando o tipo da receita para o provider  */ }
        <button
          data-testid="explore-surprise"
          type="button"
          onClick={ () => sendRecipeType('drink') }
        >
          Surprise me!
        </button>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default ExploreDrinks;
