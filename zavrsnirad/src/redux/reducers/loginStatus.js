const loginStatusReducer=(state='guest',action)=>{
    switch(action.type){
        case 'ADMIN_LOGGED':
            return 'admin';
        case 'SUBADMIN_LOGGED':
            return 'subadmin';
        case 'LOGGED_OUT':
            return 'guest';
        default:
            return state;
    }
}
export default loginStatusReducer;