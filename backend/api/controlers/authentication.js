const config = require("../../config");
const { nodelogger } = require("../../loaders/logger");
module.exports={
    auth_admin:(req,res,next)=>{
        if(!req.session.user){
            res.sendStatus(401);
        }
        else{
            if(req.session.role!=parseInt(config.roles.admin))
                res.sendStatus(404);
            else next();
        }
       
    },
    auth_subadmin:(req,res,next)=>{
        if(!req.session.user){
            res.sendStatus(401);
        }
        else{
            if(req.session.role!=parseInt(config.roles.subadmin))
                res.sendStatus(404);
            else next();
        }
        
    },
    auth_user:(req,res,next)=>{
        nodelogger.info("U autentikaciji id od usera je"+req.session.user);
        if(!req.session.user)
            res.sendStatus(401).json({role:null});
        else next();
    }

}