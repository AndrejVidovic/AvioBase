const {CheckingDatabaseConnection}=require('./sequelize');
const expr=require('./express');
const {httplogger,nodelogger}=require('./logger');
module.exports={
    load: async function(app){
        try{
            await CheckingDatabaseConnection(nodelogger);
            nodelogger.info("Database succesfully loaded!");
            try{
                await expr(app);
                nodelogger.info("Express loaded!");
            }
            catch(error){
                nodelogger.error("Express is not loaded!");
                throw (new Error());
            }
        }
        catch(error){
            nodelogger.error("Loaders not loaded correctly!");
            throw (new Error());
        }
    }
}
