import React from "react";
import GoogleMapReact  from "google-map-react";
import {Paper, Typography, useMediaQuery} from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

import useStyles from './styles';
const Map = () => { 
    const classes = useStyles();
    //If screen is less than 600 px it wont render 
    const isMobile = useMediaQuery('(min-width:600px)');

    const coordinates = { lat: 45.404476, lng: -71.888351};

    return ( 
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{key: 'AIzaSyCTQNteh6dCZypdz6QueTQFPwmVK4-gNyk'}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50,50,50,50]}
                options={''}
                onChange={''}
                onChildClick={''}
            >


            </GoogleMapReact>
        </div>

    );
}
export default Map;