import {SUPPLIERS_ERROR_DASHBOARD, GET_SUPPLIERS_DASHBOARD} from './types'
import callAxios from "../utils/callAxios"

export const getSuppliers = () => async dispatch => {
  try {
    const res = await callAxios( "GET", "/suppliers" );
    dispatch({
      type: GET_SUPPLIERS_DASHBOARD,
      payload: res.data.suppliers
    })
  } catch (err) {
    dispatch( {
      type: SUPPLIERS_ERROR_DASHBOARD,
      payload: err.response
    })
  }
}
