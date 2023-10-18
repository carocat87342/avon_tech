import React from "react";

import {
  Typography, Divider, makeStyles, Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(2, 0),
  },
  ml1: {
    marginLeft: theme.spacing(1),
  },
  label: {
    fontWeight: 600,
  },
  text: {
    fontSize: 14,
  },
}));

const SearchResults = (props) => {
  const { data } = props;
  const classes = useStyles();

  return (
    data.map((item, index) => (
      <Grid key={`${item.dt}_${item.Encounter}`}>
        <Typography variant="h5" gutterBottom className={classes.label}>{item.Encounter}</Typography>
        <Typography variant="body1" gutterBottom>
          <span className={classes.label}>
            Encounter:
          </span>
          <span className={`${classes.ml1} ${classes.text}`}>
            {item.Encounter}
          </span>
        </Typography>
        <Typography variant="body1" gutterBottom>
          <span className={classes.label}>
            Date:
          </span>
          <span className={`${classes.ml1} ${classes.text}`}>
            {item.dt}
          </span>
        </Typography>
        <Typography variant="body1" gutterBottom>
          <span className={classes.label}>
            Notes:
          </span>
          <span className={`${classes.ml1} ${classes.text}`}>
            {item.notes}
          </span>
        </Typography>
        {
          index + 1 !== data.length
            ? <Divider className={classes.divider} />
            : null
        }
      </Grid>
    ))
  );
};

export default SearchResults;
