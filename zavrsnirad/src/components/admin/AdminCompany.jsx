import React, {useEffect, useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Button, Divider, Grid, Paper, TextField, Typography } from '@material-ui/core';
import CustomAccordion from './Accordion';
import FakeCompany from '../../data/FakeCompany.json';
import FakeFleet from '../../data/FakeFleet.json';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useDispatch, useSelector } from 'react-redux';
import MySnackbar from '../common/Snackbar';
const UseStyles=makeStyles((theme)=>({
    name:{
        fontFamily:"Comfortaa, cursive",
        fontSize:"20px",
        marginBottom:"1rem",
        fontWeight:600  
    },
    grid:{
        marginTop:"1rem",
        marginBottom:"1rem",
        width:"90%"
    },
    textField:{
        margin:"1rem",
        width:"90%"
    },
    textField2:{
        margin:"1rem",
        width:"90%"
    },
    textField1:{
        marginTop:"0rem",
        marginBottom:"1rem",
        marginLeft:"0.5rem",
        marginRight:"0.5rem",
        width:"50%"
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
}))
function AdminCompany(props)
{
    const classes=UseStyles();
    const [fakeFleet,setFakeFleet]=useState({});
    const [name,setName]=useState(props.company.name);
    const [description,setDescription]=useState(props.company.description);
    const [IATA,setIATA]=useState(props.company.IATA);
    const [ICAO,setICAO]=useState(props.company.ICAO);
    const [baseHub,setBaseHub]=useState(props.company.baseHub);
    const [founded,setFounded]=useState(props.company.founded);
    const [country,setCountry]=useState(props.company.country);
    const [numOfAircraft,setNumOfAircraft]=useState(props.company.numOfAircraft);
    const [list_id,setList_id]=useState(props.company.list_id);
    const [user_id,setUser_id]=useState(props.company.user_id);
    const id=useSelector(state=>state.company);
   
    const Submit=async()=>{
        var imgPath;
        if(props.company.country!=country)
        {
            const Fetchflag=await fetch(`https://restcountries.eu/rest/v2/name/${country}?fields=flag`)
            const dataFlag=await Fetchflag.json();
            imgPath=dataFlag[0].flag;
        }
        else{
            imgPath=props.company.imgPath;
        }
        const object={
            id:id,
            name:name,
            description:description,
            ICAO:ICAO,
            IATA:IATA,
            founded:founded,
            country:country,
            baseHub:baseHub,
            numOfAircraft:numOfAircraft,
            imgPath:imgPath,
            user_id:user_id,
            list_id:list_id,
        }
        const settings={
            method:'PUT',
            mode:'cors',
            headers: { 
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(object),
            credentials:'include'
        }
        const res=await fetch('http://localhost:5000/api/company/UpdateCompany',settings);
        if(res.status===200){
            props.refresh();
            props.setOpenPopUp(false);
            props.handleIndex(1);
            props.setOpenSnackbar(true);
            
        }
        else{
            props.handleIndex(0);
            props.setOpenSnackbar(true);
        }
        
    }
        
    return (
        <Grid xs={12} md={12} lg={12} container style={{display: "flex", flexDirection: "column", alignItems:"center"}}>
                <Typography className={classes.name}>{name}</Typography>
                <TextField id="outlined-basic-description"  multiline className={classes.textField2} defaultValue={description} variant="outlined" label="description" onChange={(e)=>setDescription(e.target.value)}></TextField>
            <Grid xs={11} md={11} lg={12} style={{display: "flex", flexDirection: "row", alignItems:"center"}} className={classes.grid}>
                <TextField defaultValue={IATA} id="outlined-basic-IATA"  variant="outlined" label="IATA" className={classes.textField} onChange={(e)=>setIATA(e.target.value)}></TextField>
                <TextField defaultValue={ICAO} id="outlined-basic-ICAO"  variant="outlined" label="ICAO" className={classes.textField} onChange={(e)=>setICAO(e.target.value)}></TextField>
            </Grid>
            <Grid xs={12} md={6} lg={12} style={{display: "flex", flexDirection: "row", alignItems:"center"}} className={classes.grid}>
                <TextField defaultValue={baseHub} id="outlined-basic-baseHub"  variant="outlined" label="BaseHub" className={classes.textField1} onChange={(e)=>setBaseHub(e.target.value)}></TextField>
                <TextField  defaultValue={country} id="outlined-basic-country"  variant="outlined" label="Country" className={classes.textField1} onChange={(e)=>setCountry(e.target.value)}></TextField>
                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <KeyboardDatePicker
                    className={classes.textField1}
                    style={{marginTop:0}}
                    fullWidth
                    inputVariant="outlined"
                    margin="normal"
                    id="date-picker-dialog"
                    label="Founded"
                    format="dd/MM/yyyy"
                    value={founded}
                    onChange={(e)=>setFounded(e.target.value)}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>  
            </Grid>
            <Grid style={{width:"100%", paddingBottom:"2rem"}}>
                <CustomAccordion></CustomAccordion>
            </Grid>
            <Button variant="contained" className={classes.button} onClick={Submit}>Save changes</Button>
        </Grid>
        
    )
}
export default AdminCompany;