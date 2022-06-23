async function requestFoodsCategories() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

  try {
    const request = await fetch(URL);
    const data = await request.json();
    const arrayOfMealsCategories = data.meals;
    return arrayOfMealsCategories;
  } catch (error) {
    console.log(error);
  }
}

export default requestFoodsCategories;
