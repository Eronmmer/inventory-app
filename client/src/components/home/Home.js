import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Main from "./Main";
import HomeComponent from "../../StyledComponents/home/Home";
import { connect } from "react-redux";
import { loadUser } from "../../actions/authAction";

const Home = props => {
  const { isAuthenticated, loadUser } = props;
  useEffect(() => {
    loadUser();
    if (isAuthenticated) {
      props.history.push("/dashboard");
    }
  }, [isAuthenticated, props.history]);
  return (
    <HomeComponent>
      <Navbar public />
      <Main />
    </HomeComponent>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {
  loadUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
