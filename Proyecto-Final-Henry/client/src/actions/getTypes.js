import { GET_TYPES } from ".";
import axios from 'axios'

const getTypes = () => {
  return async (dispatch) => {
    try {
      const response = await axios(`http://localhost:3001/types`)
      return dispatch({
        type: GET_TYPES,
        payload: response.data
      });
    } catch (err) {
      console.log(err)
    }
  }

}

export default getTypes