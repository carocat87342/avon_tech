import React, { useState } from "react";

import { useMediaQuery } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";

import Footer from "../Dashboard/components/Footer";
import Sidebar from "../Dashboard/components/Sidebar";
import Topbar from "../Dashboard/components/Topbar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 60,
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      paddingTop: 62,
    },
  },
  shiftContent: {
    paddingLeft: 0,
  },
  content: {
    height: "100%",
  },
}));

const PlainLayout = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"), {
    defaultMatches: true,
  });
  const [openSidebar, setOpenSidebar] = useState(false);

  const shouldOpenSidebar = isDesktop ? false : openSidebar;

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };
  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };
  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop,
      })}
    >
      <Topbar
        onSidebarOpen={handleSidebarOpen}
      />
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? "persistent" : "temporary"}
      />

      <Container maxWidth="xl">{children}</Container>
      <Footer />
    </div>
  );
};

PlainLayout.defaultProps = {
  children: null,
};

PlainLayout.propTypes = {
  children: PropTypes.node,
};

export default PlainLayout;
