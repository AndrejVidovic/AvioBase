import React, {useState,useEffect} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Button, Grid, InputAdornment, Paper, Toolbar, Typography } from '@material-ui/core';
import { DataGrid, Pagination} from '@material-ui/data-grid';
import Icon from '@material-ui/core/Icon';
import fakeCompanies from '../../data/FakeCompanies.json';
import backgroundIMG from '../../images/background.png';
import Popup from '../common/Popup';
import Company from './Company';
import Filter from '../common/Filter';

import {useSelector} from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import {useDispatch} from 'react-redux';
import { ListAction } from '../../redux/actions/ListID';
import {CompanyAction} from '../../redux/actions/CompanyID';


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
    table:{
        marginTop:"2vh",
        height:"32em",
        borderColor: "transparent !important",
        [theme.breakpoints.down('xl')]: {
            width:"94%",
          },
          [theme.breakpoints.up('xl')]: {
            width:"80%",
          },
    },
    title:{
        marginTop:"15vh",
        marginBottom:"5vh",
        fontFamily:"Comfortaa, cursive",
        fontWeight:600,
        fontSize:"4vh",
    },
    filter:{
      width:"75%",
      marginBottom:"1vh",
      borderRadius:20
    },
    img:{
      width:"2.5rem"
    },
    logo:{
      width:"5rem"
    }


}));
function CustomPagination(props) {
  const { state, api } = props;
    const classes = useStyles();
  
    return (
      <Pagination
        className={classes.root}
        color="white"
        variant="outlined"
        shape="rounded"
        page={state.pagination.page}
        count={state.pagination.pageCount}
        onChange={(event, value) => api.current.setPage(value)}
      />
    );
  }
  

function AirlinesList(props)
{ 
    useEffect(() => { 
      getData();
    }, []);
    
    const [filterFn,setFilterFn]=useState({fn:items=>{return items; }})
    const [rows,setRows]=useState([]);
    const [company,setCompany]=useState();
    const dispatch=useDispatch();
    //za koristit redux
    const listID=useSelector(state=>state.list);
    const listName=props.match.params.list_name;
    
    const classes=useStyles();
    const [openPopup,setOpenPopup]=useState(false);
  
    const getData = async () => {
      const fetchOptions={
        method:'GET',
        headers: { 'Content-Type': 'application/json'},
        mode:'cors',
        credentials:'include'
      };
      const res = await fetch(`http://localhost:5000/api/company/list/${listID}`,fetchOptions);
      const data = await res.json();
      setRows(data);
    }

    const recordAfterFilter=()=>{
      return filterFn.fn(rows); 
    }
    let temp=recordAfterFilter();

    //otvaranje i zatvaranje prozor za kompaniju
    const closePopUp=()=>{
      setOpenPopup(false);
    }
    const Open=(data)=>{
      setOpenPopup(true);
      setCompany(data)
      dispatch(CompanyAction(data.id));
    }
    //filter opcija za datagrid
    const handleSearch=e=>{
      let target=e.target;
      setFilterFn({
        fn:items => {
          if(target.value=="")
            return items;
          else return items.filter(x=>x.name.toLowerCase().includes(target.value))
        }
      })
    }
    
    const columns=[
      { field: 'id', headerName: 'ID',headerAlign:'center', align:'center', width: 70,hide:true },
      { field: 'logoPath', headerName: 'Logo', width: 110,sortable:false, renderCell:(params)=>{return (<img className={classes.logo} src={params.getValue("logoPath")}></img>)} },
      { field: 'name', headerName: 'Company Name', width: 200 },
      { field: 'IATA', headerName: 'IATA', width: 90 },
      { field: 'ICAO', headerName: 'ICAO', width: 90, },
      { field: 'numOfAircraft', headerName: 'NumOfAircrafts', width: 155, description:"number of aircrafts"},
      { field: 'country', headerName: 'Nation', width: 90,},
      { field: 'imgPath', headerName: 'Nation flag', width: 110,sortable:false, renderCell:(params)=>{return (<img className={classes.img} src={params.getValue("imgPath")}></img>)}},
      { field: 'open', sortable:false,headerAlign:'center', align:'center', headerName: 'View' ,renderCell:(params) => (<Button onClick={(e)=>Open(params.row)}><Icon style={{color:"#FFB266",fontSize:'3em'}}>pageview_icon</Icon></Button>)}
    ];

    return(
        <div style={{display: "flex", flexDirection: "column",justifyContent:"none", alignItems:"center"}} className={classes.root}>
            <div>
                <Typography className={classes.title}>List {listName}</Typography>
            </div>
            <div style={{ width:'50%'}} className={classes.table}>
                <Toolbar className={classes.filter}>
                  <Filter 
                    label="search" 
                    className={classes.filter}
                    onChange={handleSearch}
                    />
                </Toolbar> 
                <DataGrid pagination disableColumnMenu={true}  disableSelectionOnClick={true} components={{Pagination: CustomPagination,}}  hideFooterSelectedRowCount pageSize={7}  rows={temp} columns={columns} />
            </div> 
          <Popup clickAway={false} openPopUp={openPopup} setOpenPopUp={closePopUp} style={{minWidth:'40%'}}>
            <Company  company={company} setOpenPopUp={closePopUp}/>
          </Popup>   
        </div>
    )
}
export default AirlinesList;