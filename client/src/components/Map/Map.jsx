import React, { Component, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "google-map-react";
import { InfoWindow } from "google-map-react";
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import useStyles from './styles';
import axios from 'axios';



const Map = () => {
  const classes = useStyles();
  //If screen is less than 600 px it wont render 
  const isMobile = useMediaQuery('(min-width:600px)');

  const coordinates = { lat: 45.404476, lng: -71.888351 };
  const [markers, setMarkers] = useState([]);

  // TODO ADD MARKER FROM DB TO THE MAP USING setSTATE IN REACT 
  /*
  let marker = markers.forEach(new GoogleMapReact.Marker({


      
  }));
  */


  /*
  let marker = markers.forEach(new GoogleMapReact.Marker({
      lat: res.data.lat,
      lng: res.data.lng,
      name: res.data.name
  }));
  */
  /*
  
  React.useEffect(() => {
      var markerArr = []
      points.map(p => {
        markerArr.push(<Marker position={{lat: p.lat, lng: p.lng}} />)
        }
      )
      setMarkers(markerArr)
    }, [])
  
    const MarkerUpdater = (day) => {
      var markerArr = []
      points.map(p => {
        markerArr.push(
          <Marker position={{lat: p.lat, lng: p.lng}} />
          )
        }
      )
      setMarkers(markerArr)
    }
   */
  /*
     const renderMarks = (map, maps) => {
      let marker = new maps.Marker({
  
          position: { lat: 45.404476, lng: -71.888351},
          map,
          title: 'Hello World!'
          });
      
          return marker;
         }
  
  
  /*
   useState(() => {
      axios.get('http://localhost:8080/all')
      .then((res) => {
          setMarkers(res.data);
  
          console.log("Axios",res.data);
      })
      .catch((err) => {
          console.log(err);
      })
  }, []);
  
  */
  /*
  useEffect(() => {
      axios.get('http://localhost:8080/all')
      .then((res) => {
          setMarkers(res.data);
  
          console.log("Axios ",res.data);
      })
      .catch((err) => {
          console.log(err);
      })
  
  }, []);
  */
  //axios.get()

  /*
    fetch('http://localhost:8080/all', {
       mode: 'cors',
       method: 'GET',
       headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  
        
  }})
      .then((response) => response.json())
      .then((data) => 
      {
        data.results.forEach((result) => 
        {
          result.show = false; // eslint-disable-line no-param-reassign
          console.log("sad")
         
          return result;
        });
        this.setState({ markers: data.results });
      }).catch((error) => {
        console.log(error);
      });
  
  */
      const fetchData = async () => {
        const response = await axios.get('http://localhost:8080/all').catch((res) => {
          //console.log("Error: ", res);
        })
        console.log("Response: ", response);
        if (response.status === 200) {
          return response.data;
        }
      }

      
  useEffect(() => {

    fetchData().then((data) => {
      console.log(data);
    //  data.forEach((result) => {

        setMarkers(data);
        //console.log("sad")
        //console.log("lat",parseFloat(result.lat));
     // })

    })


    }, []);

    const renderMarks = (map, maps) => {
      //console.log("Markers",markers);
      
     // console.log("Markers",markers.lat, markers.lon);
     markers.forEach((marker) => {
      let mark = new maps.Marker({
         
          position: { lat: parseFloat(marker.lat), lng: parseFloat(marker.lon)},
          map,
          title: marker.name
          });
      
          return mark;
         }
      )};
      
    


   

    /*
  const Marker = ({ show, place }) => {
      const markerStyle = {
        border: '1px solid white',
        borderRadius: '50%',
        height: 10,
        width: 10,
        backgroundColor: show ? 'red' : 'blue',
        cursor: 'pointer',
        zIndex: 10,
      };
  
      return (
          <>
            <div style={markerStyle} />
            {show && <InfoWindow place={place} />}
          </>
        );
      };
  
  
  */


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
          onChildClick={''}
          onGoogleApiLoaded={({ map, maps }) => renderMarks(map, maps)}

        >
       
          

        </GoogleMapReact>

      </div>


    );
  }

/*
{markers.map((marker) => (
            <Marker
              key={marker.id}
              position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
              onClick={() => {
                setMarkers(marker);
              }}
            />
          ))}


          */

export class MapContainer extends Component {

    state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }
  export default Map;