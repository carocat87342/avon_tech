import React, { useState, useEffect, useCallback } from "react";

import {
  makeStyles, Grid, TextField, Typography, MenuItem, Button, Box, Collapse,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import moment from "moment-timezone";
import { useSnackbar } from "notistack";
import { useHistory, useLocation } from "react-router-dom";
import TimezoneSelect from "react-timezone-select";

import useAuth from "../../../hooks/useAuth";
import useDidMountEffect from "../../../hooks/useDidMountEffect";
import PatientPortalService from "../../../services/patient_portal/patient-portal.service";
import {
  getDatesArray, capitalize, dayDateFormat, calculate_time_slot,
} from "../../../utils/helpers";
import Calendar from "./Calendar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  title: {
    paddingBottom: theme.spacing(0.5),
  },
  subTitle: {
    paddingBottom: theme.spacing(1),
    fontSize: "14px",
  },
  inputFix: {
    marginBottom: theme.spacing(1),
    width: 400,
  },
  submitBtn: {
    minWidth: 120,
    background: "#008B00",
    minHeight: 50,
  },
  calendarContainer: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
    borderRadius: 5,
    boxShadow: "-1px 0px 19px -4px rgba(0,17,1,0.45)",
    margin: "0",
  },
  timeZoneWrapper: {
    marginTop: theme.spacing(2),
  },
  timingBox: {
    marginBottom: theme.spacing(2),
    minHeight: 50,

    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(1),
      minHeight: 40,
    },
  },
  currentDate: {
    minHeight: theme.spacing(8),
  },
  ml1: {
    marginLeft: theme.spacing(1),
  },
  noWrap: {
    [theme.breakpoints.up("md")]: {
      whiteSpace: "nowrap",
    },
  },
  centerContainer: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  errorIcon: {
    position: "relative",
    top: 5,
  },
  messageBox: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    backgroundColor: "rgb(232, 243, 252)",
    padding: "6px 16px",
    fontSize: 14,
    lineHeight: 21,
    borderRadius: 4,
    minHeight: 50,

    "& p": {
      color: "rgb(12, 54, 91)",
    },
  },
}));

const currentDate = moment().format("YYYY-MM-DD");
const tomorrowDate = moment().add(1, "days").format("YYYY-MM-DD");
const oneYear = moment().add(365, "days").format("YYYY-MM-DD");

