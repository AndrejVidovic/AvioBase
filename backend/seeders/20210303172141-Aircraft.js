'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('aircraft',[
    {
      name:"A320-277",
      registration:"AE-320",
      old:17.5,
      type_id:1,      
    },
    {
      name:"A320-280",
      registration:"A3-330",
      old:5,
      type_id:2,       
    },
    {
      name:"A350-300",
      registration:"AE-350",
      old:5.5,
      type_id:3,        
    },
    {
      name:"A350-277",
      registration:"BE-488",
      old:1,
      type_id:4,          
    },
    {
      name:"A380-278",
      registration:"BE-320",
      old:2,
      type_id:5,   
    },
  ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('aircraft', null, {});
  }
};
