import React, { useEffect, useState, useContext } from 'react';
import PropType from 'prop-types';
import { apiAttributes } from '../services/themealdbApi';
import CarouselRecommend from '../components/CarouselRecommend';
import doneRecipesContext from '../context/doneRecipesContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

// const doneRecipes = [
//   {
//     id: '52771',
//     type: 'food',
//     nationality: 'Italian',
//     category: 'Vegetarian',
//     alcoholicOrNot: '',
//     name: 'Spicy Arrabiata Penne',
//     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
//     doneDate: '23/06/2020',
//     tags: ['Pasta', 'Curry'],
//   },
//   {
//     id: '178319',
//     type: 'drink',
//     nationality: '',
//     category: 'Cocktail',
//     alcoholicOrNot: 'Alcoholic',
//     name: 'Aquamarine',
//     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
//     doneDate: '23/06/2020',
//     tags: [],
//   },
// ];

// const inProgressRecipes = {
//   cocktails: {
//     17222: [],
//   },
//   meals: {
//     i52844: [],
//   },
// };

function DetailsDrinks(props) {
  const { clipboard } = useContext(doneRecipesContext);

  const [data, setData] = useState({});
  const [arrayIngredients, setIngredient] = useState([]);
  const [arrayMeasures, setMeasure] = useState([]);
  const [arrayRecomendation, setRecomendation] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isDisabled, setDisabled] = useState(false);
  const [continueRecipe, setContinue] = useState(false);
  const [isFavorite, setFavorite] = useState(false);
  // localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));

  const { history: { location, push } } = props;
  const id = location.pathname.split('/')[2];

  useEffect(() => {
    // todo: Colocar em um provider global
    const requireApiFood = async () => {
      const URL_FOOD = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const dataApi = await fetch(URL_FOOD).then((response) => response.json());
      setData(dataApi.drinks[0]);
    };
    requireApiFood();
  }, [id]);

  useEffect(() => {
    // todo: Colocar em um provider global
    async function fetchData() {
      setRecomendation(await apiAttributes('s', '', '/foods'));
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (Object.keys(arrayRecomendation).length !== 0
      && Object.keys(data).length !== 0) {
      setLoading(false);
    }
  }, [arrayRecomendation, data]);

  useEffect(() => {
    const arrayIngredient = [];
    const arrayMeasure = [];
    const maxCount = 15;
    let conditionalBool = true;
    let count = 1;

    while (conditionalBool && count <= maxCount) {
      const keyIngredient = `strIngredient${count}`;
      const keyMeasure = `strMeasure${count}`;
      if (data[keyIngredient] === null || data[keyIngredient] === '') {
        conditionalBool = false;
        break;
      }
      arrayIngredient.push(keyIngredient);
      arrayMeasure.push(keyMeasure);
      count += 1;
    }
    setIngredient(arrayIngredient);
    setMeasure(arrayMeasure);
  }, [data]);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const listInProgress = Object.keys(inProgressRecipes.cocktails);

    doneRecipes.forEach(({ id: idStorage }) => {
      if (idStorage === id) setDisabled(true);
    });

    listInProgress.forEach((idStorage) => {
      if (idStorage === id) setContinue(true);
    });
  }, [id]);

  const redirectToInProgress = () => {
    push(`/foods/${id}/in-progress`);
  };

  const { strDrinkThumb, strDrink, strAlcoholic, strInstructions } = data;
  return isLoading ? <p>Loading ...</p> : (
    <section>
      <img
        alt="img-recipe"
        data-testid="recipe-photo"
        src={ strDrinkThumb }
        width="100%"
      />
      <h2
        data-testid="recipe-title"
      >
        {strDrink}
      </h2>
      <input
        type="image"
        data-testid="share-btn"
        src={ shareIcon }
        onClick={ clipboard }
        value={ `http://localhost:3000/drinks/${id}` }
        alt="share button"
      />
      {!isFavorite ? (
        <input
          data-testid="favorite-btn"
          type="image"
          alt="favorite-icon-button"
          src={ whiteHeartIcon }
          onClick={ () => setFavorite(true) }
        />
      ) : (
        <input
          data-testid="favorite-btn"
          type="image"
          alt="favorite-icon-button"
          src={ blackHeartIcon }
          onClick={ () => setFavorite(false) }
        />
      )}
      <p data-testid="recipe-category">{strAlcoholic}</p>
      <h3>Ingredients</h3>
      <ul>
        {arrayIngredients.map((ingredient, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            {`${data[ingredient]} - ${data[arrayMeasures[index]]}`}
          </li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <p data-testid="instructions">{strInstructions}</p>
      <CarouselRecommend arrayRecomendation={ arrayRecomendation.meals } />
      <p data-testid="{index}-recomendation-card">Recomendado</p>
      {!isDisabled && continueRecipe ? (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="fixed-bottom"
          onClick={ redirectToInProgress }
        >
          Continue Recipe
        </button>
      ) : (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="fixed-bottom"
          onClick={ redirectToInProgress }
        >
          Start Recipe
        </button>
      )}
    </section>
  );
}

DetailsDrinks.propTypes = {
  history: PropType.shape({
    location: PropType.objectOf(PropType.string).isRequired,
    push: PropType.func.isRequired,
  }).isRequired,
};

export default DetailsDrinks;
