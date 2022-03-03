import React, {useEffect, useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, Divider, Grid, Icon, IconButton, Paper, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FakeFleet from'../../data/FakeFleet.json';
import ConfirmDialog from '../common/ConfirmDialog';
import { useSelector } from 'react-redux';

function CustomAccordion(props){

    useEffect(()=>{
      getData();
    },[]);
    
    const [fleet,setFleet]=useState([]);
    const [typeID,setTypeID]=useState(0);
    const [item,setItem]=useState(0);//id od aviona
    const [item2,setItem2]=useState(0);//id od tipa
    const [index,setIndex]=useState(0)
    const [openPopup,setOpenPopup]=useState(false);//popup za confirm dialog
    const companyID=useSelector(state=>state.company);

    // funkcija i potvrda za brsanje odredenog tipa
    const handleDeleteType =(id)=>{
        let array=[];
        fleet.map(polje=>{if(polje.type_id!==id){array.push(polje)};});
        setFleet(array);
    }
    //funkcija koja poziva popup za potvrdu o brisanju tipa aviona
    const DeleteType=(id)=>{
        setTypeID(id);
        setIndex(1);
        setOpenPopup(true);
    }
    //funkcija koja poziva funkciju za brisanje tipa te istu promjenu vrsi u bazi podataka
    const requestDeleteType=async()=>{
      const settings={
        method:'DELETE',
        mode:'cors',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials:'include'
      }
      const res=await fetch(`http://localhost:5000/api/type/deleteType/${typeID}`,settings);
      if(res.status===200)
      {
        handleDeleteType(typeID);
        console.log("Tip uspjesno izbrisana");
      }
      else{
        console.log("Problem pri brisanju tipa!");
      }
    }
    //funkcija i potvrda za brisanje odredenog aviona
    const DeleteAircraft=(id,idType)=>{
    
        setItem(id);//id od aviona
        setItem2(idType);//id od tipa
        setIndex(2);
        setOpenPopup(true);
        console.log("aircraft id " + id + "type id " + idType); 
    }
    const requestDeleteAircraft=async()=>{ 
     const settings={
        method:'DELETE',
        mode:'cors',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials:'include'
      }
      const res=await fetch(`http://localhost:5000/api/aircraft/delete/${item}`,settings);
      if(res.status===200){
        handleDeleteAircraft(item, item2);  
      }
      else{
        console.log("problem pri brisanju aviona!");
      }
    }

    const handleDeleteAircraft =(idAircraft,idType)=>{
      fleet.map((element) => {
            if(element.type_id==idType)
            {
             element.subtypes=element.subtypes.filter(subtype=>subtype.aircraft_id!==idAircraft);
            }
      })
      getData();
    }
    const getData=async()=>{
      const settings={
        method:'GET',
        mode:'cors',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials:'include'
      }
      const res=await fetch(`http://localhost:5000/api/aircraft/type/${companyID}`,settings);
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
          <Typography style={{marginTop:"1.2vh"}}>{data.type_name}</Typography>
          <IconButton style={{color:"#FF6666",marginLeft:"5vh"}} onClick={()=>DeleteType(data.type_id)}><DeleteIcon fontSize="small" /></IconButton>
        </AccordionSummary>
        <AccordionDetails>
            <Grid  container direction="row" justify="center" alignItems="center" spacing={1}>
                <Grid container direction="column" justify="flex-start" alignItems="flex-start">
                    {
                        data.subtypes.map((subtype, index)=> <Grid style={{display: "flex", flexDirection: "row", alignItems:"center"}}>
                            <Typography style={{color:"grey", marginLeft:"1rem"}}>{subtype.aircraft_name}</Typography>
                            <Typography style={{color:"grey", marginLeft:"4rem"}}>registration: {subtype.aircraft_registration}</Typography>
                            <Typography style={{color:"grey", marginLeft:"3rem"}}>{subtype.aircraft_old} years</Typography>
                            <IconButton style={{color:"#FF6666",marginLeft:"7rem"}} onClick={(e)=>DeleteAircraft(subtype.aircraft_id,data.type_id)}><DeleteIcon fontSize="small" /></IconButton>
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
      {index==1&&<ConfirmDialog setOpenPopup={setOpenPopup} openPopup={openPopup} text="Do you really want to delete this aircraft type?" functionToConfirm={requestDeleteType}/>}
      {index==2&&<ConfirmDialog setOpenPopup={setOpenPopup} openPopup={openPopup} text="Do you really want to delete this aircraft?" functionToConfirm={requestDeleteAircraft}/>}
      </div>
    )

}
export default CustomAccordion;