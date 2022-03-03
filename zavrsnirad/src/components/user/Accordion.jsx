import React, {useEffect, useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { Button, Divider, Grid, Paper, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FakeFleet from'../../data/FakeFleet.json';
import { useSelector } from 'react-redux';

function CustomAccordion(props){

    useEffect(()=>{
      getData()
    },[]);

    const [fleet,setFleet]=useState([]);
    const companyID=useSelector(state=>state.company);

    const getData=async()=>{
      const fetchOptions={
        method:'GET',
        headers: { 'Content-Type': 'application/json'},
        mode:'cors',
        credentials:'include'
      };
      const res=await fetch(`http://localhost:5000/api/aircraft/type/${companyID}`,fetchOptions);
      const data=await res.json();
      setFleet(data);
    }
    return(
        <div style={{width:"100%"}}>{
        fleet.map((data)=>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography >{data.type_name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Grid  container direction="row" justify="center" alignItems="center" spacing={1}>
                <Grid container item md={11} xs={8} direction="column" justify="flex-start" alignItems="flex-start">
                    {
                        data.subtypes.map((subtype, index)=> <Grid key={index} style={{display: "flex", flexDirection: "row", alignItems:"center"}}>
                            <Typography style={{color:"grey", marginLeft:"2rem"}}>{subtype.aircraft_name}</Typography>
                            <Typography style={{color:"grey", marginLeft:"27vh"}}>registration: {subtype.aircraft_registration}</Typography>
                            <Typography style={{color:"grey", marginLeft:"5vh"}}>{subtype.aircraft_old} years</Typography>
                            </Grid>)
                    }
                </Grid>
                <Grid container item md={3} xs={4} direction="row" justify="flex-end" alignItems="center"> 
                </Grid>
                   
                </Grid>
        </AccordionDetails>
      </Accordion>
      )
                }
      </div>
    )
}
export default CustomAccordion;