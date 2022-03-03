const {List_instance}=require('../../services');
const {nodelogger}=require('../../loaders/logger');
module.exports={
    //dohvacanje liste za usera + dohvaceno i za dodavanje nove jer mi tribaju sve upisane
    GetListFor:async(req,res,next)=>{
        try{
           var list=await List_instance.GetList();
           res.json(list);
        }
        catch(error){
            nodelogger.info("Error in getting list");
            next(error)
        }
    },
    //dohvat liste za odredenog admina
    GetAdminList:async(req,res,next)=>{
        try{
            nodelogger.info("parameta za unos liste tj admin id"+req.session.user)
            var list=await List_instance.GetListForAdmin(req.session.user);
            res.json(list);
        }
        catch(error){
            nodelogger.error("Error in getting list for admin"+req.session.user);
            next(error);
        }
    },
    //post metoda za dodavanje liste
    AddNewList:async(req,res,next)=>{
        try{
            const user_id=req.session.user;
            nodelogger.info("proba sesije"+req.session.user);
            await List_instance.addList(req.body,user_id);
            res.sendStatus(200)
           
        }
        catch(error){
            nodelogger.error("Error in adding list into database!");
            throw(error);
        }
    }
}