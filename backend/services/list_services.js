const { nodelogger } = require('../loaders/logger');
module.exports=class listService{
    constructor(logger,list,user_list,user){
       this.Logger=logger;
       this.List=list
       this.User_list=user_list,
       this.User=user
    }
    //dohvat svih lista(sluzi nan za korisnika i unos nove liste)
    async GetList(){
        try{
            const list=await this.List.findAll();
            this.Logger.info("Loading list from database...")
            return list;
        }
        catch(error){
            this.Logger.error('Error in fetching list from database!');
            throw(error);
        }  
    }
    //dohvat liste za odredenog admina
    async GetListForAdmin(admins_id){
        try{
            try{
                var list=await this.List.findAll({
                    attributes:["name","id"],
                    include:{
                        model:this.User,
                        as:"lists_user",
                        through:{attributes:[]},   
                        where:{id:admins_id},
                    },
                });
                this.Logger.info("Fetching lists for admin...");
            }
            catch(error){
                this.Logger.error("Error in fetching all lists for admin!");
                throw(error);
            }
            var temp={};
            var format=[];
            for(let lists of list )
            {
                temp={
                    list_id:lists.id,
                    list_name:lists.name,
                }
                format.push(temp);
                temp={};
            }
            return format;
         
        }
        catch(error){
            this.Logger.error("Error in function GetListForAdmin!");
            throw(error);
        }
    }
    //dodavanje nove liste
    async addList(request,user_id){
        try{
            let list=await this.List.findOne({
                where:{name:request.name}
            });
            if(!list){
                const new_list=await this.List.create({
                    name:request.name,
                });
                await this.User_list.create({
                    list_id:new_list.id,
                    user_id:user_id,
                })
                this.Logger.info("List succesfully added!");
            }
            else throw(new Error("List already exist!"));
        }
        catch(error){
            this.Logger.error("Error in adding list!"+error);
            throw(error);
        }
    }
    
    

}

