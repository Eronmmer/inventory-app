import {
  GET_PRODUCTS_DASHBOARD,
  PRODUCTS_ERROR_DASHBOARD
} from "../actions/types";

const initialState = {
  productsDashboard: null,
  loadingProducts: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_DASHBOARD:
      console.log(action.payload);
      return {
        ...state,
        productsDashboard: action.payload
          .slice(0, 5)
      };
    case PRODUCTS_ERROR_DASHBOARD:
      console.log(action.payload);
      return {
        ...state
      };

    default:
      return state;
  }
};
