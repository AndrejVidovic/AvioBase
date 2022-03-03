const {Company_instance}=require('../../services');
const {nodelogger}=require('../../loaders/logger');
module.exports={
    //izlist svih kompanija
    GetAllCompany:async(req,res,next)=>{
        try{
            var companies=await Company_instance.GetAll();
            res.json(companies);
        }
        catch(error){
            nodelogger.info("Error in getting all companies"+error);
            next(error);
        }
    },
    //izlist kompanija po određenoj listi(u data gridu da se prikazu)
    GetCompanyForList:async(req,res,next)=>{
        try{
            
            var companies=await Company_instance.GetForList(req.params.list_id);
            res.json(companies);
        }
        catch(error){
            nodelogger.error("Error in getting companies for List"+error);
            next(error);
        }
       
    },
    //izlist samo trazene kompanije(kada je odaberemo u listi da ju prikazemo)
    GetCompany:async(req,res,next)=>{
        try{
            nodelogger.info("parametar: "+req.params.company_id);
            var company=await Company_instance.GetSelectedCompany(req.params.company_id);
            res.json(company);
        }
        catch(error){
            nodelogger.error("Error in getting company"+error);
            next(error);
        }
    },
    //izlist kompanija po odredenom adminu(tribas dodat i za listu jer si vec napravia liste za odredenog admina)
    GetCompanyForAdmin:async(req,res,next)=>{
        try{
            nodelogger.info("parametar id od admina: "+req.session.user);
            var companies=await Company_instance.GetCompanyAdmin(req.session.user);
            res.json(companies);
        }
        catch(error){
            nodelogger.error("Error in getting companies for admin"+" "+error);
            next(error);
        }
    },
    //dodavanje kompanija
    InsertCompany:async(req,res,next)=>{
        try{
            const user_id=req.session.user;
            nodelogger.info("postavljanje parametara id"+req.session.user);
            await Company_instance.addCompany(req.body,user_id);
            res.json(200);
        }
        catch(error){
            nodelogger.error("Error in adding company into database!"+error);
            next(error);
        }
    },
    //brisanje kompanije
    CompanyDelete:async(req,res,next)=>{
        try{
            await Company_instance.deleteCompany(req.params.company_id);
            res.json(200);
        }
        catch(error){
            nodelogger.error("Error in deleting company!");
            next(error);
        }
    },
    //update kompanije
    UpdateCompany:async(req,res,next)=>{
        try{
            await Company_instance.updateCompany(req.body);
            res.json(200);
        }
        catch(error){
            nodelogger.error("Error in updating company!");
            next(error);
        }
    }

}