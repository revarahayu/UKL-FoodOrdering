'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.order_detail, {
        foreignKey: `id_order_list`, as: `order_detail`
      })
    }
  }
  order_list.init({
    id_order_list: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    customer_name: DataTypes.STRING,
    table_number: DataTypes.STRING,
    order_date: DataTypes.DATE,
    status: DataTypes.ENUM('belum_bayar', 'lunas')
  }, {
    sequelize,
    modelName: 'order_list',
  });
  return order_list;
};