import React, { useState } from "react";

import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { MyActivityHistory, MyLogins, MyProfile } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "10px 0px",
  },
  ButtonWraps: {
    marginBottom: "40px",
  },
  active: {
    color: theme.palette.primary.main,
    borderBottom: "1px solid #2979ff",
  },
}));

const Myself = () => {
  const classes = useStyles();
  const [activeView, setActiveView] = useState("history");

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={0}>
        <Grid item md={12} xs={12}>
          <Grid item md={6} xs={12}>
            <div className={classes.ButtonWraps}>
              <Button
                onClick={() => setActiveView("history")}
                className={(activeView === "history") ? classes.active : ""}
              >
                My Activity History
              </Button>
              <Button
                onClick={() => setActiveView("profile")}
                className={(activeView === "profile") ? classes.active : ""}
              >
                My Profile
              </Button>
              <Button
                onClick={() => setActiveView("login")}
                className={(activeView === "login") ? classes.active : ""}
              >
                My Logins
              </Button>
            </div>
            {(activeView === "history") && <MyActivityHistory />}
            {(activeView === "profile") && <MyProfile />}
            {(activeView === "login") && <MyLogins />}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Myself;
