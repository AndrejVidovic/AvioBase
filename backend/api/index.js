const express=require('express');
const main_ruter=express.Router();
const user=require('./routers/user');
const list=require('./routers/list');
const company = require('./routers/company');
const type=require('./routers/type');
const aircraft = require('./routers/aircraft');
const login=require('./routers/login');
const admin=require('./routers/admin');
user(main_ruter);
list(main_ruter);
company(main_ruter);
type(main_ruter);
aircraft(main_ruter);
login(main_ruter);
admin(main_ruter);
module.exports={
    Main_ruter:main_ruter
}