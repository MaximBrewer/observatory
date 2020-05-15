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
    FormControl,
    Typography,
    Button,
    Collapse,
    ListItemIcon,
    ListItemText,
    List,
    Toolbar,
    Table,
    AppBar,
    ListItem,
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

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import {
    Folder as FolderIcon,
    Dashboard as DashboardIcon,
    CreateNewFolder as CreateNewFolderIcon,
    Dehaze as DehazeIcon
} from "@material-ui/icons";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import PostAddIcon from "@material-ui/icons/PostAdd";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import AddIcon from "@material-ui/icons/Add";
import TablePagination from "@material-ui/core/TablePagination";
import Rating from "@material-ui/lab/Rating";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useConfirm } from "material-ui-confirm";
import { green, red } from "@material-ui/core/colors";

import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column"
    },
    actionRow: {
        width: "1px",
        textAlign: "center",
        whiteSpace: "nowrap"
    },
    liCenter: {
        textAlign: "center",
        display: "flex",
        flexDirection: "column"
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    formControl: {}
}));

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    background: isDragging ? "lightgreen" : "initial",
    ...draggableStyle
});

function FormProject(props) {
    const { project } = props;
    const [form, setForm] = React.useState(project);
    const classes = useStyles();
    const handleChange = event => {
        console.log(project);
        setForm({
            [event.target.name]: event.target.value
        });
    };
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label={__("Title")}
                    name="title"
                    autoComplete="title"
                    value={form.title}
                    onChange={handleChange}
                    autoFocus
                />
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
                <FormControlLabel
                    value="1"
                    checked={!!form.active}
                    control={<Checkbox color="primary" />}
                    label="Активен"
                    labelPlacement="end"
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    {__("Save")}
                </Button>
            </Grid>
        </Grid>
    );
}

function UpdateProject(props) {
    const { colspan, tropened, project } = props;

    return (
        <TableRow>
            <TableCell
                style={{ paddingBottom: 0, paddingTop: 0 }}
                colSpan={colspan}
            >
                <Collapse
                    in={!!tropened[project.id]}
                    timeout="auto"
                    unmountOnExit
                >
                    <Box margin={1}>
                        <FormProject project={project} />
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    );
}

