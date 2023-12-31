const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bycrpt = require('bcrypt');

// create our User model
class User extends Model {
    // set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
        return bycrpt.compareSync(loginPw, this.password);
    }
}

// define table columns and configuration
User.init (
    {
        id: {
            // use the special Sequelize DataTypes object provide what type of data it is
            type: DataTypes.INTEGER,
            // this is the equivalent of SQL's 'NOT NULL' option
            allowNull: false,
            // instruct that this is the Primary Key
            primaryKey: true,
            // turn on auto increment
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
             type: DataTypes.STRING,
             allowNull: false,
                validate: {
                    // this means the password must be at least four characters long
                    len: [4]
                }
        }
    },
    {
        hooks: {
            // set up beforeCreate hook functionality. Using bycrpt to hash the password before it is stored in the database upon first creation. 
            async beforeCreate(newUserData) {
                newUserData.password = await bycrpt.hash(newUserData.password, 10);
                return newUserData;
            },
            // set up beforeUpdate hook functionality. Functions similar to beforeCreate, but is used to hash the password when a user updates their password.
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bycrpt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        // pass in our imported sequelize connection (the direct connection to our database)
        sequelize,
        // don't automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'User'
    }   
);

module.exports = User;
