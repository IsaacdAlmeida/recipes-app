import PropType from 'prop-types';
import React, { useEffect, useState } from 'react';
import FavoriteIcon from '../components/FavoriteIcon';
import RenderCategory from '../components/RenderCategory';
import RenderImage from '../components/RenderImage';
import RenderInstructions from '../components/RenderInstructions';
import RenderShare from '../components/RenderShare';
import RenderTitle from '../components/RenderTitle';
import { requireApiFood } from '../services/themealdbApi';
// import ButtonFinishRecipe from '../components/ButtonFinishRecipe';

function MealsRecipesInProgress(props) {
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
    // console.log('oi');
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

  const [isChecked, setIsChecked] = useState(false);
  const [ingredientIndex, setIngredientIndex] = useState('');

  const handleOnChange = (i) => {
    setIsChecked(!isChecked);
    setIngredientIndex(i);
  };

  return isLoading ? <p>Loading ...</p> : (
    <section>
      <RenderImage srcImage={ strMealThumb } />
      <RenderTitle strTitle={ strMeal } />
      <RenderShare id={ id } />
      <FavoriteIcon data={ objFavorite } />
      <RenderCategory strCategory={ strCategory } />
      <h3>Ingredients</h3>
      <div>
        {arrayIngredients.map((ingredient, index) => (
          <p
            key={ index }
            data-testid={ `${index}-ingredient-step` }
            style={ { textDecoration: isChecked && ingredientIndex === index
              ? 'line-through' : 'none' } }
          >
            <input
              type="checkbox"
              id={ index }
              onClick={ () => handleOnChange(index) }
            />
            {`${data[ingredient]} - ${data[arrayMeasures[index]]}`}
          </p>
        ))}
      </div>
      <RenderInstructions strInstructions={ strInstructions } />
      <button
        type="button"
        data-testid="finish-recipe-btn"
        className="finish-recipe-bottom"
        onClick={ () => push('/done-recipes') }
      >
        Finish Recipe
      </button>
    </section>
  );
}

MealsRecipesInProgress.propTypes = {
  history: PropType.shape({
    location: PropType.objectOf(PropType.string).isRequired,
    push: PropType.func.isRequired,
  }).isRequired,
};

export default MealsRecipesInProgress;
