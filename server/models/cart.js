'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Cart.init({
    id: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    rank: DataTypes.STRING,
    symbol: DataTypes.STRING,
    name: DataTypes.STRING,
    supply: DataTypes.STRING,
    maxSupply: DataTypes.STRING,
    marketCapUsd: DataTypes.STRING,
    volumeUsd24Hr: DataTypes.STRING,
    priceUsd: DataTypes.STRING,
    changePercent24Hr: DataTypes.STRING,
    vwap24Hr: DataTypes.STRING,
    explorer: DataTypes.STRING,
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    },
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};