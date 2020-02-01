import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadUser } from "../../actions/authAction";
import { getSales } from "../../actions/salesAction";
import Spinner from "../layout/Spinner";
import Navbar from "../home/Navbar";
import { AllStuff } from "../../StyledComponents/utility";
import SalesComponent from "../../StyledComponents/private/Sales";

const Sales = props => {
  const {
    loadUser,
    user,
    getSales,
    sales,
    isAuthenticated,
    authLoading
  } = props;
  useEffect(() => {
    loadUser();
    getSales();
  }, []);
  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      props.history.push("/");
    }
  }, [props.history, isAuthenticated, authLoading]);
  if (authLoading || sales === null) {
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
        <SalesComponent>
          <h1 className="sales-header">All your Sales</h1>
          <AllStuff>
            {sales.length !== 0 ? (
              sales.map((elem, index) => (
                <div className="all-stuff-content" key={index}>
                  <p>
                    <b className="all-stuff-content-bold">Product sold:</b>{" "}
                    {elem.name}
                  </p>
                  <p>
                    <b className="all-stuff-content-bold">Sold to:</b>{" "}
                    {elem.soldTo}
                  </p>
                  <p>
                    <b className="all-stuff-content-bold">Amount sold:</b>{" "}
                    {elem.numberSold}
                  </p>
                  <p>
                    <b className="all-stuff-content-bold">Date sold:</b>{" "}
                    {elem.dateSold}
                  </p>
                </div>
              ))
            ) : (
              <h4 className="all-stuff-headers">
                You don't have any sales yet
              </h4>
            )}
          </AllStuff>
        </SalesComponent>
      </>
    );
  }
};

const mapDispatchToProps = {
  loadUser,
  getSales
};

const mapStateToProps = state => ({
  user: state.auth.user,
  authLoading: state.auth.authLoading,
  isAuthenticated: state.auth.isAuthenticated,
  sales: state.sales.sales
});

export default connect(mapStateToProps, mapDispatchToProps)(Sales);
