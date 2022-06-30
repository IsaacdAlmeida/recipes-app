const readInprogressRecipes = () => JSON.parse(localStorage.getItem('inProgressRecipes'));

const saveInprogressRecipes = (inProgressRecipes) => localStorage
  .setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));

export const getInprogressRecipes = () => {
  if (readInprogressRecipes()) {
    const progressRecipes = readInprogressRecipes();
    return progressRecipes;
  }
  return {};
};

export const addInprogressRecipes = (location, inProgressRecipes) => {
  if (readInprogressRecipes()) {
    const progressRecipes = readInprogressRecipes();
    if (progressRecipes[location]) {
      const newObjRecipe = { ...progressRecipes,
        [location]: { ...progressRecipes[location], ...inProgressRecipes[location] } };
      saveInprogressRecipes(newObjRecipe);
    } else {
      const newObjRecipeWithoutLocation = { ...progressRecipes, ...inProgressRecipes };
      saveInprogressRecipes(newObjRecipeWithoutLocation);
    }
  } else {
    saveInprogressRecipes(inProgressRecipes);
  }
};

export const addItemInprogressRecipes = (newArrayingredients,
  location, idIngredients) => {
  if (readInprogressRecipes()) {
    const progressRecipes = readInprogressRecipes();
    console.log(idIngredients);
    const changeObjRecipeIngredient = { ...progressRecipes,
      [location]: { ...progressRecipes[location], [idIngredients]: newArrayingredients },
    };
    saveInprogressRecipes(changeObjRecipeIngredient);
  }
};
