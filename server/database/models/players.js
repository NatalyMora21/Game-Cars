  
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Players extends Model {}
Players.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    gamewon: DataTypes.STRING,
}, {
    sequelize,
    modelName: "players"
});

module.exports = Players;