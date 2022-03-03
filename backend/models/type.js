'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.company,{foreignKey:'company_id'})
      this.hasMany(models.aircraft,{foreignKey:'type_id'})
    }
  };
  type.init({
    type: DataTypes.STRING,
    manufacturer: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'type',
    timestamps:false,
    freezeTableName:true,
  });
  return type;
};