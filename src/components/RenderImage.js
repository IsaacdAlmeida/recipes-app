import PropType from 'prop-types';
import React from 'react';
import '../styles/details.css';

function RenderImage({ srcImage }) {
  return (
    <div className="image-details">
      <img
        alt="img-recipe"
        data-testid="recipe-photo"
        src={ srcImage }
      />
    </div>
  );
}

RenderImage.propTypes = {
  srcImage: PropType.string.isRequired,
};

export default RenderImage;
