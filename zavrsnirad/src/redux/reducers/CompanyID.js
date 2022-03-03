const companyReducer=(state=0,action)=>{
    switch(action.type){
        case 'SELECTED_COMPANY':
            return action.payload.id;
        default:
            return state;
    }
}
export default companyReducer;