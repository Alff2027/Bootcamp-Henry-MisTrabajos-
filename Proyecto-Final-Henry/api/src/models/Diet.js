/* eslint-disable linebreak-style */
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Diet extends Model { }

  Diet.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'diet',
  });
};
