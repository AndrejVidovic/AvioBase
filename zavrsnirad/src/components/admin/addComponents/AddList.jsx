import React, { useEffect, useState } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import fakeList from '../../../data/FakeList.json';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    width:"50%",
    marginBottom:"2rem",
  },
  title:{
    fontFamily:"Comfortaa, cursive",
    fontSize:"20px",
    marginBottom:"1rem",
    fontWeight:600   
  },
  subtitle:{
    fontFamily:"Comfortaa, cursive",
    fontSize:"15px",
    marginBottom:"1rem",
    fontWeight:500  
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

function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function AddList(props)
{   
    useEffect(()=>{
      getData();
    },[]);
    
    //provjeravamo koja su slova slobodna za unos nove liste
    const FreeLetters=()=>{
      let temp=[];
      for(let i=65; i<91; i++) {
        if( InsertedList.find(list => list.name===String.fromCharCode(i)))
          console.log("tu sam")
        else {
          temp.push(String.fromCharCode(i))
        }
      }          
      return temp;
      
    }
    const classes=useStyles();
    const [InsertedList,setInsertedList]=useState([]);//nazivi dosad unesenih lista!
    const list=FreeLetters();//lista preostalih slova koje nismo unijeli!
    const [name,setName]=useState("");// spremamo naziv nove liste koju unosimo

    //funkcija za spremanje nove liste ADMIN ID CEMO DOBIT IZ REQ.SESSION
    const handleSave= async()=>{
        let object={
          name:name,
        };
        const settings={
          method:'POST',
          mode:'cors',
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json'},
          body:JSON.stringify(object),
          credentials:'include'
        };
        const res=await fetch('http://localhost:5000/api/list/addList',settings);
        if(res.status===200)
        {
          props.setOpenPopUp(false);
          props.handleIndex(4);
          props.setOpenSnackbar(true);

        }
        else{
          props.handleIndex(5);
          props.setOpenSnackbar(true);
        } 
    }

    const getData=async()=>{
      const fetchOptions={
        method:'GET',
        headers: { 'Content-Type': 'application/json'},
        mode:'cors',
        credentials:'include'
      };
      const res=await fetch('http://localhost:5000/api/list',fetchOptions);
      const data=await res.json();
      setInsertedList(data);
    }
    

    return(
        <Grid container alignItems="center" direction="column">
            <Typography className={classes.title}>SELECT NEW LIST</Typography>
            <Typography className={classes.subtitle}>You need to choose first letter for list name</Typography>
            <FormControl className={classes.formControl} >
                <InputLabel id="demo-mutiple-name-label"></InputLabel>
                <Select
                    labelId="demo-mutiple-name-label"
                    id="demo-mutiple-name"     
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    MenuProps={MenuProps}
                    
                >
                {list.map((lists) => (
                  <MenuItem key={lists} value={lists} >
                    {lists}
                  </MenuItem>
                ))}
                </Select>
            </FormControl>
            <Button  variant="contained" className={classes.button} onClick={handleSave}>Save</Button>
        </Grid>
    )
}
export default AddList;