/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/prefer-stateless-function */
import React, { forwardRef } from "react";

import { Typography, makeStyles, Box } from "@material-ui/core";
import PropTypes from "prop-types";

import Footer from "./components/Footer";
import Header from "./components/Header";
import InformationTable from "./components/InformationTable";
import PatientInformation from "./components/PatientInformation";
import ProfileTestsComponent from "./components/ProfileTests";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 10, // theme.spacing(1.2, 0, 0, 0),
  },

  coverRoot: {
    minHeight: "92%",
  },

  mt5: {
    marginTop: 5, // theme.spacing(0.5, 0, 0, 0),
  },
  mt20: {
    marginTop: 20, // theme.spacing(2.5, 0, 0, 0),
  },
  footer: {
    marginTop: 20, // theme.spacing(2.5, 0, 0, 0),
  },
  importantTypo: {
    fontWeight: 1000,
  },
  profileTestsComponent: {
    marginTop: theme.spacing(1.9, 0, 0, 0),
  },
}));
const PdfTemplate = forwardRef((props, ref) => {
  const { testProfileInfo, profileTests } = props;
  const classes = useStyles();

  return (
    <Box className={classes.root} ref={ref}>
      <Box className={classes.coverRoot}>
        <Header />
        <Box className={classes.mt5}>
          <Typography component="p">
            National Clinical Account - Questions Please Call 866-226-8046
          </Typography>
        </Box>
        {/* client and patient information */}
        <PatientInformation testProfileInfo={testProfileInfo} />
        <Box className={classes.mt5}>
          <Typography variant="h5">SPECIMENS MUST BE TESTED IN A QLS LABORATORY</Typography>
        </Box>

        <Box className={classes.mt5}>
          <Typography variant="h5" className={classes.importantTypo}>
            IMPORTANT – Please forward specimens to Quest Diagnostics National Laboratory.
          </Typography>
        </Box>

        <InformationTable testProfileInfo={testProfileInfo} />

        <Box className={classes.mt20}>
          <Typography variant="h4">Profiles/Tests</Typography>
        </Box>
        <Box className={classes.profileTestsComponent}>
          <ProfileTestsComponent profileTests={profileTests} />
        </Box>
      </Box>

      <Footer />
    </Box>
  );
});

PdfTemplate.propTypes = {
  testProfileInfo: PropTypes.oneOfType([PropTypes.object]).isRequired,
  profileTests: PropTypes.instanceOf(Array).isRequired,
};

export default PdfTemplate;
