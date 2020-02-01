import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadUser, logout } from "../../actions/authAction";
import { getSales } from "../../actions/salesAction";
import { getPurchases } from "../../actions/purchasesAction";
import { getProducts } from "../../actions/productsAction";
import { getSuppliers } from "../../actions/suppliersAction";
import { getCustomers } from "../../actions/customersAction";
import {
  togglePurchasesModal,
  toggleSalesModal
} from "../../actions/modalAction";
import Spinner from "../layout/Spinner";
import DashboardComponent from "../../StyledComponents/private/Dashboard";
import Navbar from "../home/Navbar";

const Dashboard = props => {
  const {
    isAuthenticated,
    getSuppliers,
    suppliersDashboard,
    getPurchases,
    getProducts,
    productsDashboard,
    customersDashboard,
    getCustomers,
    purchasesDashboard,
    salesDashboard,
    loadUser,
    getSales,
    user,
    showPurchasesModal,
    showSalesModal,
    authLoading,
    logout,
    toggleSalesModal,
    togglePurchasesModal, salesAlert, purchasesAlert
  } = props;
  useEffect(() => {
    loadUser();
    getSales();
    getPurchases();
    getProducts();
    getSuppliers();
    getCustomers();
  }, []);

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      props.history.push("/");
    }
  }, [props.history, isAuthenticated, authLoading]);

  const handleLogout = () => {
    logout();
  };

  if (
    authLoading ||
    salesDashboard === null ||
    purchasesDashboard === null ||
    productsDashboard === null ||
    suppliersDashboard === null ||
    customersDashboard === null
  ) {
    return (
      <>
        <h2 style={{ textAlign: "center", margin: "3rem auto 0 auto" }}>
          Loading...
        </h2>
        <Spinner />
      </>
    );
  } else {
    return (
      <>
        <Navbar private dashboard />
        <DashboardComponent>
          {/* Welcome!
        {!authLoading && user !== null && user.name}
        <button onClick={handleLogout}>logout</button> */}

          <div className="dashboard-container">
            <div className="left">
              <div className="left-fixed">
                <div className="left-items">
                  <Link to="/customers">
                    <div title="View all your customers" className="customers">
                      Customers
                    </div>
                  </Link>
                  <Link to="/suppliers">
                    <div title="View all your suppliers" className="suppliers">
                      Suppliers
                    </div>
                  </Link>
                  <Link to="/products">
                    <div title="View all your products" className="products">
                      Products
                    </div>
                  </Link>
                  <Link to="/sales">
                    <div title="View all your sales" className="sales">
                      Sales
                    </div>
                  </Link>
                  <Link to="/purchases">
                    <div title="View all your purchases" className="purchases">
                      Purchases
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="add">
                <p
                  onClick={toggleSalesModal}
                  title="Add a sale"
                  className="add-sale"
                >
                  Add Sale
                </p>
                <p
                  onClick={togglePurchasesModal}
                  title="Add a purchase"
                  className="add-purchase"
                >
                  Add Purchase
                </p>
              </div>

              <div>
                {salesAlert.map(elem => (
                  <p
                    style={{
                      maxWidth: "320px",
                      margin: "1rem auto 0 auto",
                      borderRadius: "10px",
                      padding: ".5rem",
                      textAlign: "center",
                      color: "white",
                      background: elem.type === "success" ? "green" : "red"
                    }}
                    key={elem.id}
                  >
                    {elem.msg}
                  </p>
                ))}
              </div>
              <div>
                {purchasesAlert.map(elem => (
                  <p
                    style={{
                      maxWidth: "320px",
                      margin: "1rem auto 0 auto",
                      borderRadius: "10px",
                      padding: ".5rem",
                      textAlign: "center",
                      color: "white",
                      background: elem.type === "success" ? "green" : "red"
                    }}
                    key={elem.id}
                  >
                    {elem.msg}
                  </p>
                ))}
              </div>

              <h1 className="dashboard-header">Recent Activities</h1>

              <div className="recent recent-sales">
                <h2 className="recent-headers">Recent Sales</h2>
                <div className="your-recent-content-wrapper">
                  {salesDashboard.length !== 0 ? (
                    salesDashboard.map((elem, index) => (
                      <div key={index} className="your-recent-content">
                        <p>
                          <b className="recent-content-bold">Product sold:</b>{" "}
                          {elem[0]}
                        </p>
                        <p>
                          <b className="recent-content-bold">Sold to:</b>{" "}
                          {elem[1].soldTo}
                        </p>
                        <p>
                          <b className="recent-content-bold">Amount sold:</b>{" "}
                          {elem[1].numberSold}
                        </p>
                        <p>
                          <b className="recent-content-bold">Date sold:</b>{" "}
                          {elem[1].dateSold}
                        </p>
                      </div>
                    ))
                  ) : (
                    <h4 className="no-recent">No recent sales</h4>
                  )}
                </div>
              </div>
              <div className="recent recent-purchases">
                <h2 className="recent-headers">Recent Purchases</h2>
                <div className="your-recent-content-wrapper">
                  {purchasesDashboard.length !== 0 ? (
                    purchasesDashboard.map((elem, index) => (
                      <div key={index} className="your-recent-content">
                        <p>
                          <b className="recent-content-bold">
                            Product purchased:
                          </b>{" "}
                          {elem[0].name}
                        </p>
                        <p>
                          <b className="recent-content-bold">Amount bought:</b>{" "}
                          {elem[0].lastHistory.numberBought}
                        </p>
                        <p>
                          <b className="recent-content-bold">Bought from:</b>{" "}
                          {elem[0].lastHistory.boughtFrom}
                        </p>
                        <p>
                          <b className="recent-content-bold">Date bought:</b>{" "}
                          {elem[0].lastHistory.dateBought}
                        </p>
                        <p>
                          <b className="recent-content-bold">Cost price:</b> #
                          {elem[0].costPrice}
                        </p>
                      </div>
                    ))
                  ) : (
                    <h4 className="no-recent">No recent purchase</h4>
                  )}
                </div>
              </div>
              <div className="recent recent-products">
                <h2 className="recent-headers">Latest Products</h2>
                <div className="your-recent-content-wrapper">
                  {productsDashboard.length !== 0 ? (
                    productsDashboard.map((elem, index) => (
                      <div key={index} className="your-recent-content">
                        <p>
                          <b className="recent-content-bold">
                            Name of product:
                          </b>{" "}
                          {elem.name}
                        </p>
                        <p>
                          <b className="recent-content-bold">Cost price:</b> #
                          {elem.costPrice}
                        </p>
                        <p>
                          <b className="recent-content-bold">Selling price:</b>{" "}
                          #{elem.sellingPrice}
                        </p>
                        <p>
                          <b className="recent-content-bold">
                            Amount available:
                          </b>{" "}
                          {elem.amountAvailable}
                        </p>
                      </div>
                    ))
                  ) : (
                    <h4 className="no-recent">No latest products</h4>
                  )}
                </div>
              </div>
              <div className="recent recent-customers">
                <h2 className="recent-headers">Newest Customers</h2>
                <div className="your-recent-content-wrapper">
                  {customersDashboard.length !== 0 ? (
                    customersDashboard.map((elem, index) => (
                      <div key={index} className="your-recent-content">
                        <p>
                          <b className="recent-content-bold">
                            Name of customer:
                          </b>{" "}
                          {elem.name}
                        </p>
                        <p>
                          <b className="recent-content-bold">
                            First bought at:
                          </b>{" "}
                          {elem.memberSince}
                        </p>
                      </div>
                    ))
                  ) : (
                    <h4 className="no-recent">No new customer</h4>
                  )}
                </div>
              </div>
              <div className="recent recent-suppliers">
                <h2 className="recent-headers">Newest Suppliers</h2>
                <div className="your-recent-content-wrapper">
                  {suppliersDashboard.length !== 0 ? (
                    suppliersDashboard.map((elem, index) => (
                      <div key={index} className="your-recent-content">
                        <p>
                          <b className="recent-content-bold">
                            Name of supplier:
                          </b>{" "}
                          {elem.name}
                        </p>
                        <p>
                          <b className="recent-content-bold">First sold at:</b>{" "}
                          {elem.memberSince}
                        </p>
                      </div>
                    ))
                  ) : (
                    <h4 className="no-recent">No new supplier</h4>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DashboardComponent>
      </>
    );
  }
};

const mapDispatchToProps = {
  loadUser,
  logout,
  getSales,
  getPurchases,
  getProducts,
  getSuppliers,
  getCustomers,
  toggleSalesModal,
  togglePurchasesModal
};

const mapStateToProps = state => ({
  user: state.auth.user,
  authLoading: state.auth.authLoading,
  isAuthenticated: state.auth.isAuthenticated,
  salesDashboard: state.sales.salesDashboard,
  purchasesDashboard: state.purchases.purchasesDashboard,
  productsDashboard: state.products.productsDashboard,
  suppliersDashboard: state.suppliers.suppliersDashboard,
  customersDashboard: state.customers.customersDashboard,
  showPurchasesModal: state.modal.showPurchasesModal,
  showSalesModal: state.modal.showSalesModal,
  salesAlert: state.sales.salesAlert,
  purchasesAlert: state.purchases.purchasesAlert
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
