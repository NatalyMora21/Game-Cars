  
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Scoreplayers extends Model {}
Scoreplayers.init({
    score: DataTypes.STRING,
    career: DataTypes.INTEGER,

}, {
    sequelize,
    modelName: "scoreplayers"
});

module.exports = Scoreplayers;