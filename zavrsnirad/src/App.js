import './App.css';
import { Route ,Router,Switch} from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Navbar from './components/common/Navbar';
import Home from "./components/common/Home"
import Login from "./pages/login";
import UserAirlines from "./components/user/UserAirlines";
import SpeedDial from "./components/admin/AddFunction";
import AirlinesList from './components/user/AirlinesList';
import Register from './pages/register';
import AdminAirlines from './components/admin/AdminAirlines';
import {useSelector} from 'react-redux';


const theme = createMuiTheme({
  palette: {
    primary: {main: "#004C99"},
    secondary: {main: "#FFB266"}
  },
});

function App() {
  const status=useSelector(state=>state.login);
  var AdminFeatures=false;
  var GuestFeatures=false;
  var SubadminFeatures=false;
  switch(status){
    case 'guest':{
      AdminFeatures=false;
      GuestFeatures=true;
      SubadminFeatures=false;
      break;
    }
    case 'admin':{
      AdminFeatures=true;
      GuestFeatures=true;
      SubadminFeatures=true;
      break;
    }
    case 'subadmin':{
      AdminFeatures=false;
      GuestFeatures=true;
      SubadminFeatures=true;
      break;
    }
    default:{
      AdminFeatures=false;
      GuestFeatures=true;
      SubadminFeatures=false;
    }
  }
  return (
    <div className="App">
      	<ThemeProvider theme={theme}>
          <Navbar/>
          <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/Login" component={Login}/>
          {(GuestFeatures)&&<Route exact path="/Airlines" component={UserAirlines}/>}
          {(GuestFeatures)&&<Route exact path="/Airlines/list/:list_name" component={AirlinesList}/>}
          <Route exact path="/register" component={Register}/>
          {(AdminFeatures || SubadminFeatures)&&<Route exact path="/AdminAirlines" component={AdminAirlines}/>}
          </Switch>
          {(AdminFeatures || SubadminFeatures)&&<SpeedDial/>}
        </ThemeProvider>
        
    </div>

  );
}

export default App;
