import React, { useCallback, useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import moment from "moment";
import { useSnackbar } from "notistack";

import { StyledTableRowLg, StyledTableCellLg } from "../../../../components/common/StyledTable";
import HandoutService from "../../../../services/setup/handouts.service";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "25px 0px",
  },
  table: {
    minWidth: 650,
  },
  mb2: {
    marginBottom: theme.spacing(2),
  },
  contentWrap: {
    display: "flex",
  },
  handoutTable: {
    marginTop: theme.spacing(2),
  },
  tableHead: {
    "& th": {
      fontWeight: 600,
    },
  },
  actionButton: {
    padding: 0,
    margin: 0,
    minWidth: 0,
  },
  w100: {
    minWidth: 100,
  },
  iconButton: {
    padding: theme.spacing(1),
    "& svg": {
      fontSize: "1.25rem",
    },
  },
}));

const Handouts = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [handouts, setHandouts] = useState([]);

  const fetchHandouts = useCallback(() => {
    HandoutService.getHandouts().then((response) => {
      setHandouts(response.data.data);
    });
  }, []);

  useEffect(() => {
    fetchHandouts();
  }, [fetchHandouts]);

  const createHandout = (reqBody) => {
    HandoutService.createHandouts(reqBody)
      .then((response) => {
        enqueueSnackbar(`${response.data.message}`, { variant: "success" });
        fetchHandouts();
      });
  };

  const handleHandoutsFile = (e) => {
    const { files } = e.target;
    const fd = new FormData();
    fd.append("file", files[0]);
    createHandout(fd);
  };

  const handleDelete = (id) => {
    HandoutService.deleteHandout(id).then((response) => {
      fetchHandouts();
      enqueueSnackbar(`${response.data.message}`, {
        variant: "success",
      });
    });
  };

  return (
    <div className={classes.root}>
      <Grid item md={4} xs={12} className={classes.mb2}>
        <Grid container justify="space-between">
          <Typography component="h1" variant="h2" color="textPrimary" className={classes.title}>
            Handouts
          </Typography>
          <Button variant="outlined" component="label" className={classes.w100}>
            Add
            <input
              type="file"
              id="file"
              accept=".pdf, .txt, .doc, .docx, image/*"
              hidden
              onChange={(e) => handleHandoutsFile(e)}
            />
          </Button>
        </Grid>
      </Grid>
      <Typography variant="h5" color="textPrimary" gutterBottom>
        These are files we give to patients about specific topics.
      </Typography>
      <TableContainer component={Paper} elevation={0} className={classes.handoutTable}>
        <Table className={classes.table} size="small">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <StyledTableCellLg width="25%">
                Filename
              </StyledTableCellLg>
              <StyledTableCellLg>Created</StyledTableCellLg>
              <StyledTableCellLg>CreatedBy</StyledTableCellLg>
              <StyledTableCellLg>Actions</StyledTableCellLg>
            </TableRow>
          </TableHead>
          <TableBody>
            {handouts.map((handout) => (
              <StyledTableRowLg key={handout.filename}>
                <StyledTableCellLg>
                  {handout.filename}
                </StyledTableCellLg>
                <StyledTableCellLg>{moment(handout.created).format("ll")}</StyledTableCellLg>
                <StyledTableCellLg>{handout.name}</StyledTableCellLg>
                <StyledTableCellLg>
                  <IconButton
                    aria-label="delete"
                    className={classes.iconButton}
                    onClick={() => handleDelete(handout.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </StyledTableCellLg>
              </StyledTableRowLg>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Handouts;
