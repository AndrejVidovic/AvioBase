
module.exports=class companyService{
    constructor(logger,company,list){
        this.Logger=logger,
        this.Company=company,
        this.List=list
    }
    //ispis svih kompanija 
    async GetAll(){
        try{
            const companies=await this.Company.findAll();
            this.Logger.info("Fetching companies from database...");
            return companies;
            
        }
        catch(error){
            this.Logger.error("Error in fetching companies from database")
            throw (error)
        }
    }
    //ispis kompanija po listama
    async GetForList(lists_id){
        try{
            const companies=await this.Company.findAll({where:{list_id: lists_id}})
            this.Logger.info("Fetching companies from list...");
            return companies;
        }
        catch(error){
            this.Logger.error("Error in fetching companies from database")
            throw (error)
        }
    }
    //ispis odabrane kompanije
    async GetSelectedCompany(companys_id){
        try{
            const company=await this.Company.findAll({where:{id: companys_id}})
            this.Logger.info("Fetching company...");
            return company;
        }
        catch(error){
            this.Logger.error("Error in fetching company from database!");
            throw(error);
        }
    }
    //ispis kompanija za admina koji ju odrzava
    async GetCompanyAdmin(admin_id){
        try{
            const companies=await this.Company.findAll({where:{user_id:admin_id}})
            this.Logger.info("Fetching companies for admin...");
            return companies;
        }
        catch(error){
            this.Logger.error("Error in fetching companies for admin in database!");
            throw(error);
        }
    }
    //dodavanje nove kompanije
    async addCompany(request,user_id){
        try{
            var company=await this.Company.findOne({
                where:{name:request.name}
            })
            if(!company){
               var new_company=await this.Company.create({
                    name:request.name,
                    description:request.description,
                    ICAO:request.ICAO,
                    IATA:request.IATA,
                    country:request.country,
                    baseHub:request.baseHub,
                    founded:request.founded,
                    numOfAircraft:request.numOfAircraft,
                    imgPath:request.imgPath,
                    logoPath:request.logoPath,
                    user_id:user_id,
                    list_id:request.list_id,
               })
               this.Logger.info("Company successfully added!");
            }
            else throw(new Error("Company with that name already exists!"));

        }
        catch(error){
            this.Logger.error("Error in adding new company!");
            throw (error);
        }
    }
    //brisanje kompanije
    async deleteCompany(company_id){
        try{
            await this.Company.destroy({
                where:{id:company_id}
            })
            this.Logger.info("Company is successfully deleted from database!");
        }
        catch(error){
            this.Logger.error("Error in deleting company from database!");
            throw(error);
        }
    }
    //update kompanije
    async updateCompany(request){
        try{
            const company=await this.Company.findOne({
                where:{name:request.name}
            })
            this.Logger.info(company);
            if(company){
                company.name=request.name,
                company.description=request.description,
                company.ICAO=request.ICAO,
                company.IATA=request.IATA,
                company.country=request.country,
                company.baseHub=request.baseHub,
                company.founded=request.founded,
                company.numOfAircraft=request.numOfAircraft,
                company.imgPath=request.imgPath,
                company.logoPath=request.logoPath,
                company.user_id=request.user_id,
                company.list_id=request.list_id,
                await company.save()
            }
            else{
                this.Logger.error("Error in update method!");
            }
        }
        catch(error){
            this.Logger.error("Error in updating company from database!");
            throw(error);
        }
        
    }
    
}