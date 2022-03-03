import React,{useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Grid, Typography ,Button} from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import Airbus from '../../images/airbus.png';
import Croatia from '../../images/CroatiaAirlines.png';
import logo from '../../images/images.png';
import backgroundIMG from '../../images/background.png'
import AlertWindow from '../common/AlertWindow';
//za probu redux
//import {useSelector} from 'react-redux'

const useStyles = makeStyles((theme) => ({
    background:{
        backgroundImage:"url("+backgroundIMG+")",
        backgroundSize: "cover",
        backgroundPosition: "fixed",
        backgroundAttachment: "fixed",
        backgroundRepeat: "repeat-y",
        width: "100%",
        [theme.breakpoints.down('sm')]: {
          minHeight: "100vh",
          overflowY: "show",
  
        },
        [theme.breakpoints.up('md')]: {
          minHeight: "100vh",
        },
      },
    cont1:{
        [theme.breakpoints.down('sm')]: {
            padding:"6em 0 6em 0",
            flexDirection:'column',
          },
          [theme.breakpoints.up('md')]: {
            padding:"20vh 0 15vh 0",
            flexDirection:'row'
          },
    },
    textSpan:{
        fontFamily:"Montserrat, sans-serif",
        fontSize:"30px",
        fontWeight:600,
    },
    textP:{
        fontFamily:"Montserrat, sans-serif",
        fontSize:"17px",
        fontWeight:200,
    },
    block:{
        paddingLeft:"5vw",
    },
    cont2:{
        [theme.breakpoints.down('sm')]: {
            padding:"0 0 5em 0",
            flexDirection:'column',
          },
          [theme.breakpoints.up('md')]: {
            padding:"0 0 15vh 0",
            flexDirection:'row'
          },
    },
    cont3:{
        [theme.breakpoints.down('sm')]: {
            padding:"0 0 2em 0",
            flexDirection:'column',
          },
          [theme.breakpoints.up('md')]: {
            padding:"0 0 10vh 0",
            flexDirection:'row'
          },
    },

}))

function Home(){
    const classes=useStyles();
    let items=[Airbus,Croatia,logo];
    return(
        <div className={classes.background}>
            <Grid container justify="center" alignItems="center" className={classes.cont1}>
                <Grid item xs={8} md={5}>
                    <span className={classes.textSpan}>Dobrodošli na AvioBase</span>
                    <p className={classes.textP}>Stranica posvecena svim ljubiteljima aviona. Veliki broj kompanija i podataka o njima.</p>
                </Grid>
            </Grid>
            <Grid container justify="center" alignItems="center" className={classes.cont2}>
                <Grid item xs={8} md={5}>
                    <Carousel navButtonsAlwaysInvisible={true} animation={"slide"} autoPlay={true} interval={2500} timeout={400}>
                        {
                            items.map( (item, i) => <img alt="slika" key={i} src={item}/> )
                        }
                    </Carousel>
                </Grid>    
            </Grid>
            <Grid container justify="center" alignItems="center" className={classes.cont3}>
                <Grid item xs={8} md={5}>
                    <span className={classes.textSpan}>Zasto koristit nas?</span>
                    <p className={classes.textP}>Besplatna stranica kod koje ne trebate ni login. Nparavljena je za jednstavno korištenje i pretraživanje podataka</p>
                </Grid>
                <Grid item xs={8} md={5} >
                    <span className={classes.textSpan}>O AvioBase</span>
                    <p className={classes.textP}>AvioBase je stranica napravljena od strane ljubitelja aviona te je u sadržaj stranice uključeno samo najbitniji podatci bez komplikacija.</p>
                </Grid>
            </Grid>
        </div>
        
    )
}
export default Home;