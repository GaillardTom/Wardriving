import React, { useState } from "react";
import { CssBaseline } from '@mui/material';
import {Grid} from '@material-ui/core';
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import NetworkDetails from "./components/NetworkDetails/NetworkDetails";
import Footer from "./components/Footer/Footer";

const App = () => {

    const  [marker,setMarker] = useState({});
    const [updateMarker, setUpdateMarker] = useState({});
    const [booly, setBooly] = useState(false);

    const UpdateBooly = (booly) => {
        //console.log("UpdateBooly: ", booly);
        setBooly(booly);
    }
 
    const handleSearchMarker = (updateMarker) => {
        //console.log("Update Marker: ", updateMarker);
        setUpdateMarker(updateMarker);
    }
    const handleMarkerChange = (marker) => {

        if(marker.name )
        {
            setMarker(marker);
        }
      };

    return (
        <>
            <CssBaseline />
            <Header searchUpdate={handleSearchMarker} searchState={UpdateBooly}/>
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List />           
                    <NetworkDetails selectedMarker={marker} searchUpdate={updateMarker} searchState={booly} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map updateMarker = {handleMarkerChange} searchState={UpdateBooly}/>
                </Grid>
            </Grid>
           <Footer />
        </>
    );
};

export default App;