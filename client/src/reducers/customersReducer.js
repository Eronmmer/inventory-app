import {
  CUSTOMERS_ERROR,
  GET_CUSTOMERS
} from "../actions/types";

const initialState = {
  customersDashboard: null,
  loadingCustomers: false,
  customers: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMERS:
      return {
        ...state,
        customersDashboard: action.payload.slice( 0, 5 ),
        customers: action.payload
      };
    case CUSTOMERS_ERROR:
      return {
        ...state
      };
    default:
      return state;
  }
};
