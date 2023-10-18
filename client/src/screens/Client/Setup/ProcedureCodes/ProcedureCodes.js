import React, { useEffect, useState } from "react";

import { CssBaseline, makeStyles, Typography } from "@material-ui/core";

import ProcedureService from "../../../../services/procedure.service";
import ProcedureForm from "./component/ProcedureForm";
import ProcedureTable from "./component/ProcedureTable";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "25px 0px",
  },
  title: {
    paddingBottom: theme.spacing(0.5),
  },
  noContent: {
    marginTop: theme.spacing(2),
  },
}));

export default function ProcedureCodes() {
  const classes = useStyles();
  const [labCompanyList, setLabCompanyList] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [formFields, setFormFields] = useState({
    procedureId: "",
    procedureDescription: "",
    labCompanyId: "",
    favorite: "",
    billable: "",
    self: "",
    group: "",
  });

  const handleInputChange = (e) => {
    const { value, checked, name } = e.target;
    setFormFields({
      ...formFields,
      [name]: value || checked,
    });
  };

  const fetchLabCompanyList = () => {
    ProcedureService.getLabCompnayList().then((res) => {
      setLabCompanyList(res.data);
    });
  };

  useEffect(() => {
    fetchLabCompanyList();
  }, []);

  const fetchProcedureCodeSearch = () => {
    ProcedureService.search(formFields).then((res) => {
      setSearchResult(res.data.data);
    });
  };

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <Typography
          component="h1"
          variant="h2"
          color="textPrimary"
          className={classes.title}
        >
          Procedures
        </Typography>
        {/*
        <Typography component="p" variant="body2" color="textPrimary">
          This page is used to manage procedure codes
        </Typography>
        */}
        <ProcedureForm
          labCompanyList={labCompanyList}
          fetchProcedureCodeSearch={fetchProcedureCodeSearch}
          handleInputChange={handleInputChange}
          labCompanyId={formFields.labCompanyId}
        />
        {searchResult.length > 0
          ? (
            <ProcedureTable
              searchResult={searchResult}
              fetchProcedureCodeSearch={fetchProcedureCodeSearch}
            />
          )
          : (
            <Typography align="center" variant="body1" className={classes.noContent}>
              No Records Found...
            </Typography>
          )}
      </div>
    </>
  );
}
