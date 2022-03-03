'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class aircraft extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.type,{foreignKey:'type_id'})
    }
  };
  aircraft.init({
    registration: DataTypes.STRING,
    name: DataTypes.STRING,
    old: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'aircraft',
    freezeTableName:true,
    timestamps:false,
  });
  return aircraft;
};