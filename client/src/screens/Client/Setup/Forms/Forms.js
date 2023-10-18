import React, { useState, useEffect, useCallback } from "react";


import {
  makeStyles,
  Grid,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Switch,
} from "@material-ui/core";
import moment from "moment";

import { StyledTableCellLg, StyledTableRowLg } from "../../../../components/common/StyledTable";
import FormsService from "../../../../services/setup/forms.service";

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
  table: {
    "& button": {
      padding: 6,
      minWidth: 40,
    },
  },
}));

const Forms = () => {
  const classes = useStyles();
  const [forms, setForms] = useState([]);

  const fetchForms = useCallback(() => {
    FormsService.getForms().then((res) => {
      setForms(res.data);
    });
  }, []);

  useEffect(() => {
    fetchForms();
  }, [fetchForms]);

  const statusChangeHandler = (index) => {
    const formsClone = [...forms];
    formsClone[index].active = !formsClone[index].active;
    setForms([...formsClone]);
  };

  return (
    <div className={classes.root}>
      <Grid
        item
        md={4}
        xs={12}
        className={classes.mb2}
      >
        <Grid
          container
          justify="space-between"
        >
          <Typography
            component="h1"
            variant="h2"
            color="textPrimary"
            className={classes.title}
          >
            Forms
          </Typography>
          <Button
            variant="outlined"
            component="label"
            className={classes.w100}
          >
            Add
            <input
              type="file"
              id="file"
              accept=".pdf, .txt, .doc, .docx, image/*"
              hidden
            // onChange={(e) => handleLabsFile(e)}
            />
          </Button>
        </Grid>
      </Grid>

      <Typography
        variant="h5"
        color="textPrimary"
        className={classes.title}
        gutterBottom
      >
        To have new patients fill out these forms after registration, turn Activate to On.
      </Typography>

      <Grid container>
        <Grid item md={8} xs={12}>
          <TableContainer>
            <Table size="small" className={classes.table}>
              <TableHead>
                <TableRow>
                  <StyledTableCellLg>Name</StyledTableCellLg>
                  <StyledTableCellLg>Notes</StyledTableCellLg>
                  <StyledTableCellLg>Active</StyledTableCellLg>
                  <StyledTableCellLg>Actions</StyledTableCellLg>
                  <StyledTableCellLg>Created</StyledTableCellLg>
                  <StyledTableCellLg>Created By</StyledTableCellLg>
                  <StyledTableCellLg>Updated</StyledTableCellLg>
                  <StyledTableCellLg>Updated By</StyledTableCellLg>
                </TableRow>
              </TableHead>
              <TableBody>
                {!!forms && forms.length
                  ? forms.map((item, index) => (
                    <StyledTableRowLg key={item.title}>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.notes}</TableCell>
                      <TableCell>
                        <Switch
                          size="small"
                          checked={item.active || false}
                          onChange={() => statusChangeHandler(index)}
                          name="active"
                          color="primary"
                        />
                      </TableCell>
                      <TableCell>
                        <Button variant="text">
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell>
                        {item.created ? moment(item.created).format("MMM D YYYY") : ""}
                      </TableCell>
                      <TableCell>{item.created_by}</TableCell>
                      <TableCell>
                        {item.updated ? moment(item.updated).format("MMM D YYYY") : ""}
                      </TableCell>
                      <TableCell>{item.updated_by}</TableCell>
                    </StyledTableRowLg>
                  ))
                  : (
                    <StyledTableRowLg>
                      <TableCell colSpan={8}>
                        <Typography align="center" variant="body1">
                          No Records Found...
                        </Typography>
                      </TableCell>
                    </StyledTableRowLg>
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default Forms;
