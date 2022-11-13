import React, { Component, useEffect, useState } from "react";
 import CloseIcon from '@material-ui/icons/Close';
 import Box from '@material-ui/core/Box';
 import Grid from '@material-ui/core/Grid'

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
        <Box>
        <CloseIcon onClick={CloseWindow} className={classes.closeIcon} />
          <h2>Network Details</h2>
          <Grid container spacing={1} >
            <Grid container item xs={5} direction="column" >
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
            
          </Grid>
          <Grid container item xs={5} direction="column" >
            <h3>Packets</h3>
            <div>{searchUpdate.nbPackets}</div>
            <h3>Data Size</h3>
            <div>{searchUpdate.dataSize}</div>
            <h3>First Time Seen</h3>
            <div>{searchUpdate.firstTimeSeen}</div>
            <h3>Last Time Seen</h3>
            <div>{searchUpdate.lastTimeSeen}</div>
          </Grid>
        </Grid>
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
          <Grid container spacing={1} >
            <Grid container item xs={5} direction="column" >
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
              

            </Grid>
            <Grid container item xs={5} direction="column" >
              <h3>Packets</h3>
              <div>{selectedMarker.nbPackets}</div>
              <h3>Data Size</h3>
              <div>{selectedMarker.dataSize}</div>
              <h3>First Time Seen</h3>
              <div>{selectedMarker.firstTimeSeen}</div>
              <h3>Last Time Seen</h3>
              <div>{selectedMarker.lastTimeSeen}</div>
              <h3>Longitude</h3>
              <div>{selectedMarker.lon}</div>
            </Grid>
          </Grid>
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