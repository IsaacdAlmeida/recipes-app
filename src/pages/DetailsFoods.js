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
import '../styles/details.css';

const SIX_NUMB = 6;

function DetailsFoods(props) {
  const [data, setData] = useState({});
  const [arrayRecomendation, setRecomendation] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [arrayIngredients, setIngredient] = useState([]);
  const [arrayMeasures, setMeasure] = useState([]);

  const { history: { location } } = props;
  const id = location.pathname.split('/')[2];

  useEffect(() => {
    async function fetchData() {
      const fetchRecomendation = await apiAttributes('s', '', '/drinks');
      setRecomendation(fetchRecomendation.drinks.slice(0, SIX_NUMB));
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

  const [url, setUrl] = useState();

  const { strMealThumb, strMeal, strCategory, strInstructions,
    strYoutube, strArea } = data;

  useEffect(() => {
    if (strYoutube) {
      const urlFormatted = strYoutube.replace('watch?v=', 'embed/');
      setUrl(urlFormatted);
    }
  }, [strYoutube]);

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
    <div className="details-container">
      <div className="details-header">
        <RenderImage srcImage={ strMealThumb } />
        <RenderTitle strTitle={ strMeal } />
      </div>
      <div className="details-icons">
        <RenderShare site={ location.pathname } id={ id } />
        <FavoriteIcon data={ objFavorite } />
      </div>
      <div className="details-category">
        <RenderCategory strCategory={ strCategory } />
      </div>
      <div className="details-ingredients">
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
      </div>
      <div className="details-instructions">
        <RenderInstructions strInstructions={ strInstructions } />
      </div>
      <div className="carousel-content">
        <iframe
          data-testid="video"
          src={ url }
          title="YouTube video player"
          frameBorder="0"
        />
        <CarouselRecommend
          arrayRecomendation={ arrayRecomendation }
          way="foods"
        />
      </div>
      <div className="details-button">
        <ButtonFixedRecipes />
      </div>
    </div>
  );
}

DetailsFoods.propTypes = {
  history: PropType.shape({
    location: PropType.objectOf(PropType.string).isRequired,
  }).isRequired,
};

export default DetailsFoods;
