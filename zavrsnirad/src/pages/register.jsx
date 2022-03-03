import React from 'react';
import RegisterForm from '../components/common/RegisterForm';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import backgroundIMG from '../images/background.png';
import { makeStyles } from '@material-ui/core';

const vertAlign = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
}
const background = {
    width: "100%",
    height: "100vh",
    backgroundImage: "url("+backgroundIMG+")" ,
    backgroundSize: "cover",
    backgroundPosition: "fixed",
    backgroundAttachment: "fixed",
    backgroundRepeat: "repeat-y",
}

function register(props) {
    
    return (
        <div>
        <div style={{...background,...vertAlign}}> 
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={11} sm={6} md={4} lg={3}>
                    <Paper elevation={4} style = {{ ...vertAlign}}>
                       <RegisterForm pageProps={props}/>
                    </Paper>
                </Grid>
            </Grid>
        </div></div>
    );
}

export default register;