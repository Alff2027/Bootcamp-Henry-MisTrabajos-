import { GET_RECIPES } from ".";
import axios from 'axios'

const getRecipes = (title) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/recipes?name=${title}`)
      return dispatch({
        type: GET_RECIPES,
        payload: response.data
      });
    } catch (err) {
      console.log(err)
    }
  }
}

export default getRecipes