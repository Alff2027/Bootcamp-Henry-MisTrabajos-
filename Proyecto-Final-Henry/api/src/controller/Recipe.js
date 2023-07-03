/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */

const { v4: uuidv4 } = require('uuid');
const { Recipe, Diet } = require('../db');

const addRecipe = async (req, res, next) => {
  const {
    title,
    summary,
    score,
    healthScore,
    image,
    steps,
    diets,
  } = req.body;

  if (!title || !summary) {
    return res
      .status(400)
      .send('Debes ingresar un titulo y su descripcion');
  }

  try {
    const newRecipe = await Recipe.create({
      id: uuidv4(),
      created: true,
      title,
      summary,
      score: score || 'No hay puntaje',
      healthScore: healthScore || 'No hay puntaje saludable',
      steps: steps || 'Esta receta no tiene paso a paso',
      image: image || 'https://aeroclub-issoire.fr/wp-content/uploads/2020/05/image-not-found-300x225.jpg',
    });

    if (diets.length) {
      diets.map(async (diet) => {
        try {
          const dietDB = await Diet.findOne({
            where: {
              name: diet,
            },
          });
          newRecipe.addDiet(dietDB);
        } catch {
          console.error('No se creó la nueva receta');
          (err) => next(err);
        }
      });
    }
    res
      .status(201)
      .json({
        message: 'Receta creada con exito!',
      });
  } catch {
    (err) => {
      console.log('No se ha podido crear la receta');
      next(err);
    };
  }
};

module.exports = {
  addRecipe,
};
