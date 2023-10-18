import React, { useState, useEffect, useCallback } from "react";

import { makeStyles, withStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

import PatientPortalService from "../../../services/patient_portal/patient-portal.service";
import { dateFormat } from "../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  table: {
    maxWidth: "600px",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.grey,
    color: theme.palette.grey,
    fontSize: "14px",
    fontWeight: 700,
    paddingLeft: 0,
    border: "none",
    margin: theme.spacing(0),
    padding: theme.spacing(0),
  },
  body: {
    fontSize: 14,
    border: "none",
    margin: theme.spacing(0),
    padding: theme.spacing(0),
  },
}))(TableCell);

const Prescriptions = () => {
  const classes = useStyles();
  const [prescriptions, setPrescriptions] = useState([]);

  const fetchPrescriptions = useCallback(() => {
    PatientPortalService.getPrescriptions().then((res) => {
      setPrescriptions(res.data);
    });
  }, []);

  useEffect(() => {
    fetchPrescriptions();
  }, [fetchPrescriptions]);

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h2"
        color="textPrimary"
        className={classes.title}
      >
        Prescriptions
      </Typography>
      {Boolean(prescriptions.length)
        && (
          <TableContainer className={classes.tableContainer}>
            <Table size="small" className={classes.table} aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Drug & Type</StyledTableCell>
                  <StyledTableCell>Form</StyledTableCell>
                  <StyledTableCell>Strength</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prescriptions.map((item) => (
                  <TableRow>
                    <StyledTableCell>
                      {dateFormat(item.created)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.name}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.form}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.strength}
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
    </div>
  );
};

export default Prescriptions;
