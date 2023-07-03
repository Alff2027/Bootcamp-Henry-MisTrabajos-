/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();

const { addRecipe } = require('../controller/Recipe');

router.post('/', addRecipe);

module.exports = router;
