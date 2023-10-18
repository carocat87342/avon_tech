import React from "react";

import AppBar from "@material-ui/core/AppBar";
import grey from "@material-ui/core/colors/grey";
import orange from "@material-ui/core/colors/orange";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import InputIcon from "@material-ui/icons/InputOutlined";
import MenuIcon from "@material-ui/icons/MenuOutlined";
import PropTypes from "prop-types";
import { Link as RouterLink, useHistory } from "react-router-dom";

import Logo from "../../../../assets/img/Logo.svg";
import useAuth from "../../../../hooks/useAuth";


const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: "#ffffff",
    "& button": {
      color: orange[800],
      backgroundColor: grey[200],
    },
  },
  toolbar: {
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  Logo: {
    maxWidth: "180px",
  },
  navItems: {
    listStyle: "none",
    textDecoration: "none",
    "& a": {
      textDecoration: "none",
      color: "#1d1d1d",
    },
  },
  link: {
    marginRight: theme.spacing(2),
    textDecoration: "none",
    fontSize: "16px",
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
}));

const Header = ({ ...props }) => {
  const classes = useStyles();
  const history = useHistory();
  const { isAuthenticated, user, logout } = useAuth();
  const { onSidebarOpen } = props;

  const handleLogout = async () => {
    try {
      await logout();
      history.push(user.login_url || "/login_client");
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <img src={Logo} alt="Logo" className={classes.Logo} />
        </RouterLink>
        <Hidden mdDown>
          <div className={classes.navItems}>
            {isAuthenticated && (
              <>
                <IconButton
                  className={classes.signOutButton}
                  color="inherit"
                  onClick={() => handleLogout()}
                >
                  <InputIcon />
                </IconButton>
              </>
            )}
          </div>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};


Header.propTypes = {
  onSidebarOpen: PropTypes.func.isRequired,
};

export default Header;
