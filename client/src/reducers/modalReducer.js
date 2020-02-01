import {
  TOGGLE_PURCHASES_MODAL, 
  TOGGLE_SALES_MODAL
} from "../actions/types"

const initialState = {
  showPurchasesModal: false,
  showSalesModal: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_PURCHASES_MODAL:
      return {
        ...state,
        showPurchasesModal: !state.showPurchasesModal
      }
    case TOGGLE_SALES_MODAL:
      return {
        ...state,
        showSalesModal: !state.showSalesModal
      }
  
    default:
      return state;
  }
}
