import { GET_PRODUCTS_DASHBOARD, PRODUCTS_ERROR_DASHBOARD } from "./types";
import callAxios from "../utils/callAxios";

export const getProducts = () => async dispatch => {
  try {
    const res = await callAxios("GET", "/products");
    dispatch({
      type: GET_PRODUCTS_DASHBOARD,
      payload: res.data.products
    });
  } catch (err) {
    dispatch({
      type: PRODUCTS_ERROR_DASHBOARD,
      payload: err.response
    });
  }
};
