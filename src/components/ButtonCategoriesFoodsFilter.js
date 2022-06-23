import React, { useContext } from 'react';
import MainPageContext from '../context/MainPageContext';

function ButtonCategoriesFoodsFilter() {
  const {
    foodsCategories,
    handleCategoriesFoodsFilter,
  } = useContext(MainPageContext);

  return (
    foodsCategories.map((item, index) => (
      <button
        key={ index }
        type="button"
        data-testid={ `${item.strCategory}-category-filter` }
        onClick={ () => handleCategoriesFoodsFilter(item.strCategory) }
      >
        {item.strCategory}
      </button>
    )));
}

export default ButtonCategoriesFoodsFilter;
