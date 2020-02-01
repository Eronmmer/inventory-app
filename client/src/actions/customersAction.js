import {CUSTOMERS_ERROR, GET_CUSTOMERS } from "./types";
import callAxios from "../utils/callAxios";

export const getCustomers = () => async dispatch => {
  try {
    const res = await callAxios("GET", "/customers");
    dispatch({
      type: GET_CUSTOMERS,
      payload: res.data.customers
    });
  } catch (err) {
    dispatch({
      type:CUSTOMERS_ERROR,
      payload: err.response
    });
  }
};
