import React, { useEffect, useState, useContext } from 'react';
import PropType from 'prop-types';
import CarouselRecommend from '../components/CarouselRecommend';
import doneRecipesContext from '../context/doneRecipesContext';
import shareIcon from '../images/shareIcon.svg';
import FavoriteIcon from '../components/FavoriteIcon';
import { apiAttributes, requireApiFood } from '../services/themealdbApi';
import ButtonFixedRecipes from '../components/ButtonFixedRecipes';

function DetailsFoods(props) {
  const { clipboard } = useContext(doneRecipesContext);

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
      <FavoriteIcon />
      <p data-testid="recipe-category">{strCategory}</p>
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
