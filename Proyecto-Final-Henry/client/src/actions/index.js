export const GET_RECIPES = "GET_RECIPES"
export const ADD_RECIPE_FAVORITES = "ADD_RECIPE_FAVORITES"
export const REMOVE_RECIPE_FAVORITES = "REMOVE_RECIPE_FAVORITES"
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL"
export const ADD_INGREDIENT = "ADD_INGREDIENT"
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT"
export const FILTER_DIET = "FILTER_DIET"
export const FILTER_CREATED = "FILTER_CREATED"
export const ORDER_BY_TITLE = "ORDER_BY_TITLE"
export const ORDER_BY_SCORE = "ORDER_BY_SCORE"
export const GET_TYPES = "GET_TYPES"
export const ADD_RECIPE = " ADD_RECIPE"
export const REMOVE_RECIPE = 'REMOVE_RECIPE'

export function filterByDiet(payload) {
  return {
    type: FILTER_DIET,
    payload
  }
}

export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload
  }
}

export function orderByTitle(payload) {
  return {
    type: ORDER_BY_TITLE,
    payload
  }
}

export function orderByScore(payload) {
  return {
    type: ORDER_BY_SCORE,
    payload
  }
}

export let ingredientId = 1;

export const addIngredient = function (ingredient) {
  return {
    type: ADD_INGREDIENT,
    payload: {
      ingredient,
      id: ingredientId++,

    }
  }
};

export const removeIngredient = function (id) {
  return {
    type: REMOVE_INGREDIENT,
    payload: id
  }
};