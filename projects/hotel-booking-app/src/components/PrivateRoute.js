import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/GlobalContextProvider";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) => (user ? children : <Redirect to={{ pathname: "/login", state: { from: location } }} />)}
    />
  );
}

export default PrivateRoute;
