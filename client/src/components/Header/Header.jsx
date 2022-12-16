import React, { useState } from 'react'
//import { Autocomplete } from "@react-google-maps/api";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material'
import { ClassNames } from '@emotion/react'
import SearchIcon from '@material-ui/icons/Search'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import useStyles from './styles'
import IconButton from '@mui/material/IconButton'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Header = (props) => {
  // Use states variables
  // For the info searched for
  const [info, setInfo] = React.useState('')
  // For the search type
  const [searchBy, setSearchBy] = React.useState('')
  const [marker, setMarker] = useState([])

  useState(() => {
    props.searchUpdate('test')
    setSearchBy('test')
  }, [])

  const getInfo = (place) => {
    setInfo(place)
  }

  const GetFromDb = (info) => {
    let infoString = info.toString()
    let values

    // Set the search info for the database
    if (searchBy === 'Name') {
      values = '/name/' + infoString
    } else if (searchBy === 'MAC') {
      values = '/mac/' + infoString
    } else if (searchBy === 'WPA') {
      values = '/wpa/' + infoString
    } else if (searchBy === 'Encryption') {
      values = '/encryption/' + infoString
    }

    // Get the data from the database
    axios
      .get(process.env.REACT_APP_SERVER_URL + '/search' + values)
      .then((response) => {
        if (response && response.data.length > 0) {
          // set the marker to the response data
          setMarker(response.data)

          // Location(info.lat, info.lng);
          props.displayDetailsBool(true)

          // Update the search info
          props.searchUpdate(response.data)
          // Display the network details
          props.searchState(true)
          // Set the state
          props.security('Search')

          // Remove the client window when searching for a network
          props.packetsBoolChange(false)
        } else {
          // Error if no networks are found
          toast.error('No networks found', {
            position: toast.POSITION.TOP_LEFT,
            autoClose: 2000,
          })
          // Set the search state to false
          props.searchState(false)
          //Set the display network details to false
          props.displayDetailsBool(false)
          props.packetsBoolChange(false)
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          // Display toast error message
          toast.error('No results found', {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
          })
        }
      })
  }

  const Search = () => {
    if (info.length !== 0 && searchBy !== 'test') {
      // Call the get from database function to get the network details from the database
      GetFromDb(info)
    } else {
      toast.warning('Please enter information to search', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      })
      props.displayDetailsBool(false)
      props.searchState(false)
    }
  }

  const SearchBy = (event) => {
    // Set the item to search
    setSearchBy(event.target.value)
  }

  const Naviguater = () => {
    //Naviguate to homepage
    window.location.href = process.env.REACT_APP_client_url
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Call the search method
      Search()
    }
  }

  const classes = useStyles()

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title} onClick={Naviguater}>
          Wardriving Mapper
        </Typography>

        <div className={classes.search}>
          <h3>Search a place</h3>
          <FormControl className={classes.FormControl}>
            <InputLabel className={classes.menuText}>By</InputLabel>
            <Select className={classes.dropdown} onChange={(e) => SearchBy(e)}>
              <MenuItem value="Name">Name</MenuItem>
              <MenuItem value="MAC">MAC</MenuItem>
            </Select>
          </FormControl>
          <InputBase
            className="search-bar"
            classes={{ root: classes.inputRoot, input: classes.inputInput }}
            onChange={(e) => getInfo(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e)}
          />
          <IconButton
            size="large"
            aria-label="search"
            color="inherit"
            onClick={Search}
          >
            <SearchIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
