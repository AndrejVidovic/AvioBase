const { sequelize,} = require("./models");

// dodatne stvarcice za provjeru jeli sve radi okej
const listService=require('./services/list_services');
const companyService=require('./services/company_services');
const typeService=require('./services/type_services');
const aircraftService=require('./services/aircraft_services');
const userService=require('./services/user_services');
const sessionService=require('./services/session_services');
const loginService=require('./services/login_services');

const models=require('./models');
const {nodelogger}=require('./loaders/logger');
const list_instance=new listService(nodelogger,models.list,models.user_list,models.user);
const company_instance=new companyService(nodelogger,models.company,models.list);
const type_instance=new typeService(nodelogger,models.company,models.type,models.aircraft);
const aircraft_instance=new aircraftService(nodelogger,models.type,models.aircraft,models.company);
const user_instance=new userService(nodelogger,models.user,models.list);
const session_instance=new sessionService(nodelogger,models.session);
const login_instance=new loginService(nodelogger,models.user);

async function assertDatabaseConnectionOk(){
    console.log("Connecting to the database...");
    try{
        await sequelize.authenticate();
        console.log("Connected to database");
    }
    catch(error){
        console.log("Error in connecting to the database" + error);
        process.exit(1);
    }
}

async function init() {
  //await assertDatabaseConnectionOk();
  try{
      //const x=await list_instance.GetList();
      //console.log(JSON.stringify(x));
      
  }
  catch (error) {
    console.log('Greska u izvodenju:'+' '+ error);
    }
}
init();