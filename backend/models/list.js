'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.company,{foreignKey:'list_id'})
      this.belongsToMany(models.user,{through:'user_list',as:'lists_user',foreignKey:'list_id'})
    }
  };
  list.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'list',
    freezeTableName:true,
    timestamps:false,
  });
  return list;
};