import React, { useState } from 'react';
import { makeStyles, FilledInput} from '@material-ui/core';
import { Button, TextField, Typography, InputAdornment, IconButton } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { FormHelperText } from '@material-ui/core';
import MySnackbar from '../common/Snackbar'

const useStyles=makeStyles((theme)=>({
    root:{
        width:"80%",
        margin:"0 auto",
    },
    textField:{
        width:"80%",
        marginBottom:"2vh"
    },
    formControl:{
        width:"80%",
        marginBottom:"2vh"

    },
    button:{
        backgroundColor:"#004C99",
        color:"white",
        '&:hover': {
            backgroundColor: "#0066CC",
        },
        borderRadius: 10,
        marginBottom:"1em",
        fontFamily:"Montserrat, sans-serif",
        fontSize:"15px",
    },
    title:{
        marginTop: "1em",
        marginBottom: "1em",
        fontFamily:"Comfortaa, cursive",
        fontSize:"30px",
        fontWeight: 600,
    },
}))
function RegisterForm(props)
{
    const classes=useStyles();
    const [role,SetRole]=useState(1);
    const [name,setName]=useState("");
    const [surname,setSurname]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const [username,setUsername]=useState("");
    const [passwordCheck,setPasswordCheck]=useState("");
    const [showPassword,setShowPassword]=useState(false);
    const [showPasswordCheck,setShowPasswordCheck]=useState(false);
    const [errors,setErrors]=useState({});
    //sljedece tri sluze za snackbar
    const [text,setText]=useState("");
    const [openSnackbar,setOpenSnackbar]=useState(false);
    const [severity,setSeverity]=useState("");

    //funkcija za zatvorit snackbar
    const handleCloseSnackbar=()=>{
        setOpenSnackbar(false);
    }



    //kontroliramo vidljivost sifre
    const handleClickShowPassword=()=>{
        if(showPassword==false)
            setShowPassword(true);
        else setShowPassword(false);
    }
    const handleMouseDownPassword=(event)=>{
        event.preventDefault()
    }

    const handleClickShowPasswordCheck=()=>{
        if(showPasswordCheck==false)
            setShowPasswordCheck(true);
        else setShowPasswordCheck(false);
    }
    const handleMouseDownPasswordCheck=(event)=>{
        event.preventDefault()
    }
    const Submit=async(event)=>{
        event.preventDefault();
        if(validation())
        {
            const object={
                name:name,
                surname:surname,
                email:email,
                username:username,
                password:password,
                passwordCheck:passwordCheck,
                role:role,
            }
            const settings={
                method:'POST',
                mode:'cors',
                headers: { 
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'},
                body:JSON.stringify(object),
                credentials:'include'
            }
            const res=await(await fetch('http://localhost:5000/api/users/addUser',settings).catch(handleError)).json();
            if(res===200){
                setText("User successfully added!");
                setSeverity("success");
                setOpenSnackbar(true);
                props.pageProps.history.push('/');
            }
            else{
                setOpenSnackbar(true);
                setText(res.error.message);
                setSeverity("error");
            }
        } 
    }

    var handleError = function (err) {
        console.warn(err);
    };

    const validation=()=>{
        let temp={};
        temp.name=name?"":"Name is required.";
        if(temp.name=="Name is required.")
            temp.nameError=true;
        else temp.nameError=false;

        temp.surname=surname?"":"Surname is required.";
        if(temp.surname=="Surname is required.")
            temp.surnameError=true;
        else temp.surnameError=false;

        temp.email=(/$^|.+@.+..+/).test(email)?"":"Email is not vaild."
        temp.email1=email ?"":"Email is required." 
        if(temp.email=="Email is not vaild."){
            temp.emailError=true
        }
        else if (temp.email1=="Email is required.") {
            temp.emailError=true
            temp.email=temp.email1
        }
        else 
            temp.emailError=false
        
        temp.username=username?"":"Username is required.";
        if(temp.username=="Username is required.")
            temp.usernameError=true;
        else temp.usernameError=false;

        temp.password=password?"":"Password is required.";
        if(temp.password=="Password is required.")
            temp.passwordError=true;
        else temp.passwordError=false;

        temp.passwordCheck=passwordCheck?"":"Password Check is required.";
        if(temp.passwordCheck=="Password Check is required.")
            temp.passwordCheckError=true;
        else temp.passwordCheckError=false;

        if(passwordCheck!=password)
        {
            temp.passwordCheck="Wrong password";
            temp.passwordCheckError=true;
        }

        setErrors({
            ...temp
        })
        return Object.values(temp).every(x=>x=="")
    }
 
    return(
        <React.Fragment>
            <form onSubmit={(e=>{Submit(e)})} autoComplete="off" noValidate className={classes.root}>
            <Typography className={classes.title}>Register</Typography>
            <TextField 
                className={classes.textField}
                id="filled-basic" 
                label="Name" 
                variant="filled" 
                type="text"
                onChange={(e)=>setName(e.target.value)}
                error
                {  ...( {error:errors.nameError,helperText:errors.name})}>               
            </TextField>
            <TextField
                className={classes.textField}
                id="filled-basic" 
                label="Surname" 
                variant="filled" 
                type="text"
                onChange={(e)=>setSurname(e.target.value)}
                {  ...( {error:errors.surnameError,helperText:errors.surname})}>
            </TextField>
            <TextField 
                className={classes.textField}
                id="filled-basic" 
                label="Email" 
                variant="filled" 
                type="email"
                onChange={(e)=>setEmail(e.target.value)}
                {  ...( {error:errors.emailError,helperText:errors.email})}>      
            </TextField>
            <TextField
                className={classes.textField}
                id="filled-basic" 
                label="Username" 
                variant="filled" 
                type="text"
                onChange={(e)=>setUsername(e.target.value)}
                {  ...( {error:errors.usernameError,helperText:errors.username})}>  
            </TextField>
            <FormControl className={classes.formControl} variant="filled">
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    onChange={(e)=>SetRole(e.target.value)}
                    defaultValue="Admin"
                >
                    <MenuItem value={1}>Admin</MenuItem>
                    <MenuItem value={2}>Subadmin (only insert company)</MenuItem>
                </Select>
            </FormControl>
            <FormControl  className={classes.textField} variant="filled" error {...({error:errors.passwordError})}>               
                    <InputLabel  variant="filled" htmlFor="filled-adornment-password" >Password</InputLabel>
                    <FilledInput fullWidth
                        id="filled-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                        endAdornment={
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                            </InputAdornment>
                        }      
                    />
                    {<FormHelperText>{errors.password}</FormHelperText>}
                    
                </FormControl>
                <FormControl  className={classes.textField} variant="filled" error {...({error:errors.passwordCheckError})}>
                    <InputLabel  variant="filled" htmlFor="filled-adornment-password" >Password Check</InputLabel>
                    <FilledInput fullWidth
                        id="filled-adornment-password2"
                        type={showPasswordCheck ? 'text' : 'password'}
                        value={passwordCheck}
                        onChange={(e)=>{setPasswordCheck(e.target.value)}}
                        endAdornment={
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPasswordCheck}
                                onMouseDown={handleMouseDownPassword}
                            >
                            {showPasswordCheck ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                            </InputAdornment>
                        }      
                    />
                    {<FormHelperText>{errors.passwordCheck}</FormHelperText>}         
                </FormControl>
            <Button variant="contained"className={classes.button} type="submit">Register</Button>
            </form>
            <MySnackbar text={text} severity={severity} open={openSnackbar} handleClose={handleCloseSnackbar}/>
        </React.Fragment>
    )
}
export default RegisterForm;