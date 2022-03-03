export const ListAction=(listID)=>{
    return{
        type:'SELECTED_LIST',
        payload:{
            id:listID,
        }
    }
}