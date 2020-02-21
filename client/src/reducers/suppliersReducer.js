import {
  SUPPLIERS_ERROR,
  GET_SUPPLIERS
} from "../actions/types";

const initialState = {
  suppliersDashboard: null,
  suppliers: null,
  loadingSuppliers: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SUPPLIERS:
      // console.log(action.payload);
      return {
        ...state,
        suppliersDashboard: action.payload
          .slice( 0, 5 ),
        suppliers: action.payload
      };
    case SUPPLIERS_ERROR:
      // console.log(action.payload);
      return {
        ...state
      };

    default:
      return state;
  }
};
