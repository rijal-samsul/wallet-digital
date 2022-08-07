'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasOne(models.wallet, {
        as: "wallet",
        foreignKey:{
          name:"idUser",
        },
      });

      user.hasMany(models.transaction, {
        as: "senderTransaction",
        foreignKey:{
          name: "idSender",
        },
      });

      user.hasMany(models.transaction, {
        as:"receiverTransaction",
        foreignKey:{
          name:"idReceiver",
        },
      });
    }
  }
  user.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};