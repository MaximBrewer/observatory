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

export default function PasswordResetPage() {
    const classes = useStyles();

    const [auth, setAuthState] = useState({
        email: {
            value: !!window.email_fp ? window.email_fp : null,
            errors: null
        },
        password_confirmation: {
            value: null,
            errors: null
        },
        password: {
            value: null,
            errors: null
        },
        errors: null
    });

    function handleChange(event) {
        setAuthState({
            email:
                event.target.name != "email"
                    ? {
                          value: auth.email.value,
                          errors: auth.email.errors
                      }
                    : {
                          value: event.target.value,
                          errors: !event.target.value
                              ? [__("Field is required!")]
                              : null
                      },
            password:
                event.target.name != "password"
                    ? {
                          value: auth.password.value,
                          errors: auth.password.errors
                      }
                    : {
                          value: event.target.value,
                          errors: !event.target.value
                              ? [__("Field is required!")]
                              : null
                      },
            password_confirmation:
                event.target.name != "password_confirmation"
                    ? {
                          value: auth.password_confirmation.value,
                          errors: auth.password_confirmation.errors
                      }
                    : {
                          value: event.target.value,
                          errors: !event.target.value
                              ? [__("Field is required!")]
                              : null
                      },
            errors: null
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        setAuthState({
            email: {
                value: auth.email.value,
                errors: !auth.email.value
                    ? [__("Field is required!")]
                    : auth.email.errors
            },
            password: {
                value: auth.password.value,
                errors: !auth.password.value
                    ? [__("Field is required!")]
                    : auth.password.errors
            },
            password_confirmation: {
                value: auth.password_confirmation.value,
                errors: !auth.password_confirmation.value
                    ? [__("Field is required!")]
                    : auth.password_confirmation.errors
            },
            errors: auth.errors
        });
        if (auth.email.value) {
            axios
                .post(`/api/password/reset`, {
                    email: auth.email.value,
                    password: auth.password.value,
                    token: window.token_fp,
                    password_confirmation: auth.password_confirmation.value
                })
                .then(res => {
                    if (res.data) {
                        location.href = '/personal';
                    }
                })
                .catch(err => {
                    if (
                        err.response &&
                        err.response.data &&
                        err.response.data.errors
                    )
                        setAuthState({
                            email: {
                                value: auth.email.value,
                                errors: err.response.data.errors.email
                            },
                            password: {
                                value: auth.password.value,
                                errors: err.response.data.errors.password
                            },
                            password_confirmation: {
                                value: auth.password_confirmation.value,
                                errors: err.response.data.errors.password_confirmation
                            },
                            errors: [err.response.data.message]
                        });
                });
        }
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
                    <Typography component="h1" variant="h5">
                        {__("Reset Password")}
                    </Typography>
                    <form
                        className={classes.form}
                        noValidate
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="hidden"
                            name="token"
                            value={window.token_fp}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={auth.email.value}
                            id="email"
                            readOnly={true}
                            error={
                                !!auth.email.errors &&
                                !!auth.email.errors.length
                            }
                            helperText={
                                !!auth.email.errors &&
                                !!auth.email.errors.length
                                    ? auth.email.errors.join(", ")
                                    : ""
                            }
                            label={__("E-mail")}
                            name="email"
                            type="text"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            error={
                                !!auth.password.errors &&
                                !!auth.password.errors.length
                            }
                            helperText={
                                !!auth.password.errors &&
                                !!auth.password.errors.length
                                    ? auth.password.errors.join(", ")
                                    : ""
                            }
                            label={__("Password")}
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            error={
                                !!auth.password_confirmation.errors &&
                                !!auth.password_confirmation.errors.length
                            }
                            helperText={
                                !!auth.password_confirmation.errors &&
                                !!auth.password_confirmation.errors.length
                                    ? auth.password_confirmation.errors.join(
                                          ", "
                                      )
                                    : ""
                            }
                            name="password_confirmation"
                            label={__("Confirm password")}
                            type="password"
                            id="passwordConfirm"
                            autoComplete="new-password"
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {__("Reset Password")}
                        </Button>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

const AlertSuccess = () => {
    return (
        <Alert severity="success">
            {__(
                "Мы отправили вам ссылку для сброса пароля по электронной почте!"
            )}
        </Alert>
    );
};
