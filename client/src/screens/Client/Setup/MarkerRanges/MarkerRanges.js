import React, {
  useState, useEffect, useCallback,
} from "react";

import {
  makeStyles,
  Grid,
  Button,
  Switch,
  Typography,
  IconButton,
  FormControlLabel,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/EditOutlined";
import { isEmpty } from "lodash";
import moment from "moment";
import { useSnackbar } from "notistack";

import Alert from "../../../../components/Alert";
import { StyledTableCellSm, StyledTableRowSm } from "../../../../components/common/StyledTable";
import useAuth from "../../../../hooks/useAuth";
import LabRangeService from "../../../../services/setup/labrange.service";
import { labRangeTableTranslation } from "../../../../utils/helpers";
import NewLabRange from "./components/NewLabRange";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "25px 0px",
  },
  w100: {
    minWidth: 100,
  },
  mb2: {
    marginBottom: theme.spacing(2),
  },
  labelContainer: {
    pointerEvents: "none",
  },
  pointerEnable: {
    pointerEvents: "auto",
  },
  title: {
    fontSize: "1.7em",
  },
  text: {
    lineHeight: "22px",
    fontSize: 12,
  },
  iconButton: {
    padding: theme.spacing(0.25),
    "& svg": {
      fontSize: "1rem",
    },
  },
  switchLabel: {
    marginRight: theme.spacing(1),
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.75,
    borderRadius: 4,
    letterSpacing: "0.02857em",
    textTransform: "capitalize",
  },
}));

const MarkerRanges = () => {
  const classes = useStyles();
  const { user: { client_id, firstname, lastname } } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const [selectedRange, setSelectedRange] = useState({});
  const [showNewRangeDialog, setShowNewRangeDialog] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [useFuncRange, setUseFuncRange] = useState(true);
  const [labRanges, setLabRanges] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const openDeleteDialog = (item) => {
    setSelectedRange(item);
    setShowDeleteDialog((prevstate) => !prevstate);
  };

  const closeDeleteDialog = () => {
    setSelectedRange({});
    setShowDeleteDialog((prevstate) => !prevstate);
  };

  const openResetDialog = () => {
    setShowResetDialog((prevstate) => !prevstate);
  };

  const closeResetDialog = () => {
    setShowResetDialog((prevstate) => !prevstate);
  };

  const resetButtonHandler = () => {
    if (client_id === 1) {
      enqueueSnackbar(`This function is not available for client #1`, { variant: "error" });
    } else {
      openResetDialog();
    }
  };

  const fetchLabRanges = useCallback(() => {
    LabRangeService.getLabRanges().then((res) => {
      setLabRanges(res.data);
      setIsLoading(false);
    })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchLabRanges();
  }, [fetchLabRanges]);

  const handleChangeFuncRange = (e, value) => {
    setUseFuncRange((prevState) => !prevState);
    const reqBody = {
      data: {
        functional_range: value ? 1 : 0,
      },
    };
    LabRangeService.updateLabRangeUse(reqBody).then((res) => {
      enqueueSnackbar(res.message, { variant: "success" });
    });
  };

  const deleteItemHandler = (item) => {
    const deleteItemId = item.id;
    const reqBody = {
      data: {
        marker_id: item.marker_id,
        seq: item.seq,
        compare_item: item.compare_item,
        compare_operator: item.compare_operator,
        compare_to: item.compare_to,
      },
    };
    LabRangeService.deleteLabRange(reqBody, deleteItemId).then((res) => {
      enqueueSnackbar(`${res.message}`, { variant: "success" });
      closeDeleteDialog();
      fetchLabRanges();
    });
  };

  const editItemHandler = (item) => {
    setSelectedRange(item);
    setShowNewRangeDialog(true);
  };

  const applyResetHandler = () => {
    LabRangeService.resetLabRanges().then((res) => {
      enqueueSnackbar(`${res.message}`, { variant: "success" });
      closeResetDialog();
    });
  };

  return (
    <>
      <Alert
        open={showResetDialog}
        title="Confirm Reset"
        message="Are you sure you want to reset all custom marker ranges to the original values?"
        applyButtonText="Reset"
        cancelButtonText="Cancel"
        applyForm={applyResetHandler}
        cancelForm={closeResetDialog}
      />
      <Alert
        open={showDeleteDialog}
        title="Confirm Delete"
        message="Are you sure you want to delete this custom marker range?"
        applyButtonText="Delete"
        cancelButtonText="Cancel"
        applyForm={() => deleteItemHandler(selectedRange)}
        cancelForm={closeDeleteDialog}
      />
      {!!showNewRangeDialog && (
        <NewLabRange
          isOpen={showNewRangeDialog}
          onClose={() => {
            if (!isEmpty(selectedRange)) {
              setSelectedRange({});
            }
            setShowNewRangeDialog(false);
          }}
          reloadData={fetchLabRanges}
          selectedItem={selectedRange}
          userName={`${firstname} ${lastname}`}
        />
      )}
      <div className={classes.root}>
        <Grid
          container
          justify="space-between"
          className={classes.mb2}
        >
          <Grid item lg={6}>
            <Grid container justify="space-between" alignItems="center">
              <Typography
                component="h1"
                variant="h2"
                color="textPrimary"
                className={classes.title}
              >
                Marker Ranges
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setShowNewRangeDialog(true)}
              >
                New
              </Button>
              <FormControlLabel
                control={(
                  <Switch
                    checked={useFuncRange}
                    color="primary"
                    size="medium"
                    name="switchBox"
                    onChange={handleChangeFuncRange}
                    inputProps={{ "aria-label": "secondary checkbox" }}
                    className={classes.pointerEnable} // enable clicking on switch only
                  />
                )}
                label="Use Custom Marker Ranges"
                labelPlacement="start"
                classes={{
                  label: classes.switchLabel,
                  root: classes.labelContainer, // to disable clicking of label
                }}
              />
            </Grid>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              component="label"
              className={classes.w100}
              onClick={() => resetButtonHandler()}
              disabled={!labRanges.length}
            >
              Reset Values
            </Button>
          </Grid>
        </Grid>

        <TableContainer className={classes.mb2}>
          <Table size="small" className={classes.table}>
            <TableHead>
              <TableRow>
                <StyledTableCellSm>Marker</StyledTableCellSm>
                <StyledTableCellSm>Sequence</StyledTableCellSm>
                <StyledTableCellSm>Compare Item</StyledTableCellSm>
                <StyledTableCellSm>Operator</StyledTableCellSm>
                <StyledTableCellSm>Compare To</StyledTableCellSm>
                <StyledTableCellSm>Low</StyledTableCellSm>
                <StyledTableCellSm>High</StyledTableCellSm>
                <StyledTableCellSm>Created</StyledTableCellSm>
                <StyledTableCellSm>Updated</StyledTableCellSm>
                <StyledTableCellSm align="center">Actions</StyledTableCellSm>
              </TableRow>
            </TableHead>
            <TableBody>
              {labRanges && labRanges.length
                ? labRanges.map((item) => (
                  <StyledTableRowSm key={`${item.marker_id}_${item.marker_name}_${item.seq}`}>
                    <TableCell>{item.marker_name}</TableCell>
                    <TableCell>{item.seq}</TableCell>
                    <TableCell>{labRangeTableTranslation(item.compare_item)}</TableCell>
                    <TableCell>{item.compare_operator}</TableCell>
                    <TableCell>
                      {item.compare_item === "G"
                        ? labRangeTableTranslation(item.compare_to) : item.compare_to}
                    </TableCell>
                    <TableCell>{item.range_low}</TableCell>
                    <TableCell>{item.range_high}</TableCell>
                    <TableCell>
                      {item.created ? moment(item.created).format("MMM D YYYY") : ""}
                    </TableCell>
                    <TableCell>
                      {item.updated ? moment(item.updated).format("MMM D YYYY") : ""}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton className={classes.iconButton} onClick={() => editItemHandler(item)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton className={classes.iconButton} onClick={() => openDeleteDialog(item)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </StyledTableRowSm>
                ))
                : (
                  <StyledTableRowSm>
                    <TableCell colSpan={10}>
                      <Typography className={classes.text} align="center" variant="body1">
                        {isLoading ? "Fetching marker ranges..." : "No Records Found..."}
                      </Typography>
                    </TableCell>
                  </StyledTableRowSm>
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default MarkerRanges;
