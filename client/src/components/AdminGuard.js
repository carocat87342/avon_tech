import React from "react";

import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const AdminGuard = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Redirect to={(user && user.login_url) || "/login_client"} />;
  }

  if (!user.admin) {
    return <Redirect to="/protected-area" />;
  }

  return (
    <>
      {children}
    </>
  );
};

AdminGuard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminGuard;
