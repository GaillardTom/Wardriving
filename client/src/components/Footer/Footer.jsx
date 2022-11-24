import React, { useState, useEffect } from 'react'
//import { Autocomplete } from "@react-google-maps/api";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
} from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useStyles from './styles'
import axios from 'axios'

//toast.configure();
const Footer = (props) => {
  const uploadFile = (e) => {
    getFileName(e)
    e.preventDefault()
    if (String(e.target.files[0].name).includes('.netxml')) {
      let formData = new FormData()
      const toastID = toast.loading('Uploading File...')
      formData.append('data', e.target.files[0])
      axios
        .post('http://localhost:8080/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.status === 200) {
            toast.update(toastID, {
              render: 'File Uploaded',
              type: 'success',
              position: toast.POSITION.TOP_RIGHT,
              isLoading: false,
              autoClose: 2000,
            })
            formData.delete('data')
          } else {
            toast.update(toastID, {
              render: 'File Upload Failed',
              type: 'error',
              position: toast.POSITION.TOP_RIGHT,
              isLoading: false,
              autoClose: 2000,
            })
          }
        })
        .catch((error) => {
          toast.update(toastID, {
            render: 'Error Uploading File',
            type: 'error',
            position: toast.POSITION.TOP_RIGHT,
            isLoading: false,
            autoClose: 2000,
          })
          formData.delete('data')
        })
    } else {
      toast.error('Please upload a .netxml file', {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 2000,
      })
    }
  }

  //Create function to get the file name
  const getFileName = (e) => {
    console.log(e.target.files[0].name)
  }

  const classes = useStyles()
  return (
    <div className={classes.divButton}>
      <Button
        className={classes.upload}
        color="success"
        variant="contained"
        component="label"
      >
        Upload<input type="file" hidden onChange={uploadFile}></input>
      </Button>
    </div>
  )
}

export default Footer
