'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user_list.init({
    list_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'user_list',
    timestamps:false,
    freezeTableName:true,
  });
  return user_list;
};