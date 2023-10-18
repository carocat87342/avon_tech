import React, { useEffect, useState } from "react";

import { useMediaQuery } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";

import { Topbar, Sidebar, Footer } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 56,
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      paddingTop: 50,
    },
  },
  shiftContent: {
    paddingLeft: 0,
  },
  content: {
    flex: 1,
  },
}));

const Dashboard = (props) => {
  const { children } = props;

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

  // Scroll Restoration::https://reactrouter.com/web/guides/scroll-restoration
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [children]);

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

      <Container maxWidth="xl" className={classes.content}>
        {children}
      </Container>
      <Footer />
    </div>
  );
};

Dashboard.defaultProps = {
  children: null,
};

Dashboard.propTypes = {
  children: PropTypes.node,
};

export default Dashboard;
