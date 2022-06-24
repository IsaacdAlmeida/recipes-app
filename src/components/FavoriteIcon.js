import React, { useState } from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteIcon() {
  const [isFavoriteIcon, setIconFavorite] = useState(false);

  return !isFavoriteIcon ? (
    <input
      data-testid="favorite-btn"
      type="image"
      alt="favorite-icon-button"
      src={ whiteHeartIcon }
      onClick={ () => setIconFavorite(true) }
    />
  ) : (
    <input
      data-testid="favorite-btn"
      type="image"
      alt="favorite-icon-button"
      src={ blackHeartIcon }
      onClick={ () => setIconFavorite(false) }
    />
  );
}

export default FavoriteIcon;
