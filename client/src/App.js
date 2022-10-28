import React, { useState } from "react";
import { CssBaseline } from '@mui/material';
import {Grid} from '@material-ui/core';
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import NetworkDetails from "./components/NetworkDetails/NetworkDetails";

const App = () => {

    const  [marker,setMarker] = useState({});
    const handleMarkerChange = (marker) => {

        if(marker.name )
        {
            setMarker(marker);
        }
      };

    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List />           
                    <NetworkDetails selectedMarker = {marker} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map updateMarker = {handleMarkerChange}/>
                </Grid>
            </Grid>
        </>
    );
};

export default App;