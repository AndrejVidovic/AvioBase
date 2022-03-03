import React, { useEffect, useState } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FakeCompanies from '../../../data/FakeCompanies.json'

const useStyles=makeStyles(theme=>({
    title:{
        fontFamily:"Comfortaa, cursive",
        fontSize:"20px",
        marginBottom:"1rem",
        fontWeight:600

        
    },
    formControl:{
        [theme.breakpoints.down('sm')]: {
            width:200,
          },
    },
    manufacturer:{
        marginTop: "3em",
        marginBottom: "0.5em",
        width:"90%",
    },
    type:{
        margin: theme.spacing(2),
        width: "90%",
        position: "relative",
    },
    gird:{
        marginLeft:"5%",
        marginRight:"5%",
        marginBottom:"5%",
        [theme.breakpoints.down('sm')]: {
            marginRight:"0em",
            marginLeft:"0em",
            marginBottom:"1em",
          },
    },
    button:{
        backgroundColor:"#004C99",
        color:"white",
        '&:hover': {
            backgroundColor: "#0066CC",
        },
        paddingLeft:"20px",
        paddingRight:"20px"
    },
}));


function AddNewType(props)
{
    useEffect(()=>{
        getData();
    },[]);
    
    const classes=useStyles();
    const [manufacturer,setManufacturer]=useState("");
    const [type,setType]=useState("");
    const [company,setCompany]=useState(0);
    const [errors,setErrors]=useState({});
    const [data,setData]=useState([]);

    //provjera jeli prvo slovo proizvodaca veliko
    const validation=()=>{
        let temp={};
        if(manufacturer.charAt(0)!==manufacturer.charAt(0).toUpperCase())
        {
            temp.manufacturer="First char must be upper case!";
            temp.manufacturerError=true;
        }
        if(manufacturer===""){
            temp.manufacturer="Manufacturer is required!";
            temp.manufacturerError=true;
        }
        temp.type=type?"":"Type is required.";
        if(temp.type=="Type is required.")
            temp.typeError=true;
        else temp.typeError=false;
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x=>x=="")
    }
    
    const handleSave=async()=>{
        if(validation())
        {
            let object={
                type:type,
                manufacturer:manufacturer,
                company_id:company,
            };
            const settings={
                method:'POST',
                mode:'cors',
                headers: { 
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'},
                body:JSON.stringify(object),
                credentials:'include'
            }
            const res=await(await fetch('http://localhost:5000/api/type/addType',settings).catch(handleError)).json();
            if(res===200)
            {
                props.setOpenPopUp(false);
                props.handleIndex(2);
                props.setOpenSnackbar(true);
            }
            else{
                props.handleText(res.error.message);
                props.handleIndex(5);
                props.setOpenSnackbar(true);
            } 
        }
    }
    var handleError = function (err) {
        console.warn(err);
    };
    const Save=(value)=>{
        setCompany(value.id);
    }
    const getData=async()=>{
        const fetchOptions={
            method:'GET',
            headers: { 'Content-Type': 'application/json'},
            mode:'cors',
            credentials:'include'
        };
        const res=await fetch('http://localhost:5000/api/company/',fetchOptions);
        const data=await res.json();
        setData(data);
    }
    
    return(
            <Grid container alignItems="center" direction="column" justify="space-between" xs={10} md={12} lg={11}  className={classes.gird} spacing={2}>
                <Typography className={classes.title}>Please insert new aircraft type</Typography>
                <Autocomplete
                    onChange={(event, value) => Save(value)}
                    className={classes.formControl}
                    id="combo-box-demo"
                    options={data}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="select company" variant="outlined" />}
                />
                <TextField 
                    className={classes.manufacturer}
                    id="outlined-basic" 
                    label="aircraft manufacturer" 
                    variant="outlined" 
                    autoComplete="off"
                    onChange={(e)=>setManufacturer(e.target.value)}
                    error
                    {  ...( {error:errors.manufacturerError,helperText:errors.manufacturer})}
                />
                <TextField 
                    className={classes.type}
                    id="outlined-basic" 
                    label="aircraft type" 
                    variant="outlined" 
                    autoComplete="off"
                    helperText="e.g X000"
                    onChange={(e)=>setType(e.target.value)}
                    error
                    {  ...( {error:errors.typeError,helperText:errors.type})}
                />
                <Button variant="contained" className={classes.button} onClick={(e)=>handleSave()}>Save</Button>
                

            </Grid>
    )
}
export default AddNewType;