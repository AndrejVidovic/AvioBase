const {nodelogger}=require('../../loaders/logger');
const {User_instance}=require('../../services');
module.exports={
    //dohvat svih usera
    GetAll:async(req,res,next)=>{
        try{
            var users=await User_instance.GetAllUsers();
            res.json(users);
        }
        catch(error){
            nodelogger.error("Error in getting all users!");
            next(error);
        }
    },
    //dohvat usera za  odredenu rolu
    GetRoleUsers:async(req,res,next)=>{
        try{
            var users=await User_instance.GetUsersForRole(req.params.role_id);
            res.json(users);
        }
        catch(error){
            nodelogger.error("Error in getting all users for role!");
            next(error);
        }
    },
    //dohvat admina za odredenu listu
    GetListUsers:async(req,res,next)=>{
        try{
            var users=await User_instance.GetAdminsLists(req.params.list_id);
            res.json(users);
        }
        catch(error){
            nodelogger.error("Error in getting all users for list!");
            next(error);
        }
    },
    //dodavanje korisnika
    insertUser:async(req,res,next)=>{
        try{
            await User_instance.addUser(req.body);
            res.json(200);
        }
        catch(error){
            nodelogger.error("Error in adding new user!");
            next(error);
        }
    }
}