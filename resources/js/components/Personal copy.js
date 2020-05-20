import React, { Suspense, lazy } from "react";
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
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
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
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import IconButton from "@material-ui/core/IconButton";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AddIcon from "@material-ui/icons/Add";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ListItems from "./Personal/components/ListItems";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import PersonalIndex from "./Personal/Index";
import PersonalProduct from "./Personal/Product";
import PersonalProjects from "./Personal/Projects";
import PersonalProject from "./Personal/Project";
import PersonalFolder from "./Personal/Folder";
import PersonalProfile from "./Personal/Profile";
import PersonalCompany from "./Personal/Company";
import Dialog from "@material-ui/core/Dialog";

import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Auth from "../auth";
import CompanyForm from "./Personal/CompanyForm";
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

const options = [
    "Create a merge commit",
    "Squash and merge",
    "Rebase and merge"
];

export default function Personal(props) {
    const { user } = props;

    const classes = useStyles();

    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const [openc, setOpenc] = React.useState(false);

    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };

    const changeCompany = (event, index, company) => {
        setSelectedIndex(index);
        setOpenc(false);
    };

    const handleToggle = () => {
        setOpenc(prevOpen => !prevOpen);
    };

    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpenc(false);
    };

    const addNewCompany = () => {
        setModalCompany(true);
        setOpenc(false);
    };

    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const sendInvation = () => {};

    let { path, url } = useRouteMatch();

    const [modalCompany, setModalCompany] = React.useState(false);
    const [company, setCompany] = React.useState({});

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
        <div className={classes.root}>
            <CssBaseline />

            <Dialog
                open={modalCompany}
                onClose={() => {
                    setModalCompany(false);
                }}
            >
                <CompanyForm company={company} />
            </Dialog>
            <AppBar
                position="absolute"
                className={clsx(classes.appBar, open && classes.appBarShift)}
            >
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
                        ref={anchorRef}
                        aria-label="split button"
                    >
                        {user.company ? (
                            <Button onClick={sendInvation}>
                                <PersonAddIcon />
                                <Hidden smDown>&nbsp;&nbsp;Пригласить</Hidden>
                            </Button>
                        ) : (
                            <Button onClick={addNewCompany}>
                                <AddIcon />
                                <Hidden smDown>
                                    &nbsp;&nbsp;Добавить компанию
                                </Hidden>
                            </Button>
                        )}
                        {user.companies.length ? (
                            <Button
                                color="default"
                                size="small"
                                aria-controls={
                                    openc ? "split-button-menu" : undefined
                                }
                                aria-expanded={openc ? "true" : undefined}
                                aria-label="select merge strategy"
                                aria-haspopup="menu"
                                onClick={handleToggle}
                            >
                                <ArrowDropDownIcon />
                            </Button>
                        ) : (
                            ""
                        )}
                        <Button to="/personal/profile" component={Link}>
                            <AccountCircleIcon />
                            <Hidden smDown>
                                &nbsp;&nbsp;{user.profile.firstname}
                            </Hidden>
                        </Button>
                        <Button
                            color="default"
                            size="small"
                            onClick={logout}
                            href="/api/logout"
                        >
                            <ExitToAppIcon />
                        </Button>
                    </ButtonGroup>
                    {user.companies.length ? (
                        <Popper
                            open={openc}
                            anchorEl={anchorRef.current}
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
                                            onClickAway={handleClose}
                                        >
                                            <MenuList id="split-button-menu">
                                                {user.companies.map(
                                                    (company, index) => (
                                                        <MenuItem
                                                            key={company.id}
                                                            selected={
                                                                index ===
                                                                selectedIndex
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
                                                <MenuItem
                                                    key={"add_compnay"}
                                                    onClick={event =>
                                                        addNewCompany()
                                                    }
                                                >
                                                    Добавить компанию
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
                            component={PersonalProjects}
                        />
                        <Route
                            exact
                            path="/personal/profile"
                            render={props => (
                                <PersonalProfile {...props} user={user} />
                            )}
                        />
                        <Route
                            exact
                            path="/personal/company"
                            render={props => (
                                <PersonalCompany {...props} user={user} />
                            )}
                        />
                        <Route
                            exact
                            path="/personal/projects/:projectId"
                            component={PersonalProject}
                        />
                    </Switch>
                </Container>
            </main>
        </div>
    );
}
