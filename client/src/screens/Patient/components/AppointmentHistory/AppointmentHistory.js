import React, { useEffect, useState, useCallback } from "react";

import {
  Typography, makeStyles,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";

import { StyledTableCellLg, StyledTableRowLg } from "../../../../components/common/StyledTable";
import usePatientContext from "../../../../hooks/usePatientContext";
import PatientService from "../../../../services/patient.service";
import { mapAppointmentStatus } from "../../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(2, 0),
  },
  ml1: {
    marginLeft: theme.spacing(1),
  },
  label: {
    fontWeight: 600,
  },
  text: {
    fontSize: 14,
  },
}));

const AppointmentHistory = () => {
  const classes = useStyles();
  const { state } = usePatientContext();
  const { patientId } = state;
  const [appointmentHistory, setAppointmentHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPatientAppointmentHistoryHandler = useCallback(() => {
    PatientService.getAppointmentHistory(patientId).then((res) => {
      setAppointmentHistory(res.data);
      setIsLoading(false);
    });
  }, [patientId]);

  useEffect(() => {
    fetchPatientAppointmentHistoryHandler();
  }, [fetchPatientAppointmentHistoryHandler]);

  return (
    <TableContainer className={classes.tableContainer}>
      <Table size="small" className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCellLg>Start Date</StyledTableCellLg>
            <StyledTableCellLg>End Date</StyledTableCellLg>
            <StyledTableCellLg>Provider</StyledTableCellLg>
            <StyledTableCellLg>Patient</StyledTableCellLg>
            <StyledTableCellLg align="center">Status</StyledTableCellLg>
          </TableRow>
        </TableHead>
        <TableBody>
          {!!appointmentHistory
            && Boolean(appointmentHistory.length)
            ? appointmentHistory.map((item) => (
              <StyledTableRowLg key={`${item.start_dt}_${item.end_dt}_${item.status}`}>
                <TableCell>
                  {moment(item.start_dt).format("MMM D YYYY hh:mm A")}
                </TableCell>
                <TableCell>
                  {moment(item.end_dt).format("MMM D YYYY hh:mm A")}
                </TableCell>
                <TableCell>{item.provider}</TableCell>
                <TableCell>{item.patient}</TableCell>
                <TableCell align="center">{mapAppointmentStatus(item.status)}</TableCell>
              </StyledTableRowLg>
            ))
            : (
              <StyledTableRowLg>
                <TableCell colSpan={7}>
                  <Typography align="center" variant="body1">
                    {isLoading ? "Fetching Appointment History" : "No Records Found..."}
                  </Typography>
                </TableCell>
              </StyledTableRowLg>
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AppointmentHistory;
