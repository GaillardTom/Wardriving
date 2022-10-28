import React, { Component, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

//import {Marker} from "react-google-maps";
//import { InfoWindow } from "google-map-react";
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import useStyles from './styles';
import axios from 'axios';
import { Marker } from "@react-google-maps/api";


const Map = (props) => {
props.updateMarker('test');

  const classes = useStyles();
  //If screen is less than 600 px it wont render 
  const isMobile = useMediaQuery('(min-width:600px)');

  const coordinates = { lat: 45.404476, lng: -71.888351 };
  const [markers, setMarkers] = useState([]);

 
      const fetchData = async () => {
        const response = await axios.get('http://localhost:8080/all').catch((res) => {
          console.log("Error: ", res);
        })
        console.log("Response: ", response);
        if (response.status === 200) {
          return response.data;
        }
      }

  useEffect(() => {
    fetchData().then((data) => {
      console.log(data);
        setMarkers(data);
    })
    }, []);

    const renderMarks = (map, maps) => {
     markers.forEach((marker) => {
      let mark = new maps.Marker({
         
          position: { lat: parseFloat(marker.lat), lng: parseFloat(marker.lon)},
          map,
          title: marker.name,
          key: marker._id
          });
      
          return mark;
         }
      )};

const onMapClick = (marker) => {
 let count = 0;
  for (let i = 0; i < markers.length; i++) {
  if (marker.event.target.title === markers[i].name && count === 0) 
  {
    count++;
    props.updateMarker(markers[i])
  }
}
}

    return (
      <div className={classes.mapContainer}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCTQNteh6dCZypdz6QueTQFPwmVK4-gNyk' }}
          defaultCenter={coordinates}
          center={coordinates}
          defaultZoom={14}
          margin={[50, 50, 50, 50]}
          options={''}
          onChange={''}
          onClick={onMapClick}
          onGoogleApiLoaded={ (({map, maps}) => renderMarks(map, maps))}
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
