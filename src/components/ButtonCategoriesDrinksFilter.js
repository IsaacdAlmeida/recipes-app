import React, { useContext } from 'react';
import MainContext from '../context/MainContext';

function ButtonCategoriesDrinksFilter() {
  const {
    drinksCategories,
    handleCategoriesDrinksFilter,
  } = useContext(MainContext);

  return (
    drinksCategories.map((item, index) => (
      <button
        key={ index }
        type="button"
        data-testid={ `${item.strCategory}-category-filter` }
        onClick={ () => handleCategoriesDrinksFilter(item.strCategory) }
      >
        {item.strCategory}
      </button>
    )));
}

export default ButtonCategoriesDrinksFilter;
