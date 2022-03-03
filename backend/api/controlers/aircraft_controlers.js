const{nodelogger}=require('../../loaders/logger');
const {Aircraft_instance}=require('../../services')
module.exports={
    //dohvat svih aviona
    GetAllAircraft:async(req,res,next)=>{
        try{
            var aircraft=await Aircraft_instance.GetAll();
            nodelogger.info("Getting all aircrafts...");
            res.json(aircraft);
        }
        catch(error){
            nodelogger.error("Error in getting all aircrafts!");
            next(error);
        }
    },
    //dohvat aviona i tia za kompaniju
    GetAircraftAndType:async(req,res,next)=>{
        try{
            var aircraft=await Aircraft_instance.GetAllForType(req.params.company_id);
            nodelogger.info("Getting all aircrafts for type...");
            res.json(aircraft);
        }
        catch(error){
            nodelogger.error("Error in getting all aircrafts for type!");
            next(error);
        }
    },
    //unesi novi avion
    insertAircraft:async(req,res,next)=>{
        try{
            await Aircraft_instance.addAircraft(req.body);
            res.json(200);
        }
        catch(error){
            nodelogger.error("Error in adding aircraft into database!");
            next(error);
        }
    },
    //izbrisi avion
    aircraftDelete:async(req,res,next)=>{
        try{
            await Aircraft_instance.deleteAircraft(req.params.aircraft_id);
            nodelogger.info("Deleting aircraft from database...");
            res.json(200);
        }
        catch(error){
            nodelogger.error("Error in deleting aircraft from database!");
            next(error);
        }
    }
}