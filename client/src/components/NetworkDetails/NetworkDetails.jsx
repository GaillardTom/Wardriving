import React, { Component, useEffect, useState } from "react";
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
        const response = await axios.get('http://localhost:8080/all').catch((res) => {
          console.log("Error: ", res);
        })
        console.log("Response: ", response);
        if (response.status === 200) {

          setMarkers(response.data);
        }
      }
    
    useEffect(() => {
     
    fetchData()
    }, []);
 
    const checkWhatToRender = () => {
      if (searchState === true) {
       
        return (
          <div className={classes.container}>
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
         
      </div>
        ) 
       
      }
      else {
        return (
          <div className={classes.container}>
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
            </div>
       
        )
      }
    }
    const classes = useStyles();

    return ( 
      <div className={classes.container}>
        {checkWhatToRender()}
       </div>
    );
}
export default NetworkDetails;