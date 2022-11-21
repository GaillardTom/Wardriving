import React, { Component, useEffect, useState } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import useStyles from './styles'
//import Marker from './Map/Map'
//import Map from './Map/Map'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

const Packets = (props) => {
  const selectedMarker = props.selectedMarker
  const booleans = props.packetsBool
  const [data, setData] = useState([])
  const searchUpdate = props.searchUpdate
  const GetClient = async (mac) => {

    // Fetch the client from the database
    const response = await axios
      .get('http://localhost:8080/devices/' + mac)
      .catch((res) => {
        // Alert the user if there is an error
        toast('Error: ', res)
      })
    if (response.status === 200) {
      // Return the client
      return response.data
    }
  }

  useEffect(() => {
    if (booleans) {
      if (selectedMarker.mac_address !== undefined) {
        GetClient(selectedMarker.mac_address).then((res) => {
          setData(res)
        })
      } else if (searchUpdate) {
        GetClient(searchUpdate.mac_address).then((res) => {
          setData(res)
        })
      }
    }
  }, [booleans])

  const classes = useStyles()

  const renderData2 = () => {
    if (booleans === true) {
      return (
        <div className={classes.container}>
          <table className={classes.table}>
            <thead className={classes.table}>
              <tr>
                <th className={classes.title}>Carrier Client</th>
                <th className={classes.title}>Channel Client</th>
                <th className={classes.title}>Client Type</th>
                <th className={classes.title}>Data Size</th>
                <th className={classes.title}>Encrypted Packets</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr>
                  <td className={classes.title}>{item.carrier_client}</td>
                  <td className={classes.title}>{item.channel_client}</td>
                  <td className={classes.title}>{item.client_type}</td>
                  <td className={classes.title}>{item.datasize_client}</td>
                  <td className={classes.title}>
                    {item.encrypted_clients_packets}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
  }

  return <div>{renderData2()}</div>
}
export default Packets
