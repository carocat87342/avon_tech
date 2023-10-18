import React, { useState } from "react";

import {
  Grid, Button, Switch, TextField,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

import Dialog from "../../../../../../components/Dialog";
import useAuth from "../../../../../../hooks/useAuth";
import ProcedureCodesService from "../../../../../../services/procedure.service";

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
    color: theme.palette.text.secondary,
    "& .MuiSelect-select": {
      minWidth: 120,
    },
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
  root: {
    "& .MuiTypography-root": {
      marginLeft: "5px",
    },
  },
  formHelperText: {
    width: "220px",
    fontSize: "12px",
    paddingLeft: "10px",
  },
  modalAction: {
    marginTop: theme.spacing(2),
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
      prefix="$"
    />
  );
}
NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const EditProcedureCodeModal = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const {
    isOpen, handleOnClose, selectedProcedure, reloadData,
  } = props;

  const [formFields, setFormFields] = useState({ ...selectedProcedure });

  const updateFormFields = (key, value) => {
    setFormFields({
      ...formFields,
      [key]: value,
    });
  };

  const handleEditProcedureCode = () => {
    const reqBody = {
      data: {
        procedureId: selectedProcedure?.id,
        favorite: formFields.favorite,
        billable: formFields.billable,
        fee: formFields.fee,
        notes: formFields.notes,
      },
    };
    ProcedureCodesService.updateClientProcedure(selectedProcedure?.id, user.id, reqBody)
      .then((response) => {
        setTimeout(() => {
          enqueueSnackbar(`${response.data.message}`, {
            variant: "success",
          });
        }, 300);
      });
    handleOnClose();
    setTimeout(() => {
      reloadData();
    }, 200);
  };

  return (
    <Dialog
      size="sm"
      open={isOpen}
      cancelForm={handleOnClose}
      title="Edit Procedure"
      message={(
        <>
          <form onSubmit={handleEditProcedureCode}>
            <div className={classes.root}>
              <FormControl component="div" className={classes.formControl}>
                <Grid item md={3} className={classes.gridMargin}>
                  <TextField
                    fullWidth
                    label="Procedure ID"
                    value={selectedProcedure?.id}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled
                  />
                </Grid>
              </FormControl>
              <FormControl component="div" className={classes.formControl}>
                <Grid item xs={6} md={9} className={classes.gridMargin}>
                  <TextField
                    fullWidth
                    label="Description"
                    value={formFields.proc}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled
                  />
                </Grid>
              </FormControl>
              <FormControl component="div" className={classes.formControl}>
                <Grid item md={2} className={classes.gridMargin}>
                  <TextField
                    fullWidth
                    autoFocus
                    name="fee"
                    label="Fee"
                    value={formFields.fee || ""}
                    variant="outlined"
                    size="small"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => updateFormFields("fee", e.target.value)}
                  />
                </Grid>
                <p className={classes.formHelperText}>The fee you will charge your patients</p>
              </FormControl>
              <FormControl component="div" className={classes.switchControl}>
                <Switch
                  checked={Boolean(formFields.favorite)}
                  color="primary"
                  size="small"
                  name="switchBox"
                  onChange={(e) => updateFormFields("favorite", e.target.checked)}
                />
                <p className={classes.formHelperText}>Favorite</p>
              </FormControl>
              <FormControl component="div" className={classes.switchControl}>
                <Switch
                  checked={Boolean(formFields.billable)}
                  size="small"
                  color="primary"
                  name="switchBox"
                  onChange={(e) => updateFormFields("billable", e.target.checked)}

                />
                <p className={classes.formHelperText}>Billable</p>
              </FormControl>
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
                    rows: 8,
                  }}
                  value={formFields.notes}
                  onChange={(e) => updateFormFields("notes", e.target.value)}
                />
              </FormControl>

              <Grid className={classes.modalAction}>
                <Button
                  variant="outlined"
                  type="submit"
                >
                  Save
                </Button>
              </Grid>
            </div>
          </form>
        </>
      )}
    />
  );
};

EditProcedureCodeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleOnClose: PropTypes.func.isRequired,
  reloadData: PropTypes.func.isRequired,
  selectedProcedure: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
export default EditProcedureCodeModal;
