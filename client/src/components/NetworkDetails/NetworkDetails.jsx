import React, { Component, useEffect, useState } from "react";
 import CloseIcon from '@material-ui/icons/Close';
 import Box from '@material-ui/core/Box';
import useStyles from './styles';
//import Marker from './Map/Map'
//import Map from './Map/Map'
import axios from "axios";


const NetworkDetails = (props) => {
  const selectedMarker = props.selectedMarker;
  const searchUpdate = props.searchUpdate;
  const searchState = props.searchState;
  const [markers, setMarkers] = useState([]);

  
  const fetchData = async () => {
    // Fetch all wifi networks from the database
    const response = await axios.get('http://localhost:8080/all').catch((res) => {
      // Alert the user if there is an error
      alert("Error: ", res);
    })
    if (response.status === 200) {
      // Set the markers from the database
      setMarkers(response.data);
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  const CloseWindow = () => {
    // Close the window
    props.displayDetailsBool(false);
  }

  const checkWhatToRender = () => {
    // If the user is searching for a network so display the network details of the network they are searching for
 if (props.displayDetails === true)
{
    if (searchState === true) {
      return (
        <div className={classes.container}>
        <Box className={classes.box}>
        <CloseIcon onClick={CloseWindow} className={classes.closeIcon} />
          <h2>Network Details</h2>
          <h3>Network Name:</h3>
          <div>{searchUpdate.name}</div>
          <h3>Mac Address</h3>
          <div>{searchUpdate.mac_address}</div>
          <h3>WPA Version</h3>
          <div>{searchUpdate.wpaVersion}</div>
          <h3>Encryption</h3>
          <div>{searchUpdate.encryption}</div>
          <h3>Latitude</h3>
          <div>{searchUpdate.lat}</div>
          <h3>Longitude</h3>
          <div>{searchUpdate.lon}</div>
          </Box>
        </div>
      
      )
    }
    else {
      // The user is not searching for a network so display the network details of the selected marker
      return (
        <div className={classes.container}>
          <Box>
          <CloseIcon onClick={CloseWindow} className={classes.closeIcon} />
          <h2>Network Details</h2>
          <h3>Network Name:</h3>
          <div>{selectedMarker.name}</div>
          <h3>Mac Address</h3>
          <div>{selectedMarker.mac_address}</div>
          <h3>WPA Version</h3>
          <div>{selectedMarker.wpaVersion}</div>
          <h3>Encryption</h3>
          <div>{selectedMarker.encryption}</div>
          <h3>Latitude</h3>
          <div>{selectedMarker.lat}</div>
          <h3>Longitude</h3>
          <div>{selectedMarker.lon}</div>
          </Box>
        </div>
      )
    }
  }
  }

  const classes = useStyles();

  return (
    <div>
      {checkWhatToRender()}
    </div>
  );
}
export default NetworkDetails;