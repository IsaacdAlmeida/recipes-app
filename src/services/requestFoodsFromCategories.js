async function requestFoodsFromCategories(category) {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  try {
    const request = await fetch(URL);
    const data = await request.json();
    const newArrayFromCategories = data.meals;
    return newArrayFromCategories;
  } catch (error) {
    console.log(error);
  }
}

export default requestFoodsFromCategories;
