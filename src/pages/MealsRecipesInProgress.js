import PropType from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import FavoriteIcon from '../components/FavoriteIcon';
import RenderCategory from '../components/RenderCategory';
import RenderImage from '../components/RenderImage';
import RenderInstructions from '../components/RenderInstructions';
import RenderShare from '../components/RenderShare';
import RenderTitle from '../components/RenderTitle';
import doneRecipesContext from '../context/doneRecipesContext';
import { requireApiFood } from '../services/themealdbApi';
import '../styles/details.css';

const DEFAULT_STORAGE = { cocktails: {}, meals: {} };

function MealsRecipesInProgress(props) {
  const {
    qtdChecked,
    setQtdChecked,
    handleOnChange,
    isChecked,
    setIsChecked,
  } = useContext(doneRecipesContext);
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [arrayIngredients, setIngredient] = useState([]);
  const [arrayMeasures, setMeasure] = useState([]);

  const { history: { location, push } } = props;
  const id = location.pathname.split('/')[2];

  useEffect(() => {
    async function fetchData() {
      setData(await requireApiFood('themealdb', id, 'meals'));
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      setLoading(false);
    }
  }, [data]);

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

  useEffect(() => {
    const inProgressRecipes = JSON
      .parse(localStorage.getItem('inProgressRecipes')) || DEFAULT_STORAGE;
    const { meals } = inProgressRecipes;
    console.log(meals[id]);
    if (meals[id]) {
      setIsChecked(meals[id]);
      setQtdChecked(meals[id].length);
    }
  }, [id, setIsChecked, setQtdChecked]);

  const { strMealThumb, strMeal, strCategory, strInstructions, strArea } = data;

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
        <RenderShare site={ `/foods/${id}` } id={ id } />
        <FavoriteIcon data={ objFavorite } />
      </div>
      <div className="details-category">
        <RenderCategory strCategory={ strCategory } />
      </div>
      <div className="details-ingredients">
        <h3>Ingredients</h3>
        { arrayIngredients.map((ingredient, index) => (
          <p
            key={ index }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              type="checkbox"
              id={ index }
              checked={ isChecked[index] }
              onChange={
                (event) => handleOnChange(event, data[ingredient], 'meals')
              }
            />
            { `${data[ingredient]} - ${data[arrayMeasures[index]]}` }
          </p>
        )) }
      </div>
      <div className="details-instructions">
        <RenderInstructions strInstructions={ strInstructions } />
      </div>
      <div className="details-button">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          className="finish-recipe-bottom"
          disabled={ qtdChecked < arrayIngredients.length }
          onClick={ () => push('/done-recipes') }
        >
          Finish Recipe
        </button>
      </div>
    </div>
  );
}

MealsRecipesInProgress.propTypes = {
  history: PropType.shape({
    location: PropType.objectOf(PropType.string).isRequired,
    push: PropType.func.isRequired,
  }).isRequired,
};

export default MealsRecipesInProgress;
