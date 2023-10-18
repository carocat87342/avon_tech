import React, { useState } from "react";

import {
  makeStyles,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
  FormControlLabel,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import moment from "moment";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import useAuth from "../../../../../hooks/useAuth";
import DrugsService from "../../../../../services/drugs.service";


const useStyles = makeStyles((theme) => ({
  tableContainer: {
    minWidth: 450,
    marginTop: theme.spacing(2),
  },
  actions: {
    textAlign: "center",
    display: "flex",
    border: "none",
    "& button": {
      fontSize: "12px",
    },
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.grey,
    color: theme.palette.grey,
    fontSize: "12px",
    fontWeight: 700,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    fontSize: 14,
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "& th": {
      fontSize: 12,
    },
    "& td": {
      fontSize: 12,
      height: "50px",
    },
  },
}))(TableRow);


const Drugstable = ({ result, fetchSearchDrugs }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const [state, setState] = useState(result);
  const [errors, setErrors] = useState([]);

  const changeHandler = (event, drugId) => {
    const payload = {
      data: {
        drug_id: drugId,
      },
    };
    const { checked } = event.target;
    setState(
      result.map((item) => {
        if (drugId === item.id) {
          // eslint-disable-next-line no-param-reassign
          item.favorite = checked;
        }
        return state;
      }),
    );
    if (checked === true) {
      DrugsService.addFavorite(drugId, user.id, payload).then(
        (response) => {
          setTimeout(() => {
            enqueueSnackbar(`${response.data.message}`, {
              variant: "success",
            });
          }, 300);
        },
        (error) => {
          setTimeout(() => {
            setErrors(error.response.error);
          }, 300);
        },
      );
    } else {
      DrugsService.deleteFavorite(drugId).then(
        (response) => {
          setTimeout(() => {
            enqueueSnackbar(`${response.data.message}`, {
              variant: "success",
            });
          }, 300);
        },
        (error) => {
          setTimeout(() => {
            setErrors(error.response.error);
          }, 300);
        },
      );
    }
  };

  return (
    <div>
      {errors
        && errors.map((error, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Alert severity="error" key={index}>
            {error.msg}
          </Alert>
        ))}
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table
          size="small"
          className={classes.table}
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell padding="checkbox">Name</StyledTableCell>
              <StyledTableCell padding="checkbox">Favorites</StyledTableCell>
              <StyledTableCell padding="checkbox">Updated</StyledTableCell>
              <StyledTableCell padding="checkbox">Updated By</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result.map((drug) => (
              <StyledTableRow key={drug.id}>
                <TableCell padding="checkbox" component="th" scope="row">
                  {drug.name}
                </TableCell>
                <TableCell padding="checkbox">
                  <FormControlLabel
                    control={(
                      <Switch
                        size="small"
                        checked={Boolean(drug.favorite)}
                        name="switchBox"
                        color="primary"
                        onChange={(e) => {
                          changeHandler(e, drug.id);
                          setTimeout(() => {
                            fetchSearchDrugs();
                          }, 200);
                        }}
                      />
                    )}
                  />
                </TableCell>
                <TableCell padding="checkbox">
                  {drug.updated ? moment(drug.updated).format("lll") : ""}
                </TableCell>
                <TableCell padding="checkbox">{drug.updated_name}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

Drugstable.propTypes = {
  result: PropTypes.arrayOf(
    PropTypes.arrayOf({
      id: PropTypes.string,
      name: PropTypes.string,
      favorite: PropTypes.string,
      updated: PropTypes.string,
      updated_name: PropTypes.string,
    }),
  ).isRequired,
  fetchSearchDrugs: PropTypes.func.isRequired,
};

export default Drugstable;
