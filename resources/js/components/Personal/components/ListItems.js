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

const useStyles = makeStyles(theme => ({}));

export default function ListItems() {
    const classes = useStyles();

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
            <LinkUI
                to="/personal/projects"
                component={Link}
                className={classes.listItem}
            >
                <ListItem button>
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary={window.__("Projects")} />
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
        </div>
    );
}
