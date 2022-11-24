import React, { Component, useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'

//import {Marker} from "react-google-maps";
//import { InfoWindow } from "google-map-react";
import { Paper, Typography, useMediaQuery } from '@material-ui/core'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import { ToastContainer, toast } from 'react-toastify'
import useStyles from './styles'
import axios from 'axios'
import * as $ from 'jquery'

const Map = (props) => {
  // PROPS
  // For security boolean
  const secu = props.checkSecurityBool
  // For security list
  const secuList = props.listDetails
  // For search networks list
  const searchList = props.searchUpdate

  const classes = useStyles()

  //If screen is less than 600 px it wont render
  const isMobile = useMediaQuery('(min-width:600px)')

  // Variables for coordinates and zoom
  let coordinates = { lat: 45.404476, lng: -71.888351 }
  let zoom = 14

  // Set the coordinates and zoom if the user searched for a location
  if (
    props.searchUpdate !== 'test' &&
    props.searchUpdate !== undefined &&
    Object.keys(props.searchUpdate).length !== 0
  ) {
    // Set the coordinates to the searched location
    coordinates = {
      lat: parseFloat(props.searchUpdate[0].lat),
      lng: parseFloat(props.searchUpdate[0].lon),
    }

    // Set the zoom value
    zoom = 20
  }

  // Constant for markers array and set markers
  const [markers, setMarkers] = useState([])

  const fetchData = async () => {
    const response = await axios
      .get('http://localhost:8080/all')
      .catch((res) => {
        toast.error('Error: ', res)
      })
    if (response.status === 200) {
      return response.data
    }
  }

  useEffect(() => {
    fetchData().then((data) => {
      setMarkers(data)
      props.setList(data)
    })
  }, [])

  const renderMarks = (map, maps) => {
    console.log(props.checkSecurity)
    if (props.displayDetails === false) {
      if (secu === false || props.checkSecurity === 'All') {
        // For All networks
        // Create the markers from the array of markers
        markers.forEach((marker) => {
          let mark = new maps.Marker({
            position: {
              lat: parseFloat(marker.lat),
              lng: parseFloat(marker.lon),
            },
            title: `${marker.name} : ${marker.mac_address}`,
            name: marker.name,
            map,
            key: marker._id,
          })
          return mark
        })
      } else {
        // For security type network list
        // Create the markers from the array of markers
        secuList.forEach((marker) => {
          let mark = new maps.Marker({
            position: {
              lat: parseFloat(marker.lat),
              lng: parseFloat(marker.lon),
            },
            title: `${marker.name} : ${marker.mac_address}`,
            name: marker.name,
            map,
            key: marker._id,
          })
          return mark
        })
      }
    } else if (props.checkSecurity === 'Search') {
      // Only render the marker of the network the user is searching for
      searchList.forEach((marker) => {
        let mark = new maps.Marker({
          position: {
            lat: parseFloat(marker.lat),
            lng: parseFloat(marker.lon),
          },
          title: `${marker.name} : ${marker.mac_address}`,
          name: marker.name,
          map,
          key: marker._id,
        })
        return mark
      })
    }
  }

  const onMapClick = (marker) => {
    // Remove the clients list
    props.displayDetailsBool(false)
    props.packetsBoolChange(false)

    let nameChecker
    if ($(marker.event.target).closest('div').attr('title') === undefined) {
      // FOR BRAVE
      nameChecker = marker.event.target.title
    } else {
      nameChecker = $(marker.event.target).closest('div').attr('title')
      // FOR EDGE
    }

    // Regex to add spaces between the name and the mac address
    const regex = new RegExp('\\s:\\s')

    // Split the name and mac address
    const macAddress = nameChecker.split(regex)

    for (let i = 0; i < markers.length; i++) {
      if (String(macAddress[1]).trim() === String(markers[i].mac_address)) {
        // Check if the security filter is on
        if (
          props.checkSecurity === markers[i].encryption &&
          props.checkSecurity !== 'All'
        ) {
          props.searchState(false)
          props.updateMarker(markers[i])
          props.displayDetailsBool(true)
        } else {
          // The security filter is off
          props.searchState(false)
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
        onGoogleApiLoaded={({ map, maps }) => renderMarks(map, maps)}
        yesIWantToUseGoogleMapApiInternals={true}
      ></GoogleMapReact>
    </div>
  )
}

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  }
}
export default Map
