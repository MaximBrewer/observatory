import React, { useState, Suspense, lazy } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useHistory,
    useLocation,
    useParams,
    Link,
    useRouteMatch
} from "react-router-dom";
import clsx from "clsx";

import {
    Folder as FolderIcon,
    Dashboard as DashboardIcon,
    CreateNewFolder as CreateNewFolderIcon,
    Dehaze as DehazeIcon,
    Business as BusinessIcon,
    Edit as EditIcon,
    AccountCircle as AccountCircleIcon,
    PersonAdd as PersonAddIcon,
    Menu as MenuIcon,
    ChevronLeft as ChevronLeftIcon,
    Notifications as NotificationsIcon,
    ExitToApp as ExitToAppIcon,
    ArrowDropDown as ArrowDropDownIcon,
    Add as AddIcon
} from "@material-ui/icons";

import IconButton from "@material-ui/core/IconButton";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ListItems from "./Personal/components/ListItems";

import PersonalIndex from "./Personal/Index";
import PersonalProjects from "./Personal/Projects";
import PersonalProject from "./Personal/Project";
import PersonalFolder from "./Personal/Folder";
import PersonalProfile from "./Personal/Profile";
import PersonalCompanyAdd from "./Personal/CompanyAdd";
import PersonalCompanyEdit from "./Personal/CompanyEdit";
import PersonalCompany from "./Personal/Company";
import Dialog from "@material-ui/core/Dialog";

import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Auth from "../auth";
import Hidden from "@material-ui/core/Hidden";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    root: {
        display: "flex"
    },
    toolbar: {
        paddingRight: 24
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
    listItem: {
        textDecoration: "none"
        //color: theme.color.red
    }
}));

export default function Personal(props) {
    const { user, updateUser } = props;

    const history = useHistory();
    const classes = useStyles();

    const anchorRefCompany = React.useRef(null);
    const anchorRefUser = React.useRef(null);

    const [openCompanyMenu, setOpenCompanyMenu] = React.useState(false);
    const [openUserMenu, setOpenUserMenu] = React.useState(false);

    const changeCompany = (event, index, company) => {
        api.call(`patch`, `/api/company-set`, {
            id: company.id
        })
            .then(res => {
                updateUser(res.data.user);
                setOpenUserMenu(false);
                setOpenCompanyMenu(false);
                if (location.pathname == "/personal") history.replace("/");
                history.replace("/personal");
            })
            .catch(err => {});
    };

    const handleToggleCompany = () => {
        setOpenCompanyMenu(prevOpen => !prevOpen);
    };
    const handleToggleUser = () => {
        setOpenUserMenu(prevOpen => !prevOpen);
    };

    const handleCloseCompany = event => {
        if (
            anchorRefCompany.current &&
            anchorRefCompany.current.contains(event.target)
        ) {
            return;
        }
        setOpenCompanyMenu(false);
    };

    const handleCloseUser = event => {
        if (
            anchorRefUser.current &&
            anchorRefUser.current.contains(event.target)
        ) {
            return;
        }
        setOpenUserMenu(false);
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
                window.auth.logout();
            })
            .catch(err => {});
    };
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(
                            classes.menuButton,
                            open && classes.menuButtonHidden
                        )}
                    >
                    <MenuIcon />
                </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.title}
                    >
                        {user.company ? user.company.title : ""}
                    </Typography>

                    <ButtonGroup
                        variant="contained"
                        color="default"
                        aria-label="split button"
                    >
                        {user.company ? (
                            ""
                        ) : (
                            <Button to="/personal/company/add" component={Link}>
                                <AddIcon />
                                <Hidden smDown>
                                    &nbsp;&nbsp;{__("Add Company")}
                                </Hidden>
                            </Button>
                        )}
                        {user.companies.length ? (
                            <Button
                                ref={anchorRefCompany}
                                color="default"
                                size="small"
                                aria-controls={
                                    openCompanyMenu
                                        ? "split-button-menu"
                                        : undefined
                                }
                                aria-expanded={
                                    openCompanyMenu ? "true" : undefined
                                }
                                aria-label="select merge strategy"
                                aria-haspopup="menu"
                                onClick={handleToggleCompany}
                            >
                                <BusinessIcon />
                                {user.company ? (
                                    <Hidden smDown>
                                        &nbsp;&nbsp;{user.company.title}
                                    </Hidden>
                                ) : (
                                    ""
                                )}
                                <ArrowDropDownIcon />
                            </Button>
                        ) : (
                            ""
                        )}
                        <Button
                            color="default"
                            size="small"
                            ref={anchorRefUser}
                            aria-controls={
                                openCompanyMenu
                                    ? "split-button-menu"
                                    : undefined
                            }
                            aria-expanded={openUserMenu ? "true" : undefined}
                            aria-label="select merge strategy"
                            aria-haspopup="menu"
                            onClick={handleToggleUser}
                        >
                            <AccountCircleIcon />
                            <Hidden smDown>
                                &nbsp;&nbsp;{user.profile.firstname}
                            </Hidden>
                            <ArrowDropDownIcon />
                        </Button>
                    </ButtonGroup>
                    {user.companies.length ? (
                        <Popper
                            open={openCompanyMenu}
                            anchorEl={anchorRefCompany.current}
                            role={undefined}
                            transition
                            disablePortal
                        >
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{
                                        transformOrigin:
                                            placement === "bottom"
                                                ? "center top"
                                                : "center bottom"
                                    }}
                                >
                                    <Paper>
                                        <ClickAwayListener
                                            onClickAway={handleCloseCompany}
                                        >
                                            <MenuList id="split-button-menu">
                                                {user.companies.map(
                                                    (company, index) => (
                                                        <MenuItem
                                                            key={company.id}
                                                            selected={
                                                                company.id ===
                                                                user.company.id
                                                            }
                                                            onClick={event =>
                                                                changeCompany(
                                                                    event,
                                                                    index,
                                                                    company
                                                                )
                                                            }
                                                        >
                                                            {company.title}
                                                        </MenuItem>
                                                    )
                                                )}
                                                <Divider />
                                                <MenuItem
                                                    to="/personal/company"
                                                    component={Link}
                                                    onClick={handleCloseCompany}
                                                >
                                                    {__("Show Company")}
                                                </MenuItem>
                                                {user.company &&
                                                (user.company.role ==
                                                    "administrator" ||
                                                    user.company.role ==
                                                        "manager") ? (
                                                    <MenuItem
                                                        to="/personal/company/edit"
                                                        component={Link}
                                                        onClick={
                                                            handleCloseCompany
                                                        }
                                                    >
                                                        {__("Edit Company")}
                                                    </MenuItem>
                                                ) : (
                                                    ""
                                                )}
                                                <MenuItem
                                                    to="/personal/company/add"
                                                    component={Link}
                                                    onClick={handleCloseCompany}
                                                >
                                                    {__("Add Company")}
                                                </MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    ) : (
                        ""
                    )}
                    <Popper
                        open={openUserMenu}
                        anchorEl={anchorRefUser.current}
                        role={undefined}
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === "bottom"
                                            ? "center top"
                                            : "center bottom"
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener
                                        onClickAway={handleCloseUser}
                                    >
                                        <MenuList id="split-button-menu">
                                            <MenuItem
                                                to="/personal/profile"
                                                component={Link}
                                                onClick={handleCloseUser}
                                            >
                                                {__("Profile")}
                                            </MenuItem>
                                            <MenuItem
                                                onClick={logout}
                                                href="/api/logout"
                                            >
                                                {__("Logout")}
                                                &nbsp;&nbsp;&nbsp;
                                                <ExitToAppIcon />
                                            </MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(
                        classes.drawerPaper,
                        !open && classes.drawerPaperClose
                    )
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItems classes={classes} />
                </List>
                <Divider />
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth={false} className={classes.container}>
                    <Switch>
                        <Route
                            exact
                            path="/personal"
                            render={props => (
                                <PersonalProjects
                                    {...props}
                                    user={user}
                                    updateUser={updateUser}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/personal/profile"
                            render={props => (
                                <PersonalProfile
                                    {...props}
                                    user={user}
                                    updateUser={updateUser}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/personal/company/add"
                            render={props => (
                                <PersonalCompanyAdd
                                    {...props}
                                    updateUser={updateUser}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/personal/company"
                            render={props => (
                                <PersonalCompany
                                    {...props}
                                    user={user}
                                    updateUser={updateUser}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/personal/company/edit"
                            render={props => (
                                <PersonalCompanyEdit
                                    {...props}
                                    user={user}
                                    updateUser={updateUser}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/personal/projects/:projectId"
                            render={props => (
                                <PersonalProject
                                    {...props}
                                    user={user}
                                    updateUser={updateUser}
                                />
                            )}
                        />
                    </Switch>
                </Container>
            </main>
        </div>
    );
}
