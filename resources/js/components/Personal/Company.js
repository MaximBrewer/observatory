import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ImageUpload from "./components/ImageUpload.js";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
    Folder as FolderIcon,
    Dashboard as DashboardIcon,
    CreateNewFolder as CreateNewFolderIcon,
    Dehaze as DehazeIcon,
    Business as BusinessIcon,
    Edit as EditIcon,
    AccountCircle as AccountCircleIcon,
    PersonAdd as PersonAddIcon,
    Menu as MenuIcon,
    ChevronLeft as ChevronLeftIcon,
    Notifications as NotificationsIcon,
    ExitToApp as ExitToAppIcon,
    ArrowDropDown as ArrowDropDownIcon,
    Add as AddIcon
} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginLeft: "auto",
        marginRight: "auto",
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
export default function Company(props) {
    const { user, updateUser } = props;
    const classes = useStyles();

    const [model, setModel] = useState({
        email: {
            value: "",
            errors: []
        },
        errors: []
    });

    const [company, setCompany] = useState({
        users: [],
        invites: []
    });

    useEffect(() => {
        api.call("get", "/api/company-full")
            .then(res => {
                setState(prevState => {
                    const { company } = res.data;
                    return { ...prevState, company };
                });
            })
            .catch(err => {});
    }, []);

    function handleChange(event) {
        setModel({
            email:
                event.target.name != "email"
                    ? {
                          value: model.email.value,
                          errors: model.email.errors
                      }
                    : {
                          value: event.target.value,
                          errors: !event.target.value
                              ? [__("Field is required!")]
                              : []
                      },
            errors: []
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        setModel({
            email: {
                value: model.email.value,
                errors: !model.email.value
                    ? [__("Field is required!")]
                    : model.email.errors
            },
            errors: model.errors
        });
        if (model.email.value) {
            api.call(`patch`, `/api/company/invite`, {
                email: model.email.value
            })
                .then(res => {
                    updateUser(res.data.user);
                })
                .catch(err => {
                    if (
                        err.response &&
                        err.response.data &&
                        err.response.data.errors
                    )
                        setModel({
                            email: {
                                value: model.email.value,
                                errors: err.response.data.errors.email
                            },
                            errors: [err.response.data.message]
                        });
                });
        }
    }

    return (
        <Container component="main">
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" color="primary" gutterBottom>
                        {__("Company")}
                    </Typography>
                    <List className={classes.root}>
                        <ListItem role={undefined}>
                            <ListItemText primary={user.company.title} />
                        </ListItem>
                        <ListItem role={undefined}>
                            <ListItemText primary={user.company.www} />
                        </ListItem>
                        <ListItem role={undefined}>
                            <ListItemText primary={user.company.contact} />
                        </ListItem>
                        <ListItem role={undefined}>
                            <ListItemText primary={user.company.phone} />
                        </ListItem>
                        <ListItem role={undefined}>
                            <ListItemText primary={user.company.email} />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} md={6}>
                    {user.company &&
                    (user.company.role == "administrator" ||
                        user.company.role == "manager") ? (
                        <form
                            className={classes.form}
                            noValidate
                            onSubmit={handleSubmit}
                        >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                value={model.email.value}
                                id="email"
                                label={__("E-mail")}
                                name="email"
                                autoComplete="email"
                                error={
                                    !!model.email.errors &&
                                    !!model.email.errors.length
                                }
                                helperText={
                                    !!model.email.errors &&
                                    !!model.email.errors.length
                                        ? model.email.errors.join(", ")
                                        : ""
                                }
                                onChange={handleChange}
                            />
                            <Box display="flex" flexDirection="row-reverse">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    {__("Send")}
                                </Button>
                            </Box>
                        </form>
                    ) : (
                        ""
                    )}
                    <Typography variant="h5" color="primary" gutterBottom>
                        {__("Users")}
                    </Typography>
                    <List className={classes.root}>
                        {company.users.map((model, index) => (
                            <ListItem role={undefined} key={index}>
                                <ListItemText
                                    primary={
                                        model.profile.firstname +
                                        " " +
                                        model.profile.lastname
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Typography variant="h5" color="primary" gutterBottom>
                        {__("Invites")}
                    </Typography>
                    <List className={classes.root}>
                        {company.invites.map((model, index) => (
                            <ListItem role={undefined} key={index}>
                                <ListItemText primary={model.email} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </Container>
    );
}
