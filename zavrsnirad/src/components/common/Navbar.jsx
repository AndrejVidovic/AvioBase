import React from 'react';
import {Link} from "react-router-dom";
import { makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import logo from '../../images/images.png'
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import {useDispatch, useSelector} from 'react-redux';
import {Logout}from '../../redux/actions/loginStatus'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    image:{
        height: theme.spacing (5),
        width: theme.spacing(5),
    },
    login:{
        MarginRight:0,
        borderRadius: 10,
        marginLeft: "auto",
        color: "#FFFFFF",
        backgroundColor: "#004C99",
        maxHeight: 35,
        '&:hover': {
          backgroundColor: "#0066CC",
    }
    },
    loginText:{
        fontSize:"15px",
        fontFamily:"Montserrat, sans-serif",
        marginLeft:"1.5em",
        marginRight: "1.5em",
    },
}))
function Navbar(){
    const classes = useStyles();
    const status=useSelector(state=>state.login);
    const dispatch=useDispatch();
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
            GuestFeatures=false;
            SubadminFeatures=true;
            break;
        }
        case 'subadmin':{
            AdminFeatures=false;
            GuestFeatures=false;
            SubadminFeatures=true;
            break;
        }
        default:{
            AdminFeatures=false;
            GuestFeatures=true;
            SubadminFeatures=false;
        }
    }
    const logOut=async()=>{
        const settings={
            method:'GET',
            mode:'cors',
            headers: { 
              'Accept': 'application/json',
              'Content-Type': 'application/json'},
            credentials:'include',
        }
        const res=await fetch('http://localhost:5000/api/logout',settings);
        dispatch(Logout());
    }
    return(
        <div className={classes.root} >
            <AppBar elevation={3} position="fixed" style={{background: '#FFFFFF'}}>
                <Toolbar>
                    <img src={logo} alt='slika' className={classes.image}/>
                    <Box ml={1}><li><Link to="/"><span className="AvioBaseNavbar">AvioBase</span></Link></li></Box>
                    <Hidden xsDown>
                        <Box ml={8} mr={8}><li><Link to="/">Home</Link></li></Box>
                        <Box mr={8}><li><Link to="/Airlines">Airlines</Link></li></Box>
                        {(AdminFeatures || SubadminFeatures)&&<Box mr={8}><li><Link to="/AdminAirlines">YourAirlines</Link></li></Box>}
                    </Hidden>
                    {GuestFeatures&& <Box ml={1} className={classes.login}>
                        <Button size="small"  >
                           <Link to="/login" className={classes.loginText} style={{color:"white"}}>Login</Link>
                        </Button>
                      </Box> }
                      {(AdminFeatures|| SubadminFeatures)&&<Box ml={1} className={classes.login}>
                        <Button size="small"  >
                           <Link to="/" onClick={logOut} className={classes.loginText} style={{color:"white"}}>Logout</Link>
                        </Button>
                      </Box> }
                </Toolbar>
            </AppBar>
        </div>
    )

}
export default Navbar;