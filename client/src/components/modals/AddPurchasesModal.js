import React, { useRef, useEffect, useState } from "react";
import { Modal, Button } from "../../StyledComponents/utility";
import { connect } from "react-redux";
import { togglePurchasesModal } from "../../actions/modalAction";
import { addPurchase} from "../../actions/purchasesAction"

const AddPurchasesModal = props => {
  const { togglePurchasesModal, showPurchasesModal, addPurchase } = props;
  const modalContent = useRef(null);
  useEffect(() => {
    window.addEventListener("click", e => {
      if (modalContent.current === null) return;
      if (showPurchasesModal && !modalContent.current.contains(e.target)) {
        togglePurchasesModal();
      }
    });
  }, [modalContent, togglePurchasesModal, showPurchasesModal]);

  const [sale, setSale] = useState({
    name: "",
    numberBought: "",
    boughtFrom: "",
    costPrice: "",
    sellingPrice: ""
  });
  const { name, numberBought, boughtFrom, costPrice, sellingPrice } = sale;

  const handleChange = e => {
    setSale({ ...sale, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    addPurchase({
      name,
      costPrice, 
      sellingPrice,
      history: [
        {
          numberBought,
          boughtFrom
        }
      ]
    });
    togglePurchasesModal();
  };

  return (
    <Modal>
      <div className="modalFlex">
        <div ref={modalContent} className="modalContent">
          <h2 className="modalHeader"> Add a purchase</h2>
          <form onSubmit={handleSubmit}>
            <div className="modalFlexInput">
              <p>Name: </p>{" "}
              <input
                className="secondChildModal"
                name="name"
                id="name"
                type="text"
                required
                placeholder="Name of product"
                value={name}
                onChange={handleChange}
              />
            </div>
            <div className="modalFlexInput">
              <p>Number bought: </p>{" "}
              <input
                className="secondChildModal"
                type="number"
                name="numberBought"
                id="numberBought"
                min="1"
                required
                placeholder="How many did you purchase"
                value={numberBought}
                onChange={handleChange}
              />
            </div>
            <div className="modalFlexInput">
              <p>Bought from: </p>{" "}
              <input
                className="secondChildModal"
                type="text"
                name="boughtFrom"
                id="boughtFrom"
                placeholder="Supplier product was bought from"
                required
                value={boughtFrom}
                onChange={handleChange}
              />
            </div>
            <div className="modalFlexInput">
              <p>Cost price: </p>{" "}
              <input
                className="secondChildModal"
                type="number"
                name="costPrice"
                id="costPrice"
                min="1"
                required
                placeholder="How much did you buy this product"
                value={costPrice}
                onChange={handleChange}
              />
            </div>
            <div className="modalFlexInput">
              <p>Selling price: </p>{" "}
              <input
                className="secondChildModal"
                type="number"
                name="sellingPrice"
                id="sellingPrice"
                min="1"
                required
                placeholder="How much do you wish to sell this product"
                value={sellingPrice}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" submitButton>
              Add Purchase
            </Button>
          </form>
          <Button onClick={togglePurchasesModal} closeButton>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = state => ({
  showPurchasesModal: state.modal.showPurchasesModal
});

const mapDispatchToProps = {
  togglePurchasesModal, addPurchase
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPurchasesModal);
