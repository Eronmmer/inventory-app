import {CUSTOMERS_ERROR_DASHBOARD, GET_CUSTOMERS_DASHBOARD } from "./types";
import callAxios from "../utils/callAxios";

export const getCustomers = () => async dispatch => {
  try {
    const res = await callAxios("GET", "/customers");
    dispatch({
      type: GET_CUSTOMERS_DASHBOARD,
      payload: res.data.customers
    });
  } catch (err) {
    dispatch({
      type:CUSTOMERS_ERROR_DASHBOARD,
      payload: err.response
    });
  }
};
