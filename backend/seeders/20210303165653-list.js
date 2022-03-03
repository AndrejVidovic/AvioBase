'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('list',[
      {
        name:"P",       
      },
      {
        name:"B",       
      },
      {
        name:"A", 
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('list', null, {});
     
  }
};
