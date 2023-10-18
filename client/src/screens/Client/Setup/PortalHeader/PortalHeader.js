import React, { useEffect, useState } from "react";

import {
  Button, Container, CssBaseline, makeStyles,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";

import PatientPortalHeaderService from "../../../../services/patientPortalHeader.service";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
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
  portal: {
    border: "1px solid",
    borderColor: "textPrimary",
    margin: "5px 0px",
    padding: "10px",
    height: "500px",
  },
  textField: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    fontFamily: "inherit",
    color: "inherit",
    fontSize: "inherit",
    resize: "none",
  },
}));

const PortalHeader = () => {
  const classes = useStyles();
  const [updated, setUpdated] = useState("");
  const [updatedUser, setUpdatedUser] = useState("");
  const [header, setHeader] = useState("");
  const [portalId, setPortalId] = useState("");
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [editedHeader, setEditedHeader] = useState("");

  const getPatientPortalHeader = () => {
    PatientPortalHeaderService.getClientPortalHeader().then((res) => {
      res.data.data.map((portal) => {
        setUpdated(moment(portal.updated).format("lll"));
        setUpdatedUser(portal.updated_user);
        setHeader(portal.header);
        setPortalId(portal.id);
        return portal;
      });
    });
  };

  const editPatientPortalHeader = () => {
    PatientPortalHeaderService.editClientPortalHeader(portalId, {
      data: {
        header: editedHeader,
      },
    });
  };

  useEffect(() => {
    getPatientPortalHeader();
  }, []);

  const handleDoubleClick = () => {
    setIsInEditMode(!isInEditMode);
  };

  const handleOnSaveClick = () => {
    setIsInEditMode(false);
    editPatientPortalHeader();
    setTimeout(() => {
      getPatientPortalHeader();
    }, 200);
  };

  const handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      setIsInEditMode(false);
      editPatientPortalHeader();
      setTimeout(() => {
        getPatientPortalHeader();
      }, 200);
    }
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth={false} className={classes.root}>
        <div className={classes.uploadButtons}>
          <Typography
            component="h1"
            variant="h2"
            color="textPrimary"
            className={classes.title}
          >
            Portal Header
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component="span"
            onClick={handleOnSaveClick}
          >
            Save
          </Button>
        </div>
        <Grid container justify="center" spacing={2}>
          <Grid item md={12} xs={12}>
            <Typography component="p" variant="body2" color="textPrimary">
              This page is used to set the patient portal header
            </Typography>
            <Grid container justify="center" spacing={2}>
              <Grid item md={5} xs={12}>
                <div className={classes.portal}>
                  {isInEditMode ? (
                    <textarea
                      className={classes.textField}
                      onChange={(e) => setEditedHeader(e.target.value)}
                      onKeyUp={handleKeyUp}
                    >
                      {header}
                    </textarea>
                  ) : (
                    <Typography
                      component="p"
                      variant="body2"
                      color="textPrimary"
                      onDoubleClick={handleDoubleClick}
                    >
                      {ReactHtmlParser(header)}
                    </Typography>
                  )}
                </div>
                <Typography
                  component="p"
                  variant="body2"
                  color="textPrimary"
                >
                  Updated:
                  {" "}
                  {`${updated} ${updatedUser}`}
                </Typography>
              </Grid>
              <Grid item md={7} xs={12}>
                <div className={classes.portal}>
                  <Typography
                    component="p"
                    variant="body2"
                    color="textPrimary"
                    onDoubleClick={handleDoubleClick}
                  >
                    {ReactHtmlParser(header)}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PortalHeader;
