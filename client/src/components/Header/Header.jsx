import React, { useState } from "react";
//import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@mui/material";
import { ClassNames } from "@emotion/react";
import SearchIcon from '@material-ui/icons/Search';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import useStyles from './styles';



const Header = () => {
/**
  * When the user types an address in the search box
  * @param place
  */
//const [address, setAddress] = React.useState('');
     };

    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>

                <Typography variant="h5" className={classes.title}>

                    Wardriving Mapper

                </Typography>

                <Box display="flex">
                    <Typography variant="h5" className={classes.title}>

                        Search a Place            
                    </Typography>

                    {/*<Autocomplete>*/}
                   
                    {/*</Box></Autocomplete>*/}
                </Box>

            </Toolbar>
        </ AppBar>
    );


/*
 <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase placeholder="Search ..." classes={{root: classes.inputRoot, input: classes.inputInput}}
                            />
                        </div>



                         <GooglePlacesAutocomplete
                    apiKey= 'AIzaSyCTQNteh6dCZypdz6QueTQFPwmVK4-gNyk'
></GooglePlacesAutocomplete>
*/
export default Header;