import React, { useEffect, useState } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDatePicker } from "@material-ui/pickers";
import FakeList from '../../../data/FakeList.json'
import AlertWindow from '../../common/AlertWindow';
const useStyles=makeStyles((theme)=>({
    title:{
        fontFamily:"Comfortaa, cursive",
        fontSize:"20px",
        marginBottom:"2rem",
        fontWeight:600  
    },
    textField:{
        width:"90%",
        marginBottom:"1rem",
    },
    block1:{
        width:"47.5%",
        marginBottom:"1rem",
        marginRight:"0.75vw",
    },
    block2:{
        width:"47.5%",
        marginBottom:"1rem",
        marginLeft:"0.75vw",
    },
    date:{
        width:"90%",
        marginBottom:"1rem",
    },
    button:{
        marginTop:"1rem",
        marginBottom:"1rem",
        backgroundColor:"#004C99",
        color:"white",
        '&:hover': {
            backgroundColor: "#0066CC",
        },
    }
}))

function AddAirline(props)
{
    useEffect(()=>{
        getData();
    },[]);
    
    const classes=useStyles();
    const [list,setList]=useState([]);
    const [openAlert,setOpenAlert]=useState(false);
    const [errors,setErrors]=useState({});
    const [firstLetter,setFirstLetter]=useState("");

    const [founded,setFounded]=useState(new Date());
    const [name,setName]=useState("");
    const [description,setDescription]=useState("");
    const [ICAO,setICAO]=useState("");
    const [IATA,setIATA]=useState("");
    const [country,setCountry]=useState("");
    const [baseHub,setBaseHub]=useState("");
 
    //postavljenje datuma osnutka kompanije
    const handleDateChange=(date)=>{
        setFounded(date);
    }
    //dobivanje prvog slova kompanije da ga mozemo ubacit u tocnu listu
    const getFirstLetter=(name)=>{
        var letter;
        letter=name.charAt(0);
        return letter;
    }  
    //zahtjevamo da je prvo slovo imena veliko + obavezno da su uneseni IATA i ICAO
    const validation=()=>{
        let temp={};
        if(name.charAt(0)!==name.charAt(0).toUpperCase())
        {
            temp.nameText="First char must be upper case!";
            temp.nameError=true;
        }
        if(name===""){
            temp.nameText="Name is required!";
            temp.nameError=true;
        }
        if(IATA===""){
            temp.IATAText="IATA is required!";
            temp.IATAError=true;
        }

        if(ICAO===""){
            temp.ICAOText="ICAO is required!";
            temp.ICAOError=true;
        }
        
        if(description===""){
            temp.descriptionText="Description is required!";
            temp.descriptionError=true;
        }
        if(country===""){
            temp.countryText="Description is required!";
            temp.countryError=true;
        }
        if(baseHub===""){
            temp.basehubText="BaseHub is required!";
            temp.basehubError=true;
        }
        
        
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x=>x=="")
    }
    //dohvat vec prije unesenih lista u bazu
    const getData=async()=>{
        const settings={
            method:'GET',
            mode:'cors',
            headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json'},
            credentials:'include'
        }
        const res=await fetch('http://localhost:5000/api/list',settings);
        const data=await res.json();
        setList(data);
    }
    let first;
    //spremanje novog aviona
    const Submit= async(e)=>{
        if(validation()){
            e.preventDefault();
            //trazenje prvog slova kompanije za unos u tu listu
            first=getFirstLetter(name);
            setFirstLetter(first);

            //provjera jeli slovo vec uneseno u listu ako nije treba izbacit prozor da unese prvo slovo
            if(list.find(list=>list.name===first))
            {
                const data=list.find(list=>list.name===first);//opet trazimo tu listu da bi dobili njen id i ubacili avion u nju
                const Fetchflag=await fetch(`https://restcountries.eu/rest/v2/name/${country}?fields=flag`)
                const FetchLogo=`https://content.airhex.com/content/logos/airlines_${IATA}_350_100_r.png`;
                const dataFlag=await Fetchflag.json();
                const imgPath=dataFlag[0].flag;
                let object={
                    name:name,
                    description:description,
                    ICAO:ICAO,
                    IATA:IATA,
                    founded:founded,
                    country:country,
                    baseHub:baseHub,
                    numOfAircraft:0,
                    imgPath:imgPath,
                    logoPath:FetchLogo,
                    list_id:parseInt(data.id),
                    user_id:1,
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
                const res=await(await fetch('http://localhost:5000/api/company/AddCompany',settings).catch(handleError)).json();
                if(res===200){
                    props.setOpenPopUp(false);
                    props.handleIndex(1);
                    props.setOpenSnackbar(true);
                }
                else{
                    props.handleText(res.error.message);
                    props.handleIndex(5);
                    props.setOpenSnackbar(true);
                }
            } 
            else{
                setOpenAlert(true);
            }   
        } 
        
    }
    var handleError = function (err) {
        console.warn(err);
    };
    

    return(
        <div>
        <AlertWindow openAlert={openAlert} setOpenAlert={setOpenAlert} text1="Please insert the list with the first letter" text2="to insert new company!" letter={firstLetter}/>
        <Grid container  md={12} lg={12} alignItems="center" direction="column" justify="space-between" spacing={2}>
            <Typography className={classes.title}>Insert new airline company</Typography>
            
            <TextField
                className={classes.textField}
                id="outlined-basic-name" 
                label="Name" 
                variant="outlined" 
                autoComplete="off"
                onChange={(e)=>setName(e.target.value)}
                error
                {...({error:errors.nameError,helperText:errors.nameText})}/>
            <TextField
                className={classes.textField}
                id="outlined-basic-description" 
                label="Company description" 
                multiline
                variant="outlined" 
                autoComplete="off"
                onChange={(e)=>setDescription(e.target.value)}
                error
                {...({error:errors.descriptionError,helperText:errors.descriptionText})}/>
            <Grid xs={12} md={12} lg={12} direction="column" style={{width:"90%"}}>
                <TextField
                    className={classes.block1}
                    id="outlined-basic-ICAO" 
                    label="ICAO" 
                    variant="outlined" 
                    autoComplete="off"
                    onChange={(e)=>setICAO(e.target.value)}
                    error
                    {...({error:errors.ICAOError,helperText:errors.ICAOText})}/>
                <TextField
                    className={classes.block2}
                    id="outlined-basic-IATA" 
                    label="IATA" 
                    variant="outlined" 
                    autoComplete="off"
                    onChange={(e)=>setIATA(e.target.value)}
                    error
                    {...({error:errors.IATAError,helperText:errors.IATAText})}/>
            </Grid>
            <Grid xs={12} md={12} lg={12} direction="column" style={{width:"90%"}}>
                <TextField
                    className={classes.block1}
                    id="outlined-basic-country" 
                    label="Country" 
                    variant="outlined" 
                    autoComplete="off"
                    onChange={(e)=>setCountry(e.target.value)}
                    error
                    {...({error:errors.countryError,helperText:errors.countryText})}/>
                <TextField
                    className={classes.block2}
                    id="outlined-basic-baseHub" 
                    label="BASE HUB" 
                    variant="outlined" 
                    autoComplete="off"
                    onChange={(e)=>setBaseHub(e.target.value)}
                    error
                    {...({error:errors.basehubError,helperText:errors.basehubText})} />
            </Grid>
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <KeyboardDatePicker style={{marginTop:10}} 
                    className={classes.date}
                    fullWidth
                    inputVariant="outlined"
                    margin="normal"
                    id="date-picker-dialog"
                    label="Founded"
                    format="dd/MM/yyyy"
                    value={founded}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>
            <Button variant="contained" className={classes.button} onClick={(e)=>Submit(e)}>Save</Button>
           
        </Grid>
        </div>
    )
}
export default AddAirline;