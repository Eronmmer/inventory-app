import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from "../../StyledComponents/utility";
import { connect } from "react-redux";
import { toggleSalesModal } from "../../actions/modalAction";
import { addSale } from "../../actions/salesAction";

const AddSalesModal = props => {
  const { showSalesModal, toggleSalesModal, addSale } = props;
  const modalContent = useRef(null);
  useEffect(() => {
    window.addEventListener("click", e => {
      if (modalContent.current === null) return;
      if (showSalesModal && !modalContent.current.contains(e.target)) {
        toggleSalesModal();
      }
    });
  }, [showSalesModal, modalContent, toggleSalesModal]);

  const [sale, setSale] = useState({
    name: "",
    soldTo: "",
    numberSold: ""
  });
  const { name, soldTo, numberSold } = sale;

  const handleChange = e => {
    setSale({ ...sale, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    addSale({
      name,
      history: [
        {
          soldTo,
          numberSold
        }
      ]
    } );
    toggleSalesModal();
  };
  return (
    <Modal>
      <div className="modalFlex">
        <div ref={modalContent} className="modalContent">
          <h2 className="modalHeader">Add a Sale</h2>
          <form onSubmit={handleSubmit}>
            <div className="modalFlexInput">
              <p>Name: </p>{" "}
              <input
                className="secondChildModal"
                name="name"
                id="name"
                required
                placeholder="Name of product sold"
                value={name}
                onChange={handleChange}
              />
            </div>
            <div className="modalFlexInput">
              <p>Sold to: </p>{" "}
              <input
                className="secondChildModal"
                type="text"
                name="soldTo"
                id="soldTo"
                required
                placeholder="Enter the Customer you sold your product to"
                value={soldTo}
                onChange={handleChange}
              />
            </div>
            <div className="modalFlexInput">
              <p>Number sold: </p>{" "}
              <input
                className="secondChildModal"
                type="number"
                min="1"
                name="numberSold"
                id="numberSold"
                required
                placeholder="Enter the number of items you sold"
                value={numberSold}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" submitButton>
              Add Sale
            </Button>
          </form>
          <Button onClick={toggleSalesModal} closeButton>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = state => ({
  showSalesModal: state.modal.showSalesModal
});

const mapDispatchToProps = {
  toggleSalesModal, addSale
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSalesModal);
