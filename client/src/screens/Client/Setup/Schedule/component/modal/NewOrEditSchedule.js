import React, { useEffect, useState } from "react";

import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  makeStyles,
  Switch,
  TextField,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { KeyboardDatePicker, KeyboardTimePicker } from "@material-ui/pickers";
import moment from "moment-timezone";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import Dialog from "../../../../../../components/Dialog";
import ScheduleService from "../../../../../../services/schedule.service";

const useStyles = makeStyles((theme) => ({
  gridMargin: {
    margin: "8px 0px",
  },
  noteMargin: {
    margin: "15px 0px",
  },
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
    marginBottom: "20px",
    color: theme.palette.text.secondary,
    "& .MuiSelect-select": {
      minWidth: 120,
    },
  },
  switchFormControl: {
    marginBottom: "10px",
    display: "block",
  },
  formHelperText: {
    width: "220px",
    fontSize: "12px",
    paddingLeft: "10px",
  },
  statusText: {
    width: "220px",
    fontSize: "14px",
  },
  modalAction: {
    marginTop: theme.spacing(2),
  },
  scheduleTitle: {
    fontWeight: "500",
    fontSize: 15,
    marginBottom: "20px",
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
}));

const NewOrEditSchedule = ({
  isOpen,
  handleOnClose,
  isNewSchedule,
  userId,
  userList,
  handleChangeOfUserId,
  fetchScheduleSearch,
  ...props
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const ianatz = moment.tz.guess() || "America/New_York";
  const [schedule, setSchedule] = useState([]);
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState([]);

  /* eslint-disable */
  useEffect(() => {
    const tempSchedule = {
      ...props.schedule,
    };
    setSchedule(tempSchedule);
  }, [props.schedule]);

  /* eslint-enable */

  useEffect(() => {
    if (moment(schedule.start_date_time) > moment()) {
      setStatus("Future");
    } else if (moment(schedule.end_date_time) < moment()) {
      setStatus("Past");
    } else {
      setStatus("Current");
    }
  }, [schedule]);

  const payload = {
    data: {
      user_id: schedule.user_id,
      start_date_time: moment(schedule.start_date_time).format("YYYY-MM-DD HH:mm:ss"),
      end_date_time: moment(schedule.end_date_time).format("YYYY-MM-DD HH:mm:ss"),
      log_tz: ianatz,
      active: schedule.active,
      note: schedule.note ? schedule.note : "",
      monday: schedule?.monday ? 1 : 0,
      tuesday: schedule?.tuesday ? 1 : 0,
      wednesday: schedule?.wednesday ? 1 : 0,
      thursday: schedule?.thursday ? 1 : 0,
      friday: schedule?.friday ? 1 : 0,
    },
  };

  const handleCreateNewOrEditSchedule = () => {
    if (isNewSchedule) {
      ScheduleService.createNewSchedule(payload).then(
        (response) => {
          setTimeout(() => {
            enqueueSnackbar(`${response.data.message}`, {
              variant: "success",
            });
          }, 300);
        },
        (error) => {
          setTimeout(() => {
            setErrors(error.response.error);
          }, 300);
        },
      );
    } else {
      ScheduleService.updateSchedule(schedule.id, payload).then(
        (response) => {
          setTimeout(() => {
            enqueueSnackbar(`${response.data.message}`, {
              variant: "success",
            });
          }, 300);
        },
        (error) => {
          setTimeout(() => {
            setErrors(error.response.error);
          }, 300);
        },
      );
    }

    handleOnClose();
    setTimeout(() => {
      fetchScheduleSearch();
    }, 200);
  };

  const handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      handleCreateNewOrEditSchedule();
    }
  };

  const getScheduleUserId = (selectedScheduleUserId, loggedInUser) => {
    if (isNewSchedule && !selectedScheduleUserId) {
      return loggedInUser?.id;
    }
    return selectedScheduleUserId;
  };

  return (
    <Dialog
      size="sm"
      open={isOpen}
      cancelForm={handleOnClose}
      title={isNewSchedule ? "New Schedule" : "Edit Schedule"}
      message={(
        <>
          {errors
            && errors.map((error) => (
              <Alert severity="error" key={error.msg}>
                {error.msg}
              </Alert>
            ))}
          <FormControl component="div" className={classes.formControl}>
            <Grid item xs={12} md={6} className={classes.gridMargin}>
              <TextField
                fullWidth
                autoFocus
                required
                id="user_id"
                name="user_id"
                select
                label="User"
                value={getScheduleUserId(schedule.user_id, userId)}
                onChange={(e) => setSchedule({
                  ...schedule,
                  user_id: e.target.value,
                })}
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                SelectProps={{
                  native: true,
                }}
              >
                {userList.map((u) => (
                  <option key={u.id} value={u.id}>
                    {`${u.firstname} ${u.lastname}`}
                  </option>
                ))}
              </TextField>
            </Grid>
            <p className={classes.formHelperText}>The name shown in the Appointment</p>
          </FormControl>
          <Grid container xs={12} md={12} className={classes.gridMargin}>
            <Grid item xs={12} sm={6} className={classes.gridMargin}>
              <p className={classes.scheduleTitle}>Date and Time</p>
              <FormControl component="div" className={classes.formControl}>
                <KeyboardDatePicker
                  required
                  clearable
                  autoOk
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  format="yyyy/MM/dd"
                  inputVariant="outlined"
                  variant="outlined"
                  id="dateStart"
                  label="Date Start"
                  className={classes.textField}
                  size="small"
                  name="start_date_time"
                  value={schedule.start_date_time}
                  onChange={(date) => setSchedule({
                    ...schedule,
                    start_date_time: date,
                  })}
                  onKeyUp={handleKeyUp}
                  maxDate={schedule.end_date_time}
                  maxDateMessage="Date start should not be after date end"
                />
              </FormControl>
              <FormControl component="div" className={classes.formControl}>
                <KeyboardDatePicker
                  required
                  clearable
                  autoOk
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  format="yyyy/MM/dd"
                  inputVariant="outlined"
                  variant="outlined"
                  id="dateEnd"
                  label="Date End"
                  className={classes.textField}
                  size="small"
                  name="end_date_time"
                  value={schedule.end_date_time}
                  onChange={(date) => setSchedule({
                    ...schedule,
                    end_date_time: date,
                  })}
                  onKeyUp={handleKeyUp}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  minDate={schedule.start_date_time}
                  minDateMessage="Date end should not be before date start"
                />
              </FormControl>
              <FormControl component="div" className={classes.formControl}>
                <KeyboardTimePicker
                  required
                  inputVariant="outlined"
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                  id="time_start"
                  name="start_date_time"
                  label="Time Start"
                  value={schedule.start_date_time ? schedule.start_date_time : null}
                  className={classes.textField}
                  onChange={(date) => setSchedule({
                    ...schedule,
                    start_date_time: date,
                  })}
                  size="small"
                  autoOk
                  mask="__:__ _M"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  maxDate={schedule.end_date_time}
                  maxDateMessage="Time start should not be after time end"
                />
              </FormControl>
              <FormControl component="div" className={classes.formControl}>
                <KeyboardTimePicker
                  required
                  inputVariant="outlined"
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                  id="time_end"
                  name="time_end"
                  label="Time End"
                  value={schedule.end_date_time ? schedule.end_date_time : null}
                  className={classes.textField}
                  onChange={(date) => setSchedule({
                    ...schedule,
                    end_date_time: date,
                  })}
                  size="small"
                  autoOk
                  mask="__:__ _M"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  minDate={schedule.start_date_time}
                  minDateMessage="Date end should not be before date start"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.gridMargin}>
              <p className={classes.scheduleTitle}>Week Plan</p>
              <FormControlLabel
                control={(
                  <Switch
                    checked={Boolean(schedule.monday)}
                    size="small"
                    name="active"
                    color="primary"
                    onChange={(e) => setSchedule({
                      ...schedule,
                      monday: e.target.checked,
                    })}
                    onKeyUp={handleKeyUp}
                  />
                )}
                label="Monday"
                className={classes.switchFormControl}
              />
              <FormControlLabel
                control={(
                  <Switch
                    checked={Boolean(schedule.tuesday)}
                    size="small"
                    name="active"
                    color="primary"
                    onChange={(e) => setSchedule({
                      ...schedule,
                      tuesday: e.target.checked,
                    })}
                    onKeyUp={handleKeyUp}
                  />
                )}
                label="Tuesday"
                className={classes.switchFormControl}
              />
              <FormControlLabel
                control={(
                  <Switch
                    checked={Boolean(schedule.wednesday)}
                    size="small"
                    name="active"
                    color="primary"
                    onChange={(e) => setSchedule({
                      ...schedule,
                      wednesday: e.target.checked,
                    })}
                    onKeyUp={handleKeyUp}
                  />
                )}
                label="Wednesday"
                className={classes.switchFormControl}
              />
              <FormControlLabel
                control={(
                  <Switch
                    checked={Boolean(schedule.thursday)}
                    size="small"
                    name="active"
                    color="primary"
                    onChange={(e) => setSchedule({
                      ...schedule,
                      thursday: e.target.checked,
                    })}
                    onKeyUp={handleKeyUp}
                  />
                )}
                label="Thursday"
                className={classes.switchFormControl}
              />
              <FormControlLabel
                control={(
                  <Switch
                    checked={Boolean(schedule.friday)}
                    size="small"
                    name="active"
                    color="primary"
                    onChange={(e) => setSchedule({
                      ...schedule,
                      friday: e.target.checked,
                    })}
                    onKeyUp={handleKeyUp}
                  />
                )}
                label="Friday"
                className={classes.switchFormControl}
              />
            </Grid>
          </Grid>
          <FormControl component="div" className={classes.switchControl}>
            <Switch
              checked={Boolean(schedule.active)}
              size="small"
              name="active"
              color="primary"
              onChange={(e) => setSchedule({
                ...schedule,
                active: e.target.checked,
              })}
              onKeyUp={handleKeyUp}
            />
            <p className={classes.formHelperText}>Active / Inactive</p>
          </FormControl>
          <p className={classes.statusText}>
            <span>Status:</span>
            {" "}
            {status}
          </p>

          <FormControl component="div" className={classes.formControl}>
            <TextField
              className={classes.noteMargin}
              fullWidth
              variant="outlined"
              multiline
              name="note"
              label="Notes"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                rows: 6,
              }}
              value={schedule.note}
              onChange={(e) => setSchedule({
                ...schedule,
                note: e.target.value,
              })}
              onKeyUp={handleKeyUp}
              error={String(schedule.note).length > 1000}
              helperText={String(schedule.note).length > 1000 && "Note can't be grater than 1000 Chars"}
            />
          </FormControl>
          <Grid className={classes.modalAction}>
            <Button variant="outlined" onClick={handleCreateNewOrEditSchedule}>
              {isNewSchedule ? "Save" : "Update"}
            </Button>
          </Grid>
        </>
      )}
    />
  );
};

NewOrEditSchedule.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  userId: PropTypes.bool.isRequired,
  isNewSchedule: PropTypes.bool.isRequired,
  handleOnClose: PropTypes.func.isRequired,
  fetchScheduleSearch: PropTypes.func.isRequired,
  handleChangeOfUserId: PropTypes.func.isRequired,
  userList: PropTypes.arrayOf(PropTypes.arrayOf()).isRequired,
};

export default NewOrEditSchedule;
