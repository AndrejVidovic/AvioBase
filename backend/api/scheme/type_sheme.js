module.exports={
    addType:{
        title:"shema za dodavanje tipa aviona",
        type:"object",
        properties:{
            type:{
                type:"string",
                isNotEmpty:true,
                maxLength:10,          
            },
            manufacturer:{
                type:"string",
                isNotEmpty:true,
                maxLength:10,          
            },
            company_id:{
                type:"number",
                isNotEmpty:true,
            }
        }
    }
}