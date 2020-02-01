import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadUser } from "../../actions/authAction";
import Spinner from "../layout/Spinner";
import Navbar from "../home/Navbar";
import SettingsComponent from "../../StyledComponents/private/Settings";
import { logout } from "../../actions/authAction";
import callAxios from "../../utils/callAxios";

const Settings = props => {
  const { isAuthenticated, loadUser, user, logout, authLoading } = props;
  useEffect(() => {
    loadUser();
  }, []);
  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      props.history.push("/");
    }
  }, [props.history, isAuthenticated, authLoading]);

  const deleteAccount = async () => {
    if (window.confirm("Are you sure you wanna delete you account permanently")) {
      await callAxios("DELETE", "/users");
      logout();
    }
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
        <Navbar private />
        <SettingsComponent>
          <h1 className="settings-header">Settings</h1>

          <h4
            style={{ textAlign: "center", cursor: "pointer" }}
            onClick={deleteAccount}
            className="delete-account"
          >
            Permanently delete your account
          </h4>
        </SettingsComponent>
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
