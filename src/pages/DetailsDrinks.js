import React, { useEffect, useState } from 'react';
import PropType from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import heartIcon from '../images/whiteHeartIcon.svg';
import { apiAttributes } from '../services/themealdbApi';
import CarouselRecommend from '../components/CarouselRecommend';

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

function DetailsDrinks(props) {
  const [data, setData] = useState({});
  const [arrayIngredients, setIngredient] = useState([]);
  const [arrayMeasures, setMeasure] = useState([]);
  const [arrayRecomendation, setRecomendation] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isDisabled, setDisabled] = useState(false);
  // localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  const { history: { location } } = props;
  const id = location.pathname.split('/')[2];

  useEffect(() => {
    const requireApiFood = async () => {
      const URL_FOOD = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const dataApi = await fetch(URL_FOOD).then((response) => response.json());
      setData(dataApi.drinks[0]);
    };
    requireApiFood();
  }, [id]);

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
    const test = JSON.parse(localStorage.getItem('doneRecipes'));
    console.log(test);
    test.forEach(({ id: idStorage }) => {
      if (idStorage === id) setDisabled(true);
    });
  }, [id]);

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
      {!isDisabled && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="fixed-bottom"
        >
          Start Recipe
        </button>
      )}
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
