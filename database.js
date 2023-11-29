const { Sequelize } = require('sequelize');

const sequelize = new Sequelize ('customer-db', 'user', 'pass', {
    dialect: 'sqlite',
    storage: './customerdatabase.sqlite'
})

module.exports = sequelize;