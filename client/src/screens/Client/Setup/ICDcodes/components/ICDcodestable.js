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
import icdcodesService from "../../../../../services/icdcodes.service";

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

const ICDcodestable = ({ result, fetchSearchIcdCodes }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const [state, setState] = useState(result);
  const [errors, setErrors] = useState([]);

  const changeHandler = (event, icdcode_id) => {
    const payload = {
      data: {
        icd_id: icdcode_id,
      },
    };
    const { checked } = event.target;
    setState(
      result.map((item) => {
        if (icdcode_id === item.id) {
          // eslint-disable-next-line no-param-reassign
          item.favorite = checked;
        }
        return state;
      }),
    );
    if (checked === true) {
      icdcodesService.addFavorite(icdcode_id, user.id, payload).then(
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
      icdcodesService.deleteFavorite(icdcode_id).then(
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
              <StyledTableCell padding="checkbox">Code</StyledTableCell>
              <StyledTableCell padding="checkbox">Description</StyledTableCell>
              <StyledTableCell padding="checkbox">Favorites</StyledTableCell>
              <StyledTableCell padding="checkbox">Updated</StyledTableCell>
              <StyledTableCell padding="checkbox">Updated By</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result.map((code) => (
              <StyledTableRow key={code.id}>
                <TableCell padding="checkbox" component="th" scope="row">
                  {code.id}
                </TableCell>
                <TableCell padding="checkbox">{code.name}</TableCell>
                <TableCell padding="checkbox">
                  <FormControlLabel
                    control={(
                      <Switch
                        size="small"
                        checked={Boolean(code.favorite)}
                        name="switchBox"
                        color="primary"
                        onChange={(e) => {
                          changeHandler(e, code.id);
                          setTimeout(() => {
                            fetchSearchIcdCodes();
                          }, 200);
                        }}
                      />
                    )}
                  />
                </TableCell>
                <TableCell padding="checkbox">
                  {code.updated ? moment(code.updated).format("lll") : ""}
                </TableCell>
                <TableCell padding="checkbox">{code.updated_name}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

ICDcodestable.propTypes = {
  result: PropTypes.arrayOf(
    PropTypes.arrayOf({
      id: PropTypes.string,
      name: PropTypes.string,
      favorite: PropTypes.string,
      updated: PropTypes.string,
      updated_name: PropTypes.string,
    }),
  ).isRequired,
  fetchSearchIcdCodes: PropTypes.func.isRequired,
};

export default ICDcodestable;
