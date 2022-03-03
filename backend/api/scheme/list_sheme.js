module.exports={
    addList:{
        title:"shema za dodavanje liste",
        type:"object",
        properties:{
            name:{
                type:"string",
                isNotEmpty:true,
                maxLength:2,
            },
        }
    }
}