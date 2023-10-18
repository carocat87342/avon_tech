import React from "react";

import { Container, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: "1040px",
  },
  footerText: {
    fontSize: 17,
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Box mt={5} mb={5}>
        <Typography color="textSecondary" className={classes.footerText}>
          {`© ${process.env.REACT_APP_SITE_TITLE}`}

        </Typography>
      </Box>
    </Container>
  );
}
