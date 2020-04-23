import React, { useState, useEffect } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container, Button } from "@material-ui/core";
import CameraIcon from "@material-ui/icons/Camera";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
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

export default function Projects(props) {
    const [product, setProduct] = useState({});
    const [state, setState] = useState({
        columns: [
            {
                title: window.__("Site price, ₽"),
                field: "site_price"
            },
            {
                title: window.__("Deviation, %"),
                field: "deviation"
            },
            {
                title: window.__("Date & Time"),
                field: "created_at"
            }
        ],
        data: []
    });

    useEffect(() => {
        axios
            .get("/api/project/"+props.match.params.projectId+"/products/" + props.match.params.productId)
            .then(res => {
                setState(prevState => {
                    const data = res.data.product.logs;
                    return { ...prevState, data };
                });
                setProduct({
                    title: res.data.product.title,
                    price: res.data.product.price
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
        <Container component="main">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <h1>{product.title} - {product.price}₽</h1>
                </Grid>
                <Grid item xs={12}>
                    <MaterialTable
                        title={window.__("Product History")}
                        columns={state.columns}
                        data={state.data}
                        className={classes.table}
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
                            body: {
                                emptyDataSourceMessage: window.__(
                                    "No records to display"
                                ),
                                filterRow: {
                                    filterTooltip: window.__("Filter")
                                }
                            }
                        }}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
