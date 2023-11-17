const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model { }

// create fields/columns for Comment model. Keeping it simple with just a content column. 
Comment.init(
    {
        content: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize
    }
);

module.exports = Comment; 