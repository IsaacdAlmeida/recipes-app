import PropType from 'prop-types';
import React from 'react';

function RenderCategory({ strCategory }) {
  return <p data-testid="recipe-category">{strCategory}</p>;
}

RenderCategory.propTypes = {
  strCategory: PropType.string.isRequired,
};

export default RenderCategory;
