import PropType from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import ButtonFixedRecipes from '../components/ButtonFixedRecipes';
import CarouselRecommend from '../components/CarouselRecommend';
import FavoriteIcon from '../components/FavoriteIcon';
import RenderCategory from '../components/RenderCategory';
import RenderImage from '../components/RenderImage';
import RenderShare from '../components/RenderShare';
import RenderTitle from '../components/RenderTitle';
import doneRecipesContext from '../context/doneRecipesContext';
import { apiAttributes, requireApiFood } from '../services/themealdbApi';

function DetailsFoods(props) {
  const { indexMessage } = useContext(doneRecipesContext);

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
      setRecomendation(await apiAttributes('s', '', '/drinks'));
      setData(await requireApiFood('themealdb', id, 'meals'));
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
    /* provavelmete colocarei essa parte em um componente */
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

  const { strMealThumb, strMeal, strCategory, strInstructions,
    strYoutube, strArea } = data;

  const objFavorite = {
    id,
    type: 'food',
    nationality: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
  };

  return isLoading ? <p>Loading ...</p> : (
    <section>
      <RenderImage srcImage={ strMealThumb } />
      <RenderTitle strTitle={ strMeal } />
      <RenderShare id={ id } />
      { Number(indexMessage) === Number(id) && <p>Link copied!</p> }
      <FavoriteIcon data={ objFavorite } />
      <RenderCategory strCategory={ strCategory } />
      <h3>Ingredients</h3>
      <ul>
        {/* provavelmete colocarei essa parte em um componente */}
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
      />
      <CarouselRecommend arrayRecomendation={ arrayRecomendation.drinks } />
      <p data-testid="{index}-recomendation-card">Recomendado</p>
      <ButtonFixedRecipes />
    </section>
  );
}

DetailsFoods.propTypes = {
  history: PropType.shape({
    location: PropType.objectOf(PropType.string).isRequired,
  }).isRequired,
};

export default DetailsFoods;
