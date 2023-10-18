import React from "react";

import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const ClientPortalGuard = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Redirect to={(user && user.login_url) || "/login_client"} />;
  }
  if (user.role !== "PATIENT") {
    return <Redirect to="/" />;
  }

  return (
    <>
      {children}
    </>
  );
};

ClientPortalGuard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ClientPortalGuard;
