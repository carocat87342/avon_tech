import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

import Tooltip from "../../../components/common/CustomTooltip";
import usePatientContext from "../../../hooks/usePatientContext";

const useStyles = makeStyles((theme) => ({
  inputRow: {
    marginBottom: theme.spacing(0.5),
    flexWrap: "nowrap",
  },
  text12: {
    fontSize: 12,
  },
  block: {
    width: 90,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: theme.spacing(0, 0.5, 0, 0),
  },
  fullWidth: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: theme.spacing(0, 0.5, 0, 0),
  },
}));

const FormContent = () => {
  const classes = useStyles();
  const { state } = usePatientContext();
  const { data } = state.forms;

  return (
    <>
      {
        data.map((item) => (
          <Grid key={item.form_id} container className={classes.inputRow}>
            <Typography
              component="span"
              className={`${classes.text12} ${classes.block}`}
              color="textPrimary"
            >
              {moment(item.created).format("MMM D YYYY")}
            </Typography>
            {
              !!item.title && item.title.length > 40
                ? (
                  <Tooltip title={item.title}>
                    <Typography
                      component="span"
                      className={`${classes.text12} ${classes.fullWidth}`}
                      color="textPrimary"
                    >
                      {item.title}
                    </Typography>
                  </Tooltip>
                )
                : (
                  <Typography
                    component="span"
                    className={`${classes.text12} ${classes.fullWidth}`}
                    color="textPrimary"
                  >
                    {item.title}
                  </Typography>
                )
            }
          </Grid>
        ))
      }
    </>
  );
};

export default FormContent;
