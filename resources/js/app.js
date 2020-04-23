require("./lang.js");
import axios from "axios";
import Auth from "./auth.js";
import Api from "./api.js";
import React, { Suspense, lazy } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { ruRU } from "@material-ui/core/locale";
import { ConfirmProvider } from "material-ui-confirm";

window.axios = axios;
window.api = new Api();
window.auth = new Auth();

// axios.defaults.headers.common = {
//     "X-Requested-With": "XMLHttpRequest",
//     "X-CSRF-TOKEN": document
//         .querySelector('meta[name="csrf-token"]')
//         .getAttribute("content")
// };

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
import ReactDOM from "react-dom";

import Progress from "./layouts/Progress";

import Personal from "./components/Personal";
import NoMatch from "./components/NoMatch";

const Home = lazy(() => import("./components/Home"));
const LoginPage = lazy(() => import("./auth/LoginPage"));
const RegisterPage = lazy(() => import("./auth/RegisterPage"));

const PasswordResetPage = lazy(() => import("./auth/PasswordResetPage"));
const PasswordResetForm = lazy(() => import("./auth/PasswordResetForm"));
const PasswordConfirmPage = lazy(() => import("./auth/PasswordConfirmPage"));
const EmailVerifyPage = lazy(() => import("./auth/EmailVerifyPage"));

const AppUnlogged = () => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const theme = React.useMemo(
        () =>
            createMuiTheme(
                {
                    palette: {
                        background: { default: "#121212" },
                        //type: prefersDarkMode ? "dark" : "light",
                        type: "dark",
                        text: {
                            primary: "#ffffff",
                            secondary: "rgba(255, 255, 255, 0.7)"
                        },
                        primary: {
                            main: "#90caf9"
                        },
                        action: {
                            active: "#fff",
                            hover: "rgba(255, 255, 255, 0.08)",
                            hoverOpacity: 0.08,
                            selected: "rgba(255, 255, 255, 0.16)",
                            selectedOpacity: 0.16,
                            disabled: "rgba(255, 255, 255, 0.3)",
                            disabledBackground: "rgba(255, 255, 255, 0.12)",
                            disabledOpacity: 0.38,
                            focus: "rgba(255, 255, 255, 0.12)",
                            focusOpacity: 0.12,
                            activatedOpacity: 0.24
                        }
                    },
                    listItem: {
                        textDecoration: "none",
                        color: "#fff"
                    }
                },
                ruRU
            ),
        [prefersDarkMode]
    );
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Suspense fallback={<Progress />}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/personal">
                            <Redirect to="/login" />
                        </Route>
                        <Route exact path="/login" component={LoginPage} />
                        <Route
                            exact
                            path="/register"
                            component={RegisterPage}
                        />
                        <Route
                            exact
                            path="/password/reset"
                            component={PasswordResetPage}
                        />
                        <Route
                            path="/password/reset/:token"
                            component={PasswordResetForm}
                        />
                        <Route
                            exact
                            path="/password/confirm"
                            component={PasswordConfirmPage}
                        />
                        <Route exact path="/email/verify">
                            {!window.user ? (
                                <Redirect to="/login" />
                            ) : (
                                <EmailVerifyPage />
                            )}
                        </Route>
                        <Route path="*">
                            <NoMatch />
                        </Route>
                    </Switch>
                </Suspense>
            </Router>
        </ThemeProvider>
    );
};
const AppLogged = () => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const theme = React.useMemo(
        () =>
            createMuiTheme(
                {
                    palette: {
                        background: { default: "#121212" },
                        //type: prefersDarkMode ? "dark" : "light",
                        type: "dark",
                        text: {
                            primary: "#ffffff",
                            secondary: "rgba(255, 255, 255, 0.7)"
                        },
                        primary: {
                            main: "#90caf9"
                        },
                        action: {
                            active: "#fff",
                            hover: "rgba(255, 255, 255, 0.08)",
                            hoverOpacity: 0.08,
                            selected: "rgba(255, 255, 255, 0.16)",
                            selectedOpacity: 0.16,
                            disabled: "rgba(255, 255, 255, 0.3)",
                            disabledBackground: "rgba(255, 255, 255, 0.12)",
                            disabledOpacity: 0.38,
                            focus: "rgba(255, 255, 255, 0.12)",
                            focusOpacity: 0.12,
                            activatedOpacity: 0.24
                        }
                    },
                    listItem: {
                        textDecoration: "none",
                        color: "#fff"
                    }
                },
                ruRU
            ),
        [prefersDarkMode]
    );
    return (
        <ThemeProvider theme={theme}>
            <ConfirmProvider>
                <Router>
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route
                                path="/personal"
                                component={Personal}
                            ></Route>
                            <Route path="/login">
                                <Redirect to="/personal" />
                            </Route>
                            <Route path="/register">
                                <Redirect to="/personal" />
                            </Route>
                            <Route path="/password">
                                <Redirect to="/personal" />
                            </Route>
                            <Route path="/email">
                                <Redirect to="/personal" />
                            </Route>
                            <Route path="*">
                                <NoMatch />
                            </Route>
                        </Switch>
                    </Suspense>
                </Router>
            </ConfirmProvider>
        </ThemeProvider>
    );
};

axios
    .get("/api/companies")
    .then(function(res) {
        window.companies = res.data.companies;
        if (auth.check()) {
            axios.get("/api/sites").then(function(res) {
                window.sites = res.data.sites;
                window.sitesObject = {};
                res.data.sites.map(
                    (site, index) => (window.sitesObject[site.id] = site.title)
                );
                ReactDOM.render(<AppLogged />, document.getElementById("app"));
            });
        } else {
            ReactDOM.render(<AppUnlogged />, document.getElementById("app"));
        }
    })
    .catch(function(err) {
        console.log(err);
    });
