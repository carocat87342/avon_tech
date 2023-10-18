import React, { useEffect, useState } from "react";

import { Grid, Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import Dialog from "../../../../../../components/Dialog";
import useAuth from "../../../../../../hooks/useAuth";
import AppointmentService from "../../../../../../services/appointmentType.service";
import { removeEmpty } from "../../../../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.primary.light,
    "& h2": {
      color: "#fff",
    },
  },
  formControl: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: theme.palette.text.secondary,
    "& .MuiSelect-select": {
      minWidth: 120,
    },
  },
  switchControl: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1.5),
    marginTop: theme.spacing(1.5),
    "& .MuiSelect-select": {
      minWidth: 120,
    },
  },
  formLabel: {
    fontSize: "14px",
    fontWeight: "600",
    width: "220px",
  },
  formHelperText: {
    fontSize: "12px",
    paddingLeft: "16px",
  },
  formField: {
    flex: 1,
  },
  modalAction: {
    marginTop: theme.spacing(2),
  },
  smallFormField: {
    maxWidth: "100px",
    flex: 1,
  },
  textArea: {
    marginTop: "16px",
  },
}));

const NewOrEditAppointment = ({
  isOpen, onClose, isNewAppointment, ...props
}) => {
  const classes = useStyles();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { savedAppointments } = props;
  const [appointment, setAppointment] = useState([]);
  const [errors, setErrors] = useState([]);
  const [typeError, setTypeError] = useState(false);
  const rowsMaxForTextArea = 50;

  useEffect(() => {
    const appt = {
      ...props.appointment,
      length: props.appointment.length || 30,
      sort_order: 1,
      allow_patients_schedule: true,
      active: true,
      note: props.appointment.note || "",
    };
    setAppointment(appt);
    // eslint-disable-next-line react/destructuring-assignment
  }, [props.appointment]);

  const createNewAppointment = (data) => {
    AppointmentService.create(data).then(
      (response) => {
        enqueueSnackbar(`${response.data.message}`, {
          variant: "success",
        });
        onClose();
      },
      (error) => {
        setErrors(error.response.data.message);
      },
    );
  };

  const checkIfDuplicateType = (state = "new") => {
    if (state === "new") {
      return savedAppointments
        ?.map((x) => appointment.appointment_type === x.appointment_type)
        ?.includes(true);
    }
    return savedAppointments
      ?.filter((x) => x.id !== appointment.id)
      ?.map((x) => appointment.appointment_type === x.appointment_type)
      ?.includes(true);
  };

  const handleFormSubmission = () => {
    // intializing the form data with selected appointment_type info
    const formedData = {
      data: removeEmpty({
        appointment_type: appointment.appointment_type,
        descr: appointment.descr,
        length: appointment.length,
        fee: appointment.fee,
        sort_order: appointment.sort_order,
        allow_patients_schedule: appointment.allow_patients_schedule ? 1 : 0,
        note: appointment.note,
        active: appointment.active ? 1 : 0,
        created_user_id: user.id,
        client_id: user.client_id,
      }),
    };

    if (isNewAppointment) {
      if (checkIfDuplicateType("new")) {
        setTypeError(true);
      } else {
        createNewAppointment(formedData);
      }
    } else if (checkIfDuplicateType("update")) {
      setTypeError(true);
    } else {
      delete formedData.data.created_user_id;

      AppointmentService.update(formedData, props.appointment.id).then((response) => {
        enqueueSnackbar(`${response.data.message}`, {
          variant: "success",
        });
        onClose();
      });
    }
  };

  const handleOnChange = (event) => {
    setAppointment({
      ...appointment,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Dialog
      size="sm"
      open={isOpen}
      cancelForm={onClose}
      title={isNewAppointment ? "New Appointment Type" : "Edit Appointment Type"}
      message={(
        <>
          <Grid>
            {errors
              && errors.map((error, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Alert severity="error" key={index}>
                  {error.msg}
                </Alert>
              ))}
            <FormControl component="div" className={classes.formControl}>
              <TextField
                autoFocus
                className={classes.largeFormField}
                variant="outlined"
                label="Appointment Type"
                // margin="normal"
                fullWidth
                name="appointment_type"
                id="appointment_type"
                autoComplete="appointment_type"
                onChange={(event) => handleOnChange(event)}
                value={appointment.appointment_type}
                size="small"
                error={typeError}
                helperText={typeError ? "You entered a duplicate type" : ""}
              />
            </FormControl>
            <FormControl component="div" className={`${classes.formControl} ${classes.textArea}`}>
              <TextField
                fullWidth
                variant="outlined"
                label="Description"
                multiline
                name="descr"
                rows={8}
                rowsMax={rowsMaxForTextArea}
                value={appointment.descr}
                onChange={(event) => handleOnChange(event)}
              />
            </FormControl>
            <FormControl component="div" className={classes.formControl}>
              <TextField
                className={classes.smallFormField}
                variant="outlined"
                label="Minutes"
                margin="normal"
                name="length"
                id="length"
                type="number"
                autoComplete="length"
                onChange={(event) => handleOnChange(event)}
                value={appointment.length}
                size="small"
              />
              <p className={classes.formHelperText}>Number of minutes for the appointment</p>
            </FormControl>
            <FormControl component="div" className={classes.formControl}>
              <TextField
                className={classes.smallFormField}
                variant="outlined"
                label="Fee"
                margin="normal"
                name="fee"
                id="fee"
                type="number"
                autoComplete="fee"
                onChange={(event) => handleOnChange(event)}
                value={appointment.fee}
                size="small"
              />
              <p className={classes.formHelperText}>The fee for the appointment</p>
            </FormControl>
            <FormControl component="div" className={classes.formControl}>
              <TextField
                className={classes.smallFormField}
                variant="outlined"
                label="Sort Order"
                margin="normal"
                name="sort_order"
                id="sort_order"
                autoComplete="sort_order"
                onChange={(event) => handleOnChange(event)}
                value={appointment.sort_order}
                size="small"
                type="number"
              />
              <p className={classes.formHelperText}>The order in which this is shown</p>
            </FormControl>
            <FormControl component="div" className={classes.switchControl}>
              <Switch
                size="small"
                checked={appointment.allow_patients_schedule}
                onChange={(event) => setAppointment({
                  ...appointment,
                  [event.target.name]: !appointment.allow_patients_schedule,
                })}
                name="allow_patients_schedule"
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              <p className={classes.formHelperText}>Allow patient to select this in the patient portal</p>
            </FormControl>
            <FormControl component="div" className={classes.switchControl}>
              <Switch
                size="small"
                checked={appointment.active}
                onChange={(event) => setAppointment({
                  ...appointment,
                  [event.target.name]: !appointment.active,
                })}
                name="active"
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              <p className={classes.formHelperText}>Status can be active or inactive</p>
            </FormControl>
            <FormControl component="div" className={`${classes.formControl} ${classes.textArea}`}>
              <TextField
                fullWidth
                variant="outlined"
                label="Note"
                multiline
                name="note"
                rows={4}
                rowsMax={rowsMaxForTextArea}
                value={appointment.note}
                onChange={(event) => handleOnChange(event)}
              />
            </FormControl>
          </Grid>
          <Grid className={classes.modalAction}>
            <Button variant="outlined" onClick={() => handleFormSubmission()}>
              {isNewAppointment ? "Save" : "Update"}
            </Button>
          </Grid>
        </>
      )}
    />
  );
};

NewOrEditAppointment.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isNewAppointment: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  appointment: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      id: PropTypes.number,
      appointment_type: PropTypes.string,
      length: PropTypes.number,
      sort_order: PropTypes.number,
      allow_patients_schedule: PropTypes.number,
      note: PropTypes.string,
    }),
  ]).isRequired,
  savedAppointments: PropTypes.arrayOf(
    PropTypes.shape({
      appointment_type: PropTypes.string,
    }),
  ).isRequired,
};

export default NewOrEditAppointment;
