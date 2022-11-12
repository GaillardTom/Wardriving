import React, { useState, useEffect } from "react";
//import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Typography, InputBase, Box, InputLabel, MenuItem, FormControl, Select, Button } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useStyles from './styles';
import axios from "axios";

//toast.configure();
const Footer = (props) => {

    
    const uploadFile = (e) => {
        getFileName(e);
        console.log(e.target.files[0]);
        e.preventDefault();
        if(String(e.target.files[0].name).includes('.netxml')) {
            let formData = new FormData();
            const toastID = toast.loading("Uploading File...")
            formData.append('data', e.target.files[0]);
            axios.post('http://localhost:8080/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                if(response.status === 200) {
                console.log("🚀 ~ file: Footer.jsx ~ line 24 ~ uploadFile ~ response", response.data)
                toast.update(toastID,{ 
                    render: "File Uploaded",
                    type: "success",
                    position: toast.POSITION.TOP_RIGHT,
                    isLoading: false,
                    autoClose: 2000,
                });
                formData.delete('data');

                }
                else{ 
                    toast.update(toastID,{ 
                        render: "File Upload Failed",
                        type: "error",
                        position: toast.POSITION.TOP_RIGHT,
                        isLoading: false,
                        autoClose: 2000,
                    });
                }
            }).catch((error) => {
                console.log("🚀 ~ file: Footer.jsx ~ line 27 ~ uploadFile ~ error", error)
                toast.update(toastID, { 
                    render: "Error Uploading File",
                    type: "error",
                    position: toast.POSITION.TOP_RIGHT,
                    isLoading: false,
                    autoClose: 2000,
                });
                formData.delete('data');
            })
        
        }else{ 
            toast.error('Please upload a .netxml file', { 
                position: toast.POSITION.TOP_LEFT,
                autoClose: 2000,
            });
        }
    } 

    //Create function to get the file name
    const getFileName = (e) => {
        console.log(e.target.files[0].name);
    }
    
    useEffect(() => {
        //toast.configure()
        /*
        const uploadForm = document.querySelector('input[type="file"]');

        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault()
            if(e.target.uploadFile.files[0] !== undefined) {
            let file = e.target.uploadFile.files[0]

            let formData = new FormData();
            formData.append('data', file);
            axios.post('http://localhost:8080/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                console.log("🚀 ~ file: Footer.jsx ~ line 24 ~ uploadFile ~ response", response)
                alert(response.data);
            }).catch((error) => {
                console.log("🚀 ~ file: Footer.jsx ~ line 27 ~ uploadFile ~ error", error)
                alert(error);
            })
            }
        })
        */
        

    
    }, []);
       


    
    const classes = useStyles();
    return ( 
        <div className={classes.divButton}>
            <Button className={classes.upload} color="success" variant="contained" component="label">Upload<input type="file" hidden onChange={uploadFile}></input></Button>
        </div>
        
    )

}

export default Footer;