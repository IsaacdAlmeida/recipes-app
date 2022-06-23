async function requestDrinksCategories() {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  try {
    const request = await fetch(URL);
    const data = await request.json();
    const arrayOfDrinksCategories = data.drinks;
    return arrayOfDrinksCategories;
  } catch (error) {
    console.log(error);
  }
}

export default requestDrinksCategories;
