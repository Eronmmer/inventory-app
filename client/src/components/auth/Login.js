import React, { useState, useEffect, createRef } from "react";
import Navbar from "../home/Navbar";
import { Link } from "react-router-dom";
import { HeaderOne, FormComponent } from "../../StyledComponents/utility";
import LoginComponent from "../../StyledComponents/auth/Login";
import { connect } from "react-redux";
import {
  login,
  setRegisterLoginLoading,
  clearRedirectToLogin
} from "../../actions/authAction";

const Login = (props) => {
  const {
    isAuthenticated,
    alert,
    setRegisterLoginLoading,
    registerLoginLoading,
    login,
    clearRedirectToLogin
  } = props;
  // refs
  const submitBtn = createRef();
  useEffect(() => {
    if (registerLoginLoading === true) {
      submitBtn.current.value = "Loading...";
      submitBtn.current.style.opacity = "0.5";
    } else {
      submitBtn.current.value = "Login";
      submitBtn.current.style.opacity = "1";
    }
  }, [registerLoginLoading]);

  useEffect(() => {
    if (isAuthenticated && alert.length === 0) {
      props.history.push("/dashboard");
    }
  }, [isAuthenticated, alert, props.history]);

  const [user, setUser] = useState({
    usernameOrEmail: "",
    password: ""
  });

  useEffect( () => {
    clearRedirectToLogin()
  }, [])

  const { usernameOrEmail, password } = user;

  const [disableSubmit, setDisableSubmit] = useState(true);

  useEffect(() => {
    if (
      /\S/.test(user.usernameOrEmail) &&
      user.usernameOrEmail.length >= 3 &&
      user.password.length >= 5
    ) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [disableSubmit, user]);

  const disabledBtn = () => {
    if (disableSubmit)
      return {
        color: "rgba(0, 0, 0, 0.26)",
        boxShadow: "none",
        backgroundColor: "rgba(0, 0, 0, 0.12)",
        cursor: "default",
        pointerEvents: "none"
      };
  };

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const emailRegex = /^([a-z0-9\.\-_]+)@([a-z0-9\.\-_]+)\.([a-z]{2,6})$/i;
  const handleSubmit = e => {
    setRegisterLoginLoading();
    e.preventDefault();

    if (emailRegex.test(usernameOrEmail)) {
      login({
        email: usernameOrEmail,
        password: password
      });
    } else {
      login({
        username: usernameOrEmail,
        password: password
      });
    }
  };

  return (
    <>
      <Navbar public />
      <LoginComponent>
        <div>
          {alert.map(elem => (
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
        <HeaderOne>Welcome back</HeaderOne>
        <p className="helper-form-text">
          Don't have an account yet? <Link to="/register">Sign Up</Link>
        </p>
        <FormComponent onSubmit={handleSubmit} registerLoginForm>
          <div className="form-group">
            <input
              type="text"
              name="usernameOrEmail"
              id="usernameOrEmail"
              required
              placeholder="Your username or email"
              onChange={onChange}
              value={usernameOrEmail}
              minLength="3"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="Enter your password"
              onChange={onChange}
              value={password}
              minLength="5"
            />
          </div>
          <input
            ref={submitBtn}
            style={disabledBtn()}
            type="submit"
            value="Login"
            className="submit-btn"
          />
        </FormComponent>
      </LoginComponent>
    </>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  registerLoginLoading: state.auth.registerLoginLoading,
  alert: state.auth.alert
});

const mapDispatchToProps = {
  login,
  setRegisterLoginLoading,
  clearRedirectToLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
