import React, { useEffect, useState } from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import Alert from "@material-ui/lab/Alert";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { mdiOpenInNew } from "@mdi/js";
import Icon from "@mdi/react";
import clsx from "clsx";
import moment from "moment";
import PropTypes from "prop-types";

import useAuth from "../../../../../../hooks/useAuth";
import useDebounce from "../../../../../../hooks/useDebounce";
import * as API from "../../../../../../utils/API";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    borderBottom: "1px solid #ddd",
    minHeight: 53,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    padding: theme.spacing(1),
  },
  CircularProgress: {
    textAlign: "center",
  },
  Button: {
    whiteSpace: "nowrap",
    maxHeight: "30px",
    marginTop: "15px",
    color: "#2979ff",
  },
  selfButton: {
    whiteSpace: "nowrap",
    maxHeight: "30px",
    marginLeft: theme.spacing(1),
    color: "#2979ff",
  },
  content: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontSize: "18px",
  },
  formControl: {
    width: "100%",
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(3 / 1),
    "& .MuiSelect-select": {
      minWidth: 220,
    },
  },
  patientFormControl: {
    zIndex: 9,
  },
  textFormControl: {
    width: "100%",
    color: theme.palette.text.secondary,
    "& .MuiSelect-select": {
      minWidth: 220,
    },
  },
  providerFormControl: {
    width: "100%",
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    "& .MuiSelect-select": {
      minWidth: 220,
    },
  },
  datePickers: {
    display: "flex",
    marginTop: theme.spacing(2),
  },
  timePickers: {
    display: "flex",
  },
  timePickersButtons: {
    display: "flex",
    justifyContent: "flex-start",
  },
  startdatePicker: {
    marginRight: theme.spacing(2),
    maxWidth: "260px",
    width: "260px",
  },
  startTimePicker: {
    marginRight: theme.spacing(1),
    "& button": {
      padding: "5px !important",
    },
  },
  lengthWrap: {
    textAlign: "left",
  },
  AddSubButtons: {
    marginRight: theme.spacing(0),
    maxWidth: "180px",
    display: "flex",
  },
  providerWrap: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  providerSelect: {
    flex: 1,
    "& div": {
      width: "100%",
    },
  },
  statuses: {
    marginTop: theme.spacing(2),
  },
  statusList: {
    flexDirection: "row",
  },
  textArea: {
    height: "100px !important",
    width: "100%",
    padding: "5px",
  },
  patientListCard: {
    position: "absolute",
    width: "100%",
    top: "54px",
  },
  contentWithLoading: {
    opacity: "0.5",
  },
  patientListContent: {
    padding: 0,
    "&:last-child": {
      padding: 0,
    },
  },
  setTo: {
    whiteSpace: "nowrap",
    marginBottom: "7px",
    marginLeft: "5px",
    fontSize: "15px",
    alignItems: "flex-end",
    display: "flex",
    fontWeight: "500",
    color: "#2979ff",
  },
  eventStatusInfo: {
    fontSize: "14px",
    marginTop: "5px",
  },
  patientWrapper: {
    display: "flex",
    alignItems: "flex-end",
  },
  patientIcon: {
    marginBottom: theme.spacing(1 / 2),
    marginLeft: theme.spacing(1),
    color: "rgba(0, 0, 0, 0.38)",
  },
  modalAction: {
    borderTop: `1px solid ${theme.palette.background.default}`,
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  patientLink: {
    cursor: "pointer",
    color: theme.palette.text.link,
  },
  appointmentLength: {
    maxWidth: "150px",
    margin: "5px 5px 0",
  },
  firstInput: {
    marginLeft: 0,
  },
}));

// helpers
function formatDateTime(date) {
  return date?.format("YYYY-MM-DDTHH:mm");
}

