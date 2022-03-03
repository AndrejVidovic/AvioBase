import React, {useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { ClickAwayListener, Dialog, DialogContent, DialogTitle, Typography,Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles=makeStyles(theme =>({
    dialogWrapper:{
        textAlign: 'center',
        padding:"1em",
        borderRadius:"7px"
    },
    questionName:{
        flexGrow:1,
        padding:"1em 0 0 2em",
        fontFamily:"Comfortaa, cursive",
        fontWeight:600,
        fontSize:"2.5vh",
    },
    questionText:{
        flexGrow:1,
        padding:"0em 0 0 1em",
        [theme.breakpoints.down('sm')]: {
            marginBottom:"2em"
        },
        fontFamily:"Montserrat, sans-serif",
        fontSize:"17px",
    },
    pickButton:{
        [theme.breakpoints.down('sm')]: {
            margin:"0.5em 0.4em 2em 0.4em",
            width:"5em"
        },
        [theme.breakpoints.up('md')]: {
            margin:"2em 0.5em",     
            width:"7em"     
        },
        padding:"0.5em 3em ",
        borderRadius:10,
        fontFamily:"Montserrat, sans-serif",
    },
    YesAndNo:{
        display:'flex',
        flexDirection:"row",
        alignItems:"center",
        flexWrap:"wrap",
        justifyContent:"center"
    },

}))
function ConfirmDialog(props)
{
    const classes=useStyles();
    
    const handleYes=()=>{
        props.functionToConfirm();
        props.setOpenPopup(false);
    };
    const handleNo=()=>{
        props.setOpenPopup(false);
    }
    return(
        <Dialog open={props.openPopup} classes={{paper: classes.dialogWrapper}}>
            <ClickAwayListener onClickAway={()=>{props.setOpenPopup(false);}}>
                <div>
                    <DialogTitle>
                        <div style={{display:'flex'}}>
                            <Typography variant="h6" component="div" className={classes.questionName}>Are you sure?</Typography>
                            <CloseIcon style={{cursor:"pointer"}} onClick={()=>props.setOpenPopup(false)}></CloseIcon>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <div>
                            <Typography variant="body1" component="div" className={classes.questionText}>{props.text}</Typography>
                            <div className={classes.YesAndNo}>
                            <Button variant="contained" onClick={handleNo} className={classes.pickButton} style={{backgroundColor:"#FFB266", color:"white"}}>No</Button>
                            <Button variant="contained" onClick={handleYes} className={classes.pickButton} style={{backgroundColor:"#004C99", color:"white"}}>Yes</Button>
                            </div>
                        </div>
                    </DialogContent>
                </div>
            </ClickAwayListener>
        </Dialog>
    )
}

export default ConfirmDialog;