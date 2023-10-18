import React, { useState } from "react";

import { useMediaQuery } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";

import { /* Header, */ Footer, Sidebar } from "./components";


const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  shiftContent: {
    paddingLeft: 0,
  },
  content: {
    flex: 1,
  },
}));


const MainLayout = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"), {
    defaultMatches: true,
  });

  // const handleSidebarOpen = () => {
  //   setOpenSidebar(true);
  // };

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
      {/* Removed as per CLIN-155 */}
      {/* <Header onSidebarOpen={handleSidebarOpen} /> */}
      <Sidebar
        onClose={handleSidebarClose}
        open={openSidebar}
        variant="temporary"
      />
      <Container maxWidth="lg" className={classes.content}>{children}</Container>
      <Footer />
    </div>
  );
};

MainLayout.defaultProps = {
  children: null,
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
