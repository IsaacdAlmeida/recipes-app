import PropType from 'prop-types';
import React, { useContext } from 'react';
import doneRecipesContext from '../context/doneRecipesContext';
import shareIcon from '../images/shareIcon.svg';

function RenderShare({ id, site }) {
  const { clipboard, indexMessage } = useContext(doneRecipesContext);

  return (
    <div>
      <input
        type="image"
        data-testid="share-btn"
        src={ shareIcon }
        onClick={ clipboard }
        value={ `http://localhost:3000${site}` }
        alt="share button"
        id={ id }
      />
      { Number(indexMessage) === Number(id) && <p>Link copied!</p> }
    </div>
  );
}

RenderShare.propTypes = {
  id: PropType.string.isRequired,
  site: PropType.string.isRequired,
};

export default RenderShare;
