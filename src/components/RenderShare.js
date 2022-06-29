import PropType from 'prop-types';
import React, { useContext } from 'react';
import doneRecipesContext from '../context/doneRecipesContext';
import shareIcon from '../images/shareIcon.svg';

function RenderShare({ id }) {
  const { clipboard, indexMessage } = useContext(doneRecipesContext);

  return (
    <div>
      { Number(indexMessage) === Number(id) && <p>Link copied!</p> }
      <input
        type="image"
        data-testid="share-btn"
        src={ shareIcon }
        onClick={ clipboard }
        value={ `http://localhost:3000/foods/${id}` }
        alt="share button"
        id={ id }
      />
    </div>
  );
}

RenderShare.propTypes = {
  id: PropType.string.isRequired,
};

export default RenderShare;
