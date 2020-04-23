import axios from "axios";
import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import { default as LinkMUI } from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Copyright from "../layouts/Copyright";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100vh"
    },
    image: {
        backgroundImage: "url(https://source.unsplash.com/random)",
        backgroundRepeat: "no-repeat",
        backgroundColor:
            theme.palette.type === "dark"
                ? theme.palette.grey[900]
                : theme.palette.grey[50],
        backgroundSize: "cover",
        backgroundPosition: "center"
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

export default function EmailVerifyPage() {

    const classes = useStyles();

    const [sent, setSentState] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        axios
            .post(`/email/resend`)
            .then(res => {
                setSentState(true);
            })
            .catch(err => {});
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
            >
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" paragraph={true}>
                        {__("Verify Your Email Address")}
                    </Typography>
                    {sent ? <AlertSuccess /> : ""}
                    <ShowForm handleSubmit={handleSubmit} />
                </div>
            </Grid>
        </Grid>
    );
}
const AlertSuccess = () => {
    return (
        <Alert severity="success">
                {__(
                    "A fresh verification link has been sent to your email address."
                )}
        </Alert>
    );
};
const ShowForm = props => {
    const classes = useStyles();
    return (
        <Grid>
            {__(
                "Before proceeding, please check your email for a verification link."
            )}
            {__("If you did not receive the email")},
            <form
                className={classes.form}
                noValidate
                onSubmit={props.handleSubmit}
            >
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    {__("click here to request another")}
                </Button>
            </form>
        </Grid>
    );
};
