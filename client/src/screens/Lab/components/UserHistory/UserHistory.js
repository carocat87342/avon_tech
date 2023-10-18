import React, { useEffect, useState, useCallback } from "react";

import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
} from "@material-ui/core";
import PropTypes from "prop-types";

import { StyledTableCellLg, StyledTableRowLg } from "../../../../components/common/StyledTable";
import Dialog from "../../../../components/Dialog";
import LabService from "../../../../services/lab.service";
import { labStatusTypeToLabel, labSourceTypeToLabel, dateFormat } from "../../../../utils/helpers";

const UserHistory = (props) => {
  const { open, onClose, userId } = props;
  const [userHistory, setUserHistory] = useState([]);

  const fetchUserHistory = useCallback(() => {
    LabService.getUserHistory(userId).then((res) => {
      setUserHistory(res.data);
    });
  }, [userId]);

  useEffect(() => {
    fetchUserHistory();
  }, [fetchUserHistory]);

  const UserHistoryTable = () => (
    <Table size="small" aria-label="simple table">
      <TableHead>
        <TableRow>
          <StyledTableCellLg>Created</StyledTableCellLg>
          <StyledTableCellLg>Created By</StyledTableCellLg>
          <StyledTableCellLg>Filename</StyledTableCellLg>
          <StyledTableCellLg>Status</StyledTableCellLg>
          <StyledTableCellLg>Type</StyledTableCellLg>
          <StyledTableCellLg>Assigned To</StyledTableCellLg>
          <StyledTableCellLg>Document Note</StyledTableCellLg>
          <StyledTableCellLg>Assignment Note</StyledTableCellLg>
        </TableRow>
      </TableHead>
      <TableBody>
        {userHistory.length
          ? userHistory.map((row) => (
            <StyledTableRowLg key={`${row.id}_${row.note_assign}_${row.assigned_name}`}>
              <StyledTableCellLg component="th" scope="row">
                {dateFormat(row.created)}
              </StyledTableCellLg>
              <StyledTableCellLg>{row.created_name}</StyledTableCellLg>
              <StyledTableCellLg>{row.filename}</StyledTableCellLg>
              <StyledTableCellLg>{labStatusTypeToLabel(row.status)}</StyledTableCellLg>
              <StyledTableCellLg>{labSourceTypeToLabel(row.type)}</StyledTableCellLg>
              <StyledTableCellLg>{row.assigned_name}</StyledTableCellLg>
              <StyledTableCellLg>{row.note}</StyledTableCellLg>
              <StyledTableCellLg>{row.note_assign}</StyledTableCellLg>
            </StyledTableRowLg>
          ))
          : (
            <StyledTableRowLg>
              <StyledTableCellLg colSpan={7}>
                <Typography align="center" variant="body1">
                  No Records found...
                </Typography>
              </StyledTableCellLg>
            </StyledTableRowLg>
          )}
      </TableBody>
    </Table>
  );

  return (
    <Dialog
      open={open}
      title="User History"
      message={<UserHistoryTable />}
      cancelForm={onClose}
      hideActions
      size="lg"
    />
  );
};

UserHistory.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

export default UserHistory;
