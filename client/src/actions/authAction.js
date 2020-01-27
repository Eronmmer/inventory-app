import {
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_AUTH_ALERT,
  REMOVE_AUTH_ALERT,
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  LOGOUT,
  SET_REGISTER_LOGIN_LOADING,
  CLEAR_ALERT,
  CLEAR_REDIRECT_TO_LOGIN
} from "./types";
import callAxios from "../utils/callAxios";
import setAuthToken from "../utils/setAuthToken";
import uuid from "uuid";


export const loadUser = () => async dispatch => {
  if (localStorage.getItem("inventoryAppToken")) {
    setAuthToken(localStorage.getItem("inventoryAppToken"));
  }

  try {
    const res = await callAxios("GET", "/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data.user
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response
    });
  }
};

export const login = data => async dispatch => {
  const id = uuid.v4();
  try {
    const res = await callAxios("POST", "/auth", data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
      alert: {
        msg: "Logged in successfully. Redirecting you to your dashboard.",
        type: "success",
        id
      }
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.status,
      alert:
        err.response.status === 400
          ? {
              msg: "Incorrect username or password",
              type: "failure",
              id
            }
          : {
              msg: "Something went wrong. please refresh the page.",
              type: "failure",
              id
            }
    });
  } finally {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
        payload: id
      });
    }, 3000);
  }
};

export const register = ( data ) => async dispatch => {
  const id = uuid.v4()
  try {
    const res = await callAxios("POST", "/users", data);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
      alert: {
        msg: "Signed up successfully. Redirecting you to login.",
        type: "success",
        id
      }
    });
  } catch (err) {
     dispatch({
      type: REGISTER_FAIL,
      payload: err.response,
      alert:
        err.response.status === 400
          ? {
              msg: err.response.data.msg,
              type: "failure",
              id
            }
          : {
              msg: "Something went wrong. please refresh the page.",
              type: "failure",
              id
            }
    });
  } finally {
setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
        payload: id
      });
    }, 3000);
  }
}

export const setRegisterLoginLoading = () => {
  return {
    type: SET_REGISTER_LOGIN_LOADING
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

export const clearRedirectToLogin = () => {
  return {
    type: CLEAR_REDIRECT_TO_LOGIN
  }
}

export const logout = () => {
  return {
    type: LOGOUT
  };
};
