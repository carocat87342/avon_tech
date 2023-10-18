import React, { useState, useEffect, useCallback } from "react";

import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
} from "@material-ui/core";
import PropTypes from "prop-types";

import { StyledTableCellSm, StyledTableRowSm } from "../../../../components/common/StyledTable";
import LabService from "../../../../services/lab.service";
import { labStatusTypeToLabel, labSourceTypeToLabel, dateFormat } from "../../../../utils/helpers";

const LabHistory = (props) => {
  const { labId } = props;
  const [labHistory, setLabHistory] = useState([]);

  const fetchLabHistory = useCallback(() => {
    LabService.getLabHistory(labId).then((res) => {
      setLabHistory(res.data);
    });
  }, [labId]);

  useEffect(() => {
    fetchLabHistory();
  }, [fetchLabHistory]);

  return (
    <TableContainer>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCellSm>Created</StyledTableCellSm>
            <StyledTableCellSm>Created By</StyledTableCellSm>
            <StyledTableCellSm>Status</StyledTableCellSm>
            <StyledTableCellSm>Type</StyledTableCellSm>
            <StyledTableCellSm>Assigned To</StyledTableCellSm>
            <StyledTableCellSm>Patient</StyledTableCellSm>
            <StyledTableCellSm>Note</StyledTableCellSm>
          </TableRow>
        </TableHead>
        <TableBody>
          {labHistory.length ? labHistory.map((row) => (
            <StyledTableRowSm key={`${row.created}_${row.created_by}_${row.assigned_to}`}>
              <StyledTableCellSm component="th" scope="row">
                {dateFormat(row.created)}
              </StyledTableCellSm>
              <StyledTableCellSm>{row.created_by}</StyledTableCellSm>
              <StyledTableCellSm>{labStatusTypeToLabel(row.status)}</StyledTableCellSm>
              <StyledTableCellSm>{labSourceTypeToLabel(row.type)}</StyledTableCellSm>
              <StyledTableCellSm>{row.assigned_to}</StyledTableCellSm>
              <StyledTableCellSm>{row.patient_name}</StyledTableCellSm>
              <StyledTableCellSm>{row.note}</StyledTableCellSm>
            </StyledTableRowSm>
          ))
          : (
            <StyledTableRowSm>
              <StyledTableCellSm colSpan={7}>
                <Typography align="center" variant="body1">
                  No Records found...
                </Typography>
              </StyledTableCellSm>
            </StyledTableRowSm>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

LabHistory.propTypes = {
  labId: PropTypes.number.isRequired,
};


export default LabHistory;
