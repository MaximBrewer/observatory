(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ "./resources/js/auth/PasswordResetForm.js":
/*!************************************************!*\
  !*** ./resources/js/auth/PasswordResetForm.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PasswordResetPage; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Avatar */ "./node_modules/@material-ui/core/esm/Avatar/index.js");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/esm/Button/index.js");
/* harmony import */ var _material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/CssBaseline */ "./node_modules/@material-ui/core/esm/CssBaseline/index.js");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/TextField */ "./node_modules/@material-ui/core/esm/TextField/index.js");
/* harmony import */ var _material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/FormControlLabel */ "./node_modules/@material-ui/core/esm/FormControlLabel/index.js");
/* harmony import */ var _material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Checkbox */ "./node_modules/@material-ui/core/esm/Checkbox/index.js");
/* harmony import */ var _material_ui_lab_Alert__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/lab/Alert */ "./node_modules/@material-ui/lab/esm/Alert/index.js");
/* harmony import */ var _material_ui_core_Collapse__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Collapse */ "./node_modules/@material-ui/core/esm/Collapse/index.js");
/* harmony import */ var _material_ui_core_Link__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/Link */ "./node_modules/@material-ui/core/esm/Link/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/Paper */ "./node_modules/@material-ui/core/esm/Paper/index.js");
/* harmony import */ var _material_ui_core_Box__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/Box */ "./node_modules/@material-ui/core/esm/Box/index.js");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var _material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/icons/LockOutlined */ "./node_modules/@material-ui/icons/LockOutlined.js");
/* harmony import */ var _material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/esm/Typography/index.js");
/* harmony import */ var _layouts_Copyright__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../layouts/Copyright */ "./resources/js/layouts/Copyright.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




















var useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_18__["makeStyles"])(function (theme) {
  return {
    root: {
      height: "100vh"
    },
    image: {
      backgroundImage: "url(https://source.unsplash.com/random)",
      backgroundRepeat: "no-repeat",
      backgroundColor: theme.palette.type === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
      backgroundSize: "cover",
      backgroundPosition: "center"
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: "100%",
      // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  };
});
function PasswordResetPage() {
  var classes = useStyles();

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])({
    email: {
      value: !!window.email_fp ? window.email_fp : null,
      errors: null
    },
    password_confirmation: {
      value: null,
      errors: null
    },
    password: {
      value: null,
      errors: null
    },
    errors: null
  }),
      _useState2 = _slicedToArray(_useState, 2),
      auth = _useState2[0],
      setAuthState = _useState2[1];

  function handleChange(event) {
    setAuthState({
      email: event.target.name != "email" ? {
        value: auth.email.value,
        errors: auth.email.errors
      } : {
        value: event.target.value,
        errors: !event.target.value ? [__("Field is required!")] : null
      },
      password: event.target.name != "password" ? {
        value: auth.password.value,
        errors: auth.password.errors
      } : {
        value: event.target.value,
        errors: !event.target.value ? [__("Field is required!")] : null
      },
      password_confirmation: event.target.name != "password_confirmation" ? {
        value: auth.password_confirmation.value,
        errors: auth.password_confirmation.errors
      } : {
        value: event.target.value,
        errors: !event.target.value ? [__("Field is required!")] : null
      },
      errors: null
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setAuthState({
      email: {
        value: auth.email.value,
        errors: !auth.email.value ? [__("Field is required!")] : auth.email.errors
      },
      password: {
        value: auth.password.value,
        errors: !auth.password.value ? [__("Field is required!")] : auth.password.errors
      },
      password_confirmation: {
        value: auth.password_confirmation.value,
        errors: !auth.password_confirmation.value ? [__("Field is required!")] : auth.password_confirmation.errors
      },
      errors: auth.errors
    });

    if (auth.email.value) {
      axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("/password/reset", {
        email: auth.email.value,
        password: auth.password.value,
        token: window.token_fp,
        password_confirmation: auth.password_confirmation.value
      }).then(function (res) {
        if (res.data) {
          location.href = '/personal';
        }
      })["catch"](function (err) {
        if (err.response && err.response.data && err.response.data.errors) setAuthState({
          email: {
            value: auth.email.value,
            errors: err.response.data.errors.email
          },
          password: {
            value: auth.password.value,
            errors: err.response.data.errors.password
          },
          password_confirmation: {
            value: auth.password_confirmation.value,
            errors: err.response.data.errors.password_confirmation
          },
          errors: [err.response.data.message]
        });
      });
    }
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14__["default"], {
    container: true,
    component: "main",
    className: classes.root
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14__["default"], {
    item: true,
    xs: false,
    sm: 4,
    md: 7,
    className: classes.image
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14__["default"], {
    item: true,
    xs: 12,
    sm: 8,
    md: 5,
    component: _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_12__["default"],
    elevation: 6,
    square: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: classes.paper
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: classes.avatar
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_15___default.a, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_16__["default"], {
    component: "h1",
    variant: "h5"
  }, __("Reset Password")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", {
    className: classes.form,
    noValidate: true,
    onSubmit: handleSubmit
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "hidden",
    name: "token",
    value: window.token_fp
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__["default"], {
    variant: "outlined",
    margin: "normal",
    required: true,
    fullWidth: true,
    value: auth.email.value,
    id: "email",
    readOnly: true,
    error: !!auth.email.errors && !!auth.email.errors.length,
    helperText: !!auth.email.errors && !!auth.email.errors.length ? auth.email.errors.join(", ") : "",
    label: __("E-mail"),
    name: "email",
    type: "text",
    autoFocus: true
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__["default"], {
    variant: "outlined",
    margin: "normal",
    required: true,
    fullWidth: true,
    name: "password",
    error: !!auth.password.errors && !!auth.password.errors.length,
    helperText: !!auth.password.errors && !!auth.password.errors.length ? auth.password.errors.join(", ") : "",
    label: __("Password"),
    type: "password",
    id: "password",
    autoComplete: "new-password",
    onChange: handleChange
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__["default"], {
    variant: "outlined",
    margin: "normal",
    required: true,
    fullWidth: true,
    error: !!auth.password_confirmation.errors && !!auth.password_confirmation.errors.length,
    helperText: !!auth.password_confirmation.errors && !!auth.password_confirmation.errors.length ? auth.password_confirmation.errors.join(", ") : "",
    name: "password_confirmation",
    label: __("Confirm password"),
    type: "password",
    id: "passwordConfirm",
    autoComplete: "new-password",
    onChange: handleChange
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    type: "submit",
    fullWidth: true,
    variant: "contained",
    color: "primary",
    className: classes.submit
  }, __("Reset Password")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Box__WEBPACK_IMPORTED_MODULE_13__["default"], {
    mt: 5
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_layouts_Copyright__WEBPACK_IMPORTED_MODULE_17__["default"], null))))));
}

var AlertSuccess = function AlertSuccess() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_lab_Alert__WEBPACK_IMPORTED_MODULE_8__["default"], {
    severity: "success"
  }, __("Мы отправили вам ссылку для сброса пароля по электронной почте!"));
};

/***/ })

}]);