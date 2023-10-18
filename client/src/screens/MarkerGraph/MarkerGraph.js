import React, { useState, useEffect, useRef } from "react";

import {
  Grid, makeStyles, Button, IconButton,
} from "@material-ui/core";
import { mdiArrowLeftBold, mdiArrowRightBold } from "@mdi/js";
import Icon from "@mdi/react";
import moment from "moment";
import { useSnackbar } from "notistack";

import useAuth from "../../hooks/useAuth";
import usePatientContext from "../../hooks/usePatientContext";
import { setTestName, setSelectedTest } from "../../providers/Patient/actions";
import Tests from "../../services/test.service";
import { calculateFunctionalRange } from "../../utils/FunctionalRange";
import { calculateAge } from "../../utils/helpers";
import MarkerDefinition from "../Patient/components/MarkerDefinition";
import Graph from "./components/Graph";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: "10px",
    height: "100%",
  },
  filterbutton: {
    marginRight: "10px",
  },
  testGraphContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    flexDirection: "column",
    marginTop: "20px",
  },
  testGraph: {
    alignSelf: "center",
    width: 1000,
  },
  graphArrowIconContainer: {
    width: "70px",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  graphArrowIcon: {
    marginBottom: theme.spacing(1 / 3),
    marginRight: theme.spacing(1),
    color: "#2979ffdb",
    padding: theme.spacing(1),
  },
  filterButtonContainer: {
    display: "flex",
    maxHeight: "55px",
    marginTop: "15px",
    paddingBottom: "15px",
  },
}));

