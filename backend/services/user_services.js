const bcrypt = require("bcrypt");
const config=require('../config');

module.exports=class userService{
    constructor(logger,user,list,user_list){
        this.Logger=logger,
        this.User=user,
        this.List=list,
        this.User_list=user_list
    }
    //dohvat svih usera
    async GetAllUsers(){
        try{
            try{
                var users= await this.User.findAll();
                this.Logger.info("Fetching all users...");
            }
            catch(error){
                this.Logger.error("Error in fetching all users!");
                throw(error);
            }
            for(let i=0;i<users.length;i++)
            this.Logger.info(JSON.stringify(users[i]))
            return users;
        }
        catch(error){
            this.Logger.error("Error in fetching all users!");
            throw(error);
        }
    }
    //dohvat usera za  odredenu rolu
    async GetUsersForRole(roles_id){
        try{
            var users=await this.User.findAll({where:{role:roles_id}});
            this.Logger.info("Fetching user for role"+roles_id+"...");
            return users;
        }
        catch(error){
            this.Logger.error("Error in fetching users for role!");
            throw(error);
        }
    }
    //dohvat admina za odredenu listu
    async GetAdminsLists(lists_id){
        try{
            var users=await this.User.findAll({
                include:{
                    model:this.List,
                    as:"users_list",
                    through:{attributes:[]},
                    where:{id:lists_id}
                }
            });
            this.Logger.info("Fethcing admins for list");
            var temp={};
            var format=[];
            for(let user of users){
                temp={
                    admin_name:user.name,
                    admin_surname:user.surname
                }
                format.push(temp);
                temp={};
            }
            return format;
        }
        catch(error){
            this.Logger.error("Error in fetching admins for lists!");
            throw (error);
        }
    }
    //dodavanje korisnika
    async addUser(request){
        try{
            let user=await this.User.findOne({
                where:{name:request.name,surname:request.surname}
            })
            if(!user){
                const sol=await bcrypt.genSalt(config.rounds);
                const hashedPassword=await bcrypt.hash(request.password,sol);
                let new_user=await this.User.create({
                    name:request.name,
                    surname:request.surname,
                    username:request.username,
                    email:request.email,
                    password:hashedPassword,
                    role:request.role,
                    created_at:new Date(),
                })
                this.Logger.info("User successfully added!");
            }
            else throw(new Error("User already exist!"));

        }
        catch(error){
            this.Logger.error("Error in adding new admin!");
            throw(error);
        }
    }
}