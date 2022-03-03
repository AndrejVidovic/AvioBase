'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('company',[
    {
      name:"Aer Lingus",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      ICAO:"EIN",
      IATA:"EI",
      country:"Ireland",
      baseHub:"Dublin",
      founded:"1988/07/27",
      numOfAircraft:1,
      imgPath:"https://restcountries.eu/data/irl.svg",
      logoPath:"https://content.airhex.com/content/logos/airlines_EIN_350_100_r.png",
      user_id:1,
      list_id:3
    },
    {
      name:"Aegean airlines",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      ICAO:"AEE",
      IATA:"A3",
      country:"Greece",
      baseHub:"Atena",
      founded:"2000/02/20",
      numOfAircraft:2,
      imgPath:"https://restcountries.eu/data/grc.svg",
      logoPath:"https://content.airhex.com/content/logos/airlines_AEE_350_100_r.png",
      user_id:1,
      list_id:3
    },
    {
      name:"Belavia",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      ICAO:"BRU",
      IATA:"B2",
      country:"Belarus",
      baseHub:"Minsk",
      founded:"1999/01/30",
      numOfAircraft:2,
      imgPath:"https://restcountries.eu/data/blr.svg",
      logoPath:"https://content.airhex.com/content/logos/airlines_BRU_350_100_r.png",
      user_id:2,
      list_id:2
    },
    {
      name:"Pegasus airlines",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      ICAO:"PGT",
      IATA:"PC",
      country:"Turkey",
      baseHub:"Istanbul",
      founded:"1955/08/01",
      numOfAircraft:0,
      imgPath:"https://restcountries.eu/data/tur.svg",
      logoPath:"https://content.airhex.com/content/logos/airlines_PGT_350_100_r.png",
      user_id:3,
      list_id:1
    },
  ])
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('company', null, {});
  }
};
