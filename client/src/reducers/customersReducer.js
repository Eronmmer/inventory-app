import {
  CUSTOMERS_ERROR_DASHBOARD,
  GET_CUSTOMERS_DASHBOARD
} from "../actions/types";

const initialState = {
  customersDashboard: null,
  loadingSuppliers: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMERS_DASHBOARD:
      console.log(action.payload);
      return {
        ...state,
        customersDashboard: action.payload.slice(0, 5)
      };
    case CUSTOMERS_ERROR_DASHBOARD:
      console.log(action.payload);
      return {
        ...state
      };

    default:
      return state;
  }
};
