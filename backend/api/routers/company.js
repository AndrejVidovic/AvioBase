const express=require('express');
const { auth_user } = require('../controlers/authentication');
const company=express.Router();
const company_controlers=require('../controlers/company_controlers');
const shema=require('../scheme/company_sheme');
const ShemaValidator=require('../scheme/validator');
ShemaValidator.addSchemas(shema);
module.exports= function(main_ruter){
    main_ruter.use('/',company);
    company.get('/company',company_controlers.GetAllCompany);
    company.get('/company/list/:list_id',company_controlers.GetCompanyForList);
    company.get('/company/:company_id',company_controlers.GetCompany);
    company.get('/company/admin/id',auth_user,company_controlers.GetCompanyForAdmin);//admin i subadmin
    company.post('/company/AddCompany',ShemaValidator.validate('addCompany'),auth_user,company_controlers.InsertCompany);//admin i subadmin
    company.delete('/company/deleteCompany/:company_id',auth_user,company_controlers.CompanyDelete);//admin i subadmin
    company.put('/company/UpdateCompany',auth_user,company_controlers.UpdateCompany);//admin i subadmin
}