import React, { useEffect, useState, useContext } from 'react';
import PropType from 'prop-types';
import CarouselRecommend from '../components/CarouselRecommend';
import { apiAttributes } from '../services/themealdbApi';
import doneRecipesContext from '../context/doneRecipesContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function DetailsFoods(props) {
  const { clipboard } = useContext(doneRecipesContext);

  const [data, setData] = useState({});
  const [arrayIngredients, setIngredient] = useState([]);
  const [arrayMeasures, setMeasure] = useState([]);
  const [arrayRecomendation, setRecomendation] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isDisabled, setDisabled] = useState(false);
  const [continueRecipe, setContinue] = useState(false);
  const [isFavorite, setFavorite] = useState(false);

  const { history: { location, push } } = props;
  const id = location.pathname.split('/')[2];

  useEffect(() => {
    // todo: Colocar em um provider global
    const requireApiFood = async () => {
      const URL_FOOD = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const dataApi = await fetch(URL_FOOD).then((response) => response.json());
      setData(dataApi.meals[0]);
    };
    requireApiFood();
  }, [id]);

  useEffect(() => {
    // todo: Colocar em um provider global
    async function fetchData() {
      setRecomendation(await apiAttributes('s', '', '/drinks'));
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
    const maxCount = 20;
    let conditionalBool = true;
    let count = 1;

    while (conditionalBool && count <= maxCount) {
      const keyIngredient = `strIngredient${count}`;
      const keyMeasure = `strMeasure${count}`;
      if (data[keyIngredient] === '' || data[keyIngredient] === null) {
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

  const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = data;
  return isLoading ? <p>Loading ...</p> : (
    <section>
      <img
        alt="img-recipe"
        data-testid="recipe-photo"
        src={ strMealThumb }
        width="100%"
      />
      <h2
        data-testid="recipe-title"
      >
        {strMeal}
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
      <p data-testid="recipe-category">{strCategory}</p>
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
      <iframe
        data-testid="video"
        width="100%"
        height="315"
        src={ strYoutube }
        title="YouTube video player"
        frameBorder="0"
        allow={ `accelerometer; autoplay; clipboard-write; encrypted-media;
        gyroscope; picture-in-picture` }
        allowFullcreen
      />
      <CarouselRecommend arrayRecomendation={ arrayRecomendation.drinks } />
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

DetailsFoods.propTypes = {
  history: PropType.shape({
    location: PropType.objectOf(PropType.string).isRequired,
    push: PropType.func.isRequired,
  }).isRequired,
};

export default DetailsFoods;
