import React, { Component, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

//import {Marker} from "react-google-maps";
//import { InfoWindow } from "google-map-react";
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import useStyles from './styles';
import axios from 'axios';
import * as $ from 'jquery';


const Map = (props) => {

  props.updateMarker('test');

  const secu = props.checkSecurityBool
  const secuList = props.listDetails;

  const classes = useStyles();

  //If screen is less than 600 px it wont render 
  const isMobile = useMediaQuery('(min-width:600px)');

  // Variables for coordinates and zoom
  let coordinates = { lat: 45.404476, lng: -71.888351 };
  let zoom = 14

  // Set the coordinates and zoom if the user searched for a location
  if (props.searchUpdate !== "test" && props.searchUpdate !== undefined && Object.keys(props.searchUpdate).length !== 0) {

    // Set the coordinates to the searched location
    coordinates = { lat: parseFloat(props.searchUpdate.lat), lng: parseFloat(props.searchUpdate.lon) }

    // Set the zoom value
    zoom = 20
  }


  const [markers, setMarkers] = useState([]);


  const fetchData = async () => {
    const response = await axios.get('http://localhost:8080/all').catch((res) => {
      alert("Error: ", res);
    })
    if (response.status === 200) {
      return response.data;
    }
  }

  useEffect(() => {
    fetchData().then((data) => {
      setMarkers(data);
      props.setList(data);
    })
  }, []);

  const renderMarks = (map, maps) => {
    console.log("renderMarks", props.checkSecurity);
    console.log("renderMarks", props.displayDetails);
    if (props.displayDetails === false) 
    {
    if (secu === false || props.checkSecurity === "All") {
      markers.forEach((marker) => {
        let mark = new maps.Marker({
          position: { lat: parseFloat(marker.lat), lng: parseFloat(marker.lon) },
          title: marker.name,
          name: marker.name,
          map,
          key: marker._id
        });
        return mark;
      });
    }

    else {
     
      secuList.forEach((marker) => {
        let mark = new maps.Marker({
          position: { lat: parseFloat(marker.lat), lng: parseFloat(marker.lon) },
          title: marker.name,
          name: marker.name,
          map,
          key: marker._id
        });
        return mark;
      });
    }
  }
  else if (props.checkSecurity === "Search")
  {
    console.log("Security");
    // Only render the marker of the network the user is searching for
    let mark = new maps.Marker({
      position: { lat: parseFloat(props.searchUpdate.lat), lng: parseFloat(props.searchUpdate.lon) },
      title: props.searchUpdate.name,
      name: props.searchUpdate.name,
      map,
      key: props.searchUpdate._id
    });
    return mark;

  }
  }

  const onMapClick = (marker) => {
    let count = 0;
    let nameChecker

    if ($(marker.event.target).closest('div').attr('title') === undefined) {
      // FOR BRAVE
      nameChecker = marker.event.target.title
    }
    else {
      nameChecker = $(marker.event.target).closest('div').attr('title');
      // FOR EDGE
    }
    props.displayDetailsBool(false)
   console.log("nameChecker", props.checkSecurity);
    for (let i = 0; i < markers.length; i++) {
      if (nameChecker === markers[i].name && count === 0) {
        // Check if the security filter is on
        if (props.checkSecurity === markers[i].encryption && props.checkSecurity !== "All") {
          count++;
          props.searchState(false);
          props.updateMarker(markers[i])
          props.displayDetailsBool(true)
        }
        // The security filter is off
        else if (props.checkSecurity === "All") {
          console.log("test")
          count++;
          props.searchState(false);
          props.updateMarker(markers[i])
          props.displayDetailsBool(true)
        }
        else {
          count++;
          props.searchState(false);
          props.updateMarker(markers[i])
          props.displayDetailsBool(true)
        }
      }
    }
  }

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCTQNteh6dCZypdz6QueTQFPwmVK4-gNyk' }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={zoom}
        zoom={zoom}
        margin={[50, 50, 50, 50]}
        options={''}
        onChange={''}
        key={props.checkSecurity}
        onClick={onMapClick}
        onGoogleApiLoaded={(({ map, maps }) => renderMarks(map, maps))}
        yesIWantToUseGoogleMapApiInternals={true}
      >
      </GoogleMapReact>
    </div>
  );
}

export class MapContainer extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };
}
export default Map;
