import React, { useState } from "react";
//import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Typography, InputBase, Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { ClassNames } from "@emotion/react";
import SearchIcon from '@material-ui/icons/Search';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import useStyles from './styles';
import IconButton from '@mui/material/IconButton';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Header = (props) => {

    const [info, setInfo] = React.useState('');
    const [searchBy, setSearchBy] = React.useState('');
    const [marker, setMarker] = useState({});




    useState(() => {
        props.searchUpdate('test');
        setSearchBy('test');
    }, []);

    const getInfo = (place) => {
        setInfo(place);
    }

    const GetFromDb = (info) => {
        let infoString = info.toString();
        let values

        // Set the search info for the database
        if (searchBy === 'Name') {
            values = '/name/' + infoString;
        }
        else if (searchBy === 'MAC') {
            values = '/mac/' + infoString;
        }
        else if (searchBy === 'WPA') {
            values = '/wpa/' + infoString;
        }
        else if (searchBy === 'Encryption') {
            values = '/encryption/' + infoString;
        }

        axios.get('http://localhost:8080/search' + values).then((response) => {
            setMarker(response.data);
           // Location(response.data.lat, response.data.lon);
            props.searchUpdate(response.data);
            props.searchState(true);
        }).catch((error) => {
            console.log(error);
            if (error.response.status === 401) {
                toast.error("No results found", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000,
                });
            }
        })
    }

    const Search = () => {
        if (info.length !== 0 && searchBy !== 'test') {

            // Call the get from database function to get the network details from the database
            GetFromDb(info);
            
           // Location(info.lat, info.lng);
            props.displayDetailsBool(true);
        }
        else {
            toast.warning("Please enter information to search", { 
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
            });
        }
    }

    const SearchBy = (event) => {
        // Set the item to search
        setSearchBy(event.target.value);
    }

    const Naviguater = () => {
        //Naviguate to homepage
       window.location.href = "http://localhost:3000/";
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {    
            // Call the search method 
            Search();
        }
    }

    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5" className={classes.title} onClick={Naviguater} >
                    Wardriving Mapper
                </Typography>
                <Box className={classes.subtitle} display="flex">
                    <Typography variant="h5" className={classes.subtitle} >
                        Search a Place
                    </Typography>
                </Box>
                <div className={classes.search}>
                    <FormControl className={classes.FormControl}>
                        <InputLabel>Search By</InputLabel>
                        <Select onChange={(e) => SearchBy(e)}>
                            <MenuItem value="Name">Name</MenuItem>
                            <MenuItem value="MAC">MAC</MenuItem>
                        </Select>
                    </FormControl>
                    <InputBase className="search-bar" classes={{ root: classes.inputRoot, input: classes.inputInput }} onChange={(e) => getInfo(e.target.value)} onKeyDown={(e) => handleKeyPress(e)}/>
                </div>
                <IconButton size="large" aria-label="search" color="inherit" onClick={Search} >
                    <SearchIcon />
                </IconButton>
            </Toolbar>
        </ AppBar>
    );
}

export default Header;