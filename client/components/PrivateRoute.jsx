import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  let userData = useSelector((state) => state.user.userData);
  console.log(`PrivateRoute user: `, userData);
  //<Navigate /> changes current location when it is rendered
  //replace:  replace the current entry in the history stack rather than adding a new entry.
  return userData ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
