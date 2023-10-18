import React, { useEffect, useState } from "react";

import { TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import usePatientContext from "../../../../hooks/usePatientContext";
import {
  setEditorText,
  resetEditorText,
  toggleAdminFormDialog,
} from "../../../../providers/Patient/actions";

const useStyles = makeStyles((theme) => ({
  inputRow: {
    margin: theme.spacing(3, 0),
  },
  formInput: {
    marginBottom: theme.spacing(1),

    "& .MuiOutlinedInput-multiline": {
      padding: 5,
      fontSize: 12,
    },
  },
  actionContainer: {
    marginTop: theme.spacing(1),
  },
}));

const AdminNotes = () => {
  const classes = useStyles();
  const { state, dispatch } = usePatientContext();
  const { editorText } = state;
  const { admin_note } = state.patientInfo.data;
  const [formField, setFormField] = useState("");

  const handleInputChange = (e) => {
    const { value } = e.target;
    setFormField(value);
  };

  useEffect(() => {
    setFormField(admin_note);
    dispatch(setEditorText(admin_note));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin_note]);

  return (
    <>
      <Grid className={classes.formInput} item md={12}>
        <TextField
          variant="outlined"
          value={formField}
          name="notes"
          id="notes"
          type="text"
          fullWidth
          onChange={(e) => handleInputChange(e)}
          onBlur={() => editorText !== formField && dispatch(setEditorText(formField))}
          multiline
          rows={5}
          autoFocus
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              dispatch(toggleAdminFormDialog());
              dispatch(resetEditorText());
            }
          }}
        />
      </Grid>
    </>
  );
};

export default AdminNotes;
