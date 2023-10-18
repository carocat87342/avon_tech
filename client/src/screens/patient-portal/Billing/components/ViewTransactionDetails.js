import React from "react";

import {
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import PropTypes from "prop-types";

import Dialog from "../../../../components/Dialog";

const useStyles = makeStyles((theme) => ({
  inputRow: {
    margin: theme.spacing(3, 0),
  },
  formInput: {
    marginBottom: theme.spacing(2),
  },
  customLabel: {
    fontSize: 16,
    color: "#37474f",
  },
}));

const ViewTransactionDetails = (props) => {
  const classes = useStyles();
  const { isOpen, onClose, data } = props;

  return (
    <Dialog
      open={isOpen}
      title={" "}
      message={(
        <>
          <Grid container justify="space-between">
            <Typography variant="h3" color="textSecondary">
              View Transaction
            </Typography>
            <Button
              variant="outlined"
              onClick={() => onClose()}
            >
              Cancel
            </Button>
          </Grid>

          <Grid className={classes.inputRow}>
            <Grid
              container
              alignItems="center"
              className={classes.formInput}
            >
              <Grid item lg={2}>
                <Typography color="textSecondary">
                  Date
                </Typography>
              </Grid>
              <Grid item md={4}>
                <Typography component="div" variant="h5">
                  {moment(data.dt).format("MMM D YYYY")}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              alignItems="center"
              className={classes.formInput}
            >
              <Grid item lg={2}>
                <Typography color="textSecondary">
                  Type
                </Typography>
              </Grid>
              <Grid item md={4}>
                <Typography component="div" variant="h5">
                  {data.tran_type}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              alignItems="center"
              className={classes.formInput}
            >
              <Grid item lg={2}>
                <Typography color="textSecondary">
                  Amount
                </Typography>
              </Grid>
              <Grid item md={4}>
                <Typography component="div" variant="h5">
                  $
                  {data.amount}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              alignItems="center"
              className={classes.formInput}
            >
              <Grid item lg={2}>
                <Typography color="textSecondary">
                  Payment Type
                </Typography>
              </Grid>
              <Grid item md={4}>
                <Typography component="div" variant="h5">
                  {data.tran_type}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              alignItems="center"
              className={classes.formInput}
            >
              <Grid item lg={2}>
                <Typography color="textSecondary">
                  Account Number
                </Typography>
              </Grid>
              <Grid item md={4}>
                <Typography component="div" variant="h5">
                  {data.account_number || "-"}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              alignItems="center"
              className={classes.formInput}
            >
              <Grid item lg={2}>
                <Typography color="textSecondary">
                  Created
                </Typography>
              </Grid>
              <Grid item md={4}>
                <Typography component="div" variant="h5">
                  {moment(data.dt).format("MMM D YYYY")}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
      cancelForm={() => onClose()}
      hideActions
      size="md"
    />
  );
};

ViewTransactionDetails.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ViewTransactionDetails;
