import React from "react";

import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import Proptypes from "prop-types";


const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: "100%",
  },
  controlLabel: {
    marginLeft: "0px",
    marginRight: "15px",
  },
  input: {
    padding: "10.5px",
  },
  formStyle: {
    display: "flex",
  },
  gridMargin: {
    marginRight: "10px",
    marginBottom: "8px",
  },
  submit: {
    paddingLeft: "30px",
    paddingRight: "30px",
    // fontSize: "1rem",
    marginTop: "8px",
  },
}));

const ProcedureForm = ({
  labCompanyId,
  labCompanyList,
  fetchProcedureCodeSearch,
  handleInputChange,
}) => {
  const classes = useStyles();

  const handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      fetchProcedureCodeSearch();
    }
  };

  return (
    <div style={{ marginTop: "15px" }}>
      <Grid className={classes.formStyle}>
        <Grid item xs={12} md={1} className={classes.gridMargin}>
          <TextField
            fullWidth
            autoFocus
            name="procedureId"
            label="Procedure ID"
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleInputChange}
            onKeyUp={handleKeyUp}
          />
        </Grid>
        <Grid item xs={12} md={3} className={classes.gridMargin}>
          <TextField
            fullWidth
            name="procedureDescription"
            label="Description"
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleInputChange}
            onKeyUp={handleKeyUp}
          />
        </Grid>
        <Grid item xs={12} md={2} className={classes.gridMargin}>
          <TextField
            fullWidth
            id="outlined-select-currency"
            select
            name="labCompanyId"
            label="Lab Company"
            value={labCompanyId}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            SelectProps={{
              native: true,
            }}
          >
            <option aria-label="None" value="" />
            {labCompanyList.map((lab) => (
              <option key={lab.id} value={lab.id}>
                {lab.name}
              </option>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <FormControlLabel
        control={(
          <Checkbox
            name="favorite"
            onChange={handleInputChange}
            onKeyUp={handleKeyUp}
            color="primary"
            size="small"
          />
        )}
        label="Favorites"
        labelPlacement="start"
        className={classes.controlLabel}
      />
      <FormControlLabel
        control={(
          <Checkbox
            onChange={handleInputChange}
            onKeyUp={handleKeyUp}
            name="billable"
            color="primary"
            size="small"
          />
        )}
        label="Billable"
        labelPlacement="start"
        className={classes.controlLabel}
      />
      <FormControlLabel
        control={(
          <Checkbox
            onChange={handleInputChange}
            onKeyUp={handleKeyUp}
            name="self"
            color="primary"
            size="small"
          />
        )}
        label="Self"
        labelPlacement="start"
        className={classes.controlLabel}
      />
      <FormControlLabel
        control={(
          <Checkbox
            onChange={handleInputChange}
            onKeyUp={handleKeyUp}
            name="group"
            color="primary"
            size="small"
          />
        )}
        label="Group"
        labelPlacement="start"
        className={classes.controlLabel}
      />
      <br />
      <Button
        size="medium"
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={fetchProcedureCodeSearch}
      >
        Search
      </Button>
    </div>
  );
};

ProcedureForm.propTypes = {
  labCompanyId: Proptypes.string.isRequired,
  labCompanyList: Proptypes.arrayOf(
    Proptypes.shape({
      id: Proptypes.number,
      name: Proptypes.string,
    }),
  ).isRequired,
  fetchProcedureCodeSearch: Proptypes.func.isRequired,
  handleInputChange: Proptypes.func.isRequired,
};

export default ProcedureForm;
