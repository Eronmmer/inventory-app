import {
  SUPPLIERS_ERROR_DASHBOARD,
  GET_SUPPLIERS_DASHBOARD
} from "../actions/types";

const initialState = {
  suppliersDashboard: null,
  loadingSuppliers: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SUPPLIERS_DASHBOARD:
      console.log(action.payload);
      return {
        ...state,
        suppliersDashboard: action.payload
          .slice(0, 5)
      };
    case SUPPLIERS_ERROR_DASHBOARD:
      console.log(action.payload);
      return {
        ...state
      };

    default:
      return state;
  }
};
