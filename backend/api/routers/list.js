const express=require('express');
const { auth_user, auth_admin } = require('../controlers/authentication');
const list=express.Router();
const list_controlers=require('../controlers/list_controlers');
const shema=require('../scheme/list_sheme');
const ShemaValidator=require('../scheme/validator');
ShemaValidator.addSchemas(shema);
module.exports=function (main_ruter){
    main_ruter.use('/',list);
    list.get('/list',list_controlers.GetListFor);
    //list.get('/list/admin',auth_user,list_controlers.GetAdminList);//admin i subadmin--OVO NE KORISTIMO
    list.post('/list/addList',auth_admin,ShemaValidator.validate('addList'),list_controlers.AddNewList);//admin
    

}