import React, { useEffect, useState, createRef } from "react";
import Navbar from "../home/Navbar";
import { Link } from "react-router-dom";
import { HeaderOne, FormComponent } from "../../StyledComponents/utility";
import RegisterComponent from "../../StyledComponents/auth/Register";
import { connect } from "react-redux";
import {
  setRegisterLoginLoading,
  register,
  registerLoginLoading
} from "../../actions/authAction";

const Register = ( props ) => {
  const  {setRegisterLoginLoading, redirectToLogin, alert, register, registerLoginLoading} = props
  // Refs
  const nameRef = createRef();
  const emailRef = createRef();
  const usernameRef = createRef();
  const passwordRef = createRef();
  const confirmPasswordRef = createRef();
  const passwordMainRef = createRef()
  const submitBtn = createRef();
  useEffect(() => {
    if (registerLoginLoading === true) {
      submitBtn.current.value = "Loading...";
      submitBtn.current.style.opacity = "0.5";
    } else {
      submitBtn.current.value = "Register";
      submitBtn.current.style.opacity = "1";
    }
  }, [registerLoginLoading]);

  useEffect( () => {
    if ( redirectToLogin && alert.length === 0 ) {
      props.history.push("/login")
    }
  }, [redirectToLogin, alert, props.history])

  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    company: ""
  });

  const { name, email, username, password, confirmPassword, company } = user;

  const [disableSubmit, setDisableSubmit] = useState(true);

  const handleSubmit = e => {
    setRegisterLoginLoading()
    e.preventDefault();
    if ( company ) {
      register({
        name,
        email,
        username,
        password,
        confirmPassword,
        company
      });
    } else {
      register( {
        name,
        email,
        username,
        password,
        confirmPassword
      });
    }
  }

  const emailRegex = /^([a-z0-9\.\-_]+)@([a-z0-9\.\-_]+)\.([a-z]{2,6})$/i;
  const whiteSpaceRegex = /\S/;
  useEffect(() => {
    if (
      whiteSpaceRegex.test(name) &&
      name.length >= 5 &&
      emailRegex.test(email) &&
      whiteSpaceRegex.test(username) &&
      username.length >= 4 &&
      password === confirmPassword &&
      password.length >= 5
    ) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [disableSubmit, user]);

  const onChange = e => {
    const updatedUser = {
      ...user,
      [e.target.name]: e.target.value
    };
    setUser( updatedUser );
    handleErrorMessage(e)
  };

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

  const errorMessageStyle = {
    color: "red",
    display: "none"
  };

  const handleErrorMessage = e => {
    switch (e.target.name) {
      case "name":
        if (!whiteSpaceRegex.test(e.target.value) || e.target.value.length < 5) {
          nameRef.current.style.display = "block";
        } else {
          nameRef.current.style.display = "none";
        }
        break;
      case "email":
        if (!emailRegex.test(e.target.value)) {
          emailRef.current.style.display = "block";
        } else {
          emailRef.current.style.display = "none";
        }
        break;
      case "username":
        if (!whiteSpaceRegex.test(e.target.value) || e.target.value.length < 4) {
          usernameRef.current.style.display = "block";
        } else {
          usernameRef.current.style.display = "none";
        }
        break;
      case "password":
        if (e.target.value.length < 5) {
          passwordRef.current.style.display = "block";
        } else {
          passwordRef.current.style.display = "none";
        }
        break;
      case "confirmPassword":
        if (passwordMainRef.current.value !== e.target.value) {
          confirmPasswordRef.current.style.display = "block";
        } else {
          confirmPasswordRef.current.style.display = "none";
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Navbar public />
      <RegisterComponent>
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
        <HeaderOne>Create an account</HeaderOne>
        <p className="helper-form-text">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
        <FormComponent onSubmit={handleSubmit} registerLoginForm>
          <div className="form-group">
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Name"
              minLength="5"
              value={name}
              onChange={onChange}
            />
            <small ref={nameRef} style={errorMessageStyle}>
              Name must be at least 5 characters long
            </small>
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
              value={email}
              onChange={onChange}
            />
            <small ref={emailRef} style={errorMessageStyle}>
              Email should be valid one
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              required
              minLength="4"
              value={username}
              onChange={onChange}
            />
            <small ref={usernameRef} style={errorMessageStyle}>
              Username must be at least 4 characters long
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="company"
              id="company"
              placeholder="Your company"
              value={company}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="Choose a strong password"
              value={password}
              onChange={onChange}
              minLength="5"
              ref={passwordMainRef}
            />
            <small ref={passwordRef} style={errorMessageStyle}>
              Password must be at least 5 characters long
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              required
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={onChange}
              minLength="5"
            />
            <small ref={confirmPasswordRef} style={errorMessageStyle}>
              Passwords don't match
            </small>
          </div>
          <input
            style={disabledBtn()}
            type="submit"
            value="Register"
            ref={submitBtn}
            className="submit-btn"
          />
        </FormComponent>
      </RegisterComponent>
    </>
  );
};

const mapStateToProps = state => ({
  registerLoginLoading: state.auth.registerLoginLoading,
  alert: state.auth.alert,
  redirectToLogin: state.auth.redirectToLogin
});

const mapDispatchToProps = {
  register,
  setRegisterLoginLoading
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