function formatCurrentDayLengthToApproximateDays(value) {
  if (value && value > 0) {
    return `In ${value} days`;
  }

  return `${Math.abs(value)} days ago`;
}
const EventModal = ({
  isOpen,
  onClose,
  selectedDate,
  selectedProvider,
  onEventUpdate,
  onSave,
  isNewEvent,
  isLoading,
  ...props
}) => {
  const { providers, errors } = props;
  const classes = useStyles();
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [patientSearchTerm, setPatientSearchTerm] = useState("");
  const [calEvent, setCalEvent] = useState("");
  const [appointmentLength, setAppointmentLeangth] = useState(" ");
  const [appointmentLengthDays, setAppointmentLengthDays] = useState(" ");
  const [currentDayLength, setCurrentDayLength] = useState(" ");
  const [errorText, setErrorText] = useState({
    eventTitle: "",
    patient: "",
    provider: "",
    error: "",
  });

  const [indexP, setIndex] = useState(0);
  const [provider, setProvider] = useState(providers[indexP]);
  const { user } = useAuth();

  const calculateLength = async () => {
    const length = await moment(calEvent.end_dt).diff(calEvent.start_dt, "minutes");
    const length2 = await moment(calEvent.end_dt).diff(calEvent.start_dt, "days");
    const lengthFromCurrentDay = await moment(calEvent.start_dt).diff(moment(), "days");
    setCurrentDayLength(lengthFromCurrentDay);
    setAppointmentLengthDays(length2);
    setAppointmentLeangth(length);
  };


  useEffect(() => {
    const selectedTime = user && user.calendar_start_time;
    let initialDateTime = selectedDate;

    if (selectedTime) {
      initialDateTime = `${selectedDate} ${selectedTime}`;
    }
    if (isNewEvent) {
      setCalEvent({
        ...calEvent,
        start_dt: formatDateTime(moment(initialDateTime)),
        end_dt: formatDateTime(moment(initialDateTime).add(30, "minutes")),
      });
      setPatientSearchTerm("");
    } else {
      setCalEvent({
        ...calEvent,
        start_dt: formatDateTime(moment(props?.event?.start)),
        end_dt: formatDateTime(moment(props?.event?.end)),
        eventTitle: props.event.eventTitle,
        status: props.event.status,
        notes: props.event.notes,
      });
      // setCalEvent(props.event);
      setSelectedPatient({
        email: props.event.email,
        firstname: props.event.firstname,
        id: props.event.patient_id,
        lastname: props.event.lastname,

      });

      if (props.event.firstname || props.event.lastname) {
        setPatientSearchTerm(`${props.event.firstname} ${props.event.lastname}`);
      }
    }
    setProvider(selectedProvider);
    // eslint-disable-next-line react-hooks/exhaustive-deps, react/destructuring-assignment
  }, [props.event, isNewEvent, selectedDate]);

  /* eslint-enable */
  const handleOnChange = (event) => {
    setCalEvent({
      ...calEvent,
      [event.target.name]: event.target.value,
    });

    if (event.target.name === "title") {
      setErrorText({
        ...errorText,
        eventTitle: "",
      });
    }
  };

  const debouncedSearchTerm = useDebounce(patientSearchTerm, 500);
  useEffect(() => {
    calculateLength(calEvent.end_dt);
    // eslint-disable-next-line
  }, [calEvent]);
  /* eslint-enable */

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        // Fire off our API call
        API.search(debouncedSearchTerm).then(
          (response) => {
            const { data } = response;
            setPatients(data);
          },
          (error) => {
            console.error("search error", error);
          },
        );
      } else {
        setPatients([]);
      }
    },
    // This is the useEffect input array
    // Our useEffect function will only execute if this value changes ...
    // ... and thanks to our hook it will only change if the original ...
    // value (searchTerm) hasn't changed for more than 500ms.
    [debouncedSearchTerm],
  );

  const handlePatientChange = (_, patient) => {
    const sp = patients.filter((p) => p.id === patient.id);
    setSelectedPatient(sp[0]);
    setPatientSearchTerm(`${patient.firstname} ${patient.lastname}`);
    setErrorText({
      ...errorText,
      patient: "",
    });
  };

  const handleProviderChange = (event) => {
    const pd = providers.filter((p) => p.id === event.target.value);
    setProvider(pd[0]);
  };

  const handleSetToSelf = () => {
    const loggedInUserAsProvider = providers.filter((p) => p.id === user.id);
    setProvider(loggedInUserAsProvider[0]);
  };

  const validateFormFields = () => {
    if (!calEvent.eventTitle || selectedPatient.length === 0) {
      if (!calEvent.eventTitle && selectedPatient.length === 0) {
        setErrorText({
          ...errorText,
          title: "Enter your title",
          patient: "Please select from here",
        });
      } else if (calEvent.eventTitle || !!selectedPatient) {
        setErrorText(
          (prevErrorText) => ({
            ...prevErrorText,
            title: "",
            patient: "",
          }),
        );
      }
    }
    if (provider === undefined) {
      setErrorText(
        (prevErrorText) => ({
          ...prevErrorText,
          provider: "Please select from here",
        }),
      );
    }
  };

  const handleSaveOrUpdate = () => {
    validateFormFields();
    const submitData = () => {
      if (isNewEvent) {
        const payload = {
          data: {
            title: calEvent.eventTitle,
            provider,
            patient: selectedPatient,
            ApptStatus: calEvent.status,
            notes: calEvent.notes,
            start_dt: calEvent.start_dt,
            end_dt: calEvent.end_dt,
          },
        };
        onSave(payload);
      } else {
        /* eslint-disable */
        const payload = {
          data: {
            id: props.event.id,
            title: calEvent.eventTitle,
            providerName: calEvent.provider_name,
            provider: provider,
            patient: selectedPatient
              ? selectedPatient
              : {
                id: props.event.patient_id,
                firstname: props.event.firstname,
                email: props.event.email,
              },
            ApptStatus: calEvent.status,
            notes: calEvent.notes,
            old_start_dt: moment(props.event.start_dt).format("YYYY-MM-DD HH:mm"),
            old_end_dt: moment(props.event.end_dt).format("YYYY-MM-DD HH:mm"),
            new_start_dt: moment(calEvent.start_dt).format("YYYY-MM-DD HH:mm"),
            new_end_dt: moment(calEvent.end_dt).format("YYYY-MM-DD HH:mm"),
          },
        };
        /* eslint-enable */
        onEventUpdate(payload);
      }
    };

    if (calEvent.eventTitle || (selectedPatient.length !== 0)) {
      submitData();
    }
  };

  useEffect(() => {
    const index2 = providers.findIndex((pd) => pd.id === user.id);
    setIndex(index2);
  }, [providers, user]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className={classes.title}>
        {isNewEvent ? `New Appointment` : "Edit Appointment"}
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.content}>
        {isLoading && (
          <div className={classes.CircularProgress}>
            <CircularProgress />
          </div>
        )}
        <div
          className={clsx({
            [classes.modalConentBelow]: true, // always apply
            [classes.contentWithLoading]: isLoading, // only when isLoading === true
          })}
        >
          {errors && <Alert severity="error">{errors}</Alert>}
          <div className={classes.root}>
            <FormControl component="div" className={classes.formControl}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={6} className={classes.timePickers}>
                  <KeyboardDateTimePicker
                    variant="inline"
                    ampm={false}
                    clearable
                    label="Start Time"
                    value={calEvent.start_dt}
                    className={classes.startdatePicker}
                    onChange={(date) => {
                      const property = "start_dt";
                      setCalEvent({
                        ...calEvent,
                        end_dt: formatDateTime(moment(date).add(30, "minutes")),
                        [property]: date,
                      });
                      calculateLength(date);
                    }}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    format="EE MMMM dd yyyy h:mm a"
                  />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.timePickersButtons}>
                  <Button
                    className={classes.Button}
                    variant="contained"
                    disableElevation
                    onClick={async () => {
                      await setCalEvent({
                        ...calEvent,
                        start_dt: formatDateTime(moment(calEvent.start_dt).add(1, "days")),
                        end_dt: formatDateTime(moment(calEvent.end_dt).add(1, "days")),
                      });
                    }}
                  >
                    Add day
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.Button}
                    disableElevation
                    onClick={async () => {
                      await setCalEvent({
                        ...calEvent,
                        start_dt: formatDateTime(moment(calEvent.start_dt).subtract(1, "days")),
                        end_dt: formatDateTime(moment(calEvent.end_dt).subtract(1, "days")),
                      });
                    }}
                  >
                    Subtract Day
                  </Button>
                </Grid>

              </Grid>
            </FormControl>
            <FormControl component="div" className={classes.formControl}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={6} className={classes.timePickers}>
                  <KeyboardDateTimePicker
                    variant="inline"
                    ampm={false}
                    clearable
                    label="End Time"
                    value={calEvent.end_dt}
                    className={classes.startdatePicker}
                    onChange={(date) => {
                      const property = "end_dt";
                      setCalEvent({
                        ...calEvent,
                        [property]: date,
                      });
                      calculateLength(date);
                    }}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    format="EE MMMM dd yyyy h:mm a"
                  />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.timePickersButtons}>
                  <Button
                    className={classes.Button}
                    disableElevation
                    onClick={async () => {
                      await setCalEvent({
                        ...calEvent,
                        end_dt: formatDateTime(moment(calEvent.start_dt).add(15, "minutes")),
                      });
                    }}
                  >
                    15 min
                  </Button>
                  <Button
                    className={classes.Button}
                    disableElevation
                    onClick={async () => {
                      await setCalEvent({
                        ...calEvent,
                        end_dt: formatDateTime(moment(calEvent.start_dt).add(30, "minutes")),
                      });
                    }}
                  >
                    30 min
                  </Button>
                  <Button
                    className={classes.Button}
                    disableElevation
                    onClick={async () => {
                      await setCalEvent({
                        ...calEvent,
                        end_dt: formatDateTime(moment(calEvent.start_dt).add(45, "minutes")),
                      });
                    }}
                  >
                    45 min
                  </Button>
                  <Button
                    className={classes.Button}
                    disableElevation
                    onClick={async () => {
                      await setCalEvent({
                        ...calEvent,
                        end_dt: formatDateTime(moment(calEvent.start_dt).add(60, "minutes")),
                      });
                    }}
                  >
                    60 min
                  </Button>
                </Grid>
              </Grid>
            </FormControl>
            <div className={classes.lengthWrap}>
              <TextField
                value={appointmentLengthDays}
                variant="outlined"
                margin="dense"
                className={`${classes.appointmentLength} ${classes.firstInput}`}
                size="small"
                id="appointmentLengthDays"
                label="Length days"
                name="appointmentLength"
                autoComplete="appointmentLength"
                onChange={(event) => handleOnChange(event)}
                disabled
                defaultValue={`${appointmentLengthDays === 0 ? "Same day" : `${appointmentLength} day`}`}
              />
              <TextField
                value={appointmentLength}
                variant="outlined"
                margin="dense"
                className={classes.appointmentLength}
                size="small"
                id="appointmentLength"
                label="Length minutes"
                name="appointmentLength"
                autoComplete="appointmentLength"
                onChange={(event) => handleOnChange(event)}
                disabled
              />
              <TextField
                value={formatCurrentDayLengthToApproximateDays(currentDayLength)}
                variant="outlined"
                margin="dense"
                className={classes.appointmentLength}
                size="small"
                id="currentDayLength"
                label="In days"
                name="appointmentLength"
                autoComplete="appointmentLength"
                onChange={(event) => handleOnChange(event)}
                disabled
                defaultValue={`${currentDayLength === 0 ? "Today" : `In ${appointmentLength} days`}`}
              />
            </div>
            <FormControl className={classes.statuses}>
              <FormLabel component="legend">Status</FormLabel>
              <RadioGroup
                aria-label="status"
                name="status"
                value={
                  calEvent.status
                    ? calEvent.status
                    : setCalEvent({
                      ...calEvent,
                      status: "A",
                    })
                }
                onChange={(event) => handleOnChange(event)}
                className={classes.statusList}
              >
                <FormControlLabel value="R" control={<Radio />} label="Requested" />
                <FormControlLabel value="A" control={<Radio />} label="Approved" />
                <FormControlLabel value="D" control={<Radio />} label="Declined" />
              </RadioGroup>
            </FormControl>
            <FormControl
              component="div"
              className={`${classes.textFormControl} ${classes.patientFormControl}`}
            >
              <div className={classes.patientWrapper}>
                <TextField
                  value={patientSearchTerm}
                  variant="outlined"
                  margin="normal"
                  size="small"
                  required
                  fullWidth
                  id="patient"
                  label="Patient"
                  name="patient"
                  autoComplete="patient"
                  onChange={(event) => setPatientSearchTerm(event.target.value)}
                  error={errorText.patient.length > 0}
                  helperText={errorText.patient.length > 0 && errorText.patient}
                />
                {selectedPatient
                  && (
                    <Link
                      href={`patients/${selectedPatient.id}`}
                      className={classes.patientIcon}
                      target="_blank"
                    >
                      <Icon
                        path={mdiOpenInNew}
                        size={1}
                        horizontal
                        vertical
                        rotate={180}
                      />
                    </Link>
                  )}

              </div>
              {patients.length > 0 && (
                <Card className={classes.patientListCard}>
                  <CardContent className={classes.patientListContent}>
                    <List component="nav" aria-label="secondary mailbox folder">
                      {patients.map((patient) => (
                        <ListItem
                          button
                          onClick={(event) => handlePatientChange(event, patient)}
                          key={patient.id}
                        >
                          <ListItemText primary={`${patient.firstname} ${patient.lastname}`} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              )}
            </FormControl>
            <FormControl component="div" className={classes.formControl}>
              <TextField
                value={calEvent.eventTitle}
                variant="outlined"
                margin="normal"
                size="small"
                required
                fullWidth
                id="title"
                label="Title"
                name="eventTitle"
                autoComplete="title"
                autoFocus
                onChange={(event) => handleOnChange(event)}
                error={errorText.eventTitle.length > 0}
                helperText={errorText.eventTitle.length > 0 && errorText.eventTitle}
              />
            </FormControl>
            <FormControl
              variant="outlined"
              size="small"
              className={classes.providerFormControl}
              error={errorText.provider.length > 0}
            >
              <div className={classes.providerWrap}>
                <div className={classes.providerSelect}>
                  <InputLabel id="provider-select-outlined-label">Provider</InputLabel>
                  <Select
                    labelId="provider-select-outlined-label"
                    id="provider-select-outlined-label"
                    value={!!provider && provider.id}
                    onChange={handleProviderChange}
                    label="Provider"
                    defaultValue={selectedProvider?.id}
                  >
                    {providers.map((pd) => (
                      <MenuItem key={pd.id} value={pd.id}>
                        {pd.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errorText.provider.length > 0 && errorText.provider}</FormHelperText>
                </div>
                <Button
                  className={classes.selfButton}
                  disableElevation
                  onClick={() => handleSetToSelf()}
                >
                  Set to Self
                </Button>
              </div>
            </FormControl>
            <Typography component="p" variant="body2" color="textPrimary">
              Notes
            </Typography>
            <TextareaAutosize
              className={classes.textArea}
              aria-label="minimum hei ght"
              placeholder="Notes..."
              name="notes"
              value={calEvent.notes && calEvent.notes}
              onChange={(event) => handleOnChange(event)}
            />
          </div>
          {!isNewEvent
            && (
              <div className={classes.eventMeta}>
                {calEvent.status === "A" && (
                  <p className={classes.eventStatusInfo}>
                    {/* {`Approved: ${moment(calEvent.approved).format("ll")}, ${calEvent.approved_user}`}
                     Commented out David Feb 2021 */}
                  </p>
                )}
                {calEvent.status === "D" && (
                  <p className={classes.eventStatusInfo}>
                    {/* {`Rejected: ${moment(calEvent.declined).format("ll")}, ${calEvent.declined_user}`}
                     Commented out David Feb 2021 */}
                  </p>
                )}
              </div>
            )}
        </div>
      </DialogContent>
      <DialogActions className={classes.modalAction}>
        <div>
          <Button
            disabled={!calEvent}
            variant="outlined"
            color="primary"
            onClick={() => handleSaveOrUpdate()}
          >
            Save
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

EventModal.defaultProps = {
  appointments: "",
  event: "",
  errors: "",
};

EventModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  appointments: PropTypes.arrayOf(
    PropTypes.arrayOf({
      id: PropTypes.string,
      appointment_type: PropTypes.string,
      appointment_name_portal: PropTypes.string,
      length: PropTypes.string,
      allow_patients_schedule: PropTypes.bool,
      sort_order: PropTypes.number,
      note: PropTypes.string,
      created: PropTypes.string,
      created_user: PropTypes.string,
      updated: PropTypes.string,
      updated_user: PropTypes.string,
    }),
  ),
  selectedProvider: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  event: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
    eventTitle: PropTypes.string,
    status: PropTypes.string,
    notes: PropTypes.string,
    email: PropTypes.string,
    patient_id: PropTypes.number,
  }),
  providers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onEventUpdate: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  isNewEvent: PropTypes.bool.isRequired,
  errors: PropTypes.string,
};

export default EventModal;
