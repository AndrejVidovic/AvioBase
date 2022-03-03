const{nodelogger}=require('../../loaders/logger');
const {Type_instance}=require('../../services');
module.exports={
    //dohvat svih tipova
    GetAllTypes:async(req,res,next)=>{
        try{
            var types=await Type_instance.GetAll();
            res.json(types);
        }
        catch(error){
            nodelogger.error("Error in getting all types!");
            next(error);
        }
    },
    //dohvat tipova za odredenu kompaniju
    GetTypesForCompany:async(req,res,next)=>{
        try{
            var types=await Type_instance.GetCompanyType(req.params.company_id);
            nodelogger.info("Getting types for company...");
            res.json(types);
        }
        catch(error){
            nodelogger.error("Error in getting types for company!");
            next(error);
        }
    },
    //dohvat svih tipova i imena kompanije
    GetAllTypesAndCompanies:async(req,res,next)=>{
        try{
            var types=await Type_instance.GetCompanyNameAndType();
            nodelogger.info("Getting types and companies");
            res.json(types);
        }
        catch(error){
            nodelogger.error("Error in getting types and companies!");
            next(error);
        }
    },
    //unos novog tipa aviona
    insertType:async(req,res,next)=>{
        try{
            await Type_instance.addType(req.body);
            res.json(200);
        }
        catch(error){
            nodelogger.error("Error in adding type into database");
            next(error);
        }
    },
    typeDelete:async(req,res,next)=>{
        try{
            await Type_instance.deleteType(req.params.type_id);
            res.json(200);
        }
        catch(error){
            nodelogger.error("Error in deleting type!");
            next(error);
        }
    }
}