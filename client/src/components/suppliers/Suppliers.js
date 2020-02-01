import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadUser } from "../../actions/authAction";
import { getSuppliers } from "../../actions/suppliersAction"
import Spinner from "../layout/Spinner";
import Navbar from "../home/Navbar";
import {AllStuff} from "../../StyledComponents/utility"
import SuppliersComponent from "../../StyledComponents/private/Suppliers";

const Suppliers = props => {
  const { loadUser, getSuppliers, suppliers, isAuthenticated, user, authLoading } = props;
  useEffect(() => {
    loadUser();
    getSuppliers();
  }, []);
  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      props.history.push("/");
    }
  }, [props.history, isAuthenticated, authLoading]);
  if (authLoading || suppliers === null) {
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
        <SuppliersComponent>
          <h1 className="suppliers-header">All your Suppliers</h1>
          <AllStuff>
            {suppliers.length !== 0 ? (
              suppliers.map((elem, index) => (
                <div key={index} className="all-stuff-content">
                  <p>
                    <b className="all-stuff-content-bold">Name of supplier:</b>{" "}
                    {elem.name}
                  </p>
                  <p>
                    <b className="all-stuff-content-bold">First sold at:</b>{" "}
                    {elem.memberSince}
                  </p>
                </div>
              ))
            ) : (
              <h4 className="all-stuff-headers">
                You don't have any Supplier yet.
              </h4>
            )}
          </AllStuff>
        </SuppliersComponent>
      </>
    );
  }
};

const mapDispatchToProps = {
  loadUser, getSuppliers
};

const mapStateToProps = state => ({
  user: state.auth.user,
  authLoading: state.auth.authLoading,
  isAuthenticated: state.auth.isAuthenticated,
  suppliers: state.suppliers.suppliers
});

export default connect(mapStateToProps, mapDispatchToProps)(Suppliers);
