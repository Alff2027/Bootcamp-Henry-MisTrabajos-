import { GET_RECIPE_DETAIL } from ".";
import axios from 'axios';

const getRecipeDetail = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios(`http://localhost:3001/recipes/${id}`)
      return dispatch({
        type: GET_RECIPE_DETAIL,
        payload: response.data
      })
    } catch (e) {
      console.log(e)
    }
  }

}

export default getRecipeDetail