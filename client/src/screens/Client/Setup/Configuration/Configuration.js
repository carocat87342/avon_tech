import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Link from "@material-ui/core/Link";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { KeyboardTimePicker } from "@material-ui/pickers";
import { mdiOpenInNew } from "@mdi/js";
import Icon from "@mdi/react";
import moment from "moment";
import { useSnackbar } from "notistack";

import Error from "../../../../components/common/Error";
import Dialog from "../../../../components/Dialog";
import useAuth from "../../../../hooks/useAuth";
import ConfigurationService from "../../../../services/configuration.service";
import StateData from "./data/state";
import ConfigModal from "./modal";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "25px 0px",
  },
  uploadButtons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "450px",
    marginBottom: theme.spacing(1),
    "& h1": {
      [theme.breakpoints.up("md")]: {
        marginRight: theme.spacing(4),
      },
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  title: {
    paddingBottom: theme.spacing(0.5),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(3),
  },
  formElments: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "500px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    marginTop: "20px",
    maxWidth: "440px",
  },
  customSelect: {
    width: "100%",
  },
  type: {
    marginTop: "20px",
  },
  paper: {
    maxWidth: "456px",
  },
  textField: {
    width: "100%",
  },
  amount: {
    marginTop: "18px",
  },
  patientIcon: {
    marginBottom: theme.spacing(1 / 2),
    marginLeft: theme.spacing(1),
    color: "rgba(0, 0, 0, 0.38)",
  },
  logoLabel: {
    color: "#A0A0A0",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    maxWidth: "200px",
    maxHeight: "50px",
  },
  browseBtn: {
    marginLeft: theme.spacing(2.5),
  },
}));

export default function Configuration() {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const classes = useStyles();
  const [isSubmitting, setSubmitting] = useState(false);

  const [errors] = useState([]);
  const [modalHistory, setModalHistory] = useState({
    isOpen: false,
    data: [],
    user,
  });
  const logoRef = React.useRef(null);

  const initFormParams = {
    logo: `${process.env.REACT_APP_API_URL}static/client/c${user.client_id}_logo.png`,
    clientId: "",
    clientCode: "",
    name: "",
    patientPortal: `${process.env.REACT_APP_LOGIN_LINK}/signup?c=`,
    address: "",
    clientWebsite: "",
    addressLineTwo: "",
    email: "",
    city: "",
    ein: "",
    state: "",
    npi: "",
    zipcode: "",
    country: "",
    phone: "",
    fax: "",
  };

  const [formParams, setFormParams] = useState(initFormParams);
  const [calendarStartTime, setCalendarStartTime] = useState(moment("12000"));
  const [calendarEndTime, setCalendarEndTime] = useState(moment("22000"));

  const _fetchConfig = async () => {
    try {
      let { data = {} } = await ConfigurationService.getConfig({});
      // eslint-disable-next-line prefer-destructuring
      data = data.data[0]; // TODO:: Refactor and remove eslint-disable-next-line
      setFormParams({
        logo: `${process.env.REACT_APP_API_URL}static/client/c${user.client_id}_logo.png`,
        clientId: data.id,
        clientCode: data.code,
        name: data.name,
        patientPortal: `${process.env.REACT_APP_LOGIN_LINK}/login/${data.code}`,
        address: data.address,
        clientWebsite: data.website,
        addressLineTwo: data.address2,
        email: data.email,
        city: data.city,
        ein: data.ein,
        state: data.state,
        npi: data.npi,
        zipcode: data.postal,
        country: data.country,
        phone: data.phone,
        fax: data.fax,
      });
      setCalendarStartTime(moment(data.calendar_start_time, "HH:mm:ss").format("YYYY-MM-DDTHH:mm:ss"));
      setCalendarEndTime(moment(data.calendar_end_time, "HH:mm:ss").format("YYYY-MM-DDTHH:mm:ss"));
    } catch (e) {
      console.error(e);
    }
  };

  const _fetchConfigHistory = async () => {
    try {
      const response = await ConfigurationService.getConfigHistory({});

      return response.data.data;
    } catch (e) {
      return false;
    }
  };

  const _onSubmitConfig = async () => {
    setSubmitting(true);

    try {
      const _params = {
        data: {
          address: formParams.address,
          address2: formParams.addressLineTwo,
          city: formParams.city,
          state: formParams.state,
          website: formParams.clientWebsite,
          country: formParams.country,
          calendar_start_time: moment(calendarStartTime).format("HH:mm:ss"),
          calendar_end_time: moment(calendarEndTime).format("HH:mm:ss"),
          email: formParams.email,
          ein: formParams.ein,
          npi: formParams.npi,
          postal: formParams.zipcode,
          phone: formParams.phone,
          fax: formParams.fax,
        },
      };
      const response = await ConfigurationService.updateConfig(user.id, _params);
      setSubmitting(false);
      enqueueSnackbar(`${response.data.message}`, {
        variant: "success",
      });
    } catch (e) {
      setSubmitting(false);
    }
  };

  const _onSelectLogo = async (e) => {
    const { files } = e.target;
    if (files && files.length) {
      setFormParams({
        ...formParams,
        logo: URL.createObjectURL(files[0]),
      });
      try {
        const formData = new FormData();
        formData.append("file", files[0]);
        await ConfigurationService.updateLogo(user.id, formData);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const _onOpenModalHistory = async () => {
    let result = [];
    try {
      result = await _fetchConfigHistory();
    } catch (e) {
      console.error(e);
    }
    setModalHistory({
      ...modalHistory,
      isOpen: true,
      data: result,
    });
  };

  useEffect(() => {
    _fetchConfig();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onKeyPress = (e) => {
    if (e.which === 13) {
      _onSubmitConfig();
    }
  };

  const _onChangeInput = (e) => {
    setFormParams({
      ...formParams,
      [e.target.name]: e.target.value,
    });
  };

  const handleModalClose = () => {
    setModalHistory({
      ...modalHistory,
      isOpen: false,
    });
  };

  return (
    <>
      {modalHistory.isOpen && (
        <Dialog
          open={modalHistory.isOpen}
          title="Configuration History"
          message={<ConfigModal modal={modalHistory} />}
          cancelForm={() => handleModalClose()}
          hideActions
          size="xl"
        />
      )}
      <div className={classes.root}>
        <div className={classes.paper}>
          <div className={classes.uploadButtons}>
            <Typography component="h1" variant="h2" color="textPrimary">
              Configuration
            </Typography>
            <Button variant="outlined" color="primary" component="span" onClick={() => _onOpenModalHistory()}>
              History
            </Button>
          </div>
        </div>
        <Typography className={classes.title} component="p" variant="body2" color="textPrimary">
          This page is used to manage basic client information
        </Typography>

        <Error errors={errors} />
        <form className={classes.form} noValidate onSubmit={() => { }}>
          <Grid container spacing={4}>
            <Grid item xs={6} sm={7}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={formParams.clientId}
                    variant="outlined"
                    onKeyPress={(e) => onKeyPress(e)}
                    size="small"
                    disabled
                    id="clientId"
                    label="Client ID"
                    name="clientId"
                    className={`${classes.textField} `}
                    autoComplete="clientId"
                    onChange={(e) => _onChangeInput(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={formParams.clientCode}
                    variant="outlined"
                    onKeyPress={(e) => onKeyPress(e)}
                    size="small"
                    id="clientCode"
                    label="Client Code"
                    disabled
                    className={`${classes.textField} `}
                    name="clientCode"
                    autoComplete="clientCode"
                    onChange={(e) => _onChangeInput(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={formParams.name}
                    variant="outlined"
                    onKeyPress={(e) => onKeyPress(e)}
                    size="small"
                    id="name"
                    disabled
                    label="Name"
                    className={classes.textField}
                    name="name"
                    autoComplete="name"
                    onChange={(e) => _onChangeInput(e)}
                  />
                </Grid>
                <Grid container item xs={12} sm={6} justify="center" alignItems="center">
                  <Grid xs={11} sm={11}>
                    <TextField
                      value={formParams.patientPortal}
                      variant="outlined"
                      onKeyPress={(e) => onKeyPress(e)}
                      size="small"
                      id="patientPortal"
                      disabled
                      label="Patient Portal Login"
                      className={`${classes.textField} `}
                      name="patientPortal"
                      autoComplete="patientPortal"
                      onChange={(e) => _onChangeInput(e)}
                    />
                  </Grid>
                  <Grid xs={1} sm={1}>
                    {formParams.patientPortal && (
                      <Link href={formParams.patientPortal} className={classes.patientIcon} target="_blank">
                        <Icon path={mdiOpenInNew} size={1} horizontal vertical rotate={180} />
                      </Link>
                    )}
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={formParams.address}
                    variant="outlined"
                    onKeyPress={(e) => onKeyPress(e)}
                    size="small"
                    id="address"
                    label="Address"
                    className={`${classes.textField} `}
                    name="address"
                    autoComplete="address"
                    onChange={(e) => _onChangeInput(e)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={formParams.clientWebsite}
                    variant="outlined"
                    onKeyPress={(e) => onKeyPress(e)}
                    size="small"
                    id="clientWebsite"
                    label="Website"
                    className={`${classes.textField} `}
                    name="clientWebsite"
                    autoComplete="clientWebsite"
                    onChange={(e) => _onChangeInput(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={formParams.addressLineTwo}
                    variant="outlined"
                    onKeyPress={(e) => onKeyPress(e)}
                    size="small"
                    id="addressLineTwo"
                    label="Address Line 2"
                    className={`${classes.textField} `}
                    name="addressLineTwo"
                    autoComplete="addressLineTwo"
                    onChange={(e) => _onChangeInput(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={formParams.email}
                    variant="outlined"
                    onKeyPress={(e) => onKeyPress(e)}
                    size="small"
                    id="email"
                    label="Email"
                    className={`${classes.textField} `}
                    name="email"
                    autoComplete="email"
                    onChange={(e) => _onChangeInput(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={formParams.city}
                    variant="outlined"
                    onKeyPress={(e) => onKeyPress(e)}
                    size="small"
                    id="city"
                    label="City"
                    className={`${classes.textField} `}
                    name="city"
                    autoComplete="city"
                    onChange={(e) => _onChangeInput(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={formParams.ein}
                    variant="outlined"
                    onKeyPress={(e) => onKeyPress(e)}
                    size="small"
                    id="ein"
                    label="EIN"
                    className={`${classes.textField} `}
                    name="ein"
                    autoComplete="ein"
                    onChange={(e) => _onChangeInput(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    variant="outlined"
                    onKeyPress={(e) => onKeyPress(e)}
                    className={classes.customSelect}
                    size="small"
                  >
                    <InputLabel htmlFor="age-native-simple">State</InputLabel>
                    <Select
                      native
                      value={formParams.state}
                      onChange={(e) => _onChangeInput(e)}
                      inputProps={{
                        name: "state",
                        id: "age-native-simple",
                      }}
                      label="State"
                    >
                      <option aria-label="None" value="" />
                      {StateData.map((v) => (
                        <option key={`state${v.code}`} value={v.code}>
                          {v.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={formParams.npi}
                    variant="outlined"
                    onKeyPress={(e) => onKeyPress(e)}
                    size="small"
                    id="npi"
                    label="NPI"
                    className={`${classes.textField} `}
                    name="npi"
                    autoComplete="npi"
                    onChange={(e) => _onChangeInput(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={formParams.zipcode}
                    variant="outlined"
                    onKeyPress={(e) => onKeyPress(e)}
                    size="small"
                    id="zipcode"
                    label="Zipcode"
                    className={`${classes.textField} `}
                    name="zipcode"
                    autoComplete="zipcode"
                    onChange={(e) => _onChangeInput(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <KeyboardTimePicker
                    inputVariant="outlined"
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                    id="calendarStartTime"
                    name="calendarStartTime"
                    label="Calendar Start Time"
                    value={calendarStartTime}
                    className={classes.textField}
                    onChange={(date) => setCalendarStartTime(date)}
                    size="small"
                    autoOk
                    mask="__:__ _M"
                    keyboardIcon
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    value={formParams.phone}
                    variant="outlined"
                    onKeyPress={(e) => onKeyPress(e)}
                    size="small"
                    id="phone"
                    label="Phone"
                    className={`${classes.textField}`}
                    name="phone"
                    autoComplete="phone"
                    onChange={(e) => _onChangeInput(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={formParams.fax}
                    variant="outlined"
                    onKeyPress={(e) => onKeyPress(e)}
                    size="small"
                    id="fax"
                    label="Fax"
                    className={`${classes.textField}`}
                    name="fax"
                    autoComplete="fax"
                    onChange={(e) => _onChangeInput(e)}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  size="small"
                  type="button"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => {
                    if (!isSubmitting) {
                      _onSubmitConfig();
                    }
                  }}
                >
                  {isSubmitting ? `Saving...` : `Save`}
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={6} sm={5}>
              <div>
                <input
                  accept="image/*"
                  multiple
                  onChange={_onSelectLogo}
                  type="file"
                  ref={logoRef}
                  hidden
                />

                <div>
                  <small className={classes.logoLabel}>Logo</small>
                </div>
                <div className={classes.logoContainer}>
                  <img alt="logo" className={classes.logo} src={formParams.logo} />
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.browseBtn}
                    onClick={() => logoRef.current.click()}
                  >
                    Browse
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
}
