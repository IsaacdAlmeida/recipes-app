import PropType from 'prop-types';
import React from 'react';

function RenderImage({ srcImage }) {
  return (
    <img
      alt="img-recipe"
      data-testid="recipe-photo"
      src={ srcImage }
      width="100%"
    />
  );
}

RenderImage.propTypes = {
  srcImage: PropType.string.isRequired,
};

export default RenderImage;
