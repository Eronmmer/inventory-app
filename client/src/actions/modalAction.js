import {
  TOGGLE_PURCHASES_MODAL,
  TOGGLE_SALES_MODAL
} from "./types";

export const togglePurchasesModal = () => {
  return {
    type: TOGGLE_PURCHASES_MODAL
  };
};

export const toggleSalesModal = () => {
  return {
    type: TOGGLE_SALES_MODAL
  };
};