const Appointments = () => {
  // const userTimeZone = moment.tz.guess(); // like: "America/New_York"
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const { user } = useAuth();
  const [userTimeZone, setUserTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [errorMessage, setErrorMessage] = useState("");
  const [practitioners, setPractitioners] = useState([]);
  const [practitionerDateTimes, setPractitionerDateTimes] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [filteredTimeSlots, setFilteredTimeSlots] = useState([]);
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [appointmentTypes, setAppointmentTypes] = useState([]);
  const [appointmentLength, setAppointmentLength] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [userSelection, setUserSelection] = useState({
    practitioner: "",
    appointmentType: "",
    date: null,
    time: null,
  });
  const [isRescheduleAppointment, setIsRescheduleAppointment] = useState(false);
  const location = useLocation();
  const isReschedule = location?.state?.appointment;

  const alterPractitionerDatesWithTimeZone = (data) => data.reduce((acc, item) => {
      /* eslint-disable */
      item.start_date_time = moment.tz(moment(item.start_date_time).format('YYYY-MM-DD HH:mm:ss'), item.log_tz).format();
      item.end_date_time = moment.tz(moment(item.end_date_time).format('YYYY-MM-DD HH:mm:ss'), item.log_tz).format();
       /* eslint-disable */
      const tempData = [...acc, item]
      return tempData;
    }, [])

  const fetchPractitionersAvailableDates = useCallback((practitionerId) => {
    PatientPortalService.getPractitionerDates().then((res) => {
      const resData = res?.data && alterPractitionerDatesWithTimeZone(res.data);
      const filtered = resData.filter((x) => x.user_id === practitionerId);
      setPractitionerDateTimes([...filtered]);
    });
  }, []);

  const fetchAppointmentTypesByPractitioner = useCallback((practitionerId) => {
    const reqBody = {
      data: {
        practitioner_id: practitionerId,
      },
    };
    PatientPortalService.getAppointmentTypesByPractitionerId(reqBody).then((res) => {
      setAppointmentTypes(res.data);
    });
  }, []);

  const userSelectionHandler = (type, value) => {
    setUserSelection({
      ...userSelection,
      [type]: value,
    });
  };

  const fetchPractitioners = useCallback(() => {
    PatientPortalService.getPractitioners().then((res) => {
      const doctors = res.data;
      setPractitioners(doctors);
      if (doctors.length && !isReschedule) {
        const practitionerId = 1; // select first user page loads
        const type = "practitioner";
        setUserSelection({
          ...userSelection,
          [type]: practitionerId,
        });
        fetchAppointmentTypesByPractitioner(practitionerId);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBookedAppointments = useCallback((practitionerId) => {
    const params = {
      practitioner_id: practitionerId,
    };
    PatientPortalService.getBookedAppointments(null, params).then((res) => {
      const response = res.data;
      if (response.length) {
        const appts = response.map((booking) => ({
          start_time: moment(booking.start_dt).format("HH:mm"),
          end_time: moment(booking.end_dt).format("HH:mm"),
          ...booking,
        }));
        setBookedAppointments(appts);
      }
    });
  }, []);

  useEffect(() => {
    const appointment = location?.state?.appointment;
    if (appointment?.patient_id) {
      const date = moment(appointment.start_dt).format("YYYY-MM-DD");
      // const minutesFromStartDate = moment(appointment.start_dt).minutes();
      const startTime = moment(appointment.start_dt).format("HH:mm");
      const endTime = moment(appointment.end_dt).format("HH:mm");
      const time = {
        timeStart: startTime,
        timeEnd: endTime,
      };
      setUserSelection((prevUserSelection) => ({
        ...prevUserSelection,
        ...appointment,
        appointmentType: appointment.appointment_type_id,
        date,
        time,
        practitioner: appointment?.user_id,
      }));
      setIsRescheduleAppointment(true);
      setShowCalendar(true);
      fetchPractitionersAvailableDates(appointment?.user_id);
      fetchAppointmentTypesByPractitioner(appointment?.user_id);
      setAppointmentLength(appointment?.appointment_type_length);
    }
  }, [location?.state, fetchPractitionersAvailableDates, fetchAppointmentTypesByPractitioner]);

  useEffect(() => {
    fetchPractitioners();
  }, [fetchPractitioners]);

  useDidMountEffect(() => {
    const practitionerId = userSelection.practitioner;
    if (practitionerId && !isReschedule) {
      fetchBookedAppointments(practitionerId);
      fetchPractitionersAvailableDates(practitionerId);
    }
  }, [userSelection.practitioner]);

  const setCalendarTime = (selectedTime) => {
    const time = "time";
    setUserSelection((prevUserSelection) => ({
      ...prevUserSelection,
      [time]: selectedTime,
    }));
  };

  const setCalendarDate = (selectedDate) => {
    const date = "date";
    setUserSelection((prevUserSelection) => ({
      ...prevUserSelection,
      [date]: selectedDate,
    }));
  };

  const calendarSelectionHandler = (date, timeIntervalSlots) => {
    let value;
    if (date?.event) { // event clicked
      value = moment(date.event._instance.range.start).format("YYYY-MM-DD");
    } else { // day clicked
      value = date;
      // eslint-disable-next-line max-len
      const doctorEndLimit = practitionerDateTimes[0]?.end_date_time ? moment(practitionerDateTimes[0].end_date_time).format("YYYY-MM-DD") : null;
      const lowerDaysDifference = moment(date).diff(currentDate, "days");
      const upperDaysDifference = moment(date).diff(doctorEndLimit || oneYear, "days");
      const isPastDate = lowerDaysDifference < 0;
      const isFutureUnAvailableDate = upperDaysDifference > 0;
      const isTodayDate = lowerDaysDifference === 0;
      if (isTodayDate || isPastDate || isFutureUnAvailableDate) { // past date or greater than date limit
        // eslint-disable-next-line max-len
        setErrorMessage(isPastDate ? "Can not select a past date." : isTodayDate ? `There are no open times on ${dayDateFormat(value)}.` : "There are no open times on this day.");
        setFilteredTimeSlots([]);
        setCalendarDate(value);
        setCalendarTime(null);
        return;
      }
    }

    setCalendarDate(value);
    setErrorMessage("");
    const selectedDay = moment(value, "YYYY-MM-DD HH:mm:ss").format("dddd");
    const isAvailable = practitionerDateTimes[0][selectedDay.toLowerCase()];
    if (isAvailable) {
      // filter time slots for selected date
      // eslint-disable-next-line max-len
      const selectedDates = bookedAppointments.filter((x) => moment(x.start_dt).format("YYYY-MM-DD") === value);
      const selectedTimes = selectedDates.map((time) => ({
        startTime: time.start_time,
        endTime: time.end_time,
      }));
      const timeSlotsArray = timeIntervalSlots || timeSlots;
      const timeSlotMap = timeSlotsArray.map((slot) => ({
        startTime: moment(slot.split("-")[0].trim(), ["HH.mm"]).format("HH:mm"),
        endTime: moment(slot.split("-")[1].trim(), ["HH.mm"]).format("HH:mm"),
      }));
      // eslint-disable-next-line max-len
      const filteredSlots = timeSlotMap.filter((ar) => !selectedTimes.find((rm) => (rm.startTime === ar.startTime || ar.endTime === rm.endTime)));
      // console.log({
      //   selectedDates, selectedTimes, filteredSlots
      // })
      setFilteredTimeSlots([...filteredSlots]);
      if (!filteredSlots.length) {
        setErrorMessage("There are no open times on this day.");
      }
    } else {
      setErrorMessage(`There are no open times on ${dayDateFormat(value)}.`);
      setFilteredTimeSlots([]);
      setCalendarTime(null);
    }
  };

  const appointmentBookingHandler = () => {
    const selectedPractitioner = practitioners.filter((x) => x.user_id === userSelection.practitioner);
    let selectedAppointemntTypeLength = userSelection?.appointment_type_length || 0;
    if (!selectedAppointemntTypeLength) {
      selectedAppointemntTypeLength = appointmentTypes
        ?.find((item) => item.id === userSelection.appointmentType)?.length;
    }

    if (!!userSelection.time && userSelection.date) {
      const reqBody = {
        data: {
          user_id: selectedPractitioner?.[0]?.user_id,
          // do something with app status because it's going to server each time.
          ...(!isRescheduleAppointment && { status: "R" }),
          start_dt: `${moment(userSelection.date).format("YYYY-MM-DD")} ${userSelection.time.timeStart}`,
          end_dt: `${moment(userSelection.date).format("YYYY-MM-DD")} ${userSelection.time.timeEnd}`,
          patient_id: user?.id,
          reschedule_id: location?.state?.appointment?.id || null,
          appointment_type_id: userSelection.appointmentType,
          // this handles the startDateTime and endDateTime required for timezone conversion
          // eslint-disable-next-line max-len
          //start_date_time: `${moment(userSelection.date).format("YYYY-MM-DD")} ${moment(userSelection.time.timeStart, ["HH.mm"]).format("h:mm:ss A")}`,
          // eslint-disable-next-line max-len
          //end_date_time: `${moment(userSelection.date).format("YYYY-MM-DD")} ${moment(userSelection.time.timeEnd, ["HH.mm"]).format("h:mm:ss A")}`,
        },
      };
      PatientPortalService[isRescheduleAppointment
        ? "updateAppointment"
        : "bookAppointment"](reqBody, userSelection?.id).then(() => {
        setTimeout(() => {
          setShowCalendar(false);
          setAppointmentTypes([]);
          setUserSelection({
            ...userSelection,
            practitioner: "",
            appointmentType: "",
            date: null,
            time: null,
          });
          history.push({
            pathname: "/patient/appointments/confirmation",
            state: {
              practitioner: selectedPractitioner?.[0]?.name,
              appointmentLength: selectedAppointemntTypeLength,
              date: userSelection?.date,
              time: userSelection?.time,
              reschedule: isRescheduleAppointment,
            },
          });
        }, 1000);
        enqueueSnackbar(
          `Appointment ${isRescheduleAppointment ? "rescheduled" : "requested"} successfully`, {
            variant: "success",
          },
        );
      });
    } else {
      setErrorMessage("Date & Time selection is required");
    }
  };

  useDidMountEffect(() => {
    if (practitionerDateTimes.length && appointmentLength) {
      let timeIntervalSlots = [];
      practitionerDateTimes.forEach((item) => {
        const slots = calculate_time_slot(
          moment.tz(item.start_date_time, userTimeZone).format("HH:mm"),
          moment.tz(item.end_date_time, userTimeZone).format("HH:mm"),
          appointmentLength,
        );
        timeIntervalSlots = [...timeIntervalSlots, ...slots];
      });
      setTimeSlots([...timeIntervalSlots]);
      // Fix for invalid date:: default selection
      calendarSelectionHandler(userSelection.date || tomorrowDate, timeIntervalSlots);
    }
  }, [practitionerDateTimes, appointmentLength]);

  const apptTypeSelectionHandler = (value) => {
    const name = "appointmentType";
    setUserSelection((prevUserSelection) => ({
      ...prevUserSelection,
      [name]: value,
    }));
    let apptLength = appointmentTypes.find((item) => item.id === value)?.length;
    apptLength = apptLength === 45 ? 60 : apptLength;
    setAppointmentLength(apptLength);

    if (practitionerDateTimes.length) {
      // generating time slots
      let timeIntervalSlots = [];
      practitionerDateTimes.forEach((item) => {
        const slots = calculate_time_slot(
          moment.tz(item.start_date_time, userTimeZone).format("hh:mm"),
          moment.tz(item.end_date_time, userTimeZone).format("hh:mm"),
          apptLength,
        );
        timeIntervalSlots = [...timeIntervalSlots, ...slots];
      });
      setTimeSlots([...timeIntervalSlots]);
      const selectedDate = userSelection.date;
      if (selectedDate) {
        calendarSelectionHandler(selectedDate, timeIntervalSlots); // selected date by default
      } else { // when calendar first loads
        calendarSelectionHandler(tomorrowDate, timeIntervalSlots); // select tomorrow date by default
      }
    }
    if (!showCalendar) { // show calendar if not visible
      setShowCalendar(true);
    }
  };

  const handleTimeZoneChange = (timeZone) => {
    setUserTimeZone(timeZone.value);
    if (practitionerDateTimes.length) {
      // generating time slots
      let timeIntervalSlots = [];
      practitionerDateTimes.forEach((item) => {
        // const slots = calculate_time_slot(item.start_timee, item.end_timee, appointmentLength);
        const slots = calculate_time_slot(
          moment.tz(item.start_date_time, timeZone.value).format("HH:mm"),
          moment.tz(item.end_date_time, timeZone.value).format("HH:mm"),
          appointmentLength,
        );
        timeIntervalSlots = [...timeIntervalSlots, ...slots];
      });
      setTimeSlots([...timeIntervalSlots]);
      const selectedDate = userSelection.date;
      if (selectedDate) {
        calendarSelectionHandler(selectedDate, timeIntervalSlots); // selected date by default
      } else { // when calendar first loads
        calendarSelectionHandler(tomorrowDate, timeIntervalSlots); // select tomorrow date by default
      }
    }
  };

  const getTimingLabel = (timing) => {
    const start = timing.startTime;
    const end = timing.endTime;
    const startTime = moment(start, ["HH.mm"]).format("h:mm A");
    const endTime = moment(end, ["HH.mm"]).format("h:mm A");
    return `${startTime} - ${endTime}`;
  };

  const getCalendarEvents = useCallback(() => {
    const holidays = ["Saturday", "Sunday"];
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
    if (practitionerDateTimes.length) {
      days.forEach((day) => {
        if (!practitionerDateTimes[0][day]) {
          holidays.push(capitalize(day));
        }
      });
    }
    // eslint-disable-next-line max-len
    const doctorEndLimit = practitionerDateTimes[0]?.end_date_time ? moment(practitionerDateTimes[0].end_date_time).format("YYYY-MM-DD") : null;
    const dateLimit = doctorEndLimit || oneYear;
    // using tomorrowDate: allow user to book appts from tomorrow
    const availableDates = getDatesArray(tomorrowDate, dateLimit, holidays).map((date) => ({
      title: "Available",
      date,
      backgroundColor: "#008B00",
    }));
    return availableDates;
  }, [practitionerDateTimes]);

  const getTimingBoxVariant = useCallback((timing) => {
    let variant = "outlined";
    const userSelectedTime = userSelection?.time;
    const { startTime, endTime } = timing;
    if (userSelectedTime?.timeStart === startTime && userSelectedTime?.timeEnd === endTime) {
      variant = "contained";
    }
    return variant;
  }, [userSelection.time]);

  return (
    <div className={classes.root}>
      <Box mb={2}>
        <Typography
          component="h1"
          variant="h2"
          color="textPrimary"
          className={classes.title}
        >
          Appointments
        </Typography>
        <Typography
          variant="h5"
          color="textPrimary"
          className={classes.subTitle}
        >
          Please select a date and time
        </Typography>
      </Box>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <TextField
          select
          required
          variant="outlined"
          label="Select Practitioner"
          margin="dense"
          fullWidth
          value={userSelection.practitioner}
          className={classes.inputFix}
          onChange={(e) => userSelectionHandler("practitioner", e.target.value)}
        >
          {practitioners.map((option) => (
            <MenuItem key={option.user_id} value={option.user_id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          required
          variant="outlined"
          label="Select Appointment Type"
          margin="dense"
          fullWidth
          value={userSelection.appointmentType}
          className={classes.inputFix}
          onChange={(e) => apptTypeSelectionHandler(e.target.value)}
          disabled={!appointmentTypes.length}
        >
          {appointmentTypes.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {`${option.appointment_type} - ${option.length} minutes - $${option.fee}`}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      {showCalendar && (
        practitionerDateTimes.length ? (
          <Box mt={3}>
            <Grid item lg={9} md={9} sm={12} xs={12}>
              <Grid
                container
                className={classes.calendarContainer}
                spacing={3}
              >
                <Grid item lg={9} md={9} sm={9} xs={9}>
                  <Calendar
                    events={getCalendarEvents()}
                    onDayClick={(val) => calendarSelectionHandler(val)}
                    onEventClick={(val) => calendarSelectionHandler(val)}
                    selectedDate={userSelection.date}
                  />
                  <div className={classes.timeZoneWrapper}>
                    <TimezoneSelect
                      value={userTimeZone}
                      onChange={handleTimeZoneChange}
                    />
                  </div>
                </Grid>
                <Grid item lg={3} md={3} sm={3} xs={3}>
                  <Grid className={classes.currentDate}>
                    <Typography
                      variant="h4"
                      component="h1"
                      color="textPrimary"
                    >
                      <span className={classes.noWrap}>
                        {userSelection.date
                          ? moment(userSelection.date).format("dddd, MMM D YYYY")
                          : ""}
                      </span>
                    </Typography>
                  </Grid>
                  {Boolean(errorMessage.length) && (
                    <Alert severity="info">
                      {errorMessage}
                    </Alert>
                  )}
                  <Collapse
                    in={Boolean(userSelection?.date && filteredTimeSlots.length)}
                    timeout={500}
                  >
                    <Grid className={classes.messageBox}>
                      <Typography>
                        Please select one of the following times.
                      </Typography>
                    </Grid>
                    {
                      userSelection?.date && filteredTimeSlots.map((timing, index) => (
                        <Button
                          key={`${timing.startTime}-${timing.endTime}`}
                          onClick={() => {
                            const timingObject = {
                              id: index,
                              timeStart: timing.startTime,
                              timeEnd: timing.endTime,
                            };
                            userSelectionHandler("time", timingObject);
                          }}
                          className={classes.timingBox}
                          variant={getTimingBoxVariant(timing)}
                          color="primary"
                          fullWidth
                        >
                          {getTimingLabel(timing)}
                        </Button>
                      ))
                    }
                    <Button
                      fullWidth
                      type="submit"
                      color="secondary"
                      variant="contained"
                      className={classes.submitBtn}
                      onClick={() => appointmentBookingHandler()}
                    >
                      {isRescheduleAppointment ? "Reschedule Appointment" : "Book Appointment"}
                    </Button>
                  </Collapse>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
            className={classes.centerContainer}
          >
            <Typography variant="h3" gutterBottom>
              No time slots available for this practitioner
            </Typography>
          </Grid>
        ))}
    </div>
  );
};

export default Appointments;
