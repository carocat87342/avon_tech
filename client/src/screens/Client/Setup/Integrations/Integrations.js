// Todo: Have to add validation
import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";

import IntegrationsService from "../../../../services/integrations.service";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "25px 0px",
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
    marginTop: theme.spacing(1),
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
    width: "200px",
  },
  type: {
    marginTop: "20px",
  },
  paper: {
    maxWidth: "456px",
  },
  textField: {
    width: "200px",
  },
  amount: {
    marginTop: "18px",
  },
}));

export default function Integrations() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [labcorpKey, setLabcorpKey] = useState("");
  const [questKey, setQuestKey] = useState("");
  const [doctorsDataId, setDoctorsDataId] = useState("");
  const [doctorsDataPw, setDoctorsDataPw] = useState("");
  const [stripeKey, setStripeKey] = useState("");

  const updateIntegrations = (e) => {
    e.preventDefault();
    const payload = {
      data: {
        labcorp_api_key: labcorpKey,
        quest_api_key: questKey,
        doctors_data_username: doctorsDataId,
        doctors_data_password: doctorsDataPw,
        stripe_api_key: stripeKey,
      },
    };
    IntegrationsService.update(payload).then((res) => {
      enqueueSnackbar(`${res.data.message}`, {
        variant: "success",
      });
    });
  };

  useEffect(() => {
    IntegrationsService.getIntegrations().then((res) => {
      const responseData = res.data[0];
      setLabcorpKey(responseData.labcorp_api_key);
      setQuestKey(responseData.quest_api_key);
      setDoctorsDataId(responseData.doctors_data_username);
      setDoctorsDataPw(responseData.doctors_data_password);
      setStripeKey(responseData.stripe_api_key);
    });
  }, []);

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
            Integrations
          </Typography>
          <Typography component="p" variant="body2" color="textPrimary">
            This page is used to manage third party integrations
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(e) => updateIntegrations(e)}
          >
            <Grid container spacing={0}>
              <Grid item xs={6} sm={12}>
                <TextField
                  autoFocus
                  // required
                  variant="outlined"
                  label="Labcorp Key"
                  value={labcorpKey}
                  id="labcorpKey"
                  className={`${classes.textField} ${classes.amount}`}
                  onChange={(event) => setLabcorpKey(event.target.value)}
                  size="small"
                />
              </Grid>
              <Grid item xs={6} sm={12}>
                <TextField
                  // required
                  variant="outlined"
                  label="Quest Key"
                  value={questKey}
                  id="questKey"
                  className={`${classes.textField} ${classes.amount}`}
                  onChange={(event) => setQuestKey(event.target.value)}
                  size="small"
                />
              </Grid>
              <Grid item xs={6} sm={12}>
                <TextField
                  // required
                  variant="outlined"
                  label="Doctors Data ID"
                  value={doctorsDataId}
                  id="doctorsDataId"
                  className={`${classes.textField} ${classes.amount}`}
                  onChange={(event) => setDoctorsDataId(event.target.value)}
                  size="small"
                />
              </Grid>
              <Grid item xs={6} sm={12}>
                <TextField
                  // required
                  variant="outlined"
                  label="Doctors Data PW"
                  value={doctorsDataPw}
                  id="doctorsDataPw"
                  className={`${classes.textField} ${classes.amount}`}
                  onChange={(event) => setDoctorsDataPw(event.target.value)}
                  size="small"
                />
              </Grid>
              <Grid item xs={6} sm={12}>
                <TextField
                  // required
                  variant="outlined"
                  label="Stripe Key"
                  value={stripeKey}
                  id="doctorsDataPw"
                  className={`${classes.textField} ${classes.amount}`}
                  onChange={(event) => setStripeKey(event.target.value)}
                  size="small"
                />
              </Grid>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Button
                fullWidth
                size="small"
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onSubmit={() => updateIntegrations()}
              >
                Save
              </Button>
            </Grid>
          </form>
        </Grid>
      </div>
    </div>
  );
}
