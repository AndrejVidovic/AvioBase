module.exports=class loginService{
    constructor(logger,user){
        this.Logger=logger,
        this.User=user
    }
    async GetUser(usernames){
        try{
            const user=await this.User.findOne(
                {where:{username:usernames}});
            if(user){
                this.Logger.info("User is founded and returned to function!"); 
                return user; 
            }
            else throw(new Error("Something is wrong in username or in password!"));       
        }
        catch(error){
            this.Logger.error("Error in getting user!");
            throw error;
        }
    }
}