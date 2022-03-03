const express=require('express');
const {nodelogger}=require('./loaders/logger');
const loaders=require('./loaders');
const app=express();
const config=require('./config');

async function start(){
    try{
        await loaders.load(app);
        app.listen(config.port,()=>{
            nodelogger.info(`App is listening on port ${config.port}`)
        })
    }
    catch(error)
    {
        nodelogger.error(error);
    }
}
start();
