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
      this.hasMany(models.session,{foreignKey:'user_id'})
      this.hasMany(models.company,{foreignKey:'user_id'})
      this.belongsToMany(models.list,{through:'user_list', as:'users_list',foreignKey:'user_id'})
    }
  };
  user.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email:DataTypes.STRING,
    role: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'user',
    timestamps:false,
    freezeTableName:true,
  });
  return user;
};