'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.food, {
        foreignKey: `id_food`, as: `food`
      })
      this.belongsTo(models.order_list, {
        foreignKey: `id_order_list`, as: `order_list`
      })
    }
  }
  order_detail.init({
    id_order_detail: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    id_order_list: DataTypes.INTEGER,
    id_food: DataTypes.INTEGER,
    jumlah: DataTypes.INTEGER,
    price: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'order_detail',
  });
  return order_detail;
};