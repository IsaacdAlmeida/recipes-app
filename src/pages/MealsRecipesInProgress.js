import PropType from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteIcon from '../components/FavoriteIcon';
import RenderCategory from '../components/RenderCategory';
import RenderImage from '../components/RenderImage';
import RenderShare from '../components/RenderShare';
import RenderTitle from '../components/RenderTitle';
import RenderInstructions from '../components/RenderInstructions';
import doneRecipesContext from '../context/doneRecipesContext';
import { requireApiFood } from '../services/themealdbApi';

function MealsRecipesInProgress(props) {
  const { indexMessage } = useContext(doneRecipesContext);

  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [arrayIngredients, setIngredient] = useState([]);
  const [arrayMeasures, setMeasure] = useState([]);

  const { history: { location } } = props;
  const id = location.pathname.split('/')[2];
  // setId(id);

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
    console.log('oi');
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
      { Number(indexMessage) === Number(id) && <p>Link copied!</p> }
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
      <Link to="/done-recipes">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          className="finish-recipe-bottom"
          // onClick={ () => history.push(`/foods/${***.idMeal}/in-progress`) }
        >
          Finish Recipe
        </button>
      </Link>
    </section>
  );
}

MealsRecipesInProgress.propTypes = {
  history: PropType.shape({
    location: PropType.objectOf(PropType.string).isRequired,
  }).isRequired,
};

export default MealsRecipesInProgress;
