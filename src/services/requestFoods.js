async function requestFoods() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  try {
    const request = await fetch(URL);
    const data = await request.json();
    const arrayOfMeals = data.meals;
    return arrayOfMeals;
  } catch (error) {
    console.log(error);
  }
}

export default requestFoods;
