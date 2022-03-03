import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles} from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import {adminLogin,subadminLogin} from '../../redux/actions/loginStatus';
import MySnackbar from '../common/Snackbar';

const styles={
    loginHeadLine:{
        margin: "0 auto",
        marginTop: "1em",
        marginBottom: "1em",
        fontFamily:"Comfortaa, cursive",
        fontSize:"30px",
        fontWeight: 600,

    },
    submitButton:{
        backgroundColor:"#004C99",
        color:"white",
        '&:hover': {
            backgroundColor: "#0066CC",
        },
        borderRadius: 10,
        marginTop:"1em",
        marginBottom:"1em",
        fontFamily:"Montserrat, sans-serif",
        fontSize:"15px",
    },
    field:{
        marginTop:"1em",
        marginBottom:"1em",
        width:"100%"
    },
    root:{
        width:"80%",
        margin:"0 auto",
    },
}



function LoginForm(props){
    let classes=props.classes;
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const dispatch=useDispatch();
    //za snackbar
    const [text,setText]=useState("");
    const [openSnackbar,setOpenSnackbar]=useState(false);
    const [severity,setSeverity]=useState("");

    //funkcija za zatvorit snackbar
    const handleCloseSnackbar=()=>{
        setOpenSnackbar(false);
    }

    //funkcija za logiranje korisnika
    const Login=async (event)=>{
        event.preventDefault();
        const object={
            username:username,
            password:password,
        }
        const settings={
            method:'POST',
            mode:'cors',
            headers: { 
              'Accept': 'application/json',
              'Content-Type': 'application/json'},
            credentials:'include',
            body:JSON.stringify(object),
        }   
        const res=await(await fetch('http://localhost:5000/api/login',settings).catch(handleError)).json();
        if(!res.role==''){

            if(res.role==1){
                dispatch(adminLogin());
                props.pageProps.history.push('/');
            }
            else if(res.role==2)
            {
                dispatch(subadminLogin());
                props.pageProps.history.push('/');
            }
        }
        else{
            setOpenSnackbar(true);
            setText(res.error.message);
            setSeverity('error');
        }
        var handleError = function (err) {
            console.warn(err);
        };
        
    };

    return(
        <React.Fragment>
            <Typography className={classes.loginHeadLine}>Login</Typography>
            <form onSubmit={(e=>{Login(e)})} autoComplete="off" noValidate className={classes.root}>
                    <TextField onChange={(e)=>{setUsername(e.target.value)}} fullWidth type="username" label="Username" variant="filled" className={classes.field}></TextField>
                    <TextField onChange={(e)=>{setPassword(e.target.value)}} fullWidth type="password" label="Password" variant="filled"  className={classes.field}></TextField>
                    <Button variant="contained" className={classes.submitButton} type="submit">login</Button>
            </form>    
            <MySnackbar text={text} severity={severity} open={openSnackbar} handleClose={handleCloseSnackbar}/>
        </React.Fragment>
    )
}
export default withStyles(styles)(LoginForm);