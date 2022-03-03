const express=require('express');
const login=express.Router();
const login_controlers=require('../controlers/login_controlers');
const shema=require('../scheme/login_sheme');
const ShemaValidator=require('../scheme/validator');
ShemaValidator.addSchemas(shema);
module.exports=function(main_ruter){
    main_ruter.use('/',login);
    login.post('/login',ShemaValidator.validate('login') ,login_controlers.login);
    login.get('/logout',login_controlers.logout);
}