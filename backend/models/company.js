'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user,{foreignKey:'user_id'})
      this.hasMany(models.type,{foreignKey:'company_id'})
      this.belongsTo(models.list,{foreignKey:'list_id'})
    }
  };
  company.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    ICAO: DataTypes.STRING,
    IATA: DataTypes.STRING,
    country: DataTypes.STRING,
    baseHub: DataTypes.STRING,
    founded: DataTypes.DATE,
    numOfAircraft: DataTypes.INTEGER,
    imgPath:DataTypes.STRING,
    logoPath:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'company',
    timestamps:false,
    freezeTableName:true,
  });
  return company;
};