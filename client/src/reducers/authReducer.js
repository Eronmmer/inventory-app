import {
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  LOGOUT,
  SET_REGISTER_LOGIN_LOADING,
  SET_AUTH_ALERT,
  REMOVE_AUTH_ALERT,
  CLEAR_ALERT,
  CLEAR_REDIRECT_TO_LOGIN
} from "../actions/types";

const initialState = {
  registerLoginLoading: false,
  authLoading: true,
  user: null,
  error: null,
  isAuthenticated: false,
  redirectToLogin: false,
  alert: []
};

let newAlert = [...initialState.alert];

export default (state = initialState, action) => {
  switch ( action.type ) {
    case LOGOUT:
      localStorage.removeItem( "inventoryAppToken" )
      setTimeout(() => {
        window.location.reload();
      }, 300);
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload,
        authLoading: false,

      }
    case AUTH_ERROR:
      // console.log( "autherror" )
      localStorage.removeItem("inventoryAppToken");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        authLoading: false
      }
    case LOGIN_FAIL:
    case REGISTER_FAIL:
       localStorage.removeItem("inventoryAppToken");
      newAlert = [...state.alert];
      newAlert.unshift(action.alert);
      // console.log(action.payload)
      return {
        ...state,
        isAuthenticated: false,
        registerLoginLoading: false,
        user: null,
        alert: newAlert,
        authLoading: false
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("inventoryAppToken", action.payload.token)
      // console.log(action.payload);
      newAlert = [...state.alert];
      newAlert.unshift(action.alert);
      return {
        ...state,
        registerLoginLoading: false,
        error: null,
        alert: newAlert,
        isAuthenticated: true,
        authLoading: false
      };
    case REGISTER_SUCCESS:
      newAlert = [...state.alert];
      newAlert.unshift(action.alert);
      return {
        ...state,
        registerLoginLoading: false,
        redirectToLogin: true,
        error: null,
        alert: newAlert,
        authLoading: false
      };
    case USER_LOADED: 
      // console.log(action.payload)
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
        authLoading: false
      }
    case CLEAR_REDIRECT_TO_LOGIN:
      return {
        ...state,
        redirectToLogin: false
      }
    case CLEAR_ALERT:
      newAlert = [ ...state.alert ]
      return {
        ...state,
        alert: newAlert.filter( elem => elem.id !== action.payload )
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    case SET_REGISTER_LOGIN_LOADING:
      return {
        ...state,
        registerLoginLoading: true
      };
    default:
      return state;
  }
};
