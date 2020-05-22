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
    History as HistoryIcon,
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
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
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
    formControl: {}
}));

function FormProduct(props) {
    const { product, project, updateState, propened } = props;
    const [form, setForm] = React.useState(product);
    const classes = useStyles();
    const handleChange = event => {
        let value = event.target.value;
        if (event.target.name == "active") {
            value = event.target.checked * 1;
        }
        const data = {
            ...form,
            [event.target.name]: value
        };
        setForm(data);
    };

    const saveForm = () => {
        if (!!form.id)
            api.call(
                "patch",
                "/api/project/" + project.id + "/products/" + form.id,
                form
            )
                .then(res => {
                    for (let g in propened) {
                        propened[g] = false;
                    }
                    updateState({
                        products: res.data.products,
                        propened: propened
                    });
                })
                .catch(err => {});
        else
            api.call("post", "/api/project/" + project.id + "/products", form)
                .then(res => {
                    for (let g in propened) {
                        propened[g] = false;
                    }
                    updateState({
                        products: res.data.products,
                        propened: propened
                    });
                })
                .catch(err => {});
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="article"
                    label={__("Article")}
                    name="article"
                    autoComplete="article"
                    value={form.article}
                    onChange={handleChange}
                    autoFocus
                />
            </Grid>
            <Grid item xs={12} md={3}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="brand"
                    label={__("Brand")}
                    name="brand"
                    autoComplete="brand"
                    value={form.brand}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} md={6}>
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
                />
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    type="number"
                    step="1"
                    id="price"
                    label={__("Цена")}
                    name="price"
                    autoComplete="price"
                    value={form.price}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    type="number"
                    step=".01"
                    id="higher_deviation"
                    label={__("Отклонения + от цены")}
                    name="higher_deviation"
                    autoComplete="higher_deviation"
                    value={form.higher_deviation}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    type="number"
                    step=".01"
                    fullWidth
                    id="lower_deviation"
                    label={__("Отклонения - от цены")}
                    name="lower_deviation"
                    autoComplete="lower_deviation"
                    value={form.lower_deviation}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
                <FormControl
                    className={classes.formControl}
                    margin="normal"
                    fullWidth
                >
                    <FormControlLabel
                        value="1"
                        checked={!!form.active}
                        control={<Checkbox color="primary" />}
                        label="Активен"
                        name="active"
                        onChange={handleChange}
                        labelPlacement="end"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="url"
                    label={__("Url")}
                    name="url"
                    autoComplete="url"
                    value={form.url}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} md={12} lg={6} align="right">
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={saveForm}
                >
                    {__("Save")}
                </Button>
            </Grid>
        </Grid>
    );
}

