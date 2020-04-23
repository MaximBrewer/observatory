import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ImageUpload from "./components/ImageUpload.js";
import Paper from "@material-ui/core/Paper";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        width: theme.spacing(20),
        height: theme.spacing(20),
        backgroundColor: theme.palette.primary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));
export default function Profile() {
    const classes = useStyles();
    return (
        <Container component="main">
            <CssBaseline />
            <form className={classes.form} noValidate>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Avatar className={classes.avatar}>
                            <ImageUpload cardName="Input Image" />
                        </Avatar>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="firstname"
                            label={__("Firstname")}
                            name="firstname"
                            autoComplete="firstname"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="lastname"
                            label={__("Lastname")}
                            name="lastname"
                            autoComplete="lastname"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {__("Save")}
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="firstname"
                            label={__("Firstname")}
                            name="firstname"
                            autoComplete="firstname"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="lastname"
                            label={__("Lastname")}
                            name="lastname"
                            autoComplete="lastname"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {__("Save")}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}
