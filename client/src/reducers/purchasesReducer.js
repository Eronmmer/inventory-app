import { GET_PURCHASES_DASHBOARD, PURCHASES_ERROR_DASHBOARD } from "../actions/types";

const initialState = {
  purchasesDashboard: null,
  loadingPurchases: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PURCHASES_DASHBOARD:
      console.log(action.payload);
      return {
        ...state,
        purchasesDashboard: action.payload
          .slice(0, 5)
          .map(elem => [{name: elem.name, costPrice: elem.costPrice, lastHistory:elem.history[elem.history.length - 1]}])
      };
    case PURCHASES_ERROR_DASHBOARD:
      console.log(action.payload);
      return {
        ...state
      };

    default:
      return state;
  }
};
