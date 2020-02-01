import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadUser } from "../../actions/authAction";
import { getPurchases } from "../../actions/purchasesAction"
import Spinner from "../layout/Spinner";
import Navbar from "../home/Navbar";
import { AllStuff } from "../../StyledComponents/utility"
import PurchasesComponent from "../../StyledComponents/private/Purchases";

const Purchases = props => {
  const { loadUser, user, purchases, getPurchases, isAuthenticated, authLoading } = props;
  useEffect(() => {
    loadUser();
    getPurchases();
  }, [] );
  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      props.history.push("/");
    }
  }, [props.history, isAuthenticated, authLoading]);
  if (authLoading || purchases === null) {
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
          <h1 className="purchases-header">All your Purchases</h1>
          <AllStuff>
            {purchases.length !== 0 ? (
              purchases.map((elem, i) => (
                <div className="all-stuff-content" key={i}>
                  <p>
                    <b className="recent-content-bold">Product purchased:</b>{" "}
                    {elem.name}
                  </p>
                  <p>
                    <b className="recent-content-bold">Amount bought:</b>{" "}
                    {elem.numberBought}
                  </p>
                  <p>
                    <b className="recent-content-bold">Bought from:</b>{" "}
                    {elem.boughtFrom}
                  </p>
                  <p>
                    <b className="recent-content-bold">Date bought:</b>{" "}
                    {elem.dateBought}
                  </p>
                  <p>
                    <b className="recent-content-bold">Cost price:</b> #
                    {elem.costPrice}
                  </p>
                </div>
              ))
            ) : (
              <h4 className="all-stuff-headers">
                You don't have any purchases yet
              </h4>
            )}
          </AllStuff>
        </PurchasesComponent>
      </>
    );
  }
};

const mapDispatchToProps = {
  loadUser, getPurchases
};

const mapStateToProps = state => ({
  user: state.auth.user,
  authLoading: state.auth.authLoading,
  isAuthenticated: state.auth.isAuthenticated,
  purchases: state.purchases.purchases
});

export default connect(mapStateToProps, mapDispatchToProps)(Purchases);
