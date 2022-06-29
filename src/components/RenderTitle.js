import PropType from 'prop-types';
import React from 'react';

function RenderTitle({ strTitle }) {
  return (
    <h2
      data-testid="recipe-title"
    >
      {strTitle}
    </h2>
  );
}

RenderTitle.propTypes = {
  strTitle: PropType.string.isRequired,
};

export default RenderTitle;
