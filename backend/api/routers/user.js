const express=require('express');
const { auth_admin, auth_user } = require('../controlers/authentication');
const user=express.Router();
const user_controlers=require('../controlers/user_controlers');
const shema=require('../scheme/user_scheme');
const ShemaValidator=require('../scheme/validator');
ShemaValidator.addSchemas(shema);
module.exports=function(main_ruter){
    main_ruter.use('/',user);
    user.get('/users',user_controlers.GetAll);
    //user.get('/users/list/:list_id',auth_user,user_controlers.GetListUsers);//admin i subadmin--OVO NE KORISTIMO
    //user.get('/users/role/:role_id',auth_user,user_controlers.GetRoleUsers);//admin i subadmin--OVO NE KORISTIMO
    user.post('/users/addUser',auth_admin,ShemaValidator.validate('addUser'),user_controlers.insertUser);//admin
}
