const dotenv=require('dotenv');
const envFound=dotenv.config();
if(envFound.error){
  throw new Error("Could not find env file!");
}
module.exports={
  port:process.env.PORT,
  database_url:process.env.DATABASE_URL,
  api:process.env.ROOT,
  roles:{
    admin:process.env.ADMIN,
    subadmin:process.env.SUBADMIN,
  },
  expressSecret:process.env.SECRET,
  rounds:parseInt(process.env.ROUNDS), 

  
}