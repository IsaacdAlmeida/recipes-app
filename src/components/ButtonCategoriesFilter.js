import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import MainPageContext from '../context/MainPageContext';

function ButtonCategoriesFilter({ category }) {
  const { foodsCategories, drinksCategories } = useContext(MainPageContext);
  return (category === 'foodsCategories' ? foodsCategories : drinksCategories)
    .map((item, index) => (
      <button
        key={ index }
        type="button"
        data-testid={ `${item.strCategory}-category-filter` }
      >
        {item.strCategory}
      </button>
    ));
}

ButtonCategoriesFilter.propTypes = {
  category: PropTypes.string.isRequired,
};

export default ButtonCategoriesFilter;
