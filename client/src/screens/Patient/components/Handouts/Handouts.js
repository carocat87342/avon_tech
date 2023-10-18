import React, {
  useState, useCallback,
} from "react";

import {
  Button,
  Grid,
  TextField,
  Typography,
  TableContainer,
  Table,
  TableBody,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import { StyledTableRowSm, StyledTableCellSm } from "../../../../components/common/StyledTable";
import useDidMountEffect from "../../../../hooks/useDidMountEffect";
import usePatientContext from "../../../../hooks/usePatientContext";
import { toggleHandoutsDialog } from "../../../../providers/Patient/actions";
import PatientService from "../../../../services/patient.service";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 200,
  },
  actionContainer: {
    marginTop: theme.spacing(4),
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

const HandoutsForm = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { reloadData } = props;
  const [searchText, setSearchText] = useState("");
  const [allHandouts, setAllHandouts] = useState([]);
  const [hasUserSearched, setHasUserSearched] = useState(false);
  const { state, dispatch } = usePatientContext();
  const { patientId } = state;

  const fetchHandouts = useCallback((e, text) => {
    e.preventDefault();
    const reqBody = {
      data: {
        text,
      },
    };
    PatientService.searchHandouts(reqBody).then((res) => {
      setAllHandouts(res.data);
      setHasUserSearched(true);
    });
  }, []);

  useDidMountEffect(() => {
    if (!searchText.length) {
      setAllHandouts([]);
      setHasUserSearched(false);
    }
  }, [searchText]);

  const onFormSubmit = (item) => {
    const reqBody = {
      data: {
        handout_id: item.id,
      },
    };
    PatientService.createPatientHandout(patientId, reqBody)
      .then((response) => {
        enqueueSnackbar(`${response.data.message}`, { variant: "success" });
        reloadData();
        dispatch(toggleHandoutsDialog());
      });
  };

  return (
    <>
      {/* Commented out David Feb 2021
      <Grid className={classes.mb2}>
        <Typography variant="h3" color="textSecondary" gutterBottom>
          Patient Handouts
        </Typography>
      </Grid>
      */}

      <form onSubmit={(e) => fetchHandouts(e, searchText)}>
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
            <TableBody>
              {allHandouts.length
                ? allHandouts.map((item) => (
                  <StyledTableRowSm
                    key={item.id}
                    className={classes.pointer}
                    onClick={() => onFormSubmit(item)}
                  >
                    <StyledTableCellSm>{item.filename}</StyledTableCellSm>
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

HandoutsForm.propTypes = {
  reloadData: PropTypes.func.isRequired,
};

export default HandoutsForm;
