import React, { useState } from "react";

import { useMediaQuery } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";

import { Topbar, Sidebar, Footer } from "../components";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 56,
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      paddingTop: 64,
    },
  },
  shiftContent: {
    paddingLeft: "240px",
  },
  content: {
    height: "100%",
  },
}));

const WithLeftSidebar = (props) => {
  const { children } = props;

  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"), {
    defaultMatches: true,
  });
  const [openSidebar, setOpenSidebar] = useState(false);

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

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
      <Topbar onSidebarOpen={handleSidebarOpen} />
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? "persistent" : "temporary"}
      />

      <Container maxWidth="xl" style={{ flex: 1 }}>
        {children}
      </Container>
      <Footer />
    </div>
  );
};

WithLeftSidebar.defaultProps = {
  children: null,
};

WithLeftSidebar.propTypes = {
  children: PropTypes.node,
};

export default WithLeftSidebar;
