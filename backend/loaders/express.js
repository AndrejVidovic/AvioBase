const {Main_ruter}=require('../api');
const config=require('../config');
const {httploger}=require('./logger');
const express=require('express');
const cors=require('cors');
const session = require('express-session');
var corsOptions={
  origin:true,
  credentials:true,
}


module.exports=(app)=>{
    app.use(httploger);

    
    app.use(express.json());
    app.use(express.urlencoded({extended:false}));
    app.use(cors(corsOptions));

    app.options("/",function(req,res,next){
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Origin','*');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
      res.header('Access-Control-Allow-Credentials','true');
      res.send(200);
    });
    
    app.use(session({
      saveUninitialized:true,
      resave:false,
      secret:config.expressSecret,
      name:"user_sid",
      store: new (require('connect-pg-simple')(session))({
        conString:config.database_url,
        tableName:"user_sessions",
        pruneSessionInterval:60
      }),
     cookie:
      {maxAge: 60*60*1000 },//1 sat je ovo*/
    }));
    
    app.use(`/${config.api}`,Main_ruter);
    app.use((req, res, next) => {
      const error = new Error("Not found");
      error.status = 404;
      next(error);
    });
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.json({
        error: {
          message: err.message,
        },
      });
    });  
}