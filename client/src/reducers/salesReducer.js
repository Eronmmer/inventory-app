import {GET_SALES, SALES_ERROR, ADD_SALES, ADD_SALES_ERROR, CLEAR_ALERT} from '../actions/types'

const initialState = {
  salesDashboard: null,
  sales: null,
  loadingSales: false,
  error: null,
  salesAlert: []
}

const salesArr = [];
let alertArr = [...initialState.salesAlert]

export default ( state = initialState, action ) => {
  switch (action.type) {
    case GET_SALES:
      // console.log(action.payload);
      action.payload.forEach((elem, index) => {
        elem.history.forEach((e, i) => {
          salesArr.push({
            name: elem.name,
            soldTo: e.soldTo,
            numberSold: e.numberSold,
            dateSold: e.dateSold
          });
        });
      });
      return {
        ...state,
        salesDashboard: action.payload
          .slice(0, 5)
          .map(elem => [elem.name, elem.history[elem.history.length - 1]]),
        sales: salesArr
      };
    case SALES_ERROR:
      // console.log(action.payload);
      return {
        ...state
      };
    case ADD_SALES:
      // console.log(action.payload);
      alertArr = [...state.salesAlert];
      alertArr.unshift(action.payload.alert);
      return {
        ...state,
        salesAlert: alertArr
      };
    case ADD_SALES_ERROR:
      // console.log(action.payload);
      alertArr = [...state.salesAlert];
      alertArr.unshift(action.payload.alert);
      return {
        ...state,
        salesAlert: alertArr
      };
    case CLEAR_ALERT:
      alertArr = [...state.salesAlert];
      return {
        ...state,
        salesAlert: alertArr.filter(elem => elem.id !== action.payload)
      };
    default:
      return state;
  }
}
