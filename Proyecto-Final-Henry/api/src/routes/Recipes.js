/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();

const {
  getRecipes,
  getRecipeById,
  deleteRecipe,
} = require('../controller/Recipes');

router.get('/', getRecipes);

router.get('/:id', getRecipeById);

router.delete('/:id', deleteRecipe);

module.exports = router;
