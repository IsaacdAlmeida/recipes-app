export const themealdbApi = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  try {
    const data = await fetch(URL).then((response) => response.json());
    console.log(data);
  } catch (e) {
    return e;
  }
};

// Ajuda do Henrique para refatorar o codigo, pois estava muito redundante
async function api(site, modulo, type, attribute) {
  // modulo (filter or search)
  // type(i = ingredient, f = first letter, s = name)
  const URL = `https://www.${site}.com/api/json/v1/1/${modulo}.php?${type}=${attribute}`;
  console.log(URL);
  try {
    const data = await fetch(URL).then((response) => response.json());
    return data;
  } catch (e) {
    return e;
  }
}

// Req 14 e 15
export const apiAttributes = async (typeSearch, attributes, pathName) => {
  console.log(pathName);
  // Bloco comidas
  if (pathName === '/foods') {
    if (typeSearch === 'f' || typeSearch === 's') {
      return api('themealdb', 'search', typeSearch, attributes);
    } return api('themealdb', 'filter', typeSearch, attributes);
  }
  // Bloco Bebidas
  if (typeSearch === 'f' || typeSearch === 's') {
    return api('thecocktaildb', 'search', typeSearch, attributes);
  } return api('thecocktaildb', 'filter', typeSearch, attributes);
};
