import React, { useState } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDial from '@material-ui/lab/SpeedDial';
import EditIcon from '@material-ui/icons/Edit'
import Popup from '../common/Popup';
import AddNewType from './addComponents/AddNewType';
import AddAirline from './addComponents/AddAirline';
import AddList from './addComponents/AddList';
import AddAircraft from './addComponents/AddAircraft';
import {useSelector} from 'react-redux';
import MySnackbar from '../common/Snackbar';

const useStyles = makeStyles((theme) => ({
    speedDial:{
        marginRight: 0,
        marginLeft: "auto",
        borderRadius: 25,
        color: "#FFFFFF",
        maxHeight: "25",
        position: "fixed",
        bottom: "3rem",
        right: "3rem"
      },
    }));

function AddFunction(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openPopUp,setOpenPopUp]=React.useState(false);//otvara popup za dodavanje novih operacija
    const [index,setIndex]=useState(0);
    const [snackIndex,setSnackIndex]=useState(0);
    const [openSnackbar,setOpenSnackbar]=useState(false);
    const [text,setText]=useState("Something went wrong");
    const status=useSelector(state=>state.login);

    //akcije operacija te dodavanje istih prilikom koristenja kao admin
    let actions=[
        { icon: <Icon>flight_icon</Icon>, name: 'Add airline', operation: 'addAirline' },
        { icon: <Icon>flight_takeoff_icon</Icon>, name: 'Add aircraft', operation: 'addAircraft' },
        { icon: <Icon>add_icon</Icon>, name: 'New type ', operation: 'addType' },
    ]
    if(status=="admin"){
       actions.push({icon: <Icon>list_icon</Icon>, name: 'Add list', operation: 'addList'});
       actions.push({icon: <Icon>person_add_icon</Icon>, name: 'Add admin', operation: 'addAdmin'});
    }
     
    //otvara i zatvara speed dial
    const handleClose = () => {
      setOpen(false);
    };
    const handleOpen = () => {
      setOpen(true);
    };

    //indeksira odabranu operaciju
    const handleClick=(e,operation)=>{
      setOpen(false);
      e.preventDefault();
      if(operation==="addAdmin"){
        window.location.assign("/register");
      }
      if(operation=="addAircraft") setIndex(1);
      if(operation=="addList") setIndex(2);
      if(operation=="addAirline") setIndex(3);
      if(operation=="addType") setIndex(4);
      setOpenPopUp(true);
    }

    //zatvara popup nakon uspjesno odradene operacije
    const closePopUp=()=>{
      setOpenPopUp(false);
      setIndex(0);
    }

    //zatvara snackbarove
    const handleCloseSnackbar=()=>{
      setOpenSnackbar(false);
    }

    return (
        <div className={classes.speedDial}>
          <SpeedDial
            ariaLabel="Speed Dial"
            className={classes.speedDial}
            icon={<SpeedDialIcon openIcon={<EditIcon/>}/>}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction="up"
            
          >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={(e)=>handleClick(e,action.operation)}
              tooltipPlacement="left"
            />
          ))}
          </SpeedDial>
          {
            openPopUp && index ===1 ? <Popup clickAway={false} openPopUp={openPopUp} setOpenPopUp={closePopUp} style={{minWidth:'35%'}}>
              <AddAircraft setOpenPopUp={closePopUp} closeSpeedDial={handleClose} handleIndex={setSnackIndex} setOpenSnackbar={setOpenSnackbar} handleText={setText}/>
            </Popup> :null
          }
          {
            openPopUp && index ===2 && status=='admin'? <Popup clickAway={false} openPopUp={openPopUp} setOpenPopUp={closePopUp} style={{minWidth:'30%'}}>
              <AddList setOpenPopUp={closePopUp} handleIndex={setSnackIndex} setOpenSnackbar={setOpenSnackbar} handleText={setText}/>
            </Popup> :null
          }{       
            openPopUp && index ===3 ? <Popup clickAway={false} openPopUp={openPopUp} setOpenPopUp={closePopUp} style={{minWidth:'40%'}}>
              <AddAirline setOpenPopUp={closePopUp} handleIndex={setSnackIndex} setOpenSnackbar={setOpenSnackbar} handleText={setText}/>
            </Popup> :null
          }{
            openPopUp && index ===4 ? <Popup clickAway={false} openPopUp={openPopUp} setOpenPopUp={closePopUp} style={{minWidth:'25%'}}>
              <AddNewType setOpenPopUp={closePopUp} handleIndex={setSnackIndex} setOpenSnackbar={setOpenSnackbar} handleText={setText}/>
            </Popup> :null
          }
          {
            openSnackbar&&snackIndex===1?<MySnackbar text="Company succesfully added!" severity='success' open={openSnackbar} handleClose={handleCloseSnackbar}/>
            :null
          }
          {
            openSnackbar&&snackIndex===2?<MySnackbar text="Company type succesfully added!" severity='success' open={openSnackbar} handleClose={handleCloseSnackbar}/>
            :null
          }
          {
            openSnackbar&&snackIndex===3?<MySnackbar text="Aircraft succesfully added!" severity='success' open={openSnackbar} handleClose={handleCloseSnackbar}/>
            :null
          }
          {
            openSnackbar&&snackIndex===4?<MySnackbar text="List succesfully added!" severity='success' open={openSnackbar} handleClose={handleCloseSnackbar}/>
            :null
          }
          {
            openSnackbar&&snackIndex===5?<MySnackbar text={text} severity='error' open={openSnackbar} handleClose={handleCloseSnackbar}/>
            :null
          }
        </div>
    );
  }
export default AddFunction; 