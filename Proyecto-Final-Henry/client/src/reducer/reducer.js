import {
  GET_RECIPES,
  GET_RECIPE_DETAIL,
  REMOVE_INGREDIENT,
  ADD_INGREDIENT,
  FILTER_DIET,
  FILTER_CREATED,
  ORDER_BY_TITLE,
  ORDER_BY_SCORE,
  GET_TYPES,
  ADD_RECIPE,
  REMOVE_RECIPE,
} from "../actions";

const initialState = {
  recipesLoaded: [],
  allRecipes: [],
  favoriteRecipes: [],
  recipeDetail: "",
  ingredients: [],
  types: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipesLoaded: action.payload,
        allRecipes: action.payload,
      };
    case REMOVE_RECIPE:
      return {
        ...state,
      };
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case ADD_RECIPE:
      return {
        ...state,
      };
    case GET_RECIPE_DETAIL:
      return {
        ...state,
        recipeDetail: action.payload,
      };
    case FILTER_DIET:
      const allRecipes = state.allRecipes;
      const filteredDiet = [];

      allRecipes.map((recipe) => {
        return recipe.Diets?.map((diet) => {
          console.log(diet.name.toLowerCase(), action.payload.toLowerCase());
          return diet.name.toLowerCase() === action.payload.toLowerCase()
            ? filteredDiet.push(recipe)
            : null;
        });
      });
      return {
        ...state,
        recipesLoaded: filteredDiet,
      };
    case FILTER_CREATED:
      const allRecipes2 = state.allRecipes;
      const filteredCreated =
        action.payload === "Created"
          ? allRecipes2.filter((recipe) => recipe.created)
          : allRecipes2.filter((recipe) => !recipe.created);
      return {
        ...state,
        recipesLoaded:
          action.payload === "All" ? state.allRecipes : filteredCreated,
      };
    case ORDER_BY_TITLE:
      let sortedRecipes =
        action.payload === "Asc"
          ? state.recipesLoaded.sort(function (a, b) {
            if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
            else if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
            return 0;
          })
          : state.recipesLoaded.sort(function (a, b) {
            if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
            else if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
            return 0;
          });
      return {
        ...state,
        recipesLoaded: sortedRecipes,
      };
    case ORDER_BY_SCORE:
      let sortedRecipesScore =
        action.payload === "Asc"
          ? state.recipesLoaded.sort(function (a, b) {
            if (a.score > b.score) return 1;
            else if (a.score < b.score) return -1;
            return 0;
          })
          : state.recipesLoaded.sort(function (a, b) {
            if (a.score > b.score) return -1;
            else if (a.score < b.score) return 1;
            return 0;
          });
      return {
        ...state,
        recipesLoaded: sortedRecipesScore,
      };


    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [action.payload, ...state.ingredients],
      };
    case REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((i) => i.id !== action.payload),
      };

    default:
      return state;
  }
}
