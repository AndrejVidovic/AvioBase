const express=require('express');
const { auth_user } = require('../controlers/authentication');
const type=express.Router();
const type_controlers=require('../controlers/type_controlers');
const shema=require('../scheme/type_sheme');
const ShemaValidator=require('../scheme/validator');
ShemaValidator.addSchemas(shema);
module.exports= function(main_ruter){
    main_ruter.use('/',type);
    type.get('/type',type_controlers.GetAllTypes);
    //type.get('/type/company/:company_id',type_controlers.GetTypesForCompany);
    type.get('/type/companies',type_controlers.GetAllTypesAndCompanies);
    type.post('/type/addType',auth_user,ShemaValidator.validate('addType'),type_controlers.insertType);//admin i subadmin
    type.delete('/type/deleteType/:type_id',auth_user,type_controlers.typeDelete);//admin i subadmin
}