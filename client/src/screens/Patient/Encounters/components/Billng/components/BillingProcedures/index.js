import React, { useState, useEffect, useCallback } from "react";

import {
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { StyledTableRowSm, StyledTableCellSm } from "../../../../../../../components/common/StyledTable";
import usePatientContext from "../../../../../../../hooks/usePatientContext";
import PatientService from "../../../../../../../services/patient.service";

const useStyles = makeStyles(() => ({
  text: {
    fontSize: 14,
  },
}));

const BillingProcedures = () => {
  const classes = useStyles();
  const { state } = usePatientContext();
  const { patientId } = state;
  const { selectedEncounter } = state.encounters;
  const encounterId = selectedEncounter?.id || 1;

  const [billingProcedures, setBillingProcedures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBillingProcedures = useCallback(() => {
    PatientService.geEncountersBillingProcedures(patientId, encounterId).then((response) => {
      setBillingProcedures(response.data);
      setIsLoading(false);
    });
  }, [patientId, encounterId]);

  useEffect(() => {
    fetchBillingProcedures();
  }, [fetchBillingProcedures]);

  return (
    <Grid item xs={6}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCellSm>Marker</StyledTableCellSm>
              <StyledTableCellSm>Procedure</StyledTableCellSm>
              <StyledTableCellSm>Fee</StyledTableCellSm>
              <StyledTableCellSm>Amount</StyledTableCellSm>
            </TableRow>
          </TableHead>
          <TableBody>
            {billingProcedures.length
              ? billingProcedures.map((item) => (
                <StyledTableRowSm key={item.id}>
                  <StyledTableCellSm>{item.id}</StyledTableCellSm>
                  <StyledTableCellSm>{item.name}</StyledTableCellSm>
                  <StyledTableCellSm>
                    $
                    {item.fee}
                  </StyledTableCellSm>
                  <StyledTableCellSm>{item.amount || "-"}</StyledTableCellSm>
                </StyledTableRowSm>
              ))
              : (
                <StyledTableRowSm>
                  <StyledTableCellSm colSpan={4}>
                    <Typography align="center" variant="body1" className={classes.text}>
                      {isLoading ? "Loading..." : "No Records found..."}
                    </Typography>
                  </StyledTableCellSm>
                </StyledTableRowSm>
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default BillingProcedures;
