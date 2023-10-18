import React from "react";

import {
  makeStyles, Grid, Typography,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import PharmacyIcon from "@material-ui/icons/LocalHospitalOutlined";
import PhoneIcon from "@material-ui/icons/PhoneOutlined";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  pharmacyCard: {
    borderRadius: theme.spacing(1 / 2),
    padding: theme.spacing(1.5, 1, 1.5, 1),
    border: "1px solid #dddd",
  },
  ml1: {
    marginLeft: theme.spacing(1),
  },
  iconText: {
    marginBottom: "0.35em",
    "& svg": {
      fontSize: 18,
      marginRight: theme.spacing(1 / 2),
    },
  },
}));

const PharmacyCard = (props) => {
  const classes = useStyles();
  const {
    name, address, city, state, postal, phone,
  } = props;
  return (
    <Grid className={classes.pharmacyCard}>
      <Grid container alignItems="center" className={classes.iconText}>
        <PharmacyIcon />
        <Typography>{name}</Typography>
      </Grid>
      <Grid container alignItems="center" className={classes.iconText}>
        <HomeIcon />
        <Typography>{address}</Typography>
      </Grid>
      <Typography gutterBottom>
        {`${city} ${state} ${postal}`}
      </Typography>
      {phone && (
        <Grid container alignItems="center" className={classes.iconText}>
          <PhoneIcon />
          <Typography>
            Phone
            <span className={classes.ml1}>{phone}</span>
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

PharmacyCard.defaultProps = {
  name: "",
  city: "",
  state: "",
  postal: "",
  address: "",
  phone: "",
};

PharmacyCard.propTypes = {
  name: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  postal: PropTypes.string,
  address: PropTypes.string,
  phone: PropTypes.string,
};

export default PharmacyCard;
