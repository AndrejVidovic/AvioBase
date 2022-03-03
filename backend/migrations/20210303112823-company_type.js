'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([queryInterface.addColumn(
      "type",// name of the Source model/table
      "company_id",// name of the key to be added
      {
        type:Sequelize.INTEGER,
        references:{
          model:"company",
          key:"id",
        },
        onUpdate:"CASCADE",
        onDelete:"CASCADE",
      } 
      
    )])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      "type", // name of Source model
      "company_id" // key we want to remove
    );
  }
};
