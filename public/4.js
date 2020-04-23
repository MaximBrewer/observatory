(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/@material-ui/core/esm/MenuItem/MenuItem.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@material-ui/core/esm/MenuItem/MenuItem.js ***!
  \*****************************************************************/
/*! exports provided: styles, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var _styles_withStyles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../styles/withStyles */ "./node_modules/@material-ui/core/esm/styles/withStyles.js");
/* harmony import */ var _ListItem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../ListItem */ "./node_modules/@material-ui/core/esm/ListItem/index.js");








var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({}, theme.typography.body1, Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({
      minHeight: 48,
      paddingTop: 6,
      paddingBottom: 6,
      boxSizing: 'border-box',
      width: 'auto',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    }, theme.breakpoints.up('sm'), {
      minHeight: 'auto'
    })),
    // TODO v5: remove

    /* Styles applied to the root element if `disableGutters={false}`. */
    gutters: {},

    /* Styles applied to the root element if `selected={true}`. */
    selected: {},

    /* Styles applied to the root element if dense. */
    dense: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({}, theme.typography.body2, {
      minHeight: 'auto'
    })
  };
};
var MenuItem = react__WEBPACK_IMPORTED_MODULE_3__["forwardRef"](function MenuItem(props, ref) {
  var classes = props.classes,
      className = props.className,
      _props$component = props.component,
      component = _props$component === void 0 ? 'li' : _props$component,
      _props$disableGutters = props.disableGutters,
      disableGutters = _props$disableGutters === void 0 ? false : _props$disableGutters,
      ListItemClasses = props.ListItemClasses,
      _props$role = props.role,
      role = _props$role === void 0 ? 'menuitem' : _props$role,
      selected = props.selected,
      tabIndexProp = props.tabIndex,
      other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(props, ["classes", "className", "component", "disableGutters", "ListItemClasses", "role", "selected", "tabIndex"]);

  var tabIndex;

  if (!props.disabled) {
    tabIndex = tabIndexProp !== undefined ? tabIndexProp : -1;
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_ListItem__WEBPACK_IMPORTED_MODULE_7__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({
    button: true,
    role: role,
    tabIndex: tabIndex,
    component: component,
    selected: selected,
    disableGutters: disableGutters,
    classes: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({
      dense: classes.dense
    }, ListItemClasses),
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_5__["default"])(classes.root, className, selected && classes.selected, !disableGutters && classes.gutters),
    ref: ref
  }, other));
});
 true ? MenuItem.propTypes = {
  /**
   * Menu item contents.
   */
  children: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object.isRequired,

  /**
   * @ignore
   */
  className: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,

  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.elementType,

  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input will be used.
   */
  dense: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,

  /**
   * @ignore
   */
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,

  /**
   * If `true`, the left and right padding is removed.
   */
  disableGutters: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,

  /**
   * `classes` prop applied to the [`ListItem`](/api/list-item/) element.
   */
  ListItemClasses: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object,

  /**
   * @ignore
   */
  role: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,

  /**
   * @ignore
   */
  selected: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,

  /**
   * @ignore
   */
  tabIndex: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number
} : undefined;
/* harmony default export */ __webpack_exports__["default"] = (Object(_styles_withStyles__WEBPACK_IMPORTED_MODULE_6__["default"])(styles, {
  name: 'MuiMenuItem'
})(MenuItem));

/***/ }),

/***/ "./node_modules/@material-ui/core/esm/MenuItem/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/@material-ui/core/esm/MenuItem/index.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MenuItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MenuItem */ "./node_modules/@material-ui/core/esm/MenuItem/MenuItem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _MenuItem__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./resources/js/auth/RegisterPage.js":
/*!*******************************************!*\
  !*** ./resources/js/auth/RegisterPage.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RegisterPage; });
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
/* harmony import */ var _material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/core/InputLabel */ "./node_modules/@material-ui/core/esm/InputLabel/index.js");
/* harmony import */ var _material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/icons/LockOutlined */ "./node_modules/@material-ui/icons/LockOutlined.js");
/* harmony import */ var _material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/esm/Typography/index.js");
/* harmony import */ var _layouts_Copyright__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../layouts/Copyright */ "./resources/js/layouts/Copyright.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_core_FormHelperText__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @material-ui/core/FormHelperText */ "./node_modules/@material-ui/core/esm/FormHelperText/index.js");
/* harmony import */ var _material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @material-ui/core/FormControl */ "./node_modules/@material-ui/core/esm/FormControl/index.js");
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @material-ui/core/MenuItem */ "./node_modules/@material-ui/core/esm/MenuItem/index.js");
/* harmony import */ var _material_ui_core_Select__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @material-ui/core/Select */ "./node_modules/@material-ui/core/esm/Select/index.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

























var useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_19__["makeStyles"])(function (theme) {
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
    },
    formControl: {
      minWidth: "100%"
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  };
});

