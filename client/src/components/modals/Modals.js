import React from "react";
import { connect } from "react-redux";
import AddPurchasesModal from "./AddPurchasesModal";
import AddSalesModal from "./AddSalesModal";

const Modals = props => {
  const { showPurchasesModal, showSalesModal } = props;
  if (showPurchasesModal) {
    return <AddPurchasesModal />;
  } else if (showSalesModal) {
    return <AddSalesModal />;
  } else {
    return null;
  }
};

const mapStateToProps = state => ({
  showPurchasesModal: state.modal.showPurchasesModal,
  showSalesModal: state.modal.showSalesModal
});

export default connect(mapStateToProps)(Modals);
