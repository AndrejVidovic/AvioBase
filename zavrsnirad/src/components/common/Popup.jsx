import React, { useState } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import { ClickAwayListener, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
const useStyles=makeStyles(theme=>({
    dialogWrapper:{
        // position:'absolute',
        textAlign: 'center',
        padding:"1em",
        borderRadius:"7px",
        maxWidth:"100% !important",
    },
    dialogTitle:{
        backgroundColor:"white",
        borderRadius:" 7px 7px 0 0",
        height:"auto",
        paddingBottom:"0",  
    },
    dialogContent:{
        borderRadius:" 0 0 7px 7px",
        paddingTop:"10px",
        height:"70%"

    },
}));
function Popup(props)
{
    const classes=useStyles();
    return(
            <Dialog open={props.openPopUp} className={{papper: classes.dialogWrapper}} PaperProps={{style: props.style}}>
                <ClickAwayListener onClickAway={props.clickAway && props.setOpenPopUp(false)}>
                    <div>
                        <DialogTitle className={classes.dialogTitle}>
                            <div style={{display:'flex', flexDirection:"row", justifyContent:"flex-end"}}>
                                <Icon onClick={()=>props.setOpenPopUp(false)}>close_icon</Icon>
                            </div>
                        </DialogTitle>
                        <DialogContent className={classes.dialogContent}>
                            {props.children}
                        </DialogContent>
                    </div>
                </ClickAwayListener>
            </Dialog>
    )
}
export default Popup;