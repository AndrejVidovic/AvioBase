const {sequelize} =require('../models');

module.exports={
CheckingDatabaseConnection: async function (logger){
    logger.info("Connecting to the database...")
    try{
        await sequelize.authenticate();
        logger.info("Database connected!");
    }
    catch(error)
    {
        logger.log("Unable to connect to the database!");
        process.exit(1);
    }
}
}