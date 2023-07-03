/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable radix */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
require('dotenv').config();
const { axios } = require('axios');

const { API_KEY } = process.env;
const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');
const { Recipe, Diet } = require('../db');

const APIcall = async () => {
  try {
    const recipeApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`,
    );
    const requiredInfo = recipeApi.data.results.map((recipe) => ({
      title: recipe.title,
      created: false,
      Diets: recipe.diets.map((diet) => ({ name: diet })),
      healthScore: recipe.healthScore,
      summary: recipe.summary.replace(/<[^>]*>?/g, ''),
      image: recipe.image,
      id: uuidv4(),
      score: parseInt(recipe.spoonacularScore),
      steps: recipe.analyzedInstructions
        .map((r) => r.steps.map((s) => s.step))
        .flat(2)
        .join(''),
    }));
    return requiredInfo;
  } catch {
    console.log('Error en el llamado a la API');

    (e) => console.log(e);
  }
};

const getRecipes = async (req, res, next) => {
  const { name } = req.query;

  if (!name) {
    const allRecipesOnDB = await Recipe.findAll({
      include: {
        model: Diet,
        through: {
          attributes: [],
        },
      },
    });

    if (allRecipesOnDB.length > 0) {
      return res
        .status(200)
        .send(allRecipesOnDB);
    }

    try {
      const requiredInfo = await APIcall();
      const recipesBulk = await Recipe.bulkCreate(requiredInfo);

      recipesBulk.map((recipe) => {
        requiredInfo.map((r) => {
          if (r.id === recipe.id && r.Diets.length) {
            r.Diets.map(async (diet) => {
              try {
                diet.name = `${diet.name.charAt(0).toUpperCase()} ${diet.name.slice(1)}`;

                const dietOnDB = await Diet.findOne({
                  where: {
                    name: diet.name,
                  },
                });

                await recipe.addDiet(dietOnDB);
              } catch {
                console.log('La dieta no se ha asociado');
                (err) => next(err);
              }
            });
          }
        });
      });

      const AllrecipesOnBD = await Recipe.findAll({
        include: {
          model: Diet,
          through: {
            attributes: [],
          },
        },
      });

      return res
        .status(200)
        .send(AllrecipesOnBD);
    } catch (err) {
      console.log('No se ha podido crear y obtener las recetas');

      next(err);
    }
  } else {
    const query = name.toLowerCase();

    try {
      const FilterRecipes = await Recipe.findAll({
        where: {
          title: {
            [Op.like]: `%${query}%`,
          },
        },
        include: {
          model: Diet,
          through: {
            attributes: [],
          },
        },
      });

      return res
        .status(200)
        .send(FilterRecipes);
    } catch {
      console.log('Error al filtrar');
      (err) => next(err);
    }
  }
};

const getRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findByPK(id, {
      include: {
        model: Diet,
        through: {
          attributes: [],
        },
      },
    });

    if (recipe) {
      return res.status(200).json(recipe);
    }

    return res.status(404).json({
      error: 'No se ha encontrado la receta',
    });
  } catch {
    (err) => next(err);
  }
};

const deleteRecipe = async (req, res, next) => {
  const { id } = req.params;

  try {
    await Recipe.destroy({
      where: {
        id,
      },
    });

    return res.send('Receta borrada con exito!');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getRecipes,
  getRecipeById,
  deleteRecipe,
};
