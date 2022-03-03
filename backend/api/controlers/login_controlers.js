const{nodelogger}=require('../../loaders/logger');
const {Login_instance, Session_instance}=require('../../services');
const bcrypt = require("bcrypt");
const config = require('../../config');
module.exports={
    login:async(req,res,next)=>{
        try{
            const {username,password}=req.body;
            let user=await Login_instance.GetUser(username);
            if(user&&await bcrypt.compare(password,user.password))
            {
                req.session.user=user.id;
                req.session.role=user.role;
                nodelogger.info("postavili smo user id " +req.session.user+ " i rolu " +req.session.role);
                try{
                    await Session_instance.CreateSession(user.id);
                }
                catch(error){
                    next(error);
                }
                if(user.role==config.roles.admin){
                    nodelogger.info("Admin successful logged!");
                    res.json({role:config.roles.admin})
                }
                else {
                    nodelogger.info("Subadmin successful logged!");
                    res.json({role:config.roles.subadmin})
                }
            }
            else throw(new Error("Something is wrong in username or in password!"));
        }
        catch(error){
            nodelogger.error("Error in login!");
            next(error);
        }
    },
    logout:async(req,res,next)=>{
        try{
            nodelogger.info("provjera jeli radi sesija (trazimo id)"+req.session.user);
            await Session_instance.Logout(req.session.user);
            res.clearCookie('user_sid');
            req.session.destroy();
            res.json(200);
        }
        catch(error){
            nodelogger.error("Error in logout!");
            next(error);
        }
    },
    restoreSession:async(req,res,next)=>{
       try{
            if(req.session.user){
                let user=Login_instance.GetUserbyId(req.session.user)
                if(user){
                    res.status(200).send("still logged in!");
                }
                else{
                    res.status(403).send("Not logged in");
                }
            }
       }
       catch(error){
            nodelogger.error("Error in restoreSession function"+error);
            next(error);
       }    
    }
}