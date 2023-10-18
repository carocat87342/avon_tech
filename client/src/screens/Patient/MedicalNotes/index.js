import React, { useState, useEffect } from "react";

import { Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import usePatientContext from "../../../hooks/usePatientContext";
import {
  setEditorText,
  resetEditorText,
  toggleMedicalNotesFormDialog,
} from "../../../providers/Patient/actions";

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

const MedicalNotes = () => {
  const classes = useStyles();
  const { state, dispatch } = usePatientContext();
  const { editorText } = state;
  const { medical_note } = state.patientInfo.data;
  const [medicalNote, setMedicalNote] = useState("");

  useEffect(() => {
    setMedicalNote(medical_note);
    dispatch(setEditorText(medical_note));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medical_note]);

  return (
    <>
      <Grid className={classes.formInput} item md={12}>
        <TextField
          required
          value={medicalNote}
          variant="outlined"
          name="medicalNote"
          id="medicalNote"
          type="text"
          fullWidth
          onChange={(e) => {
            setMedicalNote(e.target.value);
          }}
          onBlur={() => editorText !== medicalNote && dispatch(setEditorText(medicalNote))}
          multiline
          rows={6}
          autoFocus
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              dispatch(toggleMedicalNotesFormDialog());
              dispatch(resetEditorText());
            }
          }}
        />
      </Grid>
    </>
  );
};

export default MedicalNotes;
