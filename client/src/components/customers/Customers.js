import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadUser } from "../../actions/authAction";
import { getCustomers } from "../../actions/customersAction";
import Spinner from "../layout/Spinner";
import Navbar from "../home/Navbar";
import { AllStuff } from "../../StyledComponents/utility";
import CustomersComponent from "../../StyledComponents/private/Customers";

const Customers = props => {
  const {
    loadUser,
    getCustomers,
    customers,
    user,
    isAuthenticated,
    authLoading
  } = props;
  useEffect(() => {
    loadUser();
    getCustomers();
  }, []);
  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      props.history.push("/");
    }
  }, [props.history, isAuthenticated, authLoading]);
  if (authLoading || customers === null) {
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
        <Navbar private />
        <CustomersComponent>
          <h1 className="customers-header">All your Customers</h1>
          <AllStuff>
            {customers.length !== 0 ? (
              customers.map((elem, index) => (
                <div key={index} className="all-stuff-content">
                  <p>
                    <b className="all-stuff-content-bold">Name of customer:</b>{" "}
                    {elem.name}
                  </p>
                  <p>
                    <b className="all-stuff-content-bold">First bought at:</b>{" "}
                    {elem.memberSince}
                  </p>
                </div>
              ))
            ) : (
              <h4 className="all-stuff-headers">
                You don't have any customers yet
              </h4>
            )}
          </AllStuff>
        </CustomersComponent>
      </>
    );
  }
};

const mapDispatchToProps = {
  loadUser,
  getCustomers
};

const mapStateToProps = state => ({
  user: state.auth.user,
  authLoading: state.auth.authLoading,
  isAuthenticated: state.auth.isAuthenticated,
  customers: state.customers.customers
});

export default connect(mapStateToProps, mapDispatchToProps)(Customers);
