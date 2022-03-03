import { ClickAwayListener, Dialog, DialogContent, DialogTitle, Typography } from "@material-ui/core";
import React, {useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
const useStyles=makeStyles(theme=>({
    dialogWrapper:{
        textAlign:'center'
    },
    title:{
        textAlign:'center',
        flexGrow:1,
        paddingTop:'2vh'
    },
    content:{
        padding:'2vh',
        paddingTop:'1vh'
    }
}));
function AlertWindow(props){
    const classes=useStyles();
    const close=()=>{
        props.setOpenAlert(false);
    }
    return(
        <Dialog open={props.openAlert} style={{paper:classes.dialogWrapper}}>
        <ClickAwayListener onClickAway={close}>
            <div>
                <DialogTitle>
                    <div style={{display:'flex'}}>
                        <Typography variant="h5" component="div" className={classes.title}>List does not exists!</Typography>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div>
                        <Typography variant="body1" component="div" className={classes.content}>{props.text1} {props.letter} {props.text2}</Typography>
                    </div>
                </DialogContent>
            </div>
        </ClickAwayListener>
    </Dialog>

    )
}
export default AlertWindow;