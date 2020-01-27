import React from "react";
import { Route, Redirect } from "react-router-dom";
import store from "../store";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const state = store.getState();
  const { isAuthenticated, authLoading } = state.auth;
  return (
    <div>
      <Route
        {...rest}
        render={props =>
          !isAuthenticated && !authLoading ? (
            <Redirect to="/" />
          ) : (
            <Component {...props} />
          )
        }
      />
    </div>
  );
};

export default PrivateRoute;
