// imports the React Javascript Library
import React, { useState } from "react";
import axios from "axios";
//Card
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";

import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

import red from "@material-ui/core/colors/red";
import pink from "@material-ui/core/colors/pink";
import blue from "@material-ui/core/colors/blue";

import Icon from "@material-ui/core/Icon";
import PageviewIcon from "@material-ui/icons/Pageview";
import SearchIcon from "@material-ui/icons/Search";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import CollectionsIcon from "@material-ui/icons/Collections";

import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";

// Search
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import ReplayIcon from "@material-ui/icons/Replay";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end"
    },
    icon: {},
    iconHover: {
        "&:hover": {
            color: red[800]
        }
    },
    cardHeader: {
        textalign: "center",
        align: "center",
        backgroundColor: "white"
    },
    input: {
        display: "none"
    },
    title: {
        color: blue[800],
        fontWeight: "bold",
        fontFamily: "Montserrat",
        align: "center"
    },
    button: {
        color: blue[900],
        margin: 5
    },
    secondaryButton: {
        color: "gray",
        margin: 10
    },
    typography: {
        backgroundColor: "default"
    },
    lbl: {
        cursor: "pointer"
    }
}));

export default function ImageUploadCard(props) {
    const classes = useStyles();
    const [state, setState] = useState(!!window.auth.user.profile.avatar ? "/storage/" + window.auth.user.profile.avatar : "/storage/users/default.png");

    const handleUploadClick = event => {
        const reader = new FileReader();

        reader.onloadend = function(e) {
            axios
                .post(`/api/profile/setAvatar`, {
                    image: reader.result
                })
                .then(res => {
                    setState("/storage/" + res.data);
                    window.auth.user.profile.avatar = res.data;
                    window.localStorage.setItem("user", JSON.stringify(window.auth.user));
                })
                .catch(err => {});
        }.bind(this);
        reader.readAsDataURL(event.target.files[0]);
    };

    const renderUploadedState = () => {
        return (
            <React.Fragment>
                <Grid container justify="center" alignItems="center">
                    <input
                        accept="image/jpeg,image/png"
                        className={classes.input}
                        id="contained-button-file"
                        type="file"
                        onChange={handleUploadClick}
                    />
                    <label htmlFor="contained-button-file" className={classes.lbl}>
                        <img
                            className={classes.image}
                            src={state}
                        />
                    </label>
                </Grid>
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            {renderUploadedState()}
        </React.Fragment>
    );
}