var getCompanies = function getCompanies() {
  return window.companies;
};

function RegisterPage() {
  var classes = useStyles();

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])({
    name: {
      value: '',
      errors: null
    },
    last_name: {
      value: '',
      errors: null
    },
    phone: {
      value: '',
      errors: null
    },
    company: {
      value: '',
      errors: null
    },
    company_id: {
      value: '',
      errors: null
    },
    email: {
      value: '',
      errors: null
    },
    password_confirmation: {
      value: '',
      errors: null
    },
    password: {
      value: '',
      errors: null
    },
    errors: null
  }),
      _useState2 = _slicedToArray(_useState, 2),
      register = _useState2[0],
      setRegisterState = _useState2[1];

  function handleChange(event) {
    setRegisterState({
      name: event.target.name != "name" ? {
        value: register.name.value,
        errors: register.name.errors
      } : {
        value: event.target.value,
        errors: !event.target.value ? [__("Field is required!")] : null
      },
      last_name: event.target.name != "last_name" ? {
        value: register.last_name.value,
        errors: register.last_name.errors
      } : {
        value: event.target.value,
        errors: !event.target.value ? [__("Field is required!")] : null
      },
      phone: event.target.name != "phone" ? {
        value: register.phone.value,
        errors: register.phone.errors
      } : {
        value: event.target.value,
        errors: !event.target.value ? [__("Field is required!")] : null
      },
      company: event.target.name != "company" ? event.target.name == "company_id" && event.target.value ? {
        value: "",
        errors: null
      } : {
        value: register.company.value,
        errors: register.company.errors
      } : {
        value: event.target.value,
        errors: !event.target.value && !register.company_id.value ? [__("Choose company or fill text field!")] : null
      },
      company_id: event.target.name != "company_id" ? event.target.name == "company" && event.target.value ? {
        value: "",
        errors: null
      } : {
        value: register.company_id.value,
        errors: register.company_id.errors
      } : {
        value: event.target.value,
        errors: !event.target.value && !register.company.value ? [__("Choose company or fill text field!")] : null
      },
      email: event.target.name != "email" ? {
        value: register.email.value,
        errors: register.email.errors
      } : {
        value: event.target.value,
        errors: !event.target.value ? [__("Field is required!")] : null
      },
      password: event.target.name != "password" ? {
        value: register.password.value,
        errors: register.password.errors
      } : {
        value: event.target.value,
        errors: !event.target.value ? [__("Field is required!")] : null
      },
      password_confirmation: event.target.name != "password_confirmation" ? {
        value: register.password_confirmation.value,
        errors: register.password_confirmation.errors
      } : {
        value: event.target.value,
        errors: !event.target.value ? [__("Field is required!")] : null
      },
      errors: null
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setRegisterState({
      name: {
        value: register.name.value,
        errors: !register.name.value ? [__("Field is required!")] : register.name.errors
      },
      last_name: {
        value: register.last_name.value,
        errors: !register.last_name.value ? [__("Field is required!")] : register.last_name.errors
      },
      phone: {
        value: register.phone.value,
        errors: !register.phone.value ? [__("Field is required!")] : register.phone.errors
      },
      company: {
        value: register.company.value,
        errors: !register.company_id.value && !register.company.value ? [__("Field is required!")] : register.company.errors
      },
      company_id: {
        value: register.company_id.value,
        errors: !register.company_id.value && !register.company.value ? [__("Field is required!")] : register.company_id.errors
      },
      email: {
        value: register.email.value,
        errors: !register.email.value ? [__("Field is required!")] : register.email.errors
      },
      password: {
        value: register.password.value,
        errors: !register.password.value ? [__("Field is required!")] : register.password.errors
      },
      password_confirmation: {
        value: register.password_confirmation.value,
        errors: !register.password_confirmation.value ? [__("Field is required!")] : register.password_confirmation.errors
      },
      errors: register.errors
    });
    console.log(register);

    if (register.name.value && register.email.value && ( // register.phone.value &&
    register.company.value || register.company_id.value) && register.password.value && register.password_confirmation.value) {
      axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("/api/register", {
        name: register.name.value,
        last_name: register.last_name.value,
        email: register.email.value,
        phone: register.phone.value,
        company: register.company.value,
        company_id: register.company_id.value,
        password: register.password.value,
        password_confirmation: register.password_confirmation.value
      }).then(function (res) {
        if (res.data && res.data.redirectTo) {
          location.href = res.data.redirectTo;
        }
      })["catch"](function (err) {
        if (err.response && err.response.data && err.response.data.errors) setRegisterState({
          name: {
            value: register.name.value,
            errors: err.response.data.errors.name
          },
          last_name: {
            value: register.last_name.value,
            errors: err.response.data.errors.last_name
          },
          phone: {
            value: register.phone.value,
            errors: err.response.data.errors.phone
          },
          company: {
            value: register.company.value,
            errors: err.response.data.errors.company
          },
          company_id: {
            value: register.company_id.value,
            errors: err.response.data.errors.company_id
          },
          email: {
            value: register.email.value,
            errors: err.response.data.errors.email
          },
          password: {
            value: register.password.value,
            errors: err.response.data.errors.password
          },
          password_confirmation: {
            value: register.password_confirmation.value,
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
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_16___default.a, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_17__["default"], {
    component: "h1",
    variant: "h5"
  }, __("Sign up")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", {
    className: classes.form,
    noValidate: true,
    onSubmit: handleSubmit
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14__["default"], {
    container: true,
    spacing: 2
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14__["default"], {
    item: true,
    xs: 12,
    sm: 6
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__["default"], {
    variant: "outlined",
    required: true,
    fullWidth: true,
    id: "name",
    error: !!register.name.errors && !!register.name.errors.length,
    helperText: !!register.name.errors && !!register.name.errors.length ? register.name.errors.join(", ") : "",
    label: __("Name"),
    name: "name",
    autoComplete: "name",
    onChange: handleChange
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14__["default"], {
    item: true,
    xs: 12,
    sm: 6
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__["default"], {
    variant: "outlined",
    required: true,
    fullWidth: true,
    id: "lastName",
    error: !!register.last_name.errors && !!register.last_name.errors.length,
    helperText: !!register.last_name.errors && !!register.last_name.errors.length ? register.last_name.errors.join(", ") : "",
    label: __("Last Name"),
    name: "last_name",
    autoComplete: "lname",
    onChange: handleChange
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14__["default"], {
    item: true,
    xs: 12
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_21__["default"], {
    variant: "outlined",
    className: classes.formControl,
    error: !!register.company_id.errors && !!register.company_id.errors.length
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_15__["default"], {
    id: "company-select-label"
  }, __("Choose your company")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_23__["default"], {
    labelId: "company-select-label",
    id: "company_id",
    label: __("Choose your company"),
    name: "company_id",
    value: register.company_id.value,
    onChange: handleChange,
    autoComplete: "company_id"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_22__["default"], {
    value: ""
  }, "\xA0"), getCompanies().map(function (company, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_22__["default"], {
      value: company.id,
      key: index
    }, company.title);
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14__["default"], {
    item: true,
    xs: 12
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__["default"], {
    variant: "outlined",
    required: true,
    fullWidth: true,
    id: "company",
    label: __("or add new"),
    name: "company",
    value: register.company.value,
    error: !!register.company.errors && !!register.company.errors.length,
    helperText: !!register.company.errors && !!register.company.errors.length ? register.company.errors.join(", ") : "",
    autoComplete: "company",
    onChange: handleChange
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14__["default"], {
    item: true,
    xs: 12
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__["default"], {
    variant: "outlined",
    required: true,
    fullWidth: true,
    id: "email",
    label: __("Email Address"),
    name: "email",
    error: !!register.email.errors && !!register.email.errors.length,
    helperText: !!register.email.errors && !!register.email.errors.length ? register.email.errors.join(", ") : "",
    autoComplete: "email",
    onChange: handleChange
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14__["default"], {
    item: true,
    xs: 12
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__["default"], {
    variant: "outlined",
    required: true,
    fullWidth: true,
    name: "password",
    error: !!register.password.errors && !!register.password.errors.length,
    helperText: !!register.password.errors && !!register.password.errors.length ? register.password.errors.join(", ") : "",
    label: __("Password"),
    type: "password",
    id: "password",
    autoComplete: "new-password",
    onChange: handleChange
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14__["default"], {
    item: true,
    xs: 12
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__["default"], {
    variant: "outlined",
    required: true,
    fullWidth: true,
    error: !!register.password_confirmation.errors && !!register.password_confirmation.errors.length,
    helperText: !!register.password_confirmation.errors && !!register.password_confirmation.errors.length ? register.password_confirmation.errors.join(", ") : "",
    name: "password_confirmation",
    label: __("Confirm password"),
    type: "password",
    id: "passwordConfirm",
    autoComplete: "new-password",
    onChange: handleChange
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    type: "submit",
    fullWidth: true,
    variant: "contained",
    color: "primary",
    className: classes.submit
  }, __("Sign Up")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14__["default"], {
    container: true,
    justify: "flex-end"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14__["default"], {
    item: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Link__WEBPACK_IMPORTED_MODULE_10__["default"], {
    component: react_router_dom__WEBPACK_IMPORTED_MODULE_11__["Link"],
    to: "/login",
    variant: "body2"
  }, __("Already have an account? Sign in")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Box__WEBPACK_IMPORTED_MODULE_13__["default"], {
    mt: 5
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_layouts_Copyright__WEBPACK_IMPORTED_MODULE_18__["default"], null))))));
}

/***/ })

}]);