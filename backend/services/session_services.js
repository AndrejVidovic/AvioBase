module.exports=class classSession{
    constructor(logger,session,){
        this.Logger=logger,
        this.Session=session
    }
    async CreateSession(users_id){
        try{
            await this.Session.create({
                timestamp_LOGIN:new Date(),
                timestamp_LOGOUT:null,
                user_id:users_id,
            })
        }
        catch(error){
            this.Logger.error("Error in creating session for user!");
            throw(error);
        }
    }
    async Logout(users_id){
        try{
            await this.Session.update({timestamp_LOGOUT:new Date()},{
                where:{
                    user_id:users_id,
                    timestamp_LOGOUT:null,
                }
            });
            this.Logger.info("Timestamp_LOGOUT succesfully added!");
        }
        catch(error){
            this.Logger.error("Error in function Logout!");
            throw(error);
        }
    }
}