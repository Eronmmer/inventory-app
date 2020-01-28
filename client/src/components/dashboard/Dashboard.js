import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadUser, logout } from "../../actions/authAction";
import Spinner from "../layout/Spinner";
import DashboardComponent from "../../StyledComponents/private/Dashboard";
import Navbar from "../home/Navbar";

const Dashboard = props => {
  const { isAuthenticated, loadUser, user, authLoading, logout } = props;
  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      props.history.push("/");
    }
  }, [props.history, isAuthenticated, authLoading]);

  const handleLogout = () => {
    logout();
  };

  if (authLoading) {
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
                  <div title="View all your customers" className="customers">
                    Customers
                  </div>
                  <div title="View all your suppliers" className="suppliers">
                    Suppliers
                  </div>
                  <div title="View all your products" className="products">
                    Products
                  </div>
                  <div title="View all your sales" className="sales">
                    Sales
                  </div>
                  <div title="View all your purchases" className="purchases">
                    Purchases
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="add">
                <p title="Add a sale" className="add-sale">
                  Add Sale
                </p>
                <p title="Add a purchase" className="add-purchase">
                  Add Purchase
                </p>
              </div>
              <h1 className="dashboard-header">Recent Activities</h1>

              <div className="recent recent-sales">
                <h2 className="recent-headers">Your Sales</h2>
              </div>
              <div className="recent recent-purchases">
                <h2 className="recent-headers">Your Purchases</h2>
              </div>
              <div className="recent recent-products">
                <h2 className="recent-headers">Your Products</h2>
              </div>
              <div className="recent recent-customers">
                <h2 className="recent-headers">Recent Customers</h2>
              </div>
              <div className="recent recent-suppliers">
                <h2 className="recent-headers">Recent Suppliers</h2>
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
  logout
};

const mapStateToProps = state => ({
  user: state.auth.user,
  authLoading: state.auth.authLoading,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
