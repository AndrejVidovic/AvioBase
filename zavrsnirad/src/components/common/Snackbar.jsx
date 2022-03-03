import React, {useEffect, useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
function MySnackbar(props){
    return(
        <Snackbar
            anchorOrigin={{ vertical:'bottom', horizontal:'right' }}
            open={props.open}
            onClose={props.handleClose}
            autoHideDuration={4000}
        >
            <Alert severity={props.severity}>{props.text}</Alert>
        </Snackbar>
    );
}
export default MySnackbar;