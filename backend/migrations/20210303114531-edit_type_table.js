'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   return Promise.all([queryInterface.addColumn(
    "type",
    "manufacturer",{
      type:Sequelize.STRING
    },
   
  )]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([ queryInterface.removeColumn(
      "type",
      "manufacturer"
    )])
  },
};
