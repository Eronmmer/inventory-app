import { GET_PRODUCTS, PRODUCTS_ERROR } from "./types";
import callAxios from "../utils/callAxios";

export const getProducts = () => async dispatch => {
  try {
    const res = await callAxios("GET", "/products");
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data.products
    });
  } catch (err) {
    dispatch({
      type: PRODUCTS_ERROR,
      payload: err.response
    });
  }
};
