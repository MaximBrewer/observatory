
import {
    BrowserRouter as Router,
    Redirect,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import clsx from "clsx";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    Paper,
    Container,
    Badge,
    IconButton,
    Divider,
    Typography,
    List,
    Toolbar,
    AppBar,
    Box,
    Drawer,
    CssBaseline,
    Button
} from "@material-ui/core";
import CameraIcon from "@material-ui/icons/Camera";
import ImageIcon from "@material-ui/icons/Image";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

import TablePagination from "@material-ui/core/TablePagination";
import Rating from "@material-ui/lab/Rating";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { useConfirm } from "material-ui-confirm";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    toolbar: {
        paddingRight: 24 // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: 36
    },
    menuButtonHidden: {
        display: "none"
    },
    title: {
        flexGrow: 1
    },
    drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9)
        }
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto"
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column"
    },
    fixedHeight: {
        height: 240
    },
    table: {}
}));

export default function Projects(props) {
    const confirm = useConfirm();
    const [upload, setUpload] = React.useState("");
    const [state, setState] = React.useState({
        columns: [
            {
                title: window.__("Article"),
                field: "article"
            },
            {
                title: window.__("Title"),
                field: "title"
            },
            {
                title: window.__("Url"),
                field: "url",
                render: rowData => (
                    <Link to={`${rowData.url}`}>{rowData.url}</Link>
                )
            },
            {
                title: window.__("Price"),
                field: "price",
                type: "numeric"
            },
            {
                title: window.__("Last price"),
                field: "last_price",
                disabled: true,
                editable: "never"
            },
            {
                title: window.__("Deviation, +%"),
                field: "higher_deviation",
                type: "numeric"
            },
            {
                title: window.__("Deviation, -%"),
                field: "lower_deviation",
                type: "numeric"
            },
            {
                title: window.__("Frequency, hours"),
                field: "frequency",
                type: "numeric"
            }
        ],
        data: []
    });

    useEffect(() => {
        axios
            .get("/api/project/" + props.match.params.projectId + "/products")
            .then(res => {
                setState(prevState => {
                    const data = res.data.data;
                    return { ...prevState, data };
                });
            })
            .catch(err => {
                if (
                    err.response &&
                    err.response.data &&
                    err.response.data.errors
                ) {
                }
            });
    }, []);

    const classes = useStyles();

    const onChange = event => {
        let elem = event.target;
        confirm({
            description: __("Are you shure?")
        }).then(() => {
            if (!!elem.files[0]) {
                let formData = new FormData();
                formData.append("file", elem.files[0]);
                axios
                    .post(
                        "/api/project/" + props.match.params.projectId + "/xls",
                        formData
                    )
                    .then(res => {
                        setState(prevState => {
                            const data = res.data.data;
                            return { ...prevState, data };
                        });
                    })
                    .catch(err => {
                        if (
                            err.response &&
                            err.response.data &&
                            err.response.data.errors
                        ) {
                        }
                    });
            }
        });
    };

    return (
        <Container component="main">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <input
                        color="primary"
                        accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        type="file"
                        onChange={onChange}
                        id="uploadXlsFile"
                        style={{ display: "none" }}
                    />
                    <label htmlFor="uploadXlsFile">
                        <Button
                            variant="contained"
                            component="span"
                            className={classes.button}
                            size="large"
                            color="primary"
                        >
                            {__("Upload Excell")}
                            <PlaylistAddIcon className={classes.extendedIcon} />
                        </Button>
                    </label>
                </Grid>
                <Grid item xs={12}>
                    <MaterialTable
                        title={window.__("Projects")}
                        columns={state.columns}
                        data={state.data}
                        className={classes.table}
                        actions={[
                            {
                                icon: "camera",
                                tooltip: __("Show History"),
                                onClick: (event, rowData) => {
                                    location.href=`/personal/project/${props.match.params.projectId}/products/${rowData.id}`
                                }
                            }
                        ]}
                        options={{
                            actionsColumnIndex: -1
                        }}
                        localization={{
                            pagination: {
                                labelDisplayedRows:
                                    "{from}-{to} " +
                                    window.__("of") +
                                    " {count}",
                                labelRowsSelect: window.__("rows")
                            },
                            toolbar: {
                                nRowsSelected:
                                    "{0} " + window.__("row(s)") + " selected",
                                searchTooltip: window.__("Search"),
                                searchPlaceholder: window.__("Search")
                            },
                            header: {
                                actions: window.__("Actions")
                            },
                            body: {
                                emptyDataSourceMessage: window.__(
                                    "No records to display"
                                ),
                                filterRow: {
                                    filterTooltip: window.__("Filter")
                                },
                                editRow: {
                                    deleteText: window.__(
                                        "Are you sure you want to delete project?"
                                    )
                                }
                            }
                        }}
                        editable={{
                            onRowAdd: newData =>
                                axios
                                    .post(
                                        "/api/project/" +
                                            props.match.params.projectId +
                                            "/products",
                                        newData
                                    )
                                    .then(res => {
                                        setState(prevState => {
                                            const data = res.data.data;
                                            return { ...prevState, data };
                                        });
                                    }),
                            onRowUpdate: (newData, oldData) =>
                                axios
                                    .patch(
                                        "/api/project/" +
                                            props.match.params.projectId +
                                            "/products/" +
                                            oldData.id,
                                        newData
                                    )
                                    .then(res => {
                                        if (oldData) {
                                            setState(prevState => {
                                                const data = res.data.data;
                                                return { ...prevState, data };
                                            });
                                        }
                                    }),
                            onRowDelete: oldData =>
                                axios
                                    .delete(
                                        "/api/project/" +
                                            props.match.params.projectId +
                                            "/products/" +
                                            oldData.id
                                    )
                                    .then(res => {
                                        setState(prevState => {
                                            const data = res.data.data;
                                            return { ...prevState, data };
                                        });
                                    })
                        }}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
