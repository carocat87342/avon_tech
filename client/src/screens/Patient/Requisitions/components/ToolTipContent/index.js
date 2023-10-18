import React from "react";

import { Box, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import { dateFormat, calculateDateDifference } from "../../../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "600",
    marginBottom: theme.spacing(1.5),
  },
}));

const currentDate = new Date();

const ToolTipContent = (props) => {
  const classes = useStyles();
  const { data } = props;
  const {
    marker_name, created, dt, lab_completed_dt, lab_sample_received_dt, lab_order_received_dt, specialty_lab,
  } = data;

  const createdDaysDiff = created && calculateDateDifference(new Date(created), currentDate);
  const paymentDaysDiff = dt && calculateDateDifference(new Date(dt), currentDate);
  // eslint-disable-next-line max-len
  const completedDaysDiff = lab_completed_dt && calculateDateDifference(new Date(lab_completed_dt), currentDate);
  // eslint-disable-next-line max-len
  const labReceiptDaysDiff = lab_sample_received_dt && calculateDateDifference(new Date(lab_sample_received_dt), currentDate);
  // eslint-disable-next-line max-len
  const labOrderReceivedDateDiff = lab_order_received_dt && calculateDateDifference(new Date(lab_order_received_dt), currentDate);
  const constText = "ago";

  return (
    <>
      <Typography className={classes.title}>
        {marker_name}
      </Typography>
      <Box minWidth={425}>
        <Grid container>
          <Grid item xs>
            <Typography gutterBottom>
              Provider created:
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography gutterBottom>
              {created ? `${dateFormat(created)} (${createdDaysDiff} ${constText})` : ""}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs>
            <Typography gutterBottom>
              Patient payment:
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography gutterBottom>
              {dt ? `${dateFormat(dt)} (${paymentDaysDiff} ${constText})` : ""}
            </Typography>
          </Grid>
        </Grid>
        {Boolean(specialty_lab) && (
          <>
            <Grid container>
              <Grid item xs>
                <Typography gutterBottom>
                  Lab kit mailed to patient:
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography gutterBottom>
                  {lab_order_received_dt
                    ? `${dateFormat(lab_order_received_dt)} (${labOrderReceivedDateDiff} ${constText})` : ""}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs>
                <Typography gutterBottom>
                  Lab kit received from patient:
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography gutterBottom>
                  {lab_sample_received_dt
                    ? `${dateFormat(lab_sample_received_dt)} (${labReceiptDaysDiff} ${constText})` : ""}
                </Typography>
              </Grid>
            </Grid>
          </>
        )}
        <Grid container>
          <Grid item xs>
            <Typography gutterBottom>
              Lab completed test:
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography>
              {lab_completed_dt
                ? `${dateFormat(lab_completed_dt)} (${completedDaysDiff} ${constText})` : ""}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

ToolTipContent.propTypes = {
  data: PropTypes.shape({
    marker_name: PropTypes.string,
    created: PropTypes.string,
    dt: PropTypes.string,
    lab_completed_dt: PropTypes.string,
    lab_sample_received_dt: PropTypes.string,
    lab_order_received_dt: PropTypes.string,
    specialty_lab: PropTypes.oneOfType([
      PropTypes.number,
      () => null, // REF:: https://github.com/facebook/react/issues/3163#issuecomment-463656929
    ]),
  }).isRequired,
};

export default ToolTipContent;
