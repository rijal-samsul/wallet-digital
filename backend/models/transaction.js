'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.wallet, {
        as: "sender",
        foreignKey:{
          name: "idSender",
        },
      });

      transaction.belongsTo(models.wallet, {
        as: "receiver",
        foreignKey:{
          name:"idReceiver",
        }
      })
    }
  }
  transaction.init({
    idSender: DataTypes.INTEGER,
    nominal: DataTypes.INTEGER,
    idReceiver: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};