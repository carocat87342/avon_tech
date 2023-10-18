import React from "react";

import { Grid, Typography, Box } from "@material-ui/core";
import moment from "moment";
import PropTypes from "prop-types";

const HeadingDate = (props) => {
  const { heading } = props;
  return (
    <Box mt={2} mb={2}>
      <Grid
        container
        justify="space-between"
        alignItems="center"
      >
        <Grid item md={4}>
          <Typography variant="h3">{heading}</Typography>
        </Grid>
        <Grid item md={2}>
          <Typography>
            Date:
            {" "}
            {moment().format("MMM D YYYY")}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

HeadingDate.propTypes = {
  heading: PropTypes.string.isRequired,
};

export default HeadingDate;
