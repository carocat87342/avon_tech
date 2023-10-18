import React, { useCallback, useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

import useAuth from "../../../../hooks/useAuth";
import MySelfService from "../../../../services/corporate_portal/myself.service";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(1),
  },
  formElment: {
    marginTop: theme.spacing(2),
    width: "250px",
  },
  submit: {
    width: "100px",
    marginTop: theme.spacing(4),
  },
}));

function NumberFormatCustom(props) {
  const {
    inputRef, onChange, name, ...other
  } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix=""
    />
  );
}
NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function MyProfile() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [created, setCreated] = useState(moment().format("YYYY-MM-DD"));
  const [forwardEmails, setForwardEmails] = useState([]);
  const [selectedForwardEmail, setSelectedForwardEmail] = useState(null);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const saveProfile = (e) => {
    e.preventDefault();

    const [firstname, lastname] = name.split(" ");

    const payload = {
      data: {
        firstname,
        lastname,
        email,
        title,
        created,
        ...(selectedForwardEmail > 0 && {
          email_forward_user_id: selectedForwardEmail,
        }),
        phone,
        ...(password.length && { password }),
      },
    };

    MySelfService.updateProfile(payload, user.id).then(
      (res) => {
        enqueueSnackbar(res.data.message, {
          variant: "success",
        });
      },
      () => {
        enqueueSnackbar("Unable to update profile", {
          variant: "error",
        });
      },
    );
  };

  const fetchForwardEmail = useCallback(() => {
    MySelfService.getForwardEmail(user.id).then((res) => {
      setForwardEmails(res.data);
    });
  }, [user]);

  const fetchProfile = useCallback(() => {
    MySelfService.getProfile(user.id).then((res) => {
      const profile = res.data;
      setName(`${profile.firstname} ${profile.lastname}`);
      setEmail(profile.email);
      setTitle(profile.title);
      setCreated(moment(profile.created).format("YYYY-MM-DD"));
      setSelectedForwardEmail(profile.email_forward_user_id);
      setPhone(profile.phone);
    });
  }, [user]);

  useEffect(() => {
    fetchForwardEmail();
    fetchProfile();
  }, [fetchProfile, fetchForwardEmail]);

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <Grid container direction="column" justify="center">
          <Typography
            component="h1"
            variant="h2"
            color="textPrimary"
            className={classes.title}
          >
            My Profile
          </Typography>
          <Typography component="p" variant="body2" color="textPrimary">
            This page is used to manage a user&apos;s basic information
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(e) => saveProfile(e)}
          >
            <TextField
              autoFocus
              variant="outlined"
              label="Name"
              value={name}
              className={classes.formElment}
              onChange={(event) => setName(event.target.value)}
              size="small"
              disabled
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              variant="outlined"
              label="Title"
              value={title}
              className={classes.formElment}
              onChange={(event) => setTitle(event.target.value)}
              size="small"
              disabled
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              variant="outlined"
              label="Email"
              value={email}
              className={classes.formElment}
              onChange={(event) => setEmail(event.target.value)}
              size="small"
              disabled
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              variant="outlined"
              id="date"
              label="Created"
              value={created}
              className={classes.formElment}
              onChange={(event) => setCreated(event.target.value)}
              type="date"
              size="small"
              disabled
              InputProps={{
                readOnly: true,
              }}
            />
            <FormControl
              variant="outlined"
              className={classes.formElment}
              size="small"
            >
              <InputLabel htmlFor="age-native-simple">Forward Email</InputLabel>
              <Select
                native
                value={selectedForwardEmail}
                onChange={(event) => {
                  setSelectedForwardEmail(event.target.value);
                }}
                inputProps={{
                  name: "Forward Email",
                  id: "age-native-simple",
                }}
                label="Forward Email"
              >
                <option value={-1}>Select User</option>
                {forwardEmails.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <TextField
              variant="outlined"
              label="Phone"
              value={phone}
              className={classes.formElment}
              onChange={(event) => {
                setPhone(event.target.value.slice(0, 25));
              }}
              size="small"
            />
            <TextField
              variant="outlined"
              label="Password"
              value={password}
              type="password"
              className={classes.formElment}
              onChange={(event) => setPassword(event.target.value)}
              size="small"
            />

            <Button
              size="medium"
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Save
            </Button>
          </form>
        </Grid>
      </div>
    </div>
  );
}
