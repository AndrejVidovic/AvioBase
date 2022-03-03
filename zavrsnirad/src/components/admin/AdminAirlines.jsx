import React, {useEffect, useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Button, Grid, InputAdornment, Paper, Toolbar, Typography } from '@material-ui/core';
import { DataGrid, Pagination} from '@material-ui/data-grid';
import Icon from '@material-ui/core/Icon';
import fakeCompanies from '../../data/FakeCompanies.json';
import backgroundIMG from '../../images/background.png';
import Popup from '../common/Popup';
import ConfirmDialog from '../common/ConfirmDialog';
import EditCompany from './AdminCompany';
import Filter from '../common/Filter';
import { useDispatch } from 'react-redux';
import { CompanyAction } from '../../redux/actions/CompanyID';
import MySnackbar from '../common/Snackbar';

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
            width:"95%",
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
  

function AdminAirlines()
{
    useEffect(()=>{
      getData();
    },[]);
    const [filterFn,setFilterFn]=useState({fn:items=>{return items; }})
    const [data,setData]=useState([]);
    const dispatch=useDispatch();

    const recordAfterFilter=()=>{
      return filterFn.fn(data); 
    }
    let rows=recordAfterFilter();
    const classes=useStyles();
    const [openPopup,setOpenPopup]=useState(false);//popup za confirm dialog
    const [open,setOpen]=useState(false);//popup za edit company
    const [item,setItem]=useState(0);//id za brisanje
    const [CompanyId,setCompanyId]=useState(0);//id za otvaranje 
    const [selectedCompany,setSelectedCompany]=useState({});
    const [openSnackbar,setOpenSnackbar]=useState(false);//otvara snackbar
    const [index,setIndex]=useState(0);

    //zatvara i indeksira snackbar
    const handleClose=()=>{
        setOpenSnackbar(false);
    }
    const handleIndex=(data)=>{
      setIndex(data);
    }
    //otvaranje i zatvaranje popupa
    const Close=()=>{
      setOpen(false);
    }
    const Open=()=>{
      setOpen(true);
    }
    

    //funkcija za filtiriranje
    const handleSearch=e=>{
      let target=e.target;
      setFilterFn({
        fn:items => {
          if(target.value=="")
            return items;
          else return items.filter(x=>x.name.toLowerCase().includes(target.value))
        }
      })
      console.log(target.value);
    }
   
    //funkcije za brisanje kompanije
    const handleDelete=(id)=>{
        let array=[];
        data.map(polje=>{if(polje.id!==id){array.push(polje)};});
        setData(array); 
    }
    //poziva funkciju koja otvara popup jesmo li sigurni da zelimo izbrisat tu komapniju
    const Confirm=(data)=>{
        setItem(data);
        setOpenPopup(true);
    }
    //poziva funkciju za brisanje iz popupa
    const requestDeleteAirlines=async ()=>{
        const settings={
          method:'DELETE',
          mode:'cors',
          headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json'},
          credentials:'include'
        }
        const res=await fetch(`http://localhost:5000/api/company/deleteCompany/${item}`,settings);
        if(res.status===200){
          handleDelete(item);
          console.log("Kompanija uspjesno izbrisana");
        }
        else{
          console.log("Problem pri brisanju kompanije!");
        }


    }
    //funkcija za editanje kompanije
    const OpenCompany=(data)=>{
        dispatch(CompanyAction(data.id));
        setOpen(true);
        setSelectedCompany(data);
    }
    const getData=async()=>{
      const settings={
        method:'GET',
        mode:'cors',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials:'include'
      }
      const res=await fetch(`http://localhost:5000/api/company/admin/id`,settings);
      const data=await res.json();
      setData(data);
    }

    
    
    const columns=[
        { field: 'id', headerName: 'ID',headerAlign:'center', align:'center', width: 70 },
        { field: 'name', headerName: 'Company Name', width: 200 },
        { field: 'IATA', headerName: 'IATA', width: 90 },
        { field: 'ICAO', headerName: 'ICAO', width: 90, },
        { field: 'numOfAircraft', headerName: 'NumOfAircrafts', width: 155, description:"number of aircrafts"},
        { field: 'country', headerName: 'Nation', width: 90,},
        { field: 'imgPath', headerName: 'Nation flag', width: 110,sortable:false,renderCell:(params)=>{return(<img className={classes.img} src={params.getValue("imgPath")}></img>)}},
        { field: 'edit', sortable:false,headerAlign:'center', align:'center', headerName: 'Edit' ,renderCell:(params) => (<Button onClick={()=>OpenCompany(params.row)}><Icon style={{color:"#FFB266",fontSize:'2em'}}>edit_icon</Icon></Button>)},
        { field: 'delete', sortable:false,headerAlign:'center', align:'center', headerName: 'Delete' ,renderCell:(params) => (<Button onClick={()=>{Confirm(params.getValue('id'))}}><Icon style={{color:"#FF6666",fontSize:'2em'}}>delete_icon</Icon></Button>)}
      ];
    return(
        <div>
        <ConfirmDialog setOpenPopup={setOpenPopup} openPopup={openPopup} text="Do you really want to delete this airline company?" functionToConfirm={requestDeleteAirlines}/>
        {
        <div style={{display: "flex", flexDirection: "column",justifyContent:"none", alignItems:"center"}} className={classes.root}>
            <div>
                <Typography className={classes.title}>Your list of airlines</Typography>
            </div>
            <div style={{ width:'55%'}} className={classes.table}>
                <Toolbar className={classes.filter}>
                  <Filter 
                    label="search" 
                    className={classes.filter}
                    onChange={handleSearch}
                    />
                </Toolbar>
                <DataGrid pagination disableColumnMenu={true}  disableSelectionOnClick={true} components={{Pagination: CustomPagination,}}  hideFooterSelectedRowCount pageSize={7}  rows={rows} columns={columns} />
            </div>
            <Popup setOpenPopUp={Close} openPopUp={open} clickAway={false} style={{minWidth:"40%"}} >
                <EditCompany company={selectedCompany} setOpenPopUp={Close} refresh={getData} handleIndex={handleIndex} setOpenSnackbar={setOpenSnackbar}/>
            </Popup>
        </div>
        
        }
        {
           openSnackbar&&index===1?<MySnackbar text="Company succesfully updated!" severity='success' open={openSnackbar} handleClose={handleClose}/>
           :null
        }
        {
           openSnackbar&&index===0?<MySnackbar text="Error in updating company!" severity='error' open={openSnackbar} handleClose={handleClose}/>
           :null
        }
       
        </div>
    )
}
export default AdminAirlines;
