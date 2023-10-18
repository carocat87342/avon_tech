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
import MessageToUserService from "../../../../services/message-to-user.service";
import { dateFormat } from "../../../../utils/helpers";

const UserHistory = (props) => {
  const { open, onClose } = props;
  const [userHistory, setUserHistory] = useState([]);

  const fetchUserHistory = useCallback(() => {
    MessageToUserService.getUserHistory().then((res) => {
      setUserHistory(res.data);
    });
  }, []);

  useEffect(() => {
    fetchUserHistory();
  }, [fetchUserHistory]);

  const UserHistoryTable = () => (
    <Table size="small" aria-label="simple table">
      <TableHead>
        <TableRow>
          <StyledTableCellLg>Updated</StyledTableCellLg>
          <StyledTableCellLg>Patient</StyledTableCellLg>
          <StyledTableCellLg>Assigned Name</StyledTableCellLg>
          <StyledTableCellLg>Updated Name</StyledTableCellLg>
          <StyledTableCellLg>Note</StyledTableCellLg>
        </TableRow>
      </TableHead>
      <TableBody>
        {userHistory.length ? userHistory.map((row) => (
          <StyledTableRowLg key={row.id}>
            <StyledTableCellLg component="th" scope="row">
              {dateFormat(row.updated)}
            </StyledTableCellLg>
            <StyledTableCellLg>{row.patient_name}</StyledTableCellLg>
            <StyledTableCellLg>{row.assigned_name}</StyledTableCellLg>
            <StyledTableCellLg>{row.updated_name}</StyledTableCellLg>
            <StyledTableCellLg>{row.note_assign}</StyledTableCellLg>
          </StyledTableRowLg>
        ))
        : (
          <StyledTableRowLg>
            <StyledTableCellLg colSpan={5}>
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
      title="Message From Patient User History"
      message={<UserHistoryTable />}
      cancelForm={onClose}
      hideActions
      size="md"
    />
  );
};

UserHistory.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UserHistory;