const TestGraph = () => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const { user } = useAuth();
  const { state, dispatch } = usePatientContext();
  const patientData = state.patientInfo.data;
  const { selectedTest } = state.tests;

  const [markerName, setMarkerName] = useState("");
  const [conventionalRange, setConventionalRange] = useState({});
  const [functionalRange, setFunctionalRange] = useState({});
  const [labMarker, setLabMarker] = useState([]);
  const [graph, setGraph] = useState(null);
  const [graphFilterData, setGraphFilterData] = useState(null);
  const [testId, setTestId] = useState("");
  const [markerIdCount, setMarkerIdCount] = useState(0);
  const [initGraphLoaded, setInitGraphLoaded] = useState(false); // flag for graph icon row click
  const ref = useRef(null);

  /* eslint-disable */
  useEffect(() => {
    if (selectedTest && !initGraphLoaded) { // user clicks table row graph icon 
      dispatch(setTestName(selectedTest.name));
    } else {
      const testTitle = markerName[0]?.name;
      if (!!testTitle) {
        dispatch(setTestName(testTitle));
      }
    }
  }, [markerName, selectedTest]);

  useEffect(() => { // componentWillUnmount
    return () => {
      if (!!selectedTest) {
        dispatch(setTestName(""));
        dispatch(setSelectedTest(null));
      }
    }
  }, [selectedTest]);

  /* eslint-disable */
  useEffect(() => {
    if (testId) {
      Tests.getTestMarkerName(testId).then(
        (res) => {
          const data = res?.data?.data;
          setMarkerName(data);
        },
        () => {
          enqueueSnackbar(`Unable to fetch by id ${testId}.`, {
            variant: "error",
          });
        }
      );
    }
    if (testId) {
      Tests.getConventionalRange(user.id, testId).then(
        (res) => {
          const data = res?.data?.data;
          const cRange = {
            high: Number(data[data.length - 1].range_high),
            low: Number(data[data.length - 1].range_low),
          };
          const graphData = res?.data.data.map((d) => ({
            id: d.marker_id,
            lab_dt: d.lab_dt,
            filename: d.filename,
            value: d.value,
          }));
          setGraph(graphData);
          setGraphFilterData(graphData);
          setConventionalRange(cRange);
        },
        () => {
          enqueueSnackbar("Unable to fetch Activity history.", {
            variant: "error",
          });
        }
      );
    }
    if (!initGraphLoaded) { //  FIX::Api was being called on every arrow button click 
      Tests.getLabMarker(user.id).then(
        (res) => {
          const data = res?.data;
          setLabMarker(data);
        },
        () => {
          enqueueSnackbar("Unable to fetch Activity history.", {
            variant: "error",
          });
        }
      );
    }
  }, [testId]);

  useEffect(() => {
    if (patientData?.functional_range && graph) {
      if (patientData?.functional_range[0]?.functional_range !== 0) {
        const patientAge = Number(calculateAge(patientData.dob).split(" ")[0]);
        const data = calculateFunctionalRange(
          testId,
          patientData?.gender,
          patientAge
        );
        setFunctionalRange(data);
      }
    }
  }, [graph, testId]);

  useEffect(() => {
    if (selectedTest && !initGraphLoaded) { // user clicks table row graph icon
      if (labMarker?.data?.length > 0) {
        const markerIndex = labMarker.data.findIndex(x => x.id === selectedTest.marker_id);
        setMarkerIdCount(markerIndex);
        setInitGraphLoaded(true);
      }
      setTestId(selectedTest.marker_id);
    } else if (labMarker?.data?.length > 0 && labMarker.data[markerIdCount]) {
      setTestId(labMarker.data[markerIdCount].id);
    }
  }, [labMarker, markerIdCount]);

  const previousMarker = () => {
    if (markerIdCount > 0) {
      setMarkerIdCount(markerIdCount - 1);
    }
  };
  const nextMarker = () => {
    if (labMarker?.data?.length > markerIdCount) {
      setMarkerIdCount(markerIdCount + 1);
    }
  };

  const filterDate = (filer) => {
    const endDate = moment();
    let startDate;
    if (filer === "month_6") {
      startDate = moment().subtract(6, "M");
    }
    if (filer === "month_3") {
      startDate = moment().subtract(3, "M");
    }
    if (filer === "year_1") {
      startDate = moment().subtract(12, "M");
    }
    if (filer === "year_2") {
      startDate = moment().subtract(24, "M");
    }
    if (filer === "year_3") {
      startDate = moment().subtract(36, "M");
    }
    if (filer === "year_4") {
      startDate = moment().subtract(48, "M");
    }

    const filterData = [];

    if (filer === "all") {
      setGraphFilterData(graph);
    } else {
      for (let i = 0; i < graph.length; i += 1) {
        const compareDate = moment(graph[i].lab_dt);
        const com = compareDate.isBetween(startDate, endDate);
        if (com) {
          filterData.push(graph[i]);
        }
      }
      setGraphFilterData(filterData);
    }
  };

  const markerDefinitionProps = {
    id: testId,
    name: markerName[0]?.name
  }

  return (
    <div className={classes.root} ref={ref}>
      <Grid container spacing={3}>
        <Grid item md={8} xs={12}>
          <div className={classes.graphArrowIconContainer}>
            <IconButton
              disabled={markerIdCount <= 0}
              onClick={previousMarker}
              className={classes.graphArrowIcon}
            >
              <Icon
                path={mdiArrowLeftBold}
                size={1.3}
                horizontal
                vertical
                rotate={180}
              />
            </IconButton>
            <IconButton
              disabled={markerIdCount + 1 >= labMarker?.data?.length}
              onClick={nextMarker}
              className={classes.graphArrowIcon}
            >
              <Icon
                path={mdiArrowRightBold}
                size={1.3}
                horizontal
                vertical
                rotate={180}
              />
            </IconButton>
          </div>

          {graph && graphFilterData && (
            <Graph
              data={graphFilterData}
              functionalRange={functionalRange}
              conventionalRange={conventionalRange}
            />
          )}
          <Grid item className={classes.filterButtonContainer}>
            <Button
              size="medium"
              type="submit"
              variant="contained"
              color="default"
              className={classes.filterbutton}
              onClick={() => filterDate("all")}
            >
              All
            </Button>
            <Button
              size="medium"
              type="submit"
              variant="contained"
              color="default"
              className={classes.filterbutton}
              onClick={() => filterDate("year_4")}
            >
              4 Years
            </Button>
            <Button
              size="medium"
              type="submit"
              variant="contained"
              color="default"
              className={classes.filterbutton}
              onClick={() => filterDate("year_3")}
            >
              3 Years
            </Button>
            <Button
              size="medium"
              type="submit"
              variant="contained"
              color="default"
              className={classes.filterbutton}
              onClick={() => filterDate("year_2")}
            >
              2 Years
            </Button>
            <Button
              size="medium"
              type="submit"
              variant="contained"
              color="default"
              className={classes.filterbutton}
              onClick={() => filterDate("year_1")}
            >
              1 Year
            </Button>
            <Button
              size="medium"
              type="submit"
              variant="contained"
              color="default"
              className={classes.filterbutton}
              onClick={() => filterDate("month_6")}
            >
              6 Months
            </Button>
            <Button
              size="medium"
              type="submit"
              variant="contained"
              color="default"
              className={classes.filterbutton}
              onClick={() => filterDate("month_3")}
            >
              3 Months
            </Button>
          </Grid>
        </Grid>
        <Grid item md={4} xs={12}>
          <MarkerDefinition
            showTitle={false}
            data={markerDefinitionProps}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default TestGraph;
