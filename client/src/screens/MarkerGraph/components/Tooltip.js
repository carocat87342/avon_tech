import React from "react";

import { makeStyles } from "@material-ui/core";
import moment from "moment";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid #333",
    padding: theme.spacing(1),
    background: "#fff",
    borderRadius: "10px",
  },
}));

const CustomTooltip = ({ payload }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {payload && payload.length ? (
        <>
          <p>
            {`Date: ${moment(payload[0]?.payload?.lab_dt).format(
              "MMM D YYYY h:mm A",
            )}`}
          </p>
          <p>{`File: ${payload[0]?.payload?.filename}`}</p>
          <p>{`Value: ${payload[0]?.payload?.value}`}</p>
        </>
      ) : null}
    </div>
  );
};

CustomTooltip.propTypes = {
  payload: PropTypes.instanceOf(Array),
};

CustomTooltip.defaultProps = {
  payload: [],
};

export default CustomTooltip;
