import React, { useState } from "react";

import {
  Button,
  Grid,
  TextField,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import { StyledTableRowSm, StyledTableCellSm } from "../../../../components/common/StyledTable";
import useDidMountEffect from "../../../../hooks/useDidMountEffect";
import usePatientContext from "../../../../hooks/usePatientContext";
import { toggleAllergyDialog } from "../../../../providers/Patient/actions";
import PatientService from "../../../../services/patient.service";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 200,
  },
  inputRow: {
    margin: theme.spacing(3, 0),
  },
  mb2: {
    marginBottom: theme.spacing(2),
  },
  ml2: {
    marginLeft: theme.spacing(2),
  },
  text: {
    lineHeight: "21px",
  },
  pointer: {
    cursor: "pointer",
  },
}));

const Allergies = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = usePatientContext();
  const { reloadData } = props;
  const [searchText, setSearchText] = useState("");
  const [allergies, setAllergies] = useState([]);
  const [hasUserSearched, setHasUserSearched] = useState(false);
  const { patientId } = state;

  const fetchAllergies = (e, text) => {
    e.preventDefault();
    const reqBody = {
      data: {
        text,
      },
    };
    PatientService.searchAllergies(reqBody).then((res) => {
      setAllergies(res.data);
      setHasUserSearched(true);
    });
  };

  const onFormSubmit = (item) => {
    const reqBody = {
      data: {
        drug_id: item.id,
      },
    };
    PatientService.createAllergy(patientId, reqBody)
      .then((response) => {
        enqueueSnackbar(`${response.data.message}`, { variant: "success" });
        reloadData();
        dispatch(toggleAllergyDialog());
      });
  };

  useDidMountEffect(() => {
    if (!searchText.length) {
      setAllergies([]);
      setHasUserSearched(false);
    }
  }, [searchText]);

  return (
    <>
      {/* Commented out David Feb 2021
      <Grid className={classes.mb2}>
        <Typography
          variant="h3"
          color="textSecondary"
        >
          Select Allergy
        </Typography>
      </Grid>
      */}

      <form onSubmit={(e) => fetchAllergies(e, searchText)}>
        <Grid container alignItems="center" className={classes.mb2}>
          <Grid item xs={8}>
            <TextField
              fullWidth
              autoFocus
              size="small"
              variant="outlined"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Grid>
          <Button
            variant="outlined"
            type="submit"
            className={classes.ml2}
          >
            Search
          </Button>
        </Grid>
      </form>

      <Grid className={`${classes.root} ${classes.mb2}`}>
        <TableContainer>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <StyledTableCellSm>Name</StyledTableCellSm>
              </TableRow>
            </TableHead>
            <TableBody>
              {allergies.length
                ? allergies.map((item) => (
                  <StyledTableRowSm
                    key={item.id}
                    className={classes.pointer}
                    onClick={() => onFormSubmit(item)}
                  >
                    <StyledTableCellSm>{item.name}</StyledTableCellSm>
                  </StyledTableRowSm>
                ))
                : hasUserSearched ? (
                  <StyledTableRowSm>
                    <StyledTableCellSm colSpan={4}>
                      <Typography align="center" variant="body1" className={classes.text}>
                        No Records found...
                      </Typography>
                    </StyledTableCellSm>
                  </StyledTableRowSm>
                ) : null}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

Allergies.propTypes = {
  reloadData: PropTypes.func.isRequired,
};

export default Allergies;
