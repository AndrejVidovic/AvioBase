'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user_list',[
      {
        user_id:1,
        list_id:1,     
      },
      {
        user_id:1,
        list_id:2,     
      },
      {
        user_id:2,
        list_id:3,      
      },
      {
        user_id:2,
        list_id:1,         
      },
    ])
    },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_list', null, {});
  }
};
