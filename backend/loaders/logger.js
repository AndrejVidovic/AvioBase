const winston=require('winston');
const morgan=require('morgan');


winston.loggers.add("winston",{
    level:"debug",
    levels:winston.config.npm.levels,
    format:winston.format.combine(
        winston.format.cli(),
        winston.format.timestamp(),
    ),
    transports: [
        new winston.transports.Console({
            level:'debug',
            format: winston.format.combine(
                winston.format.cli(),
                winston.format.timestamp()),
         }) 
    ]
});
const logger=winston.loggers.get('winston');
const http=morgan('dev',{
    stream:{
        write(msg){
            logger.info(msg.substr(0,msg.lastIndexOf('\n')));
        }
    }
})
module.exports={
    httploger:http,
    nodelogger:logger,
}
