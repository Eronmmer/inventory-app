import { GET_PURCHASES_DASHBOARD, PURCHASES_ERROR_DASHBOARD } from "./types";
import callAxios from "../utils/callAxios";

export const getPurchases = () => async dispatch => {
  try {
    const res = await callAxios("GET", "/purchases");
    dispatch({
      type: GET_PURCHASES_DASHBOARD,
      payload: res.data.purchases
    });
  } catch (err) {
    dispatch({
      type: PURCHASES_ERROR_DASHBOARD,
      payload: err.response
    });
  }
};
