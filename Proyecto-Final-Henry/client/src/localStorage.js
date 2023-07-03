export const loadFavState = () => {
  try {
    var favorites = []
    let keys = Object.keys(localStorage)
    let i = keys.length;

    while (i > 0) {
      favorites.push(localStorage.getItem(keys[i]));
      i--;
    }
    return favorites;
  } catch (error) {
    console.log(undefined)
  }
}

export const saveFavState = (recipe) => {
  try {
    const serialState = JSON.stringify(recipe);
    localStorage.setItem(((recipe.id).toString()), serialState)
  } catch (error) {
    console.log(error)
  }
}

export const removeFavState = (recipe) => {
  try {
    const serialState = JSON.stringify(recipe);
    localStorage.removeItem(((recipe.id).toString()), serialState)
  } catch (error) {
    console.log(error)
  }
}