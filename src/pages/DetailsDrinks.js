import PropType from 'prop-types';
import React, { useEffect, useState } from 'react';
import ButtonFixedRecipes from '../components/ButtonFixedRecipes';
import CarouselRecommend from '../components/CarouselRecommend';
import FavoriteIcon from '../components/FavoriteIcon';
import RenderCategory from '../components/RenderCategory';
import RenderImage from '../components/RenderImage';
import RenderInstructions from '../components/RenderInstructions';
import RenderShare from '../components/RenderShare';
import RenderTitle from '../components/RenderTitle';
import { apiAttributes, requireApiFood } from '../services/themealdbApi';

const SIX_NUMB = 6;

function DetailsDrinks(props) {
  const [data, setData] = useState({});
  const [arrayRecomendation, setRecomendation] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [arrayIngredients, setIngredient] = useState([]);
  const [arrayMeasures, setMeasure] = useState([]);

  const { history: { location } } = props;
  const id = location.pathname.split('/')[2];

  useEffect(() => {
    async function fetchData() {
      const fetchRecomendation = await apiAttributes('s', '', '/foods');
      setRecomendation(fetchRecomendation.meals.slice(0, SIX_NUMB));
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

  return isLoading ? <p>Loading ...</p> : (
    <section>
      <RenderImage srcImage={ strDrinkThumb } />
      <RenderTitle strTitle={ strDrink } />
      <RenderShare site={ location.pathname } id={ id } />
      <FavoriteIcon data={ objFavorite } />
      <RenderCategory strCategory={ strAlcoholic } />
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
      <RenderInstructions strInstructions={ strInstructions } />
      <CarouselRecommend
        arrayRecomendation={ arrayRecomendation }
        way="drinks"
      />
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
