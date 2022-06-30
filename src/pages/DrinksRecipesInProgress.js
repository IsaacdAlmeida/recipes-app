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
import '../styles/details.css';

function DrinksRecipesInProgress(props) {
  // console.log('oi');
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [arrayIngredients, setIngredient] = useState([]);
  const [arrayMeasures, setMeasure] = useState([]);

  const { history: { location, push } } = props;
  const id = location.pathname.split('/')[2];

  useEffect(() => {
    async function fetchData() {
      setData(await requireApiFood('thecocktaildb', id, 'drinks'));
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
    <div className="details-container">
      <div className="details-header">

        <RenderImage srcImage={ strDrinkThumb } />
        <RenderTitle strTitle={ strDrink } />
      </div>
      <div className="details-icons">

        <RenderShare site={ `/drinks/${id}` } id={ id } />
        <FavoriteIcon data={ objFavorite } />
      </div>
      <div className="details-category">

        <RenderCategory strCategory={ strAlcoholic } />
      </div>
      <div className="details-ingredients">
        <h3>Ingredients</h3>
        {arrayIngredients.map((ingredient, index) => (
          <p key={ index } data-testid={ `${index}-ingredient-step` }>
            <input type="checkbox" />
            {`${data[ingredient]} - ${data[arrayMeasures[index]]}`}
          </p>
        ))}
      </div>
      <div className="details-instructions">

        <RenderInstructions strInstructions={ strInstructions } />
      </div>
      <div className="details-button">

        <button
          type="button"
          data-testid="finish-recipe-btn"
          className="finish-recipe-bottom"
          onClick={ () => push('/done-recipes') }
        >
          Finish Recipe
        </button>
      </div>
    </div>
  );
}

DrinksRecipesInProgress.propTypes = {
  history: PropType.shape({
    location: PropType.objectOf(PropType.string).isRequired,
    push: PropType.func.isRequired,
  }).isRequired,
};

export default DrinksRecipesInProgress;
