import React, { Component, useEffect, useState } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import useStyles from './styles'
//import Marker from './Map/Map'
//import Map from './Map/Map'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

const Packets = (props) => {
  const selectedMarker = props.selectedMarker
  const booleans = props.packetsBool
  const [data, setData] = useState([])
  const searchUpdate = props.searchUpdate
  const GetClient = async (mac) => {
    // Fetch the clients from the database
    const response = await axios
      .get('http://localhost:8080/devices/' + mac)
      .catch((res) => {
        // Alert the user if there is an error
        toast('Error: ', res)
      })
    if (response.status === 200) {
      // Return the client
      console.log(response.data)
      return response.data
    }
  }

  useEffect(() => {
    if (booleans) {
      if (selectedMarker.mac_address !== undefined) {
        // Get the client from the database and set the data
        GetClient(selectedMarker.mac_address).then((res) => {
          setData(res)
        })
      } else if (searchUpdate) {
        // Get the client from the database and set the data
        GetClient(searchUpdate.mac_address).then((res) => {
          setData(res)
        })
      }
    }
  }, [booleans])

  const classes = useStyles()

  const renderData2 = () => {
    if (booleans === true) {
      // If there is data to display
      if (data.length > 0) {
        return (
          <div className={classes.container}>
            <table className={classes.table}>
              <thead className={classes.table}>
                <tr>
                  <th className={classes.title}>Carrier Client</th>
                  <th className={classes.title}>Device's Mac Address</th>
                  <th className={classes.title}>Channel Client</th>
                  <th className={classes.title}>Client Type</th>
                  <th className={classes.title}>Encoding Client</th>
                  <th className={classes.title}>Data Size</th>
                  <th className={classes.title}>Number of Packets Seen</th>
                  <th className={classes.title}>Encrypted Packets</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr>
                    <td className={classes.title}>{item.carrier_client}</td>
                    <td className={classes.title}>{item.mac_client}</td>
                    <td className={classes.title}>{item.channel_client}</td>
                    <td className={classes.title}>
                      {item.encoding_client ? item.encoding_client : 'None'}
                    </td>
                    <td className={classes.title}>{item.client_type}</td>
                    <td className={classes.title}>{item.datasize_client}</td>
                    <td className={classes.title}>{item.packetsNb_client}</td>
                    <td className={classes.title}>
                      {item.encrypted_clients_packets}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      } else {
        // Otherwise display a message
        return (
          <div className={classes.container}>
            <h3>No Clients for this Network</h3>
          </div>
        )
      }
    }
  }

  return <div>{renderData2()}</div>
}
export default Packets
