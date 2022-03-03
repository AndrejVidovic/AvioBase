import React, {useEffect, useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Button, colors, Divider, Grid, Paper, Typography } from '@material-ui/core';
import CustomAccordion from './Accordion';
import FakeCompany from '../../data/FakeCompany.json';
import { useDispatch, useSelector } from 'react-redux';

const UseStyles=makeStyles((theme)=>({
    name:{
        fontFamily:"Comfortaa, cursive",
        fontSize:"20px",
        marginBottom:"1rem",
        fontWeight:600  
    },
    description:{
        fontFamily:"Montserrat, sans-serif",
        fontSize:"17px",
        paddingLeft:"2rem",
        paddingRight:"2rem",
        paddingBottom:"1rem",
        textAlign:"center",
        borderRadius:"20px"
        
    },
    paper:{
        //paddingLeft:"5vh",
       // paddingRight:"5vh",
        padding:" 2vh 5vh 2vh 5vh",
        backgroundColor:"#FFB266",
        marginLeft:"2vh",
        fontFamily:"Montserrat, sans-serif",
        fontSize:"14px",
        borderRadius:20,
        
    },
    grid:{
        marginTop:"1rem",
        marginBottom:"1rem",
    },
    proba:{
        width:"50px",
    }
}))
function Company(props)
{
    /*useEffect(()=>{
        fetchData();
    },[]);*/
    
    const classes=UseStyles();
    const [company,setCompany]=useState({});
    const companyID=useSelector(state=>state.company)
   /* const fetchData=async()=>{
        const fetchOptions={
            method:'GET',
            headers: { 'Content-Type': 'application/json'},
            mode:'cors',
            credentials:'include'
        };
        const res=await fetch(`http://localhost:5000/api/company/${companyID}`,fetchOptions);
        const data=await res.json();
        setCompany(data[0]);
    }*/

    function formatDate(string){
        var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(string).toLocaleDateString('de',options);
    }
    
    var DateString=formatDate(props.company.founded);
    return (
        <Grid xs={3} md={6} lg={12} container style={{display: "flex", flexDirection: "column", alignItems:"center"}}>
            <Grid style={{display: "flex", flexDirection: "column", alignItems:"center"}}>
                <Typography className={classes.name}>{props.company.name}</Typography>
                <Typography className={classes.description}>{props.company.description}</Typography>
            </Grid>
             <Grid xs={3} md={6} lg={12} style={{display: "flex", flexDirection: "row", alignItems:"center"}} className={classes.grid}>
                <Paper className={classes.paper}>Base Hub: {props.company.baseHub}</Paper>
                <Paper className={classes.paper}>Nation: {props.company.country}</Paper>
                <Paper className={classes.paper}>Founded: {DateString}</Paper>
            </Grid>
            <Grid xs={3} md={6} lg={12} style={{display: "flex", flexDirection: "row", alignItems:"center"}} className={classes.grid}>
                <Paper className={classes.paper}>ICAO: {props.company.ICAO}</Paper>
                <Paper className={classes.paper}>IATA: {props.company.IATA}</Paper>
                <Paper className={classes.paper}>Fleet: {props.company.numOfAircraft} aircrafts</Paper>
                
            </Grid>
            <Grid xs={3} md={6} lg={12} style={{display: "flex", flexDirection: "row", alignItems:"center"}}>
                <Typography style={{fontFamily:"Montserrat, sans-serif",fontSize:"17px",}}>Fleet:</Typography>
            </Grid>
            <Grid style={{width:"100%", paddingBottom:"2rem"}}>
                <CustomAccordion ></CustomAccordion>
            </Grid>

        </Grid>
    )
}
export default Company;