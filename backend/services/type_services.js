module.exports=class typeService{
    constructor(logger,company,type,aircraft){
        this.Logger=logger,
        this.Company=company,
        this.Type=type,
        this.Aircraft=aircraft
    }
    // dohvat svih tipova aviona
    async GetAll(){
        try{
            const types=await this.Type.findAll();
            this.Logger.info("Fetching types from database...");
            return types;
        }
        catch(error){
            this.Logger.error("Error in fetching all types from database!");
            throw(error);
        }
    }
    // dohvat svih tipova za odredenu kompaniju
    async GetCompanyType(companys_id){
        try{
            const types=await this.Type.findAll({where:{company_id:companys_id}})
            this.Logger.info("Fetching types for company...");
            return types
        }
        catch(error){
            this.Logger.error("Error in fetching types for company!");
            throw(error);

        }
    }
    //dohvat svih tipova za kompaniju ali samo ime kompanije i ime tipa 
    async GetCompanyNameAndType(){
        try{
            try{
                var types=await this.Type.findAll({
                    attributes:['id','type','company_id'],
                    include:[{model:this.Company,attributes:['id','name']}]
                })
                this.Logger.info("Fetching types and company name...");
            }
            catch(error){
                this.Logger.error("Error in fetching company name !");
                throw(error);
            } 
            //za napravit niz od njih + lakse je ocitat ono sta mi triba
            var temp={};
            var format=[];
            for(let type of types)
            {
                temp={
                    type_id:type.id,
                    type_name:type.type,
                    company_id:type.company_id,
                    company_name:type.company.name,
                }
                format.push(temp);
                temp={};
            }
            return format;
        }
        catch(error){
            this.Logger.error("Error in fetching company name and types!");
            throw(error);
        }
    }
    //unos novog tipa aviona za odredenu kompaniju
    async addType(request){
        try{
            let type=await this.Type.findOne({
                where:{company_id:request.company_id,type:request.type}
            });
            if(!type){
                const new_type=await this.Type.create({
                    type:request.type,
                    manufacturer:request.manufacturer,
                    company_id:request.company_id,
                });
                this.Logger.info("Type succesfully added!");
            }
            else throw(new Error("Type already exist!"));

        }
        catch(error){
            this.Logger.error("Error in adding type!");
            throw(error);
        }

    }
    //brisanje tip aviona odredene kompanije + brisanje broja aviona te kompanije koliko ih ima u tom tipu
    async deleteType(type_id){
        try{
            let brojac=0;
            let aircraft=await this.Aircraft.findAll({
                where:{type_id:type_id}
            })
            for(let i=0;i<aircraft.length;i++)
            {
                brojac++;
            }
            let company=await this.Company.findOne({
                include:[{model:this.Type,attributes:['id','type'],where:{id:type_id}}]
            })
            company.numOfAircraft=company.numOfAircraft-brojac;
            await company.save();
            await this.Type.destroy({
                where:{id:type_id}
            })
            this.Logger.info("Type successfully deleted!");
        }
        catch(error){
            this.Logger.error("Error in deleting type from database");
            throw(error);
        }
    }
       
}