const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// using JawsDB for Heroku deployment, otherwise use local MySQL. 
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL)
} else {
    // db information in .env file
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PW, {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        }
    );
}

module.exports = sequelize;