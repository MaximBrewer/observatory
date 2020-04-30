import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import LinkUI from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useConfirm } from "material-ui-confirm";

const useStyles = makeStyles(theme => ({}));

export default function ListItems() {
    const classes = useStyles();
    const confirm = useConfirm();

    const [folder, setFolder] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [folders, setFolders] = React.useState([]);

    React.useEffect(() => {
        axios
            .get("/api/folders")
            .then(res => {
                setFolders(res.data.data);
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
            description: __("Are you shure?")
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

    const logout = e => {
        e.preventDefault();

        axios
            .post("/api/logout", {
                _token: window.csrf_token
            })
            .then(res => {
                history.entries = [];
                history.index = -1;
                window.location.href = "/";
            })
            .catch(err => {
                if (
                    err.response &&
                    err.response.data &&
                    err.response.data.errors
                ) {
                }
            });
    };
    return (
        <div>
            <LinkUI
                to="/personal"
                component={Link}
                className={classes.listItem}
            >
                <ListItem button>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary={window.__("Dashboard")} />
                </ListItem>
            </LinkUI>
            {folders.map((folder, index) => (
                <LinkUI
                    key={index}
                    to="/personal/projects"
                    component={Link}
                    className={classes.listItem}
                >
                    <ListItem button>
                        <ListItemIcon>
                            <BarChartIcon />
                        </ListItemIcon>
                        <ListItemText primary={folder.title} />
                        <span
                            onClick={() => {
                                deleteFolder(folder.id);
                            }}
                        >
                            &times;
                        </span>
                    </ListItem>
                </LinkUI>
            ))}
            <ListItem button onClick={addFolder}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary={window.__("Add Folder")} />
            </ListItem>
            <LinkUI
                to="/personal/projects"
                component={Link}
                className={classes.listItem}
            >
                <ListItem button>
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary={window.__("All Projects")} />
                </ListItem>
            </LinkUI>
            <Divider />
            <LinkUI
                to="/personal/profile"
                component={Link}
                className={classes.listItem}
            >
                <ListItem button>
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary={window.__("Profile")} />
                </ListItem>
            </LinkUI>
            <LinkUI
                href="/api/logout"
                onClick={logout}
                className={classes.listItem}
            >
                <ListItem button>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary={window.__("Logout")} />
                </ListItem>
            </LinkUI>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    {__("Add Folder")}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {__("Type Folder Name")}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        value={folder}
                        onChange={onChange}
                        label="Folder"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={addFolderRequest} color="primary">
                        {__("Add")}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
