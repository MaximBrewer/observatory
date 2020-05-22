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
export default function Profile(props) {
    const { user, updateUser } = props;
    const classes = useStyles();

    const [model, setModel] = useState({
        firstname: {
            value: user.profile.firstname ? user.profile.firstname : "",
            errors: []
        },
        lastname: {
            value: user.profile.lastname ? user.profile.lastname : "",
            errors: []
        },
        phone: {
            value: user.profile.phone ? user.profile.phone : "",
            errors: []
        },
        errors: []
    });

    function handleChange(event) {
        setModel({
            firstname:
                event.target.name != "firstname"
                    ? {
                          value: model.firstname.value,
                          errors: model.firstname.errors
                      }
                    : {
                          value: event.target.value,
                          errors: !event.target.value
                              ? [__("Field is required!")]
                              : []
                      },
            lastname:
                event.target.name != "lastname"
                    ? {
                          value: model.lastname.value,
                          errors: model.lastname.errors
                      }
                    : {
                          value: event.target.value,
                          errors: !event.target.value
                              ? [__("Field is required!")]
                              : []
                      },
            phone:
                event.target.name != "phone"
                    ? {
                          value: model.phone.value,
                          errors: model.phone.errors
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
            firstname: {
                value: model.firstname.value,
                errors: !model.firstname.value
                    ? [__("Field is required!")]
                    : model.firstname.errors
            },
            lastname: {
                value: model.lastname.value,
                errors: !model.lastname.value
                    ? [__("Field is required!")]
                    : model.lastname.errors
            },
            phone: {
                value: model.phone.value,
                errors: !model.phone.value
                    ? [__("Field is required!")]
                    : model.phone.errors
            },
            errors: model.errors
        });
        if (
            model.firstname.value &&
            model.lastname.value &&
            model.phone.value
        ) {
            api.call(`patch`, `/api/profile`, {
                firstname: model.firstname.value,
                lastname: model.lastname.value,
                phone: model.phone.value
            })
                .then(res => {
                    updateUser(res.data.user);
                    let profile = res.data.user.profile;
                    setModel({
                        firstname: {
                            value: profile ? profile.firstname : "",
                            errors: []
                        },
                        lastname: {
                            value: profile ? profile.lastname : "",
                            errors: []
                        },
                        phone: {
                            value: profile ? profile.phone : "",
                            errors: []
                        },
                        errors: []
                    });
                })
                .catch(err => {
                    if (
                        err.response &&
                        err.response.data &&
                        err.response.data.errors
                    )
                        setModel({
                            firstname: {
                                value: model.firstname.value,
                                errors: err.response.data.errors.firstname
                            },
                            lastname: {
                                value: model.lastname.value,
                                errors: err.response.data.errors.lastname
                            },
                            phone: {
                                value: model.phone.value,
                                errors: err.response.data.errors.phone
                            },
                            errors: [err.response.data.message]
                        });
                });
        }
    }

    return (
        <Container component="main">
            <CssBaseline />
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Avatar className={classes.avatar}>
                            <ImageUpload
                                cardName="Input Image"
                                profile={user.profile}
                            />
                        </Avatar>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={model.firstname.value}
                            id="firstname"
                            label={__("Firstname")}
                            name="firstname"
                            autoComplete="firstname"
                            error={
                                !!model.firstname.errors &&
                                !!model.firstname.errors.length
                            }
                            helperText={
                                !!model.firstname.errors &&
                                !!model.firstname.errors.length
                                    ? model.firstname.errors.join(", ")
                                    : ""
                            }
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={model.lastname.value}
                            id="lastname"
                            label={__("Lastname")}
                            name="lastname"
                            autoComplete="lastname"
                            error={
                                !!model.lastname.errors &&
                                !!model.lastname.errors.length
                            }
                            helperText={
                                !!model.lastname.errors &&
                                !!model.lastname.errors.length
                                    ? model.lastname.errors.join(", ")
                                    : ""
                            }
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={model.phone.value}
                            id="phone"
                            label={__("Phone")}
                            name="phone"
                            autoComplete="phone"
                            error={
                                !!model.phone.errors &&
                                !!model.phone.errors.length
                            }
                            helperText={
                                !!model.phone.errors &&
                                !!model.phone.errors.length
                                    ? model.phone.errors.join(", ")
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
                                {__("Save")}
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" color="primary" gutterBottom>
                            {__("Companies")}
                        </Typography>
                        <List className={classes.root}>
                            {user.companies.map((item, index) => (
                                <React.Fragment key={index}>
                                    <ListItem
                                        role={undefined}
                                        dense
                                        // onClick={handleToggle(value)}
                                    >
                                        <ListItemText
                                            primary={
                                                <Typography
                                                    gutterBottom
                                                    variant="h6"
                                                >
                                                    {item.title}
                                                </Typography>
                                            }
                                            secondary={
                                                <React.Fragment>
                                                    {item.www}
                                                    <br></br>
                                                    {item.contact}
                                                    <br></br>
                                                    {item.phone}
                                                    <br></br>
                                                    {item.email}
                                                    <br></br>
                                                    <b>
                                                        {item.role ==
                                                        "administrator"
                                                            ? __(
                                                                  "Administrator"
                                                              )
                                                            : item.role ==
                                                              "manager"
                                                            ? __("Manager")
                                                            : __("User")}
                                                    </b>
                                                    <br></br>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                    <Divider component="li" />
                                </React.Fragment>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}
