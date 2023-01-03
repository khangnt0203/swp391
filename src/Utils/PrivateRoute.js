import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isLogin } from "./Auth";

const PrivateRoute = () => {
  return isLogin() === true ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
