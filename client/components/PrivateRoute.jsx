import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  let userInfo;

  //<Navigate /> changes current location when it is rendered
  //replace:  replace the current entry in the history stack rather than adding a new entry.
  return userInfo ? <Outlet /> : <Navigate to="/login" replace={true} />;
};

export default PrivateRoute;
