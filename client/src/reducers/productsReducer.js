import {
  GET_PRODUCTS,
  PRODUCTS_ERROR
} from "../actions/types";

const initialState = {
  productsDashboard: null,
  products: null,
  loadingProducts: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      console.log(action.payload);
      return {
        ...state,
        productsDashboard: action.payload
          .slice( 0, 5 ),
        products: action.payload
      };
    case PRODUCTS_ERROR:
      console.log(action.payload);
      return {
        ...state
      };

    default:
      return state;
  }
};
