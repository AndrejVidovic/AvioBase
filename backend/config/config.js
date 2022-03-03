const dotenv=require('dotenv');
const envFound=dotenv.config();
if(envFound.error){
  throw new Error("Could not find env file!");
}
const {nodelogger}=require('../loaders/logger');

module.exports = {
  development: {
    use_env_variable: "DATABASE_URL",
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    logging: (msg)=>nodelogger.info(`node logger: ${msg}`),
  },
  production: {
    use_env_variable: "DATABASE_URL",
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    logging: (msg)=>nodelogger.info(`node logger: ${msg}`),
  },
};
