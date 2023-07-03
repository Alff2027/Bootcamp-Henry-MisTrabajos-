import { ADD_RECIPE } from ".";
import axios from 'axios'

const addRecipe = (body) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`http://localhost:3001/recipe`, body)
      return dispatch({
        type: ADD_RECIPE,
        payload: response.data
      });
    } catch (err) {
      console.log(err)
    }
  }
}

export default addRecipe