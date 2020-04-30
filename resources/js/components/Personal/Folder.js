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
    CssBaseline
} from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";
import Rating from "@material-ui/lab/Rating";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

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

export default function Folder() {
    const [state, setState] = React.useState({
        columns: [
            {
                title: window.__("Title"),
                field: "title",
                render: rowData => (
                    <Link to={`/personal/projects/${rowData.id}`}>
                        {rowData.title}
                    </Link>
                )
            },
            {
                title: window.__("Deviation, %"),
                field: "deviation",
                type: 'numeric'
            },
            {
                title: window.__("Frequency, hours"),
                field: "frequency",
                type: 'numeric'
            },
            {
                title: __("Site"),
                field: "site_id",
                lookup: window.sitesObject,
            }
        ],
        data: []
    });

    useEffect(() => {
        axios
            .get("/api/projects")
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

    return (
        <MaterialTable
            title={window.__("Projects")}
            columns={state.columns}
            data={state.data}
            className={classes.table}
            localization={{
                pagination: {
                    labelDisplayedRows:
                        "{from}-{to} " + window.__("of") + " {count}",
                    labelRowsSelect: window.__("rows")
                },
                toolbar: {
                    nRowsSelected: "{0} " + window.__("row(s)") + " selected",
                    searchTooltip: window.__("Search"),
                    searchPlaceholder: window.__("Search")
                },
                header: {
                    actions: window.__("Actions")
                },
                body: {
                    emptyDataSourceMessage: window.__("No records to display"),
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
                    axios.post("/api/projects", newData).then(res => {
                        setState(prevState => {
                            const data = [...prevState.data];
                            data.push(res.data.data);
                            return { ...prevState, data };
                        });
                    }),
                onRowUpdate: (newData, oldData) =>
                    axios
                        .patch("/api/projects/" + oldData.id, newData)
                        .then(res => {
                            if (oldData) {
                                setState(prevState => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = res.data.data;
                                    return { ...prevState, data };
                                });
                            }
                        }),
                onRowDelete: oldData =>
                    axios.delete("/api/projects/" + oldData.id).then(res => {
                        setState(prevState => {
                            const data = [...prevState.data];
                            data.splice(data.indexOf(oldData), 1);
                            return { ...prevState, data };
                        });
                    })
            }}
        />
    );
}
