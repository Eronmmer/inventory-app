import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadUser, logout } from "../../actions/authAction";
import Spinner from "../layout/Spinner";
import { Redirect } from "react-router-dom";

const Dashboard = props => {
  const { isAuthenticated, loadUser, user, authLoading, logout } = props;
  useEffect(() => {
    loadUser();
  }, []);
  useEffect(() => {
    if ( !isAuthenticated && !authLoading ) {
      props.history.push("/")
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
      <div>
        Welcome!
        {!authLoading && user !== null && user.name}
        <button onClick={handleLogout}>logout</button>
      </div>
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
