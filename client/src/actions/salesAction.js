import { GET_SALES_DASHBOARD, SALES_ERROR_DASHBOARD } from './types'
import callAxios from '../utils/callAxios'

export const getSales = () => async dispatch => {
  try {
    const res = await callAxios( "GET", '/sales' )
    dispatch( {
      type: GET_SALES_DASHBOARD,
      payload: res.data.sales
    })
  } catch (err) {
    dispatch( {
      type: SALES_ERROR_DASHBOARD,
      payload: err.response
    })
  }
}
