'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('type',[
      {
        type:"A320",
        manufacturer:"Airbus",
        company_id:1,      
      },
      {
        type:"A320",
        manufacturer:"Airbus",
        company_id:2,      
      },
      {
        type:"A350",
        manufacturer:"Airbus",
        company_id:2,         
      },
      {
        type:"A350",
        manufacturer:"Airbus",
        company_id:3,         
      },
      {
        type:"A380",
        manufacturer:"Airbus",
        company_id:3,   
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('type', null, {});
  }
};
