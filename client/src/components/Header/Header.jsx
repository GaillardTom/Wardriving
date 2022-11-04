import React, { useState } from "react";
//import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Typography, InputBase, Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { ClassNames } from "@emotion/react";
import SearchIcon from '@material-ui/icons/Search';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import useStyles from './styles';
import IconButton from '@mui/material/IconButton';
import axios from "axios";

const Header = (props) => {
    
    /**
      * When the user types an address in the search box
      * @param place
      */
    //const [address, setAddress] = React.useState('');

    const [info, setInfo] = React.useState('');
    const [searchBy, setSearchBy] = React.useState('');
    const [marker, setMarker] = useState({});

    useState(() => {
        setSearchBy('name');
        setInfo('test');
        setMarker('test');
        props.searchUpdate('test');
    }, []);

    const getInfo = (place) => {
        setInfo(place);
    }

    const GetFromDb = (info) => {
        let infoString = info.toString();
        let values 
        if (searchBy === 'Name') {
            values = '/name/' + infoString;
        }
        else if (searchBy === 'MAC')
        {
            values = '/mac/' + infoString;
        }
        else if (searchBy === 'WPA')
        {
            values = '/wpa/' + infoString;
        }
        else if (searchBy === 'Encryption')
        {
            values = '/encryption/' + infoString;
        }

        axios.get('http://localhost:8080/search' + values).then((response) => {
           setMarker(response.data);
           props.searchUpdate(response.data);
           props.searchState(true);
        }).catch((error) => {
            alert(error);
        })
    }

  
    const Search = () => {
        if (info && searchBy) {
            GetFromDb(info);
        }
        else
        {
           alert("Please enter information to search");
        }
    }

    const SearchBy = (event) => {
        setSearchBy(event.target.value);
    }
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>

                <Typography variant="h5" className={classes.title} >

                    Wardriving Mapper

                </Typography>

                <Box display="flex">
                    <Typography variant="h5" className={classes.title} >

                        Search a Place
                    </Typography>
                </Box>


                <div className={classes.search}>
                    <FormControl className={classes.FormControl}>

                        <InputLabel>Search By</InputLabel>
                        <Select onChange={(e) => SearchBy(e)}>
                            <MenuItem  value="Name">Name</MenuItem>
                            <MenuItem value="MAC">MAC</MenuItem>

                        </Select>


                    </FormControl>
                    <InputBase className="search-bar" classes={{ root: classes.inputRoot, input: classes.inputInput }} onChange={(e) => getInfo(e.target.value)} />
                </div>

                <IconButton size="large" aria-label="search" color="inherit" onClick={Search}>
                    <SearchIcon />
                </IconButton>






            </Toolbar>

        </ AppBar>
    );
}

/*
 


                         <GooglePlacesAutocomplete
                    apiKey= 'AIzaSyCTQNteh6dCZypdz6QueTQFPwmVK4-gNyk'
></GooglePlacesAutocomplete>
*/

export default Header;