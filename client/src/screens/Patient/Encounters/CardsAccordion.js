import React, { useState } from "react";

import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMoreOutlined";

import AdminNotes from "../components/AdminNotes/Content";
import Allergies from "../components/Allergies/Content";
import Billing from "../components/Billing/Content";
import DiagnosesSelectList from "../components/Diagnoses/DiagnosesSelectList";
import MedicalNotes from "../MedicalNotes/content";
import Requisitions from "../Requisitions/content";


const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    display: "block",
    maxHeight: 300,
    overflowY: "scroll",
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const CardsAccordion = () => {
  const [expanded, setExpanded] = useState({
    diagnoses: false,
    billing: false,
    allergies: false,
    requisitions: false,
    adminNotes: false,
    medicalNotes: false,
  });

  const handleChange = (panel) => {
    setExpanded({
      ...expanded,
      [panel]: !expanded[panel],
    });
  };

  return (
    <Grid>
      <Accordion square expanded={expanded.diagnoses} onChange={() => handleChange("diagnoses")}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Diagnoses</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DiagnosesSelectList />
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded.billing} onChange={() => handleChange("billing")}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Billing</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Billing />
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded.allergies} onChange={() => handleChange("allergies")}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Allergies</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Allergies />
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded.requisitions} onChange={() => handleChange("requisitions")}>
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header" expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Requisitions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Requisitions />
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded.adminNotes} onChange={() => handleChange("adminNotes")}>
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header" expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Admin Notes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AdminNotes />
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded.medicalNotes} onChange={() => handleChange("medicalNotes")}>
        <AccordionSummary aria-controls="panel6d-content" id="panel36-header" expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Medical Notes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MedicalNotes />
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};
export default CardsAccordion;
