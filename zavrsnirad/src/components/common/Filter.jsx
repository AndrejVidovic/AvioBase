import React, {useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Button, Grid, InputAdornment, Paper, TextField, Toolbar, Typography,Icon } from '@material-ui/core';
import { DataGrid, Pagination } from '@material-ui/data-grid';
import SearchIcon from '@material-ui/icons/Search'

function Filter(props)
{
    const {name,label,onChange,...other}=props;
    return(
        <TextField
            id="outlined-basic" 
            label={label}
            variant="outlined"
            name={name}
            onChange={onChange}
            {...other}
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            autoComplete="off"
        />   
    )
}
export default Filter;