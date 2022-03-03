import { combineReducers } from "redux";
import loginStatusReducer from "./loginStatus";
import companyReducer from './CompanyID';
import listReducer from './ListID'

const RootReducer=combineReducers({
    login:loginStatusReducer,
    company:companyReducer,
    list:listReducer,
})
export default RootReducer;