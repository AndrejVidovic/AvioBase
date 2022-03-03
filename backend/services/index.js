const models=require('../models');
const {nodelogger}=require('../loaders/logger');
const listService=require('./list_services');
const companyService=require('./company_services');
const typeService=require('./type_services');
const aircraftService=require('./aircraft_services');
const userService=require('./user_services');
const sessionService=require('./session_services');
const loginService=require('./login_services');

const list_instance=new listService(nodelogger,models.list,models.user_list,models.user);
const company_instance=new companyService(nodelogger,models.company,models.list);
const type_instance=new typeService(nodelogger,models.company,models.type,models.aircraft);
const aircraft_instance=new aircraftService(nodelogger,models.type,models.aircraft,models.company);
const user_instance=new userService(nodelogger,models.user,models.list,models.user_list);
const session_instance=new sessionService(nodelogger,models.session);
const login_instance=new loginService(nodelogger,models.user);
module.exports={
    List_instance:list_instance,
    Company_instance:company_instance,
    Type_instance:type_instance,
    Aircraft_instance:aircraft_instance,
    User_instance:user_instance,
    Session_instance:session_instance,
    Login_instance:login_instance,
}