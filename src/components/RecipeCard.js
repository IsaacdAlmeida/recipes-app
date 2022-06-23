import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard({ foods, index }) {
  if (foods !== undefined) {
    const { strMealThumb, strMeal } = foods;
    return (
      <div data-testid={ `${index}-recipe-card` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ strMealThumb }
          alt={ `plate of ${strMeal}` }
        />
        <h4 data-testid={ `${index}-card-name` }>{ strMeal }</h4>
      </div>
    );
  }
}

RecipeCard.propTypes = {
  foods: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;

// https://www.digitalocean.com/community/tutorials/how-to-create-wrapper-components-in-react-with-props-pt
