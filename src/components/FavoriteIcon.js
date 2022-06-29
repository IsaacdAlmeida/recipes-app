import React, { useState, useContext, useEffect } from 'react';
import PropType from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import MainContext from '../context/MainContext';

function FavoriteIcon({ data }) {
  const { setRecipeFavorite, unfavoriteBtn } = useContext(MainContext);

  const [isFavoriteIcon, setIconFavorite] = useState(false);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    if (favoriteRecipes.length !== 0
      && favoriteRecipes.some(({ id }) => id === data.id)) {
      setIconFavorite(true);
    }
  }, [data]);

  const addFavorite = () => {
    setIconFavorite(!isFavoriteIcon);
    if (!isFavoriteIcon) {
      setRecipeFavorite(data);
    }
  };

  const removeFavorite = () => {
    setIconFavorite(!isFavoriteIcon);
    if (isFavoriteIcon) {
      console.log('test');
      unfavoriteBtn(data);
    }
  };

  return !isFavoriteIcon ? (
    <input
      data-testid="favorite-btn"
      type="image"
      alt="favorite-icon-button"
      src={ whiteHeartIcon }
      onClick={ addFavorite }
    />
  ) : (
    <input
      data-testid="favorite-btn"
      type="image"
      alt="favorite-icon-button"
      src={ blackHeartIcon }
      onClick={ removeFavorite }
    />
  );
}

FavoriteIcon.propTypes = {
  data: PropType.objectOf(PropType.string).isRequired,
};

export default FavoriteIcon;
