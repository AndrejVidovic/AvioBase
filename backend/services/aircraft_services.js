module.exports=class aircraftService{
    constructor(logger,type,aircraft,company){
        this.Logger=logger,
        this.Type=type,
        this.Aircraft=aircraft,
        this.Company=company
    }
    //dohvat svih aviona iz baze
    async GetAll(){
        
        try{
            const aircraft=await this.Aircraft.findAll();
            this.Logger.info("Fetching aircrafts...");
            return aircraft;
        }
        catch(error){
            this.Logger.error("Error in fetching all aircrafts from database!");
            throw(error);
        }
    }
    //dohvat svih aviona za neki tip i kompaniju
    async GetAllForType(companies_id){
        try{   
            try{
                var aircraft=await this.Company.findAll({
                    attributes:["id"],
                    include:{
                        model:this.Type,
                        attributes:["type","id"],
                        include:{
                            model:this.Aircraft,
                            attributes:["name","id","registration","old"],    
                        }
                    },
                    where:{id:companies_id},
                    
                })
                this.Logger.info("Fetching aircrafts for type and company...");
            }
            catch(error){
                this.Logger.error("Error in fetching aircrafts for type!");
                throw(error);
            }
            var temp={};
            var format=[];
            var format2=[];
            for(let i=0;i<aircraft[0].types.length;i++)
            {
                for(let j=0;j<aircraft[0].types[i].aircraft.length;j++)
                {
                    temp={
                        aircraft_id:aircraft[0].types[i].aircraft[j].id,
                        aircraft_name:aircraft[0].types[i].aircraft[j].name,
                        aircraft_registration:aircraft[0].types[i].aircraft[j].registration,
                        aircraft_old:aircraft[0].types[i].aircraft[j].old,
                    };
                    format2.push(temp);
                    temp={};
                }
                temp={
                    type_id:aircraft[0].types[i].id,
                    type_name:aircraft[0].types[i].type,
                    subtypes:format2
                };
                format.push(temp);
                temp={};
                format2=[];
            }
            return format;
        }
        
        catch(error){
            this.Logger.error("Error in fetching aircrafts and type!");
            throw(error);
        }
    }
    //dodavanje novog aviona za odredeni tip i kompaniju
    async addAircraft(request){
        try{
            //trazimo ima li avion koji u nosimo u toj firmi
            let aircraft=await this.Aircraft.findOne({
                where:{
                    registration:request.registration,
                    type_id:request.type_id,
                }
            })
            if(!aircraft){
                let new_aircraft=await this.Aircraft.create({
                    name:request.name,
                    registration:request.registration,
                    old:request.old,
                    type_id:request.type_id,
                })
                const company=await this.Company.findOne({
                    include:[{model:this.Type,attributes:['id','type'],where:{id:request.type_id}}]
                })
                company.numOfAircraft++;
                await company.save();
                this.Logger.info("Aircraft successfully added!")
            }
            else throw(new Error("Aircraft with that registration already exists!"));
        }
        catch(error){
            this.Logger.error("Error in adding new aircraft!");
            throw(error);
        }
    }
    //delete metoda za avion
    async deleteAircraft(airlines_id){
        try{
            let aircraft=await this.Aircraft.findOne({
                where:{id:airlines_id}
            })
            if(aircraft){
                const company=await this.Company.findOne({
                    include:[{
                        model:this.Type,
                        attributes:['id','type'],
                        include:{
                            model:this.Aircraft,
                            attributes:['id','name'],
                            where:{id:airlines_id}
                        }
                    }]
                })
                company.numOfAircraft--;
                await company.save();
                await this.Aircraft.destroy({
                    where:{id:airlines_id}    
                })
                this.Logger.info("Aircraft successfully deleted!");
            } 
        }
        catch(error){
            this.Logger.error("Error in deleting aircraft!");
            throw(error);
        }
    }
}
