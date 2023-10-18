import React, { useEffect, useState } from "react";

import { Grid, Typography, Popover } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

import usePatientContext from "../../../../hooks/usePatientContext";
import PatientService from "../../../../services/patient.service";
import {
  calculateAge,
  dateDiffInDays,
  dateDiffInMonths,
  dateDiffInYears,
  dateDiffInHours,
} from "../../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  inputRow: {
    marginBottom: theme.spacing(0.5),
    flexWrap: "wrap",
  },
  text12: {
    fontSize: 12,
    fontWeight: 600,
    marginRight: theme.spacing(1 / 2),
    whiteSpace: "wrap",
  },
  value: {
    fontWeight: "normal",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  paper: {
    padding: theme.spacing(1),
    maxWidth: 400,
    wordWrap: "break-word",
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 13,
  },
  popover: {
    pointerEvents: "none",
  },
}));

const BasicInfoContent = () => {
  const classes = useStyles();
  const { state } = usePatientContext();
  const { data } = state.patientInfo;
  const { patientId } = state;
  const [nextAppointment, setNextAppointment] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const fetchNextAppointment = () => {
      PatientService.getNextAppointment(patientId).then((res) => {
        setNextAppointment(
          res.data && res.data.length ? res.data[0].start_dt : "",
        );
      });
    };
    fetchNextAppointment();
  }, [patientId]);


  const calculateDateDifference = () => {
    const d1 = new Date();
    const d2 = new Date(nextAppointment);
    const hoursDiff = dateDiffInHours(d1, d2);
    const daysDiff = dateDiffInDays(d1, d2);
    const monthsDiff = dateDiffInMonths(d1, d2);
    const yearsDiff = dateDiffInYears(d1, d2);


    if (yearsDiff > 0) {
      return yearsDiff > 1 ? `${yearsDiff} years` : `${yearsDiff} year`;
    } if (monthsDiff > 0) {
      return monthsDiff > 1 ? `${monthsDiff} months` : `${monthsDiff} month`;
    }

    return daysDiff > 0 ? `${daysDiff} days` : `${hoursDiff} hours`;
  };

  const mapGender = (value) => {
    let genderString = "";
    if (value === "M") {
      genderString = "Male";
    } else if (value === "F") {
      genderString = "Female";
    }
    return genderString;
  };

  const isEllipsisActive = (event) => {
    const e = event.target;
    if (e.scrollWidth > e.clientWidth) {
      setAnchorEl(e);
      setShowTooltip(true);
    }
  };

  const handleClose = () => {
    if (showTooltip) {
      setShowTooltip(false);
      setAnchorEl(null);
    }
  };

  return (
    <>
      <Popover
        id="tooltip"
        open={showTooltip}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        classes={{
          paper: classes.paper,
        }}
        className={classes.popover}
        disableRestoreFocus
      >
        {!!showTooltip && <Typography>{anchorEl.innerText}</Typography>}
      </Popover>
      <Grid container className={classes.inputRow}>
        <Typography
          variant="body1"
          className={classes.text12}
          color="textPrimary"
        >
          Name:
        </Typography>
        <Typography
          variant="body1"
          className={`${classes.text12} ${classes.value}`}
          color="textPrimary"
          onMouseOver={(e) => isEllipsisActive(e)}
          onMouseOut={() => handleClose()}
          onFocus={() => { }} // for onMouseOver
          onBlur={() => { }} // for onMouseOut
        >
          {data.firstname}
          {" "}
          {data.lastname}
        </Typography>
      </Grid>

      <Grid container className={classes.inputRow}>
        <Typography
          variant="body1"
          className={classes.text12}
          color="textPrimary"
        >
          Gender:
        </Typography>
        <Typography
          variant="body1"
          className={`${classes.text12} ${classes.value}`}
          color="textPrimary"
          onMouseOver={(e) => isEllipsisActive(e)}
          onMouseOut={() => handleClose()}
          onFocus={() => { }} // for onMouseOver
          onBlur={() => { }} // for onMouseOut
        >
          {mapGender(data.gender)}
        </Typography>
      </Grid>

      <Grid container className={classes.inputRow}>
        <Typography
          variant="body1"
          className={classes.text12}
          color="textPrimary"
        >
          DOB:
        </Typography>
        <Typography
          variant="body1"
          className={`${classes.text12} ${classes.value}`}
          color="textPrimary"
          onMouseOver={(e) => isEllipsisActive(e)}
          onMouseOut={() => handleClose()}
          onFocus={() => { }} // for onMouseOver
          onBlur={() => { }} // for onMouseOut
        >
          {`${moment(data.dob ? data.dob : {}).format("MMM D YYYY")} (Age: ${calculateAge(data.dob)})`}
        </Typography>
      </Grid>

      <Grid container className={classes.inputRow}>
        <Typography
          variant="body1"
          className={classes.text12}
          color="textPrimary"
        >
          Home:
        </Typography>
        <Typography
          variant="body1"
          className={`${classes.text12} ${classes.value}`}
          color="textPrimary"
          onMouseOver={(e) => isEllipsisActive(e)}
          onMouseOut={() => handleClose()}
          onFocus={() => { }} // for onMouseOver
          onBlur={() => { }} // for onMouseOut
        >
          {data.phone_home}
        </Typography>
      </Grid>

      <Grid container className={classes.inputRow}>
        <Typography
          variant="body1"
          className={classes.text12}
          color="textPrimary"
        >
          Mobile:
        </Typography>
        <Typography
          variant="body1"
          className={`${classes.text12} ${classes.value}`}
          color="textPrimary"
          onMouseOver={(e) => isEllipsisActive(e)}
          onMouseOut={() => handleClose()}
          onFocus={() => { }} // for onMouseOver
          onBlur={() => { }} // for onMouseOut
        >
          {data.phone_cell}
        </Typography>
      </Grid>

      <Grid container className={classes.inputRow}>
        <Typography
          variant="body1"
          className={classes.text12}
          color="textPrimary"
        >
          Provider:
        </Typography>
        <Typography
          variant="body1"
          className={`${classes.text12} ${classes.value}`}
          color="textPrimary"
          onMouseOver={(e) => isEllipsisActive(e)}
          onMouseOut={() => handleClose()}
          onFocus={() => { }} // for onMouseOver
          onBlur={() => { }} // for onMouseOut
        >
          {data.provider}
        </Typography>
      </Grid>

      <Grid container className={classes.inputRow}>
        <Typography
          variant="body1"
          className={classes.text12}
          color="textPrimary"
        >
          Next Appointment:
        </Typography>
        <Typography
          variant="body1"
          className={`${classes.text12} ${classes.value}`}
          color="textPrimary"
          onMouseOver={(e) => isEllipsisActive(e)}
          onMouseOut={() => handleClose()}
          onFocus={() => { }} // for onMouseOver
          onBlur={() => { }} // for onMouseOut
        >
          {nextAppointment
            ? moment(nextAppointment).format("MMM D YYYY")
            : ""}
          {" "}
          {!!nextAppointment && `(In ${calculateDateDifference()})`}
        </Typography>
      </Grid>
    </>
  );
};

export default BasicInfoContent;
