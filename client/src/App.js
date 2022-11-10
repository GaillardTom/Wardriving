import React, { useState } from "react";
import { CssBaseline } from '@mui/material';
import { Grid } from '@material-ui/core';
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import NetworkDetails from "./components/NetworkDetails/NetworkDetails";
import Footer from "./components/Footer/Footer";

const App = () => {

    const [marker, setMarker] = useState({});
    const [updateMarker, setUpdateMarker] = useState({});
    const [booly, setBooly] = useState(false);
    const [list, setList] = useState([]);
    const [secuList, setSecuList] = useState([]);

    // Do i use the security feature?
    const [securityBool, setSecurityBool] = useState(false);
    const [security, setSecurity] = useState("");

    // Display the network details?
    const [displayDetails, setDisplayDetails] = useState(false);

    const UpdateBooly = (booly) => {
        setBooly(booly);
    }

    const handleSearchMarker = (updateMarker) => {
        setUpdateMarker(updateMarker);
    }
    const handleMarkerChange = (marker) => {
        if (marker.name) {
            setMarker(marker);
        }
    };

    const handleListChange = (list) => {
        if (list !== null) {
            setList(list);
        }
    };

    const handleSecuListChange = (secu) => {
        if (secu !== null) {
            setSecuList(secu);
        }
    };

    const handleSecurityBoolChange = (securityBool) => {
        if (securityBool !== null) {
            setSecurityBool(securityBool);
        }
    };

    const handleSecurityChange = (security) => {
        if (security !== null) {
            setSecurity(security);
        }
    };

    const handleDisplayDetailsChange = (displayDetails) => {
        if (displayDetails !== null) {
            setDisplayDetails(displayDetails);
        }
    };

    return (
        <>
            <CssBaseline />
            <Header searchUpdate={handleSearchMarker} searchState={UpdateBooly} setSecurityBool={handleSecurityBoolChange} displayDetailsBool={handleDisplayDetailsChange}/>
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List listDetails={list} setSecuList={handleSecuListChange} setSecurityBool={handleSecurityBoolChange} checkSecurityBool={securityBool} security={handleSecurityChange} />
                    <NetworkDetails selectedMarker={marker} searchUpdate={updateMarker} searchState={booly} displayDetails={displayDetails} displayDetailsBool={handleDisplayDetailsChange}/>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map updateMarker={handleMarkerChange} searchState={UpdateBooly} setList={handleListChange} checkSecurityBool={securityBool} listDetails={secuList} checkSecurity={security} displayDetailsBool={handleDisplayDetailsChange} />
                </Grid>
            </Grid>
           <Footer />
        </>
    );
};

export default App;