async function requestDrinksFromCategories(category) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  try {
    const request = await fetch(URL);
    const data = await request.json();
    const newDrinksFromCategories = data.drinks;
    return newDrinksFromCategories;
  } catch (error) {
    console.log(error);
  }
}

export default requestDrinksFromCategories;
