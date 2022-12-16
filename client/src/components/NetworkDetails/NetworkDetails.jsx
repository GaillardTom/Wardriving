import React, {useEffect, useState } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import useStyles from './styles'
import axios from 'axios';





const NetworkDetails = (props) => {
  const selectedMarker = props.selectedMarker
  const searchUpdate = props.searchUpdate
  const searchState = props.searchState
  const [markers, setMarkers] = useState([])
  const [clicked, setClicked] = useState(false)
  //console.log("allo", props.packetsBool);
  const fetchData = async () => {
    // Fetch all wifi networks from the database
    const response = await axios
      .get(process.env.REACT_APP_SERVER_URL + '/all')
      .catch((res) => {
        // Alert the user if there is an error
        alert('Error: ', res)
      })
    if (response.status === 200) {
      // Set the markers from the database
      setMarkers(response.data)
    }
  }

  useEffect(() => {
    // Fetch the networks from the database
    fetchData()
  }, [])

  const CloseWindow = () => {
    // Close the window
    props.displayDetailsBool(false)
    props.packetsBoolChange(false)
  }

  const ShowPackets = (bool) => {
    setClicked(!bool)
    props.packetsBoolChange(!props.packetsBool)
  }

  const checkWhatToRender = () => {
    // If the user is searching for a network so display the network details of the network they are searching for
    if (props.displayDetails === true) {
      if (searchState === true && searchUpdate.length == 1) {
        return (
          <div className={classes.container}>
            <Box>
              <CloseIcon onClick={CloseWindow} className={classes.closeIcon} />
              <h2>Network Details</h2>
              <Grid container spacing={1}>
                <Grid container item xs={7} direction="column">
                  <h3>Network Name:</h3>
                  <div>{searchUpdate[0].name}</div>
                  <h3>Mac Address</h3>
                  <div>{searchUpdate[0].mac_address}</div>
                  <h3>WPA Version</h3>
                  <div>{searchUpdate[0].wpaVersion}</div>
                  <h3>Encryption</h3>
                  <div>{searchUpdate[0].encryption}</div>
                  <h3>Latitude</h3>
                  <div>{searchUpdate[0].lat}</div>
                </Grid>
                <Grid container item xs={5} direction="column">
                  <h3>Packets</h3>
                  <div>{searchUpdate[0].nbPackets}</div>
                  <h3>Data Size</h3>
                  <div>{searchUpdate[0].dataSize}</div>
                  <h3>First Time Seen</h3>
                  <div>{searchUpdate[0].firstTimeSeen}</div>
                  <h3>Last Time Seen</h3>
                  <div>{searchUpdate[0].lastTimeSeen}</div>
                  <h3>Longitude</h3>
                  <div>{searchUpdate[0].lon}</div>
                </Grid>
              </Grid>
              <Button
                className="clients-btn"
                variant="contained"
                color="secondary"
                onClick={() => ShowPackets(clicked)}
              >
                Show Clients
              </Button>
            </Box>
          </div>
        )
      }
      // NO NEED TO DISPLAY THE NETWORK DETAILS SINCE THERE IS MORE THAN ONE NETWORK WITH THE SAME NAME
      else if (searchState === true && searchUpdate.length > 1) {
      } else {
        // The user is not searching for a network so display the network details of the selected marker
        return (
          <div className={classes.container}>
            <Box>
              <CloseIcon onClick={CloseWindow} className={classes.closeIcon} />
              <h2>Network Details</h2>
              <Grid container spacing={1}>
                <Grid container item xs={7} direction="column">
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
                <Grid container item xs={5} direction="column">
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
              <Button
                className="clients-btn"
                variant="contained"
                color="secondary"
                onClick={() => ShowPackets(clicked)}
              >
                Show Clients
              </Button>
            </Box>
          </div>
        )
      }
    }
  }

  const classes = useStyles()

  return <div>{checkWhatToRender()}</div>
}
export default NetworkDetails
