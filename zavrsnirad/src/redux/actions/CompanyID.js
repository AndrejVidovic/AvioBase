export const CompanyAction=(companyID)=>{
    return{
        type:'SELECTED_COMPANY',
        payload:{
            id:companyID
        }
    }
}