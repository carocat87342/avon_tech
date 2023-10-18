import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import WarningIcon from "@material-ui/icons/WarningOutlined";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
    paddingTop: "60px",
    // backgroundColor: "rgb(255, 244, 229)",
    height: "100%",
    backgroundSize: "cover",
    mixBlendMode: "overlay",
  },
  WarningIcon: {
    color: "#ff9800",
    fontSize: "87px",
  },
  title: {
    fontSize: "44px",
    color: "rgb(102, 60, 0)",
    width: "100%",
    display: "flex",
    backgorundPosition: "center",
    alignItems: "center",
    backgroundSize: "cover",
    justifyContent: "center",
    marginBottom: 0,
  },
  subTitle: {
    fontSize: "30px",
    color: "rgb(102, 60, 0)",
    margin: "0",
  },
}));

const Restricted = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <WarningIcon className={classes.WarningIcon} />
      <h1 className={classes.title}>Restricted area!</h1>
      <p className={classes.subTitle}>Only authorized user can access.</p>
    </div>
  );
};

export default Restricted;
