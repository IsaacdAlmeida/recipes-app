import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const DEFAULT_STORAGE = { cocktails: {}, meals: {} };

function ButtonFixedRecipes() {
  const { push, location: { pathname } } = useHistory();

  const [isDisabled, setDisabled] = useState(false);
  const [continueRecipe, setContinue] = useState(false);
  const [listInProgress, setList] = useState([]);

  const way = pathname.split('/')[1];
  const id = pathname.split('/')[2];

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
      || DEFAULT_STORAGE;

    if (way === 'foods') {
      setList(Object.keys(inProgressRecipes.meals));
    } else if (way === 'drinks') {
      setList(Object.keys(inProgressRecipes.cocktails));
    }
  }, [way]);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];

    doneRecipes.forEach(({ id: idStorage }) => {
      if (idStorage === id) setDisabled(true);
    });

    listInProgress.forEach((idStorage) => {
      if (idStorage === id) setContinue(true);
    });
  }, [id, listInProgress]);

  return !isDisabled && continueRecipe ? (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="fixed-bottom"
      onClick={ () => push(`${pathname}/in-progress`) }
    >
      Continue Recipe
    </button>
  ) : (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="fixed-bottom"
      onClick={ () => push(`${pathname}/in-progress`) }
    >
      Start Recipe
    </button>
  );
}

export default ButtonFixedRecipes;
