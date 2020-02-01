import { GET_SALES, SALES_ERROR, ADD_SALES, ADD_SALES_ERROR, CLEAR_ALERT } from "./types";
import callAxios from "../utils/callAxios";
import uuid from "uuid";

export const getSales = () => async dispatch => {
  try {
    const res = await callAxios("GET", "/sales");
    dispatch({
      type: GET_SALES,
      payload: res.data.sales
    });
  } catch (err) {
    dispatch({
      type: SALES_ERROR,
      payload: err.response
    });
  }
};

export const addSale = data => async dispatch => {
  const id = uuid.v4();
  try {
    const res = await callAxios("POST", "/sales", data);
    dispatch({
      type: ADD_SALES,
      payload: {
        msg: res.data.msg,
        alert: {
          msg: "Sale added successfully",
          type: "success",
          id
        }
      }
    });
  } catch (err) {
    dispatch({
      type: ADD_SALES_ERROR,
      payload: {
        msg: err.response,
        alert:
          err.response.status === 400
            ? {
                msg: err.response.data.msg,
                type: "failure",
                id
              }
            : {
                msg: "Something went wrong. Please refresh the page",
                type: "failure",
                id
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
