import React, { useEffect, useState } from 'react';
import PropType from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import heartIcon from '../images/whiteHeartIcon.svg';
import { apiAttributes } from '../services/themealdbApi';
import CarouselRecommend from '../components/CarouselRecommend';

function DetailsDrinks(props) {
  const [data, setData] = useState({});
  const [arrayIngredients, setIngredient] = useState([]);
  const [arrayMeasures, setMeasure] = useState([]);
  const [arrayRecomendation, setRecomendation] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const { history: { location } } = props;
    const id = location.pathname.split('/')[2];

    const requireApiFood = async () => {
      const URL_FOOD = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const dataApi = await fetch(URL_FOOD).then((response) => response.json());
      setData(dataApi.drinks[0]);
    };
    requireApiFood();
  }, []);

  useEffect(() => {
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
      if (data[keyIngredient] === null) {
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
      <button
        type="button"
        data-testid="start-recipe-btn"
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

DetailsDrinks.propTypes = {
  history: PropType.shape({
    location: PropType.objectOf(PropType.string).isRequired,
  }).isRequired,
};

export default DetailsDrinks;
