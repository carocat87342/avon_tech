import React, { useState, useEffect, useCallback } from "react";

import {
  makeStyles,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

import LightTooltip from "../../../../components/common/CustomTooltip";
import { StyledTableRowSm, StyledTableCellSm } from "../../../../components/common/StyledTable";
import SupportAPI from "../../../../services/supportStatus.service";
import CaseDialog from "./components/CaseDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "25px 0px",
  },
  title: {
    paddingBottom: theme.spacing(0.5),
  },

  tableContainer: {
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
  customSelect: {
    width: "185px",
    margin: theme.spacing(2, 0, 0, 0),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    width: "185px",
  },
  overFlowControl: {
    maxWidth: "130px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  statusGroup: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default function Support() {
  const classes = useStyles();
  const [cases, setCases] = useState("");
  const [caseStatus, setCaseStatus] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [noData, setNodata] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const toggleDialog = () => setShowDialog((prevState) => !prevState);

  const fetchStatus = () => {
    SupportAPI.getStatus().then((res) => setCaseStatus(res.data.data));
  };

  const fetchStatusSupport = useCallback(() => {
    SupportAPI.getSuport(cases).then((res) => {
      if (res.data.data.length > 0) {
        setSearchResults(res.data.data);
      } else {
        setSearchResults([]);
        setNodata("None Found");
      }
    });
  }, [cases]);

  useEffect(() => {
    fetchStatusSupport();
  }, [cases, fetchStatusSupport]);

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <>
      {!!showDialog && (
        <CaseDialog
          isOpen={showDialog}
          onClose={toggleDialog}
        />
      )}
      <div className={classes.root}>
        <Grid container direction="column">
          <Grid item md={4} xs={12}>
            <Grid container justify="space-between">
              <Typography component="h1" variant="h2" color="textPrimary" className={classes.title}>
                Technical Support
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => toggleDialog()}
              >
                New
              </Button>
            </Grid>

            <Typography component="p" variant="body2" color="textPrimary">
              This page is used for support
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <RadioGroup
              className={classes.statusGroup}
              row
              value={cases}
              onChange={(event) => setCases(event.target.value)}
              name="generic"
              defaultValue="all"
              aria-label="position"
            >
              {caseStatus.map((status) => (
                <FormControlLabel
                  key={status.id}
                  value={status.id}
                  label={status.name}
                  control={<Radio color="primary" />}
                />
              ))}
              <FormControlLabel
                key={Math.random()}
                value=""
                label="All"
                control={<Radio color="primary" />}
              />
            </RadioGroup>
          </Grid>
        </Grid>

        {searchResults.length > 0 ? (
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table size="small" className={classes.table} aria-label="a dense table">
              <TableHead>
                <StyledTableRowSm>
                  <StyledTableCellSm padding="checkbox">Case ID</StyledTableCellSm>
                  <StyledTableCellSm padding="checkbox">Client</StyledTableCellSm>
                  <StyledTableCellSm padding="checkbox">Subject</StyledTableCellSm>
                  <StyledTableCellSm padding="checkbox">Status</StyledTableCellSm>
                  <StyledTableCellSm padding="checkbox">Created</StyledTableCellSm>
                  <StyledTableCellSm padding="checkbox">Created By</StyledTableCellSm>
                  <StyledTableCellSm padding="checkbox">Updated</StyledTableCellSm>
                </StyledTableRowSm>
              </TableHead>
              <TableBody>
                {searchResults.map((result) => (
                  <StyledTableRowSm key={result.id}>
                    <StyledTableCellSm padding="checkbox" component="th" scope="row">
                      {result.id}
                    </StyledTableCellSm>
                    <StyledTableCellSm padding="checkbox" component="th" scope="row">
                      {result.client_name}
                    </StyledTableCellSm>
                    {result.subject.length > 40 ? (
                      <LightTooltip className={classes.overFlowControl} title={result.subject}>
                        <StyledTableCellSm padding="checkbox" component="th" scope="row">
                          {result.subject}
                        </StyledTableCellSm>
                      </LightTooltip>
                    ) : (
                      <StyledTableCellSm
                        padding="checkbox"
                        className={classes.overFlowControl}
                        component="th"
                        scope="row"
                      >
                        {result.subject}
                      </StyledTableCellSm>
                    )}
                    <StyledTableCellSm padding="checkbox" component="th" scope="row">
                      {result.case_status}
                    </StyledTableCellSm>
                    <StyledTableCellSm padding="checkbox" component="th" scope="row">
                      {moment(result.created).format("lll")}
                    </StyledTableCellSm>
                    <StyledTableCellSm padding="checkbox" component="th" scope="row">
                      {result.created_user}
                    </StyledTableCellSm>
                    <StyledTableCellSm padding="checkbox" component="th" scope="row">
                      {moment(result.updated).format("lll")}
                    </StyledTableCellSm>
                  </StyledTableRowSm>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography component="p" variant="body2" color="textPrimary">
            {noData}
          </Typography>
        )}
      </div>
    </>
  );
}
