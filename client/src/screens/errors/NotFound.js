import React from "react";

import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary,
    textAlign: "center",
  },
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundSize: "cover",
    mixBlendMode: "overlay",
    backgroundColor: "#757575",
  },
  title: {
    fontSize: "144px",
    color: "#b0bec5",
    width: "100%",
    display: "flex",
    backgorundPosition: "center",
    alignItems: "center",
    backgroundSize: "cover",
    justifyContent: "center",
    marginBottom: 0,
  },
  subTitle: {
    fontSize: "80px",
    color: "#b0bec5",
    margin: "0",
  },
  button: {
    color: theme.palette.common.black,
    letterSpacing: "0.02857em",
    backgroundColor: "#b0bec5",
    width: "auto",
    height: "40px",
    padding: "0 16px",
    minWidth: "50px",
    minHeight: "auto",
    borderRadius: "24px",
    marginTop: 25,

    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
  },
  link: {
    textDecoration: "none !important",
  },
}));

const NotFound = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.bg} />
      <h1 className={classes.title}>404</h1>
      <p className={classes.subTitle}>Not Found!</p>
      <Link className={classes.link} to="/">
        <Button className={classes.button}>Go to Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
