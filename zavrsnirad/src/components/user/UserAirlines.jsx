import React, {useEffect, useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Grid, Link, Paper, Typography } from '@material-ui/core';
import fakeList from '../../data/FakeList.json';
import Icon from '@material-ui/core/Icon';
import backgroundIMG from '../../images/background.png'
//za probu redux
import {useDispatch} from 'react-redux'
import { ListAction } from '../../redux/actions/ListID'


const useStyles = makeStyles((theme) => ({
   root:{
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
        height:"auto",
        
    },
    title:{
        marginTop:"8rem",
        marginBottom:"5rem",
        fontFamily:"Comfortaa, cursive",
        fontWeight:600,
        fontSize:"4vh",
    },
    paper:{
        [theme.breakpoints.down('lg')]: {
            width:"15rem",
            height:"15rem",
            margin:"auto auto 1.5rem auto"
          },
          [theme.breakpoints.up('lg')]: {
            width:"15rem",
            height:"15rem",
            margin:"auto auto 2.5rem auto"
          },
          transition: "all .2s ease-in-out",
          '&:hover':{
            transform: "scale(1.02)",
            cursor:"pointer"
          },
          borderRadius:10,
    },
    block:{
        [theme.breakpoints.down('sm')]: {
            width:"90%",
            height:"auto",
            margin:"auto"      
          },
          [theme.breakpoints.between('sm', 'lg')]: {
            width:"35rem",
            height:"auto",
            margin:"auto"      
          },
          [theme.breakpoints.up('lg')]: {
            width:"70rem",
            height:"auto",
            margin:"auto"      
          },
    },
    cardContent:{
        height: "100%",
        textAlign:"center"
    },
    subtitle:{
        fontFamily:"Montserrat, sans-serif",
        marginLeft: "1rem",
        marginRight: "1rem",
        fontWeight:600
    },
    bottomButtonDiv:{
        textAlign:"center",
        transition: "all .2s ease-in-out",
        '&:hover':{
          transform: "scale(1.1)",
          cursor:"pointer"
        },
        color:"#737b7d",
      }


}));

//dobijanje imena liste zasad ne treba
/*const GetListName=(temp)=>{
    let name=[];
    name.push(temp.name);
    return name;
}*/
//oblikovanje blokova
const CardOfLists=(props)=>{
    const classes=useStyles();
    const dispatch=useDispatch();

    const HandleClickCard=(card)=>{
        props.page.history.push(`/Airlines/List/${card.name}`);
        dispatch(ListAction(card.id));
    };

    let i=0;
    let block=props.Lista.map((temp)=>{
        i++;
        return(
        <Grid key={temp.id} item xs={12} sm={6} lg={3} className={classes.paper} >
            <Paper elevation={3} className={classes.paper} style={{backgroundColor:"#004C99"}} onClick={()=>(HandleClickCard(temp))}>
                <Grid container flexdirection="row" justify="center" alignItems="center" className={classes.cardContent}>
                    <Grid item xs={12}>
                        {""}
                    </Grid>
                    <Grid item xs={12}>
                        {""}
                    </Grid>
                    <Grid item style={{backgroundColor:"white" ,width:"100px",height:"100px",borderRadius: 10,textAlign: "center",lineHeight: "100px", color: "black" ,fontSize: "2rem",fontWeight: "bold",display: "block"}}>
                        {temp.name}
                    </Grid>
                    <Grid item xs={12} className={classes.subtitle}>
                        {"Lists of airlines with first letter "+ temp.name}
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
       )
    });
    return block;

};

function UserAirlines(props){

    useEffect(() => {
        getData()
    }, []);
    
    const classes=useStyles();
    const [lists, setLists]=useState([]);
    const [BlockNumbers,setBlockNumbers]=useState();
    const [currentBlockVisible,setCurrentBlockVisible]=useState(()=>0);
    const getData = async () => {
        const fetchOptions={
            method:'GET',
            headers: { 'Content-Type': 'application/json'},
            mode:'cors',
            credentials:'include'
        };
        const res = await fetch('http://localhost:5000/api/list');
        const data = await res.json();
        
        data.sort(function(a, b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        })
        setLists(data);  
        setBlockNumbers((data.length+8-(data.length%8))/8);
    }

    //za prikaz vise/manje blokova
    function handleScroll(num,upDown) {
        //up je true down je false
         if(upDown){window.scrollTo({ behavior: 'smooth', top: (document.getElementById(`blok${num}`).offsetTop -300) });}
         else if(!upDown){
          window.scroll({
            top: document.body.offsetHeight,
            left: 0, 
            behavior: 'smooth',
          });
         }
  
      };

    //slaganje blokova i oblikovanje blokova tj lista
    let blocks=[];
    for(let i=0;i<BlockNumbers;i++){
        let sliceOfList=lists.slice(i*8,i*8+8);
        blocks.push(
            <Grid key={`blok${i}`} container flexdirection="row" alignItems="center" justify="center" item xs={12} style={{display:(currentBlockVisible<i)?"none":"flex"}} className={classes.block}>
                <CardOfLists Lista={sliceOfList}  page={props}/>
            </Grid>
        );
       
    };
    
      
    return(
        <div style={{display: "flex", flexDirection: "column", alignItems:"center"}} className={classes.root}>
            <div>
                <Typography className={classes.title}>Airlines</Typography>
                {blocks}
                <div  
                    className={classes.bottomButtonDiv}
                    onClick={()=>{
                        if(window.innerWidth>=1280){
                            handleScroll(currentBlockVisible-1,true);
                            setTimeout(() => {setCurrentBlockVisible(currentBlockVisible-1);}, 500);
                        }
                        else{setCurrentBlockVisible(currentBlockVisible-1);};
                        }
                    }
                    style={{display:(currentBlockVisible>0)?"block":"none"}}
                >
                    <Typography>Less</Typography>
                    <Icon  style={{fontSize:"2rem"}}>expand_less</Icon>
                </div>
                <div 
                    className={classes.bottomButtonDiv}
                    onClick={()=>{
                        if(window.innerWidth>=1280){
                        setTimeout(() => {setCurrentBlockVisible(currentBlockVisible+1);}, 300);
                        }
                        else {setCurrentBlockVisible(currentBlockVisible+1)}
                    }
                } 
                    style={{display:((currentBlockVisible+1)<BlockNumbers)?"block":"none"}}
                >
                    <Icon style={{fontSize:"2rem"}}>expand_more</Icon>
                    <Typography >More</Typography>
                </div>
            </div>
        </div>   
    )
}
export default UserAirlines;