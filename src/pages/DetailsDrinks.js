import React, { useEffect, useState, useContext } from 'react';
import PropType from 'prop-types';
import CarouselRecommend from '../components/CarouselRecommend';
import doneRecipesContext from '../context/doneRecipesContext';
// import MainContext from '../context/MainContext';
import shareIcon from '../images/shareIcon.svg';
import FavoriteIcon from '../components/FavoriteIcon';
import { apiAttributes, requireApiFood } from '../services/themealdbApi';
import ButtonFixedRecipes from '../components/ButtonFixedRecipes';

function DetailsDrinks(props) {
  const { clipboard } = useContext(doneRecipesContext);
  // const { data, arrayRecomendation, setId, isLoading,
  //   arrayIngredients, arrayMeasures } = useContext(MainContext);

  const [data, setData] = useState({});
  const [arrayRecomendation, setRecomendation] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [arrayIngredients, setIngredient] = useState([]);
  const [arrayMeasures, setMeasure] = useState([]);

  const { history: { location } } = props;
  const id = location.pathname.split('/')[2];
  // setId(id);

  useEffect(() => {
    async function fetchData() {
      setRecomendation(await apiAttributes('s', '', '/foods'));
      setData(await requireApiFood('thecocktaildb', id, 'drinks'));
    }
    fetchData();
  }, [id]);

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

  const { strDrinkThumb, strDrink, strAlcoholic, strInstructions, strCategory } = data;

  const objFavorite = {
    id,
    type: 'drink',
    nationality: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
  };
  console.log(data);

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
      <FavoriteIcon data={ objFavorite } />
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
      <ButtonFixedRecipes />
    </section>
  );
}

DetailsDrinks.propTypes = {
  history: PropType.shape({
    location: PropType.objectOf(PropType.string).isRequired,
  }).isRequired,
};

export default DetailsDrinks;
