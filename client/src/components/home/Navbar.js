import React from "react";
import NavbarComponent from "../../StyledComponents/home/Navbar";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import {logout} from '../../actions/authAction'

const Navbar = ( props ) => {
  const {logout} = props
  const publicLInksStyle = {
    display: props.private ? "none" : "inline"
  }

  const handleLogout = () => {
    logout();
  }
  return (
    <NavbarComponent
      style={{
        boxShadow: props.dashboard
          ? "none"
          : "0px 6px 5px 0px rgba(128, 128, 128, 1)"
      }}
    >
      <ul>
        <div className="left">
          <li className="brand-name">
            <Link to={props.private ? "/dashboard" : "/"}>
              Fotiá<span className="triangle-icon">▲</span>
              {/* <img className="line-chart" src={lineChart} alt="line chart" /> */}
            </Link>
          </li>
        </div>
        <div
          style={{
            display: props.notfound ? "none" : "flex"
          }}
          className="right"
        >
          <li style={publicLInksStyle} className="login">
            <Link to="/login">Log In</Link>
          </li>
          <li style={publicLInksStyle} className="register">
            <Link to="/register">Sign Up</Link>
          </li>
          <li
            style={{ display: props.public ? "none" : "inline" }}
            className="settings"
          >
            <Link to="/settings">Settings</Link>
          </li>
          <li
            onClick={handleLogout}
            style={{ display: props.public ? "none" : "inline", paddingLeft: "1rem" }}
            className="logout"
          >
            <a href="#">Logout</a>
          </li>
        </div>
      </ul>
    </NavbarComponent>
  );
};

const mapDispatchToProps = {
  logout
}

export default connect(null, mapDispatchToProps)(Navbar);