function ProductLogs(props) {
    const classes = useStyles();
    const { product } = props;
    return (
        <TableContainer>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">
                            {__("Date & Time")}
                        </TableCell>
                        <TableCell align="center">{__("Site Price")}</TableCell>
                        <TableCell align="center">
                            {__("Deviation, %")}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {product.logs.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell align="center">
                                {row.created_at
                                    ? new Date(
                                          product.log.created_at
                                      ).toLocaleDateString() +
                                      " " +
                                      new Date(
                                          product.log.created_at
                                      ).toLocaleTimeString()
                                    : "N/A"}
                            </TableCell>
                            <TableCell align="center">
                                {row.site_price}
                            </TableCell>
                            <TableCell align="center">
                                {row.deviation}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function ProductLog(props) {
    const { colspan, updateState, product } = props;
    return (
        <TableRow>
            <TableCell
                style={{ paddingBottom: 0, paddingTop: 0 }}
                colSpan={colspan}
            >
                <Collapse
                    in={!!product.logs && !!product.logs.length}
                    timeout="auto"
                    unmountOnExit
                >
                    <Box margin={1}>{<ProductLogs product={product} />}</Box>
                </Collapse>
            </TableCell>
        </TableRow>
    );
}
function AddProduct(props) {
    const { colspan, propened, updateState, project } = props;
    const product = {
        article: "",
        title: "",
        price: 0,
        higher_deviation: project.higher_deviation,
        lower_deviation: project.lower_deviation,
        brand: "",
        url: "",
        active: 1,
        frequency: project.frequency
    };

    return (
        <TableRow>
            <TableCell
                style={{ paddingBottom: 0, paddingTop: 0 }}
                colSpan={colspan}
            >
                <Collapse
                    in={!!propened["project"]}
                    timeout="auto"
                    unmountOnExit
                >
                    <Box margin={1}>
                        <FormProduct
                            product={product}
                            project={project}
                            updateState={updateState}
                            propened={propened}
                        />
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    );
}

function UpdateProduct(props) {
    const { colspan, propened, product, updateState, project } = props;

    return (
        <TableRow>
            <TableCell
                style={{ paddingBottom: 0, paddingTop: 0 }}
                colSpan={colspan}
            >
                <Collapse
                    in={!!propened[product.id]}
                    timeout="auto"
                    unmountOnExit
                >
                    <Box margin={1}>
                        <FormProduct
                            product={product}
                            project={project}
                            propened={propened}
                            updateState={updateState}
                        />
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    );
}

export default function Project(props) {
    const classes = useStyles();

    const [state, setState] = React.useState({
        propened: {},
        products: [],
        project: {}
    });

    useEffect(() => {
        api.call(
            "get",
            "/api/project/" + props.match.params.projectId + "/products"
        )
            .then(res => {
                setState(prevState => {
                    const { products } = res.data;
                    return { ...prevState, products };
                });
            })
            .catch(err => {});
        api.call("get", "/api/projects/" + props.match.params.projectId)
            .then(res => {
                setState(prevState => {
                    const { project } = res.data;
                    return { ...prevState, project };
                });
            })
            .catch(err => {});
    }, []);

    const confirm = useConfirm();

    const updateState = state => {
        setState(prevState => {
            return { ...prevState, ...state };
        });
    };

    const setProductLogs = index => {
        for (let g in state.propened) {
            state.propened[g] = false;
        }
        let products = state.products;
        if (!!products[index].logs && !!products[index].logs.length) {
            products[index].logs = [];
            updateState({
                products: products,
                propened: state.propened
            });
            return false;
        }
        for (let g in products) {
            products[g].logs = [];
        }
        api.call(
            "get",
            "/api/project/" +
                props.match.params.projectId +
                "/products/" +
                products[index].id
        )
            .then(res => {
                products[index].logs = res.data.product.logs;
                updateState({
                    products: products,
                    propened: state.propened
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    const deleteProduct = id => {
        confirm({
            title: __("Are you shure?"),
            description: __("Are you sure you want to delete the product?"),
            confirmationText: __("Ok"),
            cancellationText: __("Cancel"),
            dialogProps: {},
            confirmationButtonProps: {},
            cancellationButtonProps: {}
        }).then(() => {
            api.call(
                "delete",
                "/api/project/" +
                    props.match.params.projectId +
                    "/products/" +
                    id
            )
                .then(res => {
                    updateState(res.data);
                })
                .catch(err => {});
        });
    };

    const openForm = key => {
        state.products.map((row, index) => {
            row.logs = [];
        });
        let optis = !state.propened[key];
        for (let g in state.propened) {
            state.propened[g] = false;
        }
        state.propened[key] = optis;
        updateState({ propened: state.propened });
    };

    return state.products.length ? (
        <Table size="small" aria-label="purchases">
            <TableHead>
                <TableRow>
                    <TableCell component="th" />
                    <TableCell component="th">Артикул</TableCell>
                    <TableCell component="th">Название</TableCell>
                    <TableCell component="th">
                        Дата обновления информации
                    </TableCell>
                    <TableCell component="th">Наша цена</TableCell>
                    <TableCell component="th">Цена сайта</TableCell>
                    <TableCell component="th">Разница, %</TableCell>
                    <TableCell component="th">Наличие</TableCell>
                    <TableCell component="th">Активность</TableCell>
                    <TableCell component="th" className={classes.actionRow}>
                        <IconButton
                            color="primary"
                            onClick={() => {
                                openForm("project");
                            }}
                        >
                            <AddIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
                <AddProduct
                    colspan={10}
                    propened={state.propened}
                    project={state.project}
                    updateState={updateState}
                />
            </TableHead>
            <TableBody>
                {state.products.map((product, index) => (
                    <React.Fragment key={product.id}>
                        <TableRow>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{product.article}</TableCell>
                            <TableCell>{product.title}</TableCell>
                            <TableCell>
                                {product.log
                                    ? new Date(
                                          product.log.created_at
                                      ).toLocaleDateString() +
                                      " " +
                                      new Date(
                                          product.log.created_at
                                      ).toLocaleTimeString()
                                    : "N/A"}
                            </TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>
                                {product.log ? product.log.site_price : "N/A"}
                            </TableCell>
                            <TableCell>
                                {product.log ? product.log.deviation : "N/A"}
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell className={classes.actionRow}>
                                <IconButton
                                    color="primary"
                                    onClick={() => {
                                        setProductLogs(index);
                                    }}
                                >
                                    <HistoryIcon />
                                </IconButton>
                                <IconButton
                                    color="primary"
                                    onClick={() => {
                                        let optis = !state.propened[product.id];
                                        for (let g in state.propened) {
                                            state.propened[g] = false;
                                        }
                                        state.propened[product.id] = optis;
                                        updateState({
                                            propened: state.propened
                                        });
                                    }}
                                >
                                    <CreateIcon />
                                </IconButton>
                                <IconButton
                                    color="secondary"
                                    onClick={e => {
                                        deleteProduct(product.id);
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                        <ProductLog
                            products={state.products}
                            product={product}
                            colspan={10}
                            updateState={updateState}
                        />
                        <UpdateProduct
                            project={state.project}
                            product={product}
                            colspan={10}
                            propened={state.propened}
                            updateState={updateState}
                        />
                    </React.Fragment>
                ))}
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
                        <IconButton
                            color="primary"
                            onClick={() => {
                                let optis = !state.propened["project"];
                                for (let g in state.propened) {
                                    state.propened[g] = false;
                                }
                                state.propened["project"] = optis;
                                updateState({
                                    propened: state.propened
                                });
                            }}
                        >
                            <AddIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
                <AddProduct
                    colspan={10}
                    propened={state.propened}
                    project={state.project}
                    updateState={updateState}
                />
            </TableHead>
        </Table>
    );
}
