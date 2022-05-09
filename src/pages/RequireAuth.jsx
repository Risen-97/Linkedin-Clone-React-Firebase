import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const RequireAuth = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (user == null) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default RequireAuth;
