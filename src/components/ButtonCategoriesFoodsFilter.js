import React, { useContext } from 'react';
import MainContext from '../context/MainContext';

function ButtonCategoriesFoodsFilter() {
  const {
    foodsCategories,
    handleCategoriesFoodsFilter,
  } = useContext(MainContext);

  return (
    foodsCategories.map((item, index) => (
      <button
        key={ index }
        type="button"
        data-testid={ `${item.strCategory}-category-filter` }
        onClick={ () => handleCategoriesFoodsFilter(item.strCategory) }
      >
        { item.strCategory }
      </button>
    )));
}

export default ButtonCategoriesFoodsFilter;
