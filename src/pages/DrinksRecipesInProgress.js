import PropType from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteIcon from '../components/FavoriteIcon';
import RenderCategory from '../components/RenderCategory';
import RenderImage from '../components/RenderImage';
import RenderShare from '../components/RenderShare';
import RenderTitle from '../components/RenderTitle';

function DrinksRecipesInProgress(props) {
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
    <section>
      <RenderImage srcImage={ strDrinkThumb } />
      <RenderTitle strTitle={ strDrink } />
      <RenderShare id={ id } />
      { Number(indexMessage) === Number(id) && <p>Link copied!</p> }
      <FavoriteIcon data={ objFavorite } />
      <RenderCategory strCategory={ strCategory } />
      <p data-testid="recipe-category">{strAlcoholic}</p>
      <h3>Ingredients</h3>
      <div>
        {arrayIngredients.map((ingredient, index) => (
          <p key={ index } data-testid={ `${index}-ingredient-step` }>
            <input type="checkbox" />
            {`${data[ingredient]} - ${data[arrayMeasures[index]]}`}
          </p>
        ))}
      </div>
      <h3>Instructions</h3>
      <p data-testid="instructions">{strInstructions}</p>
      <Link to="/done-recipes">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          className="finish-recipe-bottom"
        >
          Finish Recipe
        </button>
      </Link>
    </section>
  );
}

DrinksRecipesInProgress.propTypes = {
  history: PropType.shape({
    location: PropType.objectOf(PropType.string).isRequired,
  }).isRequired,
};

export default DrinksRecipesInProgress;
