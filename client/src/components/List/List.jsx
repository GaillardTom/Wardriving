import React, {useState} from "react";
import {CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select} from '@material-ui/core';

import useStyles from './styles';

const List = () => { 
    const classes = useStyles();
    const [type, setType] = useState('');

    return ( 
        <div className={classes.container}>
                <Typography variant="h4"> Networks Around You </Typography>
                <FormControl className={classes.FormControl}>

                    <InputLabel>Security</InputLabel>
                    <Select value={type} onChange={(e) =>setType(e.target.value)}>
                        <MenuItem value="WEP">WEP</MenuItem>
                        <MenuItem value="WPA">WPA</MenuItem>
                        <MenuItem value="Unknown">Unknown</MenuItem>
                        <MenuItem value="All">All</MenuItem>

                    </Select>
                </FormControl>

        </div>

    );
}
export default List;