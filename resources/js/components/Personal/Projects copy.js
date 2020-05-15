import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
    Grid,
    Paper,
    Container,
    Badge,
    IconButton,
    Divider,
    Typography,
    Collapse,
    List,
    Toolbar,
    Table,
    AppBar,
    Box,
    Drawer,
    CssBaseline,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Row
} from "@material-ui/core";
import {
    Folder as FolderIcon,
    Dashboard as DashboardIcon,
    CreateNewFolder as CreateNewFolderIcon,
    Dehaze as DehazeIcon
} from "@material-ui/icons";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import TablePagination from "@material-ui/core/TablePagination";
import Rating from "@material-ui/lab/Rating";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

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

export default function Projects() {
    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",

        // change background colour if dragging
        background: isDragging ? "lightgreen" : "grey",

        // styles we need to apply on draggables
        ...draggableStyle
    });

    const [state, setState] = React.useState({
        columns: [
            {
                title: __("Title"),
                field: "title"
                // render: rowData => (
                //     <Link to={`/personal/projects/${rowData.id}`}>
                //         {rowData.title}
                //     </Link>
                // )
            }
            // {
            //     title: __("Manager"),
            //     field: "user.title",
            //     disabled: true,
            //     editable: "never"
            // },
            // {
            //     title: __("Deviation, +%"),
            //     field: "higher_deviation",
            //     type: "numeric"
            // },
            // {
            //     title: __("Deviation, -%"),
            //     field: "lower_deviation",
            //     type: "numeric"
            // },
            // {
            //     title: __("Frequency, hours"),
            //     field: "frequency",
            //     type: "numeric"
            // },
            // {
            //     title: __("Site"),
            //     field: "site_id",
            //     lookup: window.sitesObject
            // }
        ],
        data: []
    });

    useEffect(() => {
        window.api
            .call("get", "/api/projects")
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

    const addFolder = e => {
        setOpen(true);
    };
    const handleClose = e => {
        setOpen(false);
    };

    const onChange = e => {
        setFolder(e.target.value);
    };

    const addProject = e => {
        // setOpen(true);
    };

    const addFolderRequest = e => {
        window.api
            .call("post", "/api/folders", { title: folder })
            .then(res => {
                setFolders(res.data.data);
                setFolder("");
                setOpen(false);
            })
            .catch(err => {
                if (
                    err.response &&
                    err.response.data &&
                    err.response.data.errors
                ) {
                    console.log(err.response.data.errors);
                }
            });
    };

    const deleteFolder = id => {
        confirm({
            title: __("Are you shure?"),
            description: __("Are you sure you want to delete the folder?"),
            confirmationText: __("Ok"),
            cancellationText: __("Cancel"),
            dialogProps: {},
            confirmationButtonProps: {},
            cancellationButtonProps: {}
        }).then(() => {
            window.api
                .call("delete", "/api/folders/" + id)
                .then(res => {
                    setFolders(res.data.data);
                })
                .catch(err => {
                    if (
                        err.response &&
                        err.response.data &&
                        err.response.data.errors
                    ) {
                        console.log(err.response.data.errors);
                    }
                });
        });
    };

    const onDragEnd = result => {
        // dropped outside the list
        console.log(result);
        if (!result.destination) {
            return;
        }

        // const items = reorder(
        //     this.state.items,
        //     result.source.index,
        //     result.destination.index
        // );

        // this.setState({
        //     items
        // });
    };

    const onDragEndFalse = result => {};

    const classes = useStyles();

    return (
        <React.Fragment>
            <DragDropContext onDragEnd={onDragEnd}>
                <Grid container spacing={3} aria-label="collapsible table">
                    <Grid item xs={12}>
                        <Droppable droppableId="droppable1">
                            {(provided, snapshot) => (
                                <Paper
                                    ref={provided.innerRef}
                                    className={classes.paper}
                                >
                                    xs=12
                                </Paper>
                            )}
                        </Droppable>
                    </Grid>

                    <Grid item xs={6}>
                        <Paper className={classes.paper}>xs=6</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>xs=6</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>xs=3</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>xs=3</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>xs=3</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>xs=3</Paper>
                    </Grid>
                </Grid>
            </DragDropContext>
            <DragDropContext onDragEnd={onDragEndFalse}>
                <Droppable droppableId="droppable-false">
                    {(provided, snapshot) => (
                        <TableContainer
                            component={Paper}
                            ref={provided.innerRef}
                        >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell>Название</TableCell>
                                        <TableCell>
                                            Дата обновления информации
                                        </TableCell>
                                        <TableCell>
                                            Сайт (профиль парсинга)
                                        </TableCell>
                                        <TableCell>Активен</TableCell>
                                        <TableCell>Пользователь</TableCell>
                                        <TableCell>
                                            <AddIcon onClick={addProject} />
                                            <CreateNewFolderIcon
                                                onClick={addFolder}
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {state.data.map((item, index) => (
                                        <Draggable
                                            draggableId={"row" + index}
                                            index={index}
                                            key={index}
                                        >
                                            {(provided, snapshot) => (
                                                <TableRow
                                                    key={index}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <TableCell align="right">
                                                        {item.title}
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </Draggable>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Droppable>
            </DragDropContext>
        </React.Fragment>
    );
}
