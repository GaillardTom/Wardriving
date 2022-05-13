import React from "react";
import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@mui/material";
import { ClassNames } from "@emotion/react";
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './styles'



const Header = () => {

    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>

                <Typography variant="h5" className={classes.title}>

                    Wardriving Mapper

                </Typography>

                <Box display="flex">
                    <Typography variant="h5" className={classes.title}>

                        Search a Place            
                    </Typography>

                    {/*<Autocomplete>*/}

                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase placeholder="Search ..." classes={{root: classes.inputRoot, input: classes.inputInput}}/>
                        </div>
                    {/*</Box></Autocomplete>*/}
                </Box>

            </Toolbar>
        </ AppBar>
    );
}
export default Header;