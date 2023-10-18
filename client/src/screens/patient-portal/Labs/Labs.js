import React, { useCallback, useState, useEffect } from "react";

import {
  makeStyles, withStyles, Typography, Grid, Button,
} from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import { useSnackbar } from "notistack";

import Dialog from "../../../components/Dialog";
import useAuth from "../../../hooks/useAuth";
import useDidMountEffect from "../../../hooks/useDidMountEffect";
import PatientPortalService from "../../../services/patient_portal/patient-portal.service";
import PatientLabDocumentViewer from "./modal/PatientLabDocumentViewer";


const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  tab: {
    paddingBottom: 5,
    margin: "5px 16px 5px 0",
    fontSize: 14,
    cursor: "pointer",
  },
  tabSelected: {
    paddingBottom: 0,
    margin: "5px 16px 6px 0",
    fontSize: 14,
    cursor: "pointer",
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
  newButton: {
    fontSize: "14px",
    marginLeft: theme.spacing(4),
  },
}));

const StyledTableCell = withStyles(() => ({
  head: {
    whiteSpace: "nowrap",
    fontSize: 16,
    fontWeight: 700,
    padding: "6px 24px 6px 2px",
    borderBottom: "unset",
  },
  body: {
    fontSize: 14,
    borderBottom: "unset",
  },
}))(TableCell);

const StyledTableRow = withStyles(() => ({
  root: {
    fontSize: 14,
    cursor: "pointer",
    "& th": {
      fontSize: 14,
      whiteSpace: "nowrap",
      padding: "2px 16px 2px 2px",
      lineHeight: "16px",
    },
    "& td": {
      fontSize: 14,
      whiteSpace: "nowrap",
      padding: "2px 16px 2px 2px",
      lineHeight: "16px",
    },
  },
}))(TableRow);

const Labs = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { lastVisitedPatient, user } = useAuth();
  const [labDocuments, setLabDocuments] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [isLabModalOpen, setIsLabModalOpen] = useState(false);
  const [documentName, setDocumentName] = useState("");

  const fetchLabDocuments = useCallback(() => {
    PatientPortalService.getLabDocuments(lastVisitedPatient).then((res) => {
      setLabDocuments(res.data);
    });
  }, [lastVisitedPatient]);

  const sortDocumentByStatus = useCallback((selectedTab) => {
    if (selectedTab === 0) { // (All)
      const allData = labDocuments.filter((x) => x.status !== "D");
      setTableData([...allData]);
    } else if (selectedTab === 1) { // (Labs)
      const labsData = labDocuments.filter((x) => x.type === "L" && x.status !== "D");
      setTableData([...labsData]);
    } else if (selectedTab === 2) { // (Imaging)
      const imagingData = labDocuments.filter((x) => x.type === "I" && x.status !== "D");
      setTableData([...imagingData]);
    } else if (selectedTab === 3) { // (Un-Categorized)
      const uncategorizedData = labDocuments.filter((x) => (x.type !== "L" && x.type !== "M"
        && x.type !== "I" && x.status !== "D"));
      setTableData([...uncategorizedData]);
    } else if (selectedTab === 4) { // (Misc)
      const uncategorizedData = labDocuments.filter((x) => (x.type === "M" && x.status !== "D"));
      setTableData([...uncategorizedData]);
    }
  }, [labDocuments]);

  useEffect(() => {
    fetchLabDocuments();
  }, [fetchLabDocuments]);

  useDidMountEffect(() => {
    // This will only be called when 'labDocuments' changes, not on initial render
    sortDocumentByStatus(tabValue);
  }, [labDocuments]);

  const handleTabChange = (newValue) => {
    if (newValue !== tabValue) {
      sortDocumentByStatus(newValue);
    }
    setTabValue(newValue);
  };

  const handleLabsFile = (e) => {
    const { files } = e.target;
    if (!!files && files.length) {
      const fd = new FormData();
      fd.append("file", files[0]);

      PatientPortalService.createLabDocuments(lastVisitedPatient, fd)
        .then((response) => {
          enqueueSnackbar(`${response.message}`, { variant: "success" });
          fetchLabDocuments();
        })
        .catch((error) => {
          const resMessage = (error.response
            && error.response.data
            && error.response.data.message)
            || error.message
            || error.toString();
          enqueueSnackbar(`${resMessage}`, { variant: "error" });
        });
    }
  };

  const handleDocumentClick = (doc) => {
    setDocumentName(doc.filename);
    setIsLabModalOpen(true);
  };

  return (
    <div className={classes.root}>

      <Grid
        item
        sm={6}
        xs={12}
      >
        <Grid
          container
          justify="flex-start"
        >
          <Typography
            component="h1"
            variant="h2"
            color="textPrimary"
            className={classes.title}
          >
            Documents / Lab Results
          </Typography>
          <Button
            component="label"
            variant="outlined"
            color="primary"
            className={classes.newButton}
          >
            New
            <input
              type="file"
              id="file"
              accept=".pdf, .txt, .doc, .docx, image/*"
              hidden
              onChange={(e) => handleLabsFile(e)}
            />
          </Button>
        </Grid>
      </Grid>

      <Grid container>
        <Typography
          className={tabValue === 0 ? classes.tabSelected : classes.tab}
          onClick={() => handleTabChange(0)}
          component="span"
        >
          All
        </Typography>
        <Typography
          className={tabValue === 1 ? classes.tabSelected : classes.tab}
          onClick={() => handleTabChange(1)}
          component="span"
        >
          Labs
        </Typography>
        <Typography
          className={tabValue === 2 ? classes.tabSelected : classes.tab}
          onClick={() => handleTabChange(2)}
          component="span"
        >
          Imaging
        </Typography>
        <Typography
          className={tabValue === 4 ? classes.tabSelected : classes.tab}
          onClick={() => handleTabChange(4)}
          component="span"
        >
          Misc
        </Typography>
        <Typography
          className={tabValue === 3 ? classes.tabSelected : classes.tab}
          onClick={() => handleTabChange(3)}
          component="span"
        >
          Uncategorized
        </Typography>
      </Grid>

      <Grid item sm={4} xs={12}>
        {Boolean(tableData.length) && (
          <TableContainer className={classes.tableContainer}>
            <Table size="small" className={classes.table}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Created</StyledTableCell>
                  <StyledTableCell>Filename</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((item) => (
                  <StyledTableRow
                    key={`${item.created}_${item.filename}`}
                    onClick={() => handleDocumentClick(item)}
                  >
                    <StyledTableCell component="th" scope="item">
                      {moment(item.created).format("MMM D YYYY")}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.filename}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

      </Grid>
      {isLabModalOpen
        && (
          <Dialog
            open={isLabModalOpen}
            cancelForm={() => setIsLabModalOpen(false)}
            title="Lab Document"
            message={(
              <PatientLabDocumentViewer
                documentName={documentName}
                patientId={user?.client_id}
              />
            )}
            hideActions
            size="sm"
            fullHeight
            transitionComponent={Transition}
          />

        )}
    </div>
  );
};

export default Labs;
