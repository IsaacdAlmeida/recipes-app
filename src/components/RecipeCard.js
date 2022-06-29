import React from 'react';
import PropTypes from 'prop-types';
import '../styles/recipecard.css';

function RecipeCard({ foods, index, drinks }) {
  if (foods !== undefined) {
    const { strMealThumb, strMeal } = foods;
    return (
      <div data-testid={ `${index}-recipe-card` } className="card-container">
        <img
          data-testid={ `${index}-card-img` }
          src={ strMealThumb }
          alt={ `plate of ${strMeal}` }
        />
        <div className="text-container">
          <h4 data-testid={ `${index}-card-name` }>{ strMeal }</h4>
        </div>
      </div>
    );
  }

  if (drinks !== undefined) {
    const { strDrinkThumb, strDrink } = drinks;
    return (
      <div data-testid={ `${index}-recipe-card` } className="card-container">
        <img
          data-testid={ `${index}-card-img` }
          src={ strDrinkThumb }
          alt={ `cup of ${strDrink}` }
        />
        <h4 data-testid={ `${index}-card-name` }>{ strDrink }</h4>
      </div>
    );
  }
}

RecipeCard.propTypes = {
  foods: PropTypes.objectOf(PropTypes.any),
  index: PropTypes.number.isRequired,
  drinks: PropTypes.objectOf(PropTypes.any),
};

RecipeCard.defaultProps = {
  foods: undefined,
  drinks: undefined,
};

export default RecipeCard;

// https://www.digitalocean.com/community/tutorials/how-to-create-wrapper-components-in-react-with-props-pt
// https://thewebdev.info/2021/11/13/how-to-specify-null-prop-type-in-react/#:~:text=To%20specify%20null%20prop%20type%20in%20React%2C%20we%20can%20set,as%20the%20default%20prop%20value.&text=We%20create%20the%20MyComponent%20component,nothing%20is%20set%20for%20item%20.
