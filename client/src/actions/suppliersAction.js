import {SUPPLIERS_ERROR, GET_SUPPLIERS} from './types'
import callAxios from "../utils/callAxios"

export const getSuppliers = () => async dispatch => {
  try {
    const res = await callAxios( "GET", "/suppliers" );
    dispatch({
      type: GET_SUPPLIERS,
      payload: res.data.suppliers
    })
  } catch (err) {
    dispatch( {
      type: SUPPLIERS_ERROR,
      payload: err.response
    })
  }
}
