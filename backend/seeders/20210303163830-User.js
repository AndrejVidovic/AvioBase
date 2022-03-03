'use strict';
const bcrypt = require("bcrypt");
const config=require('../config');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    const sol=await bcrypt.genSalt(config.rounds);
    const hashedPassword=await bcrypt.hash("proba",sol);
    await queryInterface.bulkInsert('user',[
      {
        name:"Admin",
        surname:"Admin",
        username:"Admin",
        password:hashedPassword,
        email:"admin@gmail.com",
        role:1,
        created_at:"2020/05/23"
      },
      {
        name:"Subadmin",
        surname:"Subadmin",
        username:"Subadmin",
        password:hashedPassword,
        email:"Subadmin@hotmail.com",
        role:2,
        created_at:"2020/01/20"
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user',null,{})
  }
};
