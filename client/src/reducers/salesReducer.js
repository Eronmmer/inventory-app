import {GET_SALES_DASHBOARD, SALES_ERROR_DASHBOARD} from '../actions/types'

const initialState = {
  salesDashboard: null,
  loadingSales: false,
  error: null,
}

export default ( state = initialState, action ) => {
  switch (action.type) {
    case GET_SALES_DASHBOARD:
      console.log(action.payload)
      return {
        ...state,
        salesDashboard: action.payload
          .slice(0, 5)
          .map(elem => [elem.name, elem.history[elem.history.length - 1]])
      };
    case SALES_ERROR_DASHBOARD:
      console.log(action.payload)
      return {
        ...state,
        
      }
  
    default:
      return state
  }
}
