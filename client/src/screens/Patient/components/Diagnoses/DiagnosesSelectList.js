import React, { useState, useEffect } from "react";

import {
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import PropTypes from "prop-types";
import Select from "react-select";

import PatientService from "../../../../services/patient.service";
import SelectCustomStyles from "../../../../styles/SelectCustomStyles";

const DiagnosesSelectList = (props) => {
  const { getSelectedDiagnosis } = props;
  const [diagnosis, setDiagnosis] = useState([]);
  const [selectedDiagnosis, setSelectedDiagnoses] = useState([]);

  const fetchDiagnosis = () => {
    PatientService.searchICD("").then((res) => {
      setDiagnosis(res.data);
    });
  };

  useEffect(() => {
    fetchDiagnosis("");
  }, []);

  return (
    <>
      <Select
        value={selectedDiagnosis}
        options={diagnosis.length ? diagnosis : []}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.id}
        onChange={(value) => {
          setSelectedDiagnoses(value);
          getSelectedDiagnosis(value);
        }}
        styles={SelectCustomStyles}
        placeholder="Search ICDs"
        isClearable
      />

      <List component="ul">
        {diagnosis.map((diagnose) => (
          <ListItem
            onClick={() => {
              setSelectedDiagnoses(diagnose);
              getSelectedDiagnosis(diagnose);
            }}
            key={diagnose.id}
            disableGutters
            button
          >
            <ListItemText primary={diagnose.name} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

DiagnosesSelectList.defaultProps = {
  getSelectedDiagnosis: () => { },
};

DiagnosesSelectList.propTypes = {
  getSelectedDiagnosis: PropTypes.func,
};

export default DiagnosesSelectList;
