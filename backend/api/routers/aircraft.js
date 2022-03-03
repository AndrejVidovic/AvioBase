const express=require('express');
const aircraft=express.Router();
const aircraft_controlers=require('../controlers/aircraft_controlers');
const { auth_user } = require('../controlers/authentication');
const shema=require('../scheme/aircraft_sheme');
const ShemaValidator=require('../scheme/validator');
ShemaValidator.addSchemas(shema);
module.exports=function(main_ruter){
    main_ruter.use('/',aircraft);
    aircraft.get('/aircraft',aircraft_controlers.GetAllAircraft);
    aircraft.get('/aircraft/type/:company_id',aircraft_controlers.GetAircraftAndType);
    aircraft.post('/aircraft/AddAircraft',ShemaValidator.validate('addAircraft'),auth_user,aircraft_controlers.insertAircraft);//admin i subadmin
    aircraft.delete('/aircraft/delete/:aircraft_id',auth_user,aircraft_controlers.aircraftDelete);//admin i subadmin
}