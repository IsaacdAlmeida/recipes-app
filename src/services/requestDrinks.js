async function requestDrinks() {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  try {
    const request = await fetch(URL);
    const data = await request.json();
    return data.meals;
  } catch (error) {
    console.log(error);
  }
}

export default requestDrinks;
