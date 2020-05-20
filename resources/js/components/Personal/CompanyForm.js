import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

export default function CompanyForm(props) {
    const { company, updateUser } = props;

    const classes = useStyles();

    const [model, setModel] = useState({
        id: company ? company.id : null,
        title: {
            value: company ? company.title : "",
            errors: []
        },
        www: {
            value: company ? company.www : "",
            errors: []
        },
        contact: {
            value: company ? company.contact : "",
            errors: []
        },
        phone: {
            value: company ? company.phone : "",
            errors: []
        },
        email: {
            value: company ? company.email : "",
            errors: []
        },
        errors: []
    });

    function handleChange(event) {
        setModel({
            id: model.id,
            title:
                event.target.name != "title"
                    ? {
                          value: model.title.value,
                          errors: model.title.errors
                      }
                    : {
                          value: event.target.value,
                          errors: !event.target.value
                              ? [__("Field is required!")]
                              : []
                      },
            www:
                event.target.name != "www"
                    ? {
                          value: model.www.value,
                          errors: model.www.errors
                      }
                    : {
                          value: event.target.value,
                          errors: !event.target.value
                              ? [__("Field is required!")]
                              : []
                      },
            contact:
                event.target.name != "contact"
                    ? {
                          value: model.contact.value,
                          errors: model.contact.errors
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
            id: model.id,
            title: {
                value: model.title.value,
                errors: !model.title.value
                    ? [__("Field is required!")]
                    : model.title.errors
            },
            email: {
                value: model.email.value,
                errors: !model.email.value
                    ? [__("Field is required!")]
                    : model.email.errors
            },
            phone: {
                value: model.phone.value,
                errors: !model.phone.value
                    ? [__("Field is required!")]
                    : model.phone.errors
            },
            www: {
                value: model.www.value,
                errors: !model.www.value
                    ? [__("Field is required!")]
                    : model.www.errors
            },
            contact: {
                value: model.contact.value,
                errors: !model.contact.value
                    ? [__("Field is required!")]
                    : model.contact.errors
            },
            errors: model.errors
        });
        if (
            model.title.value &&
            model.email.value &&
            model.phone.value &&
            model.www.value &&
            model.contact.value
        ) {
            api.call(
                model.id ? `patch` : `post`,
                `/api/company` + (model.id ? "/" + model.id : ``),
                {
                    id: model.id,
                    title: model.title.value,
                    email: model.email.value,
                    phone: model.phone.value,
                    www: model.www.value,
                    contact: model.contact.value
                }
            )
                .then(res => {
                    updateUser(res.data.user);
                    let company = res.data.user.company;
                    setModel({
                        id: company ? company.id : null,
                        title: {
                            value: company ? company.title : "",
                            errors: []
                        },
                        www: {
                            value: company ? company.www : "",
                            errors: []
                        },
                        contact: {
                            value: company ? company.contact : "",
                            errors: []
                        },
                        phone: {
                            value: company ? company.phone : "",
                            errors: []
                        },
                        email: {
                            value: company ? company.email : "",
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
                            id: model.id,
                            title: {
                                value: model.title.value,
                                errors: err.response.data.errors.title
                            },
                            email: {
                                value: model.email.value,
                                errors: err.response.data.errors.email
                            },
                            phone: {
                                value: model.phone.value,
                                errors: err.response.data.errors.phone
                            },
                            www: {
                                value: model.www.value,
                                errors: err.response.data.errors.www
                            },
                            contact: {
                                value: model.contact.value,
                                errors: err.response.data.errors.contact
                            },
                            errors: [err.response.data.message]
                        });
                });
        }
    }

    return (
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        value={model.title.value}
                        id="title"
                        label={__("Title")}
                        name="title"
                        autoComplete="title"
                        error={
                            !!model.title.errors && !!model.title.errors.length
                        }
                        helperText={
                            !!model.title.errors && !!model.title.errors.length
                                ? model.title.errors.join(", ")
                                : ""
                        }
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        value={model.www.value}
                        id="www"
                        label={__("Web Site")}
                        name="www"
                        autoComplete="www"
                        error={!!model.www.errors && !!model.www.errors.length}
                        helperText={
                            !!model.www.errors && !!model.www.errors.length
                                ? model.www.errors.join(", ")
                                : ""
                        }
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        value={model.contact.value}
                        id="contact"
                        label={__("Contact Person")}
                        name="contact"
                        autoComplete="contact"
                        error={
                            !!model.contact.errors &&
                            !!model.contact.errors.length
                        }
                        helperText={
                            !!model.contact.errors &&
                            !!model.contact.errors.length
                                ? model.contact.errors.join(", ")
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
                            !!model.phone.errors && !!model.phone.errors.length
                        }
                        helperText={
                            !!model.phone.errors && !!model.phone.errors.length
                                ? model.phone.errors.join(", ")
                                : ""
                        }
                        onChange={handleChange}
                    />
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
                            !!model.email.errors && !!model.email.errors.length
                        }
                        helperText={
                            !!model.email.errors && !!model.email.errors.length
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
                            {model.id ? __("Update") : __("Add")}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
}
