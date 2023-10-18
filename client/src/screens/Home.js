import React from "react";

import { Redirect } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const Home = () => {
  const { isAuthenticated } = useAuth();

  // TODO: This might be changed as per requirements
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return <Redirect to="/login_client" />;
};

export default Home;
