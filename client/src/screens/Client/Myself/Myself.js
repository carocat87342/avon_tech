import React, { useState } from "react";

import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import SwipeableViews from "react-swipeable-views";

import TabPanel from "../../../components/TabPanel";
import { MyActivityHistory, MyLogins, MyProfile } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "10px 0px",
  },
  tabsContainer: {
    marginBottom: "40px",
  },
  tab: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    lineHeight: 2,
    minWidth: "unset",
    marginRight: theme.spacing(2),
    borderRadius: 0,
    borderBottom: `2px solid transparent`,
    "&:hover": {
      background: "transparent",
    },
  },
  tabSelected: {
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
}));

const Myself = () => {
  const classes = useStyles();
  const [activeView, setActiveView] = useState(0);

  const handleTabChange = (newValue) => {
    setActiveView(newValue);
  };

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={0}>
        <Grid item md={12} xs={12}>
          <Grid item md={6} xs={12}>
            <Grid container className={classes.tabsContainer}>
              <Button
                disableRipple
                className={clsx({
                  [classes.tab]: true,
                  [classes.tabSelected]: activeView === 0,
                })}
                onClick={() => handleTabChange(0)}
              >
                My Activity History
              </Button>
              <Button
                disableRipple
                className={clsx({
                  [classes.tab]: true,
                  [classes.tabSelected]: activeView === 1,
                })}
                onClick={() => handleTabChange(1)}
              >
                My Profile
              </Button>
              <Button
                disableRipple
                className={clsx({
                  [classes.tab]: true,
                  [classes.tabSelected]: activeView === 2,
                })}
                onClick={() => handleTabChange(2)}
              >
                My Logins
              </Button>
            </Grid>
            <SwipeableViews
              index={activeView}
              onChangeIndex={handleTabChange}
            >
              <TabPanel value={activeView} index={0}>
                <MyActivityHistory />
              </TabPanel>
              <TabPanel value={activeView} index={1}>
                <MyProfile />
              </TabPanel>
              <TabPanel value={activeView} index={2}>
                <MyLogins />
              </TabPanel>
            </SwipeableViews>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Myself;