function FolderTable(props) {
    const { projects, updateState, provided, deleteProject, tropened } = props;
    const addProject = () => {};
    const classes = useStyles();

    return projects.length ? (
        <Table size="small" aria-label="purchases">
            <TableHead>
                <TableRow>
                    <TableCell component="th" />
                    <TableCell component="th">Название</TableCell>
                    <TableCell component="th">
                        Дата обновления информации
                    </TableCell>
                    <TableCell component="th">
                        Сайт (профиль парсинга)
                    </TableCell>
                    <TableCell component="th">Активен</TableCell>
                    <TableCell component="th">Пользователь</TableCell>
                    <TableCell component="th" className={classes.actionRow}>
                        <IconButton color="primary">
                            <AddIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {projects.map((project, index) => (
                    <Draggable
                        key={project.id}
                        draggableId={"project-" + project.id}
                        index={index}
                    >
                        {(provided, snapshot) => (
                            <React.Fragment>
                                <TableRow
                                    key={project.id}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style
                                    )}
                                >
                                    <TableCell>
                                        <IconButton color="primary">
                                            <DehazeIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>{project.title}</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>{project.site.title}</TableCell>
                                    <TableCell align="center">
                                        {!!project.active ? (
                                            <IconButton>
                                                <CheckCircleIcon
                                                    style={{
                                                        color: green[500]
                                                    }}
                                                />
                                            </IconButton>
                                        ) : (
                                            <IconButton>
                                                <CancelIcon
                                                    style={{ color: red[500] }}
                                                />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                    <TableCell>{project.user.title}</TableCell>
                                    <TableCell className={classes.actionRow}>
                                        <IconButton
                                            color="primary"
                                            onClick={() => {
                                                let optis = !tropened[
                                                    project.id
                                                ];
                                                for (let g in tropened) {
                                                    tropened[g] = false;
                                                }
                                                tropened[project.id] = optis;
                                                updateState({ tropened });
                                            }}
                                        >
                                            <CreateIcon />
                                        </IconButton>
                                        <IconButton
                                            color="secondary"
                                            onClick={e => {
                                                deleteProject(project.id);
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                <UpdateProject
                                    project={project}
                                    colspan={7}
                                    tropened={tropened}
                                />
                            </React.Fragment>
                        )}
                    </Draggable>
                ))}
                {provided.placeholder}
            </TableBody>
        </Table>
    ) : (
        <Table size="small" aria-label="purchases">
            <TableHead>
                <TableRow>
                    <TableCell component="th" colSpan={6} align="center">
                        Пусто
                    </TableCell>
                    <TableCell component="th" className={classes.actionRow}>
                        <IconButton color="primary" onClick={addProject}>
                            <AddIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
            </TableHead>
        </Table>
    );
}

function Li(props) {
    const {
        item,
        updateState,
        opened,
        provided,
        snapshot,
        updateFolder,
        deleteProject,
        tropened
    } = props;

    const confirm = useConfirm();

    const deleteFolder = () => {
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
                .call("delete", "/api/folders/" + item.id)
                .then(res => {
                    updateState(res.data);
                })
                .catch(err => {});
        });
    };

    return (
        <React.Fragment>
            <ListItem
                button
                onClick={() => {
                    let optis = !opened[item.id];
                    for (let g in opened) {
                        opened[g] = false;
                    }
                    opened[item.id] = optis;
                    updateState({ opened });
                }}
            >
                <ListItemIcon>
                    <IconButton aria-label="expand row" size="small">
                        {!!opened[item.id] ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </ListItemIcon>
                <ListItemText>{item.title}</ListItemText>
                <IconButton
                    color="primary"
                    onClick={e => {
                        e.stopPropagation();
                        updateFolder(item);
                    }}
                >
                    <CreateIcon />
                </IconButton>
                <IconButton
                    color="secondary"
                    onClick={e => {
                        e.stopPropagation();
                        deleteFolder();
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </ListItem>
            <Collapse in={!!opened[item.id]} timeout="auto" unmountOnExit>
                <Box marginBottom={3}>
                    <FolderTable
                        updateState={updateState}
                        projects={item.projects}
                        provided={provided}
                        snapshot={snapshot}
                        deleteProject={deleteProject}
                        tropened={tropened}
                    />
                </Box>
            </Collapse>
        </React.Fragment>
    );
}

export default function Projects() {
    const [state, setState] = React.useState({
        opened: {},
        tropened: {},
        folders: [],
        projects: [],
        modalFolder: false,
        modalProject: false
    });
    const [folderform, setFolderform] = React.useState({
        title: ""
    });
    const confirm = useConfirm();

    const updateState = state => {
        setState(prevState => {
            return { ...prevState, ...state };
        });
    };

    const addProject = () => {};

    const deleteProject = id => {
        confirm({
            title: __("Are you shure?"),
            description: __("Are you sure you want to delete the project?"),
            confirmationText: __("Ok"),
            cancellationText: __("Cancel"),
            dialogProps: {},
            confirmationButtonProps: {},
            cancellationButtonProps: {}
        }).then(() => {
            window.api
                .call("delete", "/api/projects/" + id)
                .then(res => {
                    updateState(res.data);
                })
                .catch(err => {});
        });
    };

    const addFolder = () => {
        setFolderform({
            title: ""
        });
        setState(prevState => {
            return {
                ...prevState,
                modalFolder: true
            };
        });
    };

    const updateFolder = folder => {
        setFolderform(folder);
        setState(prevState => {
            return {
                ...prevState,
                modalFolder: true
            };
        });
    };

    const folderFormChange = event => {
        if (!!folderform.id)
            setFolderform({
                id: folderform.id,
                title: event.target.value
            });
        else
            setFolderform({
                title: event.target.value
            });
    };

    const addFolderRequest = () => {
        window.api
            .call("post", "/api/folders", folderform)
            .then(res => {
                setState(prevState => {
                    const { folders, projects } = res.data;
                    return {
                        ...prevState,
                        folders,
                        projects,
                        modalFolder: false
                    };
                });
            })
            .catch(err => {});
    };

    const updateFolderRequest = () => {
        window.api
            .call("patch", "/api/folders/" + folderform.id, folderform)
            .then(res => {
                setState(prevState => {
                    const { folders, projects } = res.data;
                    return {
                        ...prevState,
                        folders,
                        projects,
                        modalFolder: false
                    };
                });
            })
            .catch(err => {});
    };

    const classes = useStyles();

    useEffect(() => {
        api.call("get", "/api/getProjects")
            .then(res => {
                setState(prevState => {
                    const { folders, projects } = res.data;
                    return { ...prevState, folders, projects };
                });
            })
            .catch(err => {});
    }, []);

    const onDragEnd = result => {
        const { source, destination, draggableId } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId !== destination.droppableId) {
            api.call("post", "/api/setFolder", {
                project: draggableId,
                to: destination.droppableId,
                from: source.droppableId
            })
                .then(res => {
                    setState(prevState => {
                        const { folders, projects } = res.data;
                        return { ...prevState, folders, projects };
                    });
                })
                .catch(err => {});
        }
    };

    return (
        <React.Fragment>
            <DragDropContext onDragEnd={onDragEnd}>
                <Box marginBottom={3}>
                    <Paper className={classes.paper}>
                        <List
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            className={classes.root}
                        >
                            {state.folders.map((item, index) => (
                                <Droppable
                                    droppableId={"folder-" + item.id}
                                    key={item.id}
                                >
                                    {(provided, snapshot) => (
                                        <div ref={provided.innerRef}>
                                            <Li
                                                item={item}
                                                key={"li-" + index}
                                                updateState={updateState}
                                                opened={state.opened}
                                                tropened={state.tropened}
                                                snapshot={snapshot}
                                                provided={provided}
                                                updateFolder={updateFolder}
                                                deleteProject={deleteProject}
                                            />
                                        </div>
                                    )}
                                </Droppable>
                            ))}
                            <ListItem className={classes.liCenter}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    // className={classes.button}
                                    startIcon={<AddIcon />}
                                    onClick={addFolder}
                                >
                                    Добавить папку
                                </Button>
                            </ListItem>
                        </List>
                    </Paper>
                </Box>
                <Box marginBottom={3}>
                    <Paper className={classes.paper}>
                        <Droppable droppableId={"out"}>
                            {(provided, snapshot) => (
                                <div ref={provided.innerRef}>
                                    <FolderTable
                                        deleteProject={deleteProject}
                                        updateState={updateState}
                                        projects={state.projects}
                                        provided={provided}
                                        snapshot={snapshot}
                                        tropened={state.tropened}
                                    />
                                </div>
                            )}
                        </Droppable>
                    </Paper>
                </Box>
            </DragDropContext>
            <Dialog
                open={state.modalFolder}
                onClose={() => {
                    setState(prevState => {
                        return { ...prevState, modalFolder: false };
                    });
                }}
                aria-labelledby="form-dialog-title"
            >
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="folderTitle"
                        value={folderform.title}
                        onChange={folderFormChange}
                        label={__("Folder")}
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    {!!folderform.id ? (
                        <Button onClick={updateFolderRequest} color="primary">
                            {__("Update")}
                        </Button>
                    ) : (
                        <Button onClick={addFolderRequest} color="primary">
                            {__("Add")}
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
