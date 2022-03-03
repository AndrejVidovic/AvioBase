const listReducer=(state=0,action)=>{
    switch(action.type){
        case 'SELECTED_LIST':
            return action.payload.id;
        default:
            return state;
    }
}
export default listReducer;