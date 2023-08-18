'use strict';
const {
  Model
} = require('sequelize');

const {TRANSACTION_TYPE} = require('../consts/')
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init({
    title: DataTypes.STRING,
    amount: DataTypes.NUMBER,
    expense_type: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Transaction',
  });
  return Transaction;
};