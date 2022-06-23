import React, { useContext } from 'react';
import MainPageContext from '../context/MainPageContext';

function ButtonCategoriesDrinksFilter() {
  const {
    drinksCategories,
    handleCategoriesDrinksFilter,
  } = useContext(MainPageContext);

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
