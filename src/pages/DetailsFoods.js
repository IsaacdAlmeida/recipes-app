import React, { useEffect, useState } from 'react';
import PropType from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import heartIcon from '../images/whiteHeartIcon.svg';
import { apiAttributes } from '../services/themealdbApi';

function DetailsFoods(props) {
  const [data, setData] = useState({});
  const [arrayIngredients, setIngredient] = useState([]);
  const [arrayMeasures, setMeasure] = useState([]);
  const [arrayRecomendation, setRecomendation] = useState([]);

  useEffect(() => {
    const { history: { location } } = props;
    const id = location.pathname.split('/')[2];

    const requireApiFood = async () => {
      const URL_FOOD = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const dataApi = await fetch(URL_FOOD).then((response) => response.json());
      setData(dataApi.meals[0]);
    };
    requireApiFood();
  }, []);

  useEffect(() => {
    async function fetchData() {
      setRecomendation(await apiAttributes('s', '', '/drinks').drinks);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const arrayIngredient = [];
    const arrayMeasure = [];
    const maxCount = 20;
    let conditionalBool = true;
    let count = 1;

    while (conditionalBool && count <= maxCount) {
      const keyIngredient = `strIngredient${count}`;
      const keyMeasure = `strMeasure${count}`;
      if (data[keyIngredient] === '') {
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

  console.log(arrayRecomendation);
  const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = data;
  return (
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
        alt="share-icon-button"
        data-testid="share-btn"
        src={ shareIcon }
        onClick={ () => console.log('Icon share') }
      />
      <input
        type="image"
        alt="favorite-icon-button"
        data-testid="favorite-btn"
        src={ heartIcon }
        onClick={ () => console.log('Icon favorite') }
      />
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
      <p data-testid="{index}-recomendation-card">Recomendado</p>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="fixed-bottom"
      >
        Start Recipe
      </button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </section>
  );
}

DetailsFoods.propTypes = {
  history: PropType.shape({
    location: PropType.objectOf(PropType.string).isRequired,
  }).isRequired,
};

export default DetailsFoods;
