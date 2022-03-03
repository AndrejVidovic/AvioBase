import React, {useEffect, useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Button,  Grid, TextField, Typography, } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles=makeStyles((theme)=>({
    title:{
        fontFamily:"Comfortaa, cursive",
        fontSize:"20px",
        marginBottom:"1rem",
        fontWeight:600  
    },
    formControl:{
        marginBottom:"2vh"   
    },
    textfield:{
        marginBottom:"2vh",
        [theme.breakpoints.down('sm')]: {
            marginBottom:"1em",
          },
    },
    subtitle:{
        fontFamily:"Montserrat, sans-serif",
        fontSize:"20px",
        fontWeight:400,
        marginBottom:"2vh",
    },
    left:{
        marginRight:"1vh",
        [theme.breakpoints.down('sm')]: {
            marginRight:"0em",
            marginBottom:"1em",
          },
    },
    right:{
        marginLeft:"1vh",
        [theme.breakpoints.down('sm')]: {
            marginLeft:"0em",
            marginBottom:"1em",
          },
    },
    button:{
        marginBottom:"2vh",
        backgroundColor:"#004C99",
        color:"white",
        '&:hover': {
            backgroundColor: "#0066CC",
        },
    }
}))

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

function AddAircraft(props)
{
    useEffect(()=>{
        getData();
    },[]);
    
    const classes=useStyles();
    const [aircraft,setAircraft]=useState("");
    const [registration,setRegistration]=useState("");
    const [old,setOld]=useState(0);
    const [errors,setErrors]=useState({});
    const [CompanyTypeList,setCompanyTypeList]=useState([]);
    const [pair,setPair]=useState(0);//pair je type_id tj id od tipa u koji unosimo novi avion
    
    //sprema vrijednost id od tipa u kojeg unosimo novi avion
    const Save=(data)=>{
        setPair(data.type_id);
    }
    const validation=()=>{
        let temp={};
        if(aircraft=="")
        {
            temp.aircraftText="Aircraft is required!";
            temp.aircraftError=true;
        }
        if(registration=="")
        {
            temp.registrationText="Aircraft is required!";
            temp.registrationError=true;
        }
        if(old=="")
        {
            temp.oldText="Aircraft is required!";
            temp.oldError=true;
        }

        setErrors({
            ...temp
        })
        return Object.values(temp).every(x=>x=="")
    }

    // unosimo novi avion u listu
    const submit=async ()=>{
        if(validation())
        {
            let object={
                name:aircraft,
                registration:registration,
                old:old,
                type_id:pair,
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
            const res=await(await fetch('http://localhost:5000/api/aircraft/AddAircraft',settings).catch(handleError)).json();
            if(res===200){
                props.handleIndex(3);
                props.setOpenSnackbar(true);
                props.setOpenPopUp(false);
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
    const getData=async()=>{
        const fetchOptions={
            method:'GET',
            headers: { 'Content-Type': 'application/json'},
            mode:'cors',
            credentials:'include'
        };
        const res=await fetch('http://localhost:5000/api/type/companies');
        const data=await res.json();
        
        data.sort(function(a, b){
            if(a.company_name < b.company_name) { return -1; }
            if(a.company_name > b.company_name) { return 1; }
            return 0;
        })
        setCompanyTypeList(data);
    };

   
    return(
        <Grid    container alignItems="center" direction="column" justify="space-between"   spacing={2}>
            <Typography className={classes.title}>Insert aircraft into</Typography>
            <Autocomplete
                onChange={(event, value) => Save(value)}
                className={classes.formControl}
                id="combo-box-demo"
                options={CompanyTypeList}
                getOptionLabel={(option) => option.company_name + " " +option.type_name}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="select company and type" variant="outlined" />}
            />
            <Typography className={classes.subtitle}>Aircraft info</Typography>
            <Grid  xs={6} md={12}className={classes.formControl}>
                <TextField
                    className={classes.left}
                    id="outlined-basic-aircraft" 
                    label="aircraft" 
                    variant="outlined" 
                    autoComplete="off"
                    onChange={(e)=>setAircraft(e.target.value)}
                    error
                    {...({error:errors.aircraftError,helperText:errors.aircraftText})}
                />
                <TextField  
                    className={classes.right}     
                    id="outlined-basic-registration" 
                    label="registration" 
                    variant="outlined" 
                    autoComplete="off"
                    onChange={(e)=>setRegistration(e.target.value)}
                    error
                    {...({error:errors.registrationError,helperText:errors.registrationText})}
                />
            </Grid>
                <TextField
                    className={classes.textfield}       
                    id="outlined-basic-old" 
                    label="years" 
                    variant="outlined" 
                    autoComplete="off"
                    onChange={(e)=>setOld(parseFloat(e.target.value))}
                    error
                    {...({error:errors.oldError,helperText:errors.oldText})}
                />
            <Button variant="contained" className={classes.button} onClick={submit}>Insert</Button>
        </Grid>
    )

}
export default AddAircraft;
/*<FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Select company and aircraft type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    MenuProps={MenuProps}
                    onChange={(e)=>setPair(e.target.value)}

                >
                {CompanyTypeList.map((pair) => (
                    <MenuItem key={pair.company_id, pair.type_id} value={pair}>
                        <ListItemText primary={`${pair.company_id} - ${pair.company_name}: ${pair.type_name}`} />
                    </MenuItem>
                ))}
                </Select>
            </FormControl>*/