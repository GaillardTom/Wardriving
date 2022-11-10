import React, { useState } from "react";
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

import useStyles from './styles';

const List = (props) => {
    const classes = useStyles();
    const secuList = []

    useState(() => {
        props.security("All");
    }, []);
    const GetWifiByConstraint = (tp) => {

        if (!(tp === "All")) {
            // Set the security search to true
            props.setSecurityBool(true);
            for (let i = 0; i < props.listDetails.length; i++) {
                if (props.listDetails[i].encryption === tp) {
                    // Add the wifi to the list
                    secuList.push(props.listDetails[i]);
                }
            }
            // Add the list to the state
            props.setSecuList(secuList);

            // Modify the security state
            props.security(tp)
        }
        else {
            // Set the security search to false
            props.setSecurityBool(false);

            // Modify the security state
            props.security(tp)
        }
    }

    return (
        <div className={classes.container}>
            <Typography variant="h4"> Networks Around You </Typography>
            <InputLabel>Security</InputLabel>
            <FormControl className={classes.FormControl}>
                <Select  onChange={(e) => GetWifiByConstraint(e.target.value)}> 
                    <MenuItem value="None">None</MenuItem>
                    <MenuItem value="WPA+AES-CCM WPA+PSK">WPA+AES-CCM WPA+PSK</MenuItem>
                    <MenuItem value="WPA+AES-CCM WPA+PSK WPA+TKIP">WPA+AES-CCM WPA+PSK WPA+TKIP</MenuItem>
                    <MenuItem value="All">All</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
export default List;