import React, {
  useState, useEffect, useCallback, useRef,
} from "react";

import { makeStyles, Typography, withStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import clsx from "clsx";
import { useReactToPrint } from "react-to-print";

import useAuth from "../../../hooks/useAuth";
import PatientPortalService from "../../../services/patient_portal/patient-portal.service";
import { dateFormat } from "../../../utils/helpers";
import PdfTemplate from "../PdfTemplate";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  btnContainer: {
    margin: theme.spacing(1, 0),
  },
  btn: {
    marginRight: 15,
    minWidth: 120,
  },
  testListContainer: {
    marginTop: 20,
  },
  mt5: {
    marginTop: 5,
  },
  test: {
    cursor: "pointer",
  },
  tableContainer: {
    marginTop: theme.spacing(2),
    padding: 0,
  },
  tableTestsCell: {
    cursor: "pointer",
  },
  firstColumnOfStyledCell: {
    width: "9%",
  },
  secondColumnOfStyledCell: {
    width: "9%",
  },
  thirdColumnOfStyledCell: {
    width: "82%",
  },
  table: {
    "& th": {
      fontWeight: 600,
    },
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.grey,
    color: theme.palette.grey,
    fontSize: "14px",
    fontWeight: 700,
    paddingLeft: 0,
    border: "none",
    margin: theme.spacing(0),
    padding: theme.spacing(0),
  },
  body: {
    fontSize: 14,
    border: "none",
    margin: theme.spacing(0),
    padding: theme.spacing(0),
  },
}))(TableCell);

const LabBilling = () => {
  const classes = useStyles();
  const { lastVisitedPatient } = useAuth();
  const componentRef = useRef();
  const [labBillingList, setLabBillingList] = useState([]);
  // to get personal information like firstName, lastName
  const [testProfileInfo, setTestProfileInfo] = useState();
  const [profileTests, setProfileTests] = useState();

  const handlePrint = useReactToPrint({
    pageStyle: `
    @media print
    {
     
      footer#footer-sections a {
        background-image: unset;
      }

      @page {
        margin-top: 0;
        
        @bottom-center {
          content: "Page " counter(page) " of " counter(pages);
        }
      }

      @page{
        @bottom-center {
          content: "Page " counter(page) " of " counter(pages);
        }
      }
      
      
       body  {
        
       }
    } `,
    content: () => componentRef.current,
  });

  const fetchLabBilling = useCallback(() => {
    PatientPortalService.getLabBilling(lastVisitedPatient).then((res) => {
      setLabBillingList(res.data);
    });
  }, [lastVisitedPatient]);

  useEffect(() => {
    fetchLabBilling();
  }, [fetchLabBilling]);

  const fetchReportInformation = async (id) => {
    const testProfileInfoRes = await PatientPortalService.getTestProfileInfo(id);
    const profileTestsRes = await PatientPortalService.getProfileTests(id);
    setTestProfileInfo(testProfileInfoRes.data[0]);
    setProfileTests(profileTestsRes.data);
    handlePrint();
  };

  return (
    <div className={classes.root}>
      <Typography component="h1" variant="h2" color="textPrimary" className={classes.title}>
        Lab Billing
      </Typography>
      <Typography component="p" color="textPrimary">
        This page shows purchases of laboratory tests
      </Typography>
      {Boolean(labBillingList.length) && (
        <TableContainer className={classes.tableContainer}>
          <Table size="small" className={classes.table} aria-label="a dense table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Amount</StyledTableCell>
                <StyledTableCell>Tests</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {labBillingList.map((item) => (
                <TableRow style={{
                  border: "none",
                }}
                >
                  <StyledTableCell className={classes.firstColumnOfStyledCell}>
                    {dateFormat(item.dt)}
                  </StyledTableCell>
                  <StyledTableCell className={classes.secondColumnOfStyledCell}>
                    $
                    {Number(item.amount)?.toFixed(2)}
                  </StyledTableCell>
                  <StyledTableCell
                    className={clsx(classes.tableTestsCell, classes.thirdColumnOfStyledCell)}
                    onClick={() => fetchReportInformation(item.id)}
                  >
                    {item.tests}
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {testProfileInfo && profileTests && (
        <div style={{ display: "none" }}>
          <PdfTemplate testProfileInfo={testProfileInfo} profileTests={profileTests} ref={componentRef} />
        </div>
      )}
    </div>
  );
};

export default LabBilling;
