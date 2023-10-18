import React, { useState } from "react";

import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "25px 0px",
  },
  title: {
    paddingBottom: theme.spacing(0.5),
  },
  status: {
    display: "flex",
    alignItems: "center",
  },
  subject: {
    width: "50%",
  },
  fields: {
    display: "flex",
    flexDirection: "column",
  },
  texArea: {
    width: "75%",
  },
  next: {
    margin: theme.spacing(3, 0, 2),
    maxWidth: "100px",
    width: "100px",
  },
  historyTop: {
    marginTop: "15px",
  },
  history: {
    marginTop: "5px",
    display: "flex",
    border: "black solid 1px",
    padding: "5px",
    height: "300px",
    flexDirection: "row",
    "& div": {
      width: "16%",
      margin: "5px",
    },
  },
  fileUpload: {
    display: "flex",
    alignItems: "center",
  },
  fileItems: {
    marginRight: "5px",
  },
}));

export default function Fax() {
  const classes = useStyles();
  const [faxNumber, setFaxNumber] = useState("");
  const [cover, setCover] = useState("");
  const [file, setFile] = useState(null);

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h2"
        color="textPrimary"
        className={classes.title}
      >
        Send Fax
      </Typography>
      <Typography component="p" variant="body2" color="textPrimary">
        This page is used to send fax
      </Typography>

      <div className={classes.fields}>
        <TextField
          className={classes.subject}
          value={faxNumber}
          variant="outlined"
          margin="normal"
          id="faxNumber"
          label="Fax Number"
          name="faxNumber"
          autoComplete="faxNumber"
          autoFocus
          onChange={(event) => setFaxNumber(event.target.value)}
          size="small"
        />
        <TextField
          className={classes.texArea}
          fullWidth
          variant="outlined"
          label="Cover Sheet"
          multiline
          name="note"
          InputProps={{
            classes: classes.normalOutline,
            inputComponent: TextareaAutosize,
            rows: 8,
          }}
          value={cover}
          onChange={(event) => setCover(event)}
          size="small"
        />
        <div className={classes.fileUpload}>
          <Button
            component="label"
            variant="contained"
            color="primary"
            className={`${classes.next} ${classes.fileItems}`}
            onChange={(event) => setFile(event.target.files[0].name)}
            size="small"
          >
            Add File
            <input type="file" style={{ display: "none" }} />
          </Button>
          <Typography
            className={classes.fileItems}
            component="p"
            variant="body2"
            color="textPrimary"
          >
            {file}
          </Typography>
          {file && (
            <Button
              disabled={!file}
              color="secondary"
              className={classes.next}
              onClick={() => setFile(null)}
              size="small"
            >
              Remove
            </Button>
          )}
        </div>
        <Button
          disabled={!faxNumber || !cover}
          variant="contained"
          color="primary"
          className={classes.next}
          size="small"
        >
          Send
        </Button>
      </div>
    </div>
  );
}
