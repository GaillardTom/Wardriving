import React, {useState} from "react";
import {CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select} from '@material-ui/core';

import { useStyles} from './styles';

const List = () => { 
    const classes = useStyles();
    const [type, setType] = useState('');

    return ( 
        <div className={classes.container}>
                <Typography variant="h4"> Networks Around You </Typography>
                <FormControl className={classes.FormControl}>

                    <InputLabel>Security</InputLabel>
                    <Select value={type} onChange={(e) =>setType(e.target.value)}>
                        <MenuItem value="Network">Network</MenuItem>
                        <MenuItem value="Security">Security</MenuItem>
                        <MenuItem value="Network">Network</MenuItem>

                    </Select>
                </FormControl>

        </div>

    );
}
export default List;