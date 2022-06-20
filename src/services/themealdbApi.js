const themealdbApi = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  try {
    const data = await fetch(URL).then((response) => response.json());
    console.log(data);
  } catch (e) {
    return e;
  }
};

export default themealdbApi;
