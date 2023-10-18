import React from "react";

import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";

import { Footer } from "../components";

const Plain = ({ children }) => (
  <div className="main-container">
    <Container maxWidth="lg">{children}</Container>
    <Footer />
  </div>
);

Plain.defaultProps = {
  children: null,
};

Plain.propTypes = {
  children: PropTypes.node,
};

export default Plain;
