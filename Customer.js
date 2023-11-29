const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class Customer extends Model {}

Customer.init({
    customerfirstname:{
        type: DataTypes.STRING
    },
    customerlastname: {
        type: DataTypes.STRING
    },
    customeremail: {
        type: DataTypes.STRING
    },
    customerage:{
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    modelName: 'customer',
    timestamps: false
})

module.exports = Customer;