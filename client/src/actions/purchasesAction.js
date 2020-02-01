import {
  GET_PURCHASES,
  PURCHASES_ERROR,
  ADD_PURCHASES,
  ADD_PURCHASES_ERROR,
  CLEAR_ALERT
} from "./types";
import callAxios from "../utils/callAxios";
import uuid from "uuid";

export const getPurchases = () => async dispatch => {
  try {
    const res = await callAxios("GET", "/purchases");
    dispatch({
      type: GET_PURCHASES,
      payload: res.data.purchases
    });
  } catch (err) {
    dispatch({
      type: PURCHASES_ERROR,
      payload: err.response
    });
  }
};

export const addPurchase = data => async dispatch => {
  const id = uuid.v4();
  try {
    const res = await callAxios("POST", "/purchases", data);
    dispatch({
      type: ADD_PURCHASES,
      payload: {
        msg: res.data,
        alert: {
          msg: "Purchase added successfully",
          id,
          type: "success"
        }
      }
    });
  } catch (error) {
    dispatch({
      type: ADD_PURCHASES_ERROR,
      payload: {
        msg: error.response,
        alert:
          error.response.status === 400
            ? {
                msg: error.response.data.msg,
                id,
                type: "failure"
              }
            : {
                msg: "Something went wrong. Please refresh the page",
                id,
                type: "failure"
              }
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
