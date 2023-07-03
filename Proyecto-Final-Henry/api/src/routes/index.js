const express = require('express');
// Importar todos los routers;
const RouteRecipes = require('./Recipes.js');
const RouteTypes = require('./Types.js');
const RouteRecipe = require('./Recipe.js');

const router = express.Router();

router.use('/recipes', RouteRecipes);
router.use('/types', RouteTypes);
router.use('/recipe', RouteRecipe);

module.exports = router;
