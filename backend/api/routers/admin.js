const express=require('express');
const admin=express.Router();
const {auth_admin, auth_user, auth_subadmin}=require('../controlers/authentication');
module.exports=function(main_ruter){
    main_ruter.use('/',admin);
    admin.get('/admin/:role',auth_subadmin,(req,res)=>{
        res.send("Welcome user")
    });
}