import React from 'react';
import LoginForm from '../components/common/LoginForm';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const vertAlign = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
}
const align={
    width: "100%",
    height: "55vh",
}
const text={
    justifyContent: "center",
    marginTop:"10em",
    fontFamily:"Montserrat, sans-serif",
    fontWeight: 600,
}
const text1={
    justifyContent: "center",

    fontFamily:"Montserrat, sans-serif",
    fontWeight: 600,
}


function Login(props) {
    return (
        <div>
        <Grid>
            <Typography style={{...text}}>Login only for admin purposes</Typography>
            <Typography style={{...text1}}>For users you do not need to login</Typography>
        </Grid>
        <div style={{...align,...vertAlign}}> 
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={11} sm={6} md={4} lg={3}>
                    <Paper elevation={3} style = {{ ...vertAlign}}>
                       <LoginForm pageProps={props}/>
                    </Paper>
                </Grid>
            </Grid>
        </div></div>
    );
}

export default Login;