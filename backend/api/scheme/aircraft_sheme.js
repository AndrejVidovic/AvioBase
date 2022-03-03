module.exports={
    addAircraft:{
        title:"shema za dodavanje aviona",
        type:"object",
        properties:{
            name:{//ime aviona npr A320-285
                type:"string",
                isNotEmpty:true,
                maxLength:10,
                
            },
            registration:{//registracija aviona npr XYZ-000
                type:"string",
                isNotEmpty:true,
                maxLength:10,
                
            },
            old:{//starost aviona 
                type:"number",
                isNotEmpty:true,
            },
            type_id:{
                type:"number",
                isNotEmpty:true,
            }

        }

    }
}