/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */

const { Diet } = require('../db');

let dietId = 0;

const diets = [
  {
    name: 'Gluten free',
    id: ++dietId,
  },

  {
    name: 'Ketogenic',
    id: ++dietId,
  },

  {
    name: 'Vegetarian',
    id: ++dietId,
  },

  {
    name: 'Lacto-vegetarian',
    id: ++dietId,
  },

  {
    name: 'Ovo-vegetarian',
    id: ++dietId,
  },

  {
    name: 'Vegan',
    id: ++dietId,
  },

  {
    name: 'Pescatarian',
    id: ++dietId,
  },

  {
    name: 'Paleolithic',
    id: ++dietId,
  },

  {
    name: 'Primal',
    id: ++dietId,
  },

  {
    name: 'Whole 30',
    id: ++dietId,
  },

  {
    name: 'Dairy free',
    id: ++dietId,
  },

  {
    name: 'Lacto ovo vegetarian',
    id: ++dietId,
  },
];

const getTypes = async (req, res, next) => {
  try {
    const response = await Diet.findAll();

    if (response.length > 0) {
      return res.status(200).json(response);
    }

    try {
      const dietsOnDB = await Diet.bulkCreate(diets);

      return res.status(200).json(dietsOnDB);
    } catch {
      (err) => next(err);
    }
  } catch {
    (err) => next(err);
  }
};

module.exports = {
  getTypes,
};
