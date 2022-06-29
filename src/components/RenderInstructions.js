import PropType from 'prop-types';
import React from 'react';

function RenderInstructions({ strInstructions }) {
  return (
    <div>
      <h3>Instructions</h3>
      <p data-testid="instructions">{strInstructions}</p>
    </div>
  );
}

RenderInstructions.propTypes = {
  strInstructions: PropType.string.isRequired,
};

export default RenderInstructions;
