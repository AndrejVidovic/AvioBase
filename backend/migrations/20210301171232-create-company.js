'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('company', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      ICAO: {
        type: Sequelize.STRING
      },
      IATA: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      baseHub: {
        type: Sequelize.STRING
      },
      founded: {
        type: Sequelize.DATE
      },
      numOfAircraft:{
        type: Sequelize.INTEGER
      },
      imgPath:{
        type:Sequelize.STRING,
      },
      logoPath:{
        type:Sequelize.STRING,
      }

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('company');
  }
};