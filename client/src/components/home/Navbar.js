import React from "react";
import NavbarComponent from "../../StyledComponents/home/Navbar";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <NavbarComponent>
      <ul>
        <div className="left">
          <li className="brand-name">
            <Link to="/">
              Fotiá<span className="triangle-icon">▲</span>
              {/* <img className="line-chart" src={lineChart} alt="line chart" /> */}
            </Link>
          </li>
        </div>
        <div className="right">
          <li className="about">
            <Link to="/about">About</Link>
          </li>
          <li className="login">
            <Link to="/login">Log In</Link>
          </li>
          <li className="register">
            <Link to="/register">Sign Up</Link>
          </li>
        </div>
      </ul>
    </NavbarComponent>
  );
};

export default Navbar;
