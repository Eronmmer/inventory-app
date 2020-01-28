import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadUser } from "../../actions/authAction";
import Spinner from "../layout/Spinner";
import Navbar from "../home/Navbar";
import PurchasesComponent from "../../StyledComponents/private/Purchases";

const Purchases = props => {
  const { loadUser, user, isAuthenticated, authLoading } = props;
  useEffect(() => {
    loadUser();
  }, [] );
  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      props.history.push("/");
    }
  }, [props.history, isAuthenticated, authLoading]);
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
        <Navbar private />
        <PurchasesComponent>
          {/* Welcome!
        {!authLoading && user !== null && user.name}
        user's purchases
        <button>logout</button> */}
        </PurchasesComponent>
      </>
    );
  }
};

const mapDispatchToProps = {
  loadUser
};

const mapStateToProps = state => ({
  user: state.auth.user,
  authLoading: state.auth.authLoading,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, mapDispatchToProps)(Purchases);
