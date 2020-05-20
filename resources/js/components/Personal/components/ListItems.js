import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import {
    Folder as FolderIcon,
    Dashboard as DashboardIcon,
    CreateNewFolder as CreateNewFolderIcon,
    Dehaze as DehazeIcon,
    Business as BusinessIcon
} from "@material-ui/icons";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import LinkUI from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useConfirm } from "material-ui-confirm";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    listItem: {
        textDecoration: "none",
        cursor: "pointer",
        color: theme.listItem.color,
        "&:hover": {
            textDecoration: "none"
        }
    }
}));

export default function ListItems(props) {
    const user = { props };

    const confirm = useConfirm();
    const classes = useStyles();

    const [folder, setFolder] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [folders, setFolders] = React.useState([]);

    const noCompanyRoute = event => {
        confirm({
            description: (
                <React.Fragment>
                    <Typography style={{ textAlign: "center" }}>
                        <ErrorOutlineIcon
                            style={{ fontSize: 80 }}
                            color="error"
                        />
                    </Typography>
                    <Typography style={{ textAlign: "center" }} variant="h5">
                        {__("You have no company!")}
                    </Typography>
                </React.Fragment>
            ),
            dialogProps: { maxWidth: "xs" },
            title: "",
            confirmationText: __("Create"),
            cancellationText: __("Cancel")
        })
            .then(() => {})
            .catch(() => {});
    };
    return (
        <div>
            <CssBaseline />
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
            {user.company ? (
                <LinkUI
                    to="/personal/projects"
                    component={Link}
                    className={classes.listItem}
                >
                    <ListItem button>
                        <ListItemIcon>
                            <DehazeIcon />
                        </ListItemIcon>
                        <ListItemText primary={window.__("All Projects")} />
                    </ListItem>
                </LinkUI>
            ) : (
                <LinkUI className={classes.listItem} onClick={noCompanyRoute}>
                    <ListItem button>
                        <ListItemIcon>
                            <DehazeIcon />
                        </ListItemIcon>
                        <ListItemText primary={window.__("All Projects")} />
                    </ListItem>
                </LinkUI>
            )}
            <Divider />
            <LinkUI
                to="/personal/company"
                component={Link}
                className={classes.listItem}
            >
                <ListItem button>
                    <ListItemIcon>
                        <BusinessIcon />
                    </ListItemIcon>
                    <ListItemText primary={window.__("Company")} />
                </ListItem>
            </LinkUI>
        </div>
    );
}
