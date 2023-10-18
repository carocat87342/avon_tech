import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useReducer,
  createContext,
} from "react";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";
import { Responsive, WidthProvider } from "react-grid-layout";
import { useHistory, useParams } from "react-router-dom";
import logger from "use-reducer-logger";

import Card from "../../components/common/Card";
import Dialog from "../../components/Dialog";
import useAuth from "../../hooks/useAuth";
import PatientReducer from "../../providers/Patient";
import {
  saveLayout,
  resetEditorText,
  setPatientId,
  setPatientData,
  setPatientHistory,
  setAdminNotes,
  setForms,
  setHandouts,
  setDocuments,
  setEncounters,
  setMedicalNotes,
  setAllergies,
  setMessages,
  setRequisitions,
  setTests,
  setDiagnoses,
  setActiveDiagnoses,
  setMedications,
  setBilling,
  setBalance,
  setPaymentMethods,
  togglePatientInfoDialog,
  togglePatientHistoryDialog,
  toggleAdminHistoryDialog,
  toggleAdminFormDialog,
  toggleFormsViewDialog,
  toggleFormsExpandDialog,
  toggleHandoutsDialog,
  toggleHandoutsExpandDialog,
  toggleDocumentsExpandDialog,
  toggleEncountersDialog,
  toggleEncountersExpandDialog,
  toggleMedicalNotesDialog,
  toggleMedicalNotesFormDialog,
  toggleAllergyDialog,
  toggleAllergyExpandDialog,
  toggleMessageDialog,
  toggleMessageExpandDialog,
  toggleMessageDialogPage,
  toggleRequisitionDialog,
  toggleRequisitionExpandDialog,
  toggleTestsExpandDialog,
  toggleTestsChartExpandDialog,
  toggleDiagnosesDialog,
  toggleDiagnosesExpandDialog,
  setDiagnosesStatus,
  toggleMedicationDialog,
  toggleMedicationExpandDialog,
  toggleBillngExpandDialog,
  toggleNewTransactionDialog,
  togglePaymentDialog,
  togglePatientAppointmentHistoryDialog,
  resetSelectedMessage,
  toggleInsightsExpandDialog,
  resetStore,
} from "../../providers/Patient/actions";
import initialState from "../../providers/Patient/initialState";
import PatientService from "../../services/patient.service";
import {
  FirstColumnPatientCards,
  SecondColumnPatientCards,
  ThirdColumnPatientCards,
  FourthColumnPatientCards,
} from "../../static/patient";
import { isDev } from "../../utils/helpers";
import {
  getSecondColumnHeight,
  getThirdColumnHeight,
  getFourthColumnHeight,
} from "../../utils/patientLayoutHelpers";
import MarkerGraph from "../MarkerGraph";
import ProcessMessagePage from "../ProcessMessage";
import {
  AdminNotesForm,
  AdminNotesHistory,
  AdminNotesCardContent,
} from "./components/AdminNotes";
import {
  Allergies,
  AllergiesCardContent,
  AllergiesDetails,
} from "./components/Allergies";
import AppointmentHistory from "./components/AppointmentHistory";
import {
  BasicInfo,
  PatientCardContent,
  PatientHistoryDetails,
} from "./components/BasicInfo";
import {
  TransactionForm,
  BillingDialog,
  BillingCardContent,
  BillingDetails,
} from "./components/Billing";
import {
  DiagnosesForm,
  DiagnosesCardContent,
  DiagnosesDetails,
} from "./components/Diagnoses";
import { DocumentsCardContent } from "./components/Documents";
import {
  HandoutsForm,
  HandoutsCardContent,
  HandoutsDetails,
} from "./components/Handouts";
import InsightsCardContent from "./components/Insights/content";
import EncountersForm from "./Encounters";
import EncountersCardContent from "./Encounters/content";
import EncountersDetails from "./Encounters/details";
import Form from "./Form";
import FormCardContent from "./Form/content";
import FormDetails from "./Form/details";
import MedicalNotesForm from "./MedicalNotes";
import MedicalNotesCardContent from "./MedicalNotes/content";
import MedicalNotesDetails from "./MedicalNotes/details";
import MedicationsForm from "./Medications";
import MedicationsCardContent from "./Medications/content";
import MedicationsDetails from "./Medications/details";
import NewMessageForm from "./Messages";
import MessagesCardContent from "./Messages/content";
import MessagesDetails from "./Messages/details";
import RequisitionsForm from "./Requisitions";
import RequisitionsCardContent from "./Requisitions/content";
import RequisitionsDetails from "./Requisitions/details";
import TestsCardContent from "./Tests/content";
import "react-grid-layout/css/styles.css";
// import "react-resizable/css/styles.css";
import "../../reactGridLayout.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const useStyles = makeStyles(() => ({
  main: {
    paddingTop: "15px",
    minHeight: "calc(100vh - 163px)",
  },
}));

const THIRTY_DAYS_IN_MILI_SECONDS = 1000 * 60 * 60 * 24 * 30;

export const PatientContext = createContext(null);

const Patient = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const inputFile = useRef(null);
  const history = useHistory();
  const { patientId } = useParams();
  const { user, updateLastVisitedPatient } = useAuth();
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(["last_viewed_patient_id"]);
  const userId = user.id;

  const [state, dispatch] = useReducer(
    isDev() ? logger(PatientReducer) : PatientReducer,
    initialState,
  );

  const {
    patientInfo,
    adminNotes,
    forms,
    handouts,
    documents,
    encounters,
    editorText,
    medicalNotes,
    allergies,
    messages,
    requisitions,
    tests,
    diagnoses,
    medications,
    billing,
    insights,
  } = state;

  const { selectedMessage, messageType, messageDialogPage } = messages;
  const { selectedBilling } = billing;
  const { selectedMedication } = medications;

  // patient ID authenticity
  const [hasPatientIderror, setHasPatientIderror] = useState(true);

  // grid layout states
  const [layout, setLayout] = useState([]);
  const [layoutToSave, setLayoutToSave] = useState([]);
  const [isLayoutUpdated, setIsLayoutUpdated] = useState(false);

  // data states
  const patientData = patientInfo.data;
  const patientBalance = billing.balance;

  const fetchCardsLayout = () => {
    PatientService.getCardsLayout(userId).then((res) => {
      const layoutResponse = res.data.length
        && res.data[0].layout
        && res.data[0].layout !== "undefined"
        ? JSON.parse(res.data[0].layout)
        : null;
      if (layoutResponse) {
        setLayout(layoutResponse);
        setIsLayoutUpdated(true);
        const tempLayout = {
          data: {
            layout: JSON.stringify(layoutResponse),
          },
        };
        setLayoutToSave(tempLayout.data);
        dispatch(saveLayout(layoutResponse));
      }
    });
  };

  const generateLayout = () => {
    const y = 4;
    const firstlayout = FirstColumnPatientCards.map((item) => ({
      x: 0,
      y: 0,
      w: 3,
      h: item.title === "Patient" ? 6 : 3.33,
      i: item.title.toString(),
    }));
    const secondlayout = SecondColumnPatientCards.map((item) => ({
      x: 3,
      y: 0,
      w: 3,
      h: getSecondColumnHeight(item.title),
      i: item.title.toString(),
    }));
    const thirdlayout = ThirdColumnPatientCards.map((item) => {
      const { title } = item;
      return {
        x: 6,
        y: 0,
        w: 3,
        h: getThirdColumnHeight(title),
        i: item.title.toString(),
      };
    });
    const fourthlayout = FourthColumnPatientCards.map((item) => ({
      x: 9,
      y: 0,
      w: 3,
      h: getFourthColumnHeight(item.title),
      i: item.title.toString(),
    }));
    const documentslayout = {
      x: 0,
      y,
      w: 6,
      h: 6,
      i: "Documents",
    };
    const testslayout = {
      x: 6,
      y,
      w: 6,
      h: 6,
      i: "All Markers",
    };
    const layoutArray = [
      ...firstlayout,
      ...secondlayout,
      ...thirdlayout,
      ...fourthlayout,
      documentslayout,
      testslayout,
    ];
    setLayout(layoutArray);
    dispatch(saveLayout([layoutArray]));
  };

  const updateCardsLayout = () => {
    PatientService.updateCardsLayout(userId, layoutToSave).then((res) => {
      if (res.status === "success") {
        setIsLayoutUpdated(true);
        enqueueSnackbar(`Layout updated successfully`, { variant: "success" });
      }
    });
  };

  const resetCardsLayout = () => {
    PatientService.resetCardsLayout(userId).then((res) => {
      if (res.status === "success") {
        setIsLayoutUpdated(false);
        setLayout([]); // removing the current layout state so the cards layout gets re-rendered
        generateLayout();
        enqueueSnackbar(`Layout reset successfully`, { variant: "success" });
      }
    });
  };

  const updateLayoutState = (gridLayout) => {
    const propsToRemove = [
      "isBounded",
      "isDraggable",
      "isResizable",
      "resizeHandles",
      "maxH",
      "minH",
      "maxW",
      "minW",
      "moved",
      "static",
    ];
    const updatedLayout = gridLayout.map((obj) => {
      const result = _.omit(obj, [...propsToRemove]);
      return result;
    });
    // eslint-disable-next-line  no-unused-vars
    const tempLayout = {
      data: {
        layout: JSON.stringify(updatedLayout),
      },
    };
    setLayoutToSave(tempLayout);
    dispatch(saveLayout(tempLayout.data));
  };

  const fetchPatientData = () => {
    PatientService.getPatientData(patientId).then((res) => {
      // check if patient exists in the database
      // check if patient's client_id is equal to the signed user's client_id
      if (
        !!res.data
        && res.data.client_id
        && res.data.client_id === user.client_id
      ) {
        dispatch(setPatientData(res.data));
        setHasPatientIderror(false);
      } else {
        enqueueSnackbar(`Patient not found`, { variant: "error" });
      }
    });
  };

  useEffect(() => {
    const { patientId: storePatientId } = state;
    if (storePatientId) { // if patientId is present in store and route changes then reset the store values
      dispatch(resetStore());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId]);

  useEffect(() => {
    generateLayout();
    fetchCardsLayout();
    fetchPatientData();
    dispatch(setPatientId(patientId)); // saving patientId in reducer

    setCookie(`${userId}-last_viewed_patient_id`, patientId, {
      path: "/",
      maxAge: THIRTY_DAYS_IN_MILI_SECONDS,
    }); // Same patientId into cookie
    updateLastVisitedPatient(patientId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId]);

  const fetchPatientHistory = useCallback(() => {
    PatientService.getPatientHistory(patientId).then((res) => {
      dispatch(setPatientHistory(res.data));
    });
  }, [patientId]);

  const fetchAdminNotesHistory = useCallback(() => {
    PatientService.getAdminNotesHistory(patientId).then((res) => {
      dispatch(setAdminNotes(res.data));
    });
  }, [patientId]);

  const fetchAllergies = useCallback(() => {
    PatientService.getAllergies(patientId).then((res) => {
      dispatch(setAllergies(res.data));
    });
  }, [patientId]);

  const fetchHandouts = useCallback(() => {
    PatientService.getPatientHandouts(patientId).then((res) => {
      dispatch(setHandouts(res.data));
    });
  }, [patientId]);

  const fetchForms = useCallback(() => {
    PatientService.getForms(patientId).then((res) => {
      dispatch(setForms(res.data));
    });
  }, [patientId]);

  const fetchBillings = useCallback(() => {
    PatientService.getBillings(patientId).then((res) => {
      dispatch(setBilling(res.data));
    });
  }, [patientId]);

  const fetchPatientBalance = useCallback(() => {
    PatientService.getPatientBalance(patientId).then((res) => {
      dispatch(
        setBalance(res.data && res.data.length ? res.data[0].amount : ""),
      );
    });
  }, [patientId]);

  const fetchDocuments = useCallback(() => {
    const tab = "All";
    PatientService.getDocuments(patientId, tab).then((res) => {
      dispatch(setDocuments(res.data));
    });
  }, [patientId]);

  const fetchEncounters = useCallback(() => {
    PatientService.getEncounters(patientId).then((res) => {
      dispatch(setEncounters(res.data));
    });
  }, [patientId]);

  const fetchMedicalNotes = useCallback(() => {
    PatientService.getMedicalNotes(patientId).then((res) => {
      dispatch(setMedicalNotes(res.data));
    });
  }, [patientId]);

  const fetchMessages = useCallback(() => {
    PatientService.getMessages(patientId).then((res) => {
      dispatch(setMessages(res.data));
    });
  }, [patientId]);

  const fetchDiagnoses = useCallback(
    (status) => {
      PatientService.getDiagnoses(patientId, status).then((res) => {
        if (status) {
          dispatch(setActiveDiagnoses(res.data));
        } else {
          dispatch(setDiagnoses(res.data));
        }
      });
    },
    [patientId],
  );

  const fetchMedications = useCallback(() => {
    PatientService.getMedications(patientId).then((res) => {
      dispatch(setMedications(res.data));
    });
  }, [patientId]);

  const fetchRequisitions = useCallback(() => {
    PatientService.getRequisitions(patientId).then((res) => {
      dispatch(setRequisitions(res.data));
    });
  }, [patientId]);

  const fetchTests = useCallback(() => {
    PatientService.getTests(patientId).then((res) => {
      dispatch(setTests(res.data));
    });
  }, [patientId]);

  const searchPatientHandler = (searchText) => {
    const reqBody = {
      data: {
        text: searchText,
      },
    };
    PatientService.searchPatient(patientId, reqBody).then(() => { });
  };

  const mapPrimaryButtonHandlers = (value) => {
    switch (value) {
      case "Patient":
        return dispatch(togglePatientHistoryDialog());
      case "Admin Notes":
        return dispatch(toggleAdminHistoryDialog());
      case "Forms":
        return dispatch(toggleFormsViewDialog());
      case "Handouts":
        return dispatch(toggleHandoutsDialog());
      case "Billing":
        return dispatch(toggleNewTransactionDialog());
      case "Encounters":
        return dispatch(toggleEncountersDialog());
      case "Allergies":
        return dispatch(toggleAllergyDialog());
      case "Medical Notes":
        return dispatch(toggleMedicalNotesDialog());
      case "Messages":
        return dispatch(toggleMessageDialog());
      case "Medications":
        return dispatch(toggleMedicationDialog());
      case "Diagnoses":
        return dispatch(toggleDiagnosesDialog());
      case "Requisitions":
        return dispatch(toggleRequisitionDialog());
      case "Insights":
        return dispatch(toggleInsightsExpandDialog());
      default:
        return () => { };
    }
  };

  const mapSecondaryButtonHandlers = (value) => {
    switch (value) {
      case "Patient":
        return dispatch(togglePatientInfoDialog());
      case "Admin Notes":
        return dispatch(toggleAdminFormDialog());
      case "Forms":
        return dispatch(toggleFormsExpandDialog());
      case "Handouts":
        return dispatch(toggleHandoutsExpandDialog());
      case "Billing":
        return dispatch(toggleBillngExpandDialog());
      case "Encounters":
        return dispatch(toggleEncountersExpandDialog());
      case "Allergies":
        return dispatch(toggleAllergyExpandDialog());
      case "Medical Notes":
        return dispatch(toggleMedicalNotesFormDialog());
      case "Messages":
        return dispatch(toggleMessageExpandDialog());
      case "Medications":
        return dispatch(toggleMedicationExpandDialog());
      case "Diagnoses":
        return dispatch(toggleDiagnosesExpandDialog());
      case "Requisitions":
        return dispatch(toggleRequisitionExpandDialog());
      default:
        return () => { };
    }
  };

  const mapCardContentDataHandlers = (value) => {
    switch (value) {
      case "Patient":
        return <PatientCardContent />;
      case "Admin Notes":
        if (adminNotes.editForm) {
          return <AdminNotesForm />;
        }
        return <AdminNotesCardContent />;

      case "Forms":
        return <FormCardContent />;
      case "Billing":
        return (
          <BillingCardContent
            reloadData={() => {
              fetchBillings();
              fetchPatientBalance();
            }}
          />
        );
      case "Encounters":
        return <EncountersCardContent reloadData={() => fetchEncounters()} />;
      case "Allergies":
        return <AllergiesCardContent reloadData={() => fetchAllergies()} />;
      case "Medical Notes":
        if (medicalNotes.editForm) {
          return <MedicalNotesForm />;
        }
        return <MedicalNotesCardContent />;

      case "Handouts":
        return (
          <HandoutsCardContent
            reloadData={() => fetchHandouts()}
          />
        );
      case "Messages":
        return <MessagesCardContent reloadData={() => fetchMessages()} />;
      case "Medications":
        return <MedicationsCardContent reloadData={() => fetchMedications()} />;
      case "Diagnoses":
        return (
          <DiagnosesCardContent
            reloadData={() => {
              fetchDiagnoses();
              fetchDiagnoses(true);
            }}
          />
        );
      case "Requisitions":
        return (
          <RequisitionsCardContent reloadData={() => fetchRequisitions()} />
        );
      case "Insights":
        return <InsightsCardContent />;
      default:
        return <div />;
    }
  };

  const redirectToPatientPortal = () => {
    history.push({
      pathname: "/patient",
      state: {
        patientId,
      },
    });
  };

  const mapIconHandlers = (value) => {
    switch (value) {
      case "Patient":
        return redirectToPatientPortal;
      case "Billing":
        return () => dispatch(togglePaymentDialog());
      default:
        return () => { };
    }
  };

  const onFilePickerClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  const createDocument = (reqBody) => {
    PatientService.createDocuments(patientId, reqBody)
      .then((response) => {
        enqueueSnackbar(`${response.data.message}`, { variant: "success" });
        fetchDocuments();
      });
  };

  const handleDocumentsFile = (e) => {
    const { files } = e.target;
    const fd = new FormData();
    fd.append("file", files[0]);
    fd.append("patient_id", patientId);
    createDocument(fd);
  };

  const updateAdminNotes = () => {
    if (editorText !== patientData.admin_note) {
      const reqBody = {
        data: {
          admin_note: editorText, // needs to be updated
          old_admin_note: patientData && patientData.admin_note,
        },
      };
      PatientService.updateAdminNotes(patientId, reqBody)
        .then((response) => {
          enqueueSnackbar(`${response.data.message}`, { variant: "success" });
          dispatch(resetEditorText());
          fetchPatientData();
          fetchAdminNotesHistory();
          dispatch(toggleAdminFormDialog());
        });
    } else {
      dispatch(toggleAdminFormDialog());
    }
  };

  const updateMedicalNotes = () => {
    if (editorText !== patientData.medical_note) {
      const reqBody = {
        data: {
          old_medical_note: patientData && patientData.medical_note,
          medical_note: editorText,
        },
      };
      PatientService.updateMedicalNotes(patientId, reqBody)
        .then((response) => {
          enqueueSnackbar(`${response.data.message}`, { variant: "success" });
          dispatch(resetEditorText());
          fetchPatientData();
          fetchMedicalNotes();
          dispatch(toggleMedicalNotesFormDialog());
        });
    } else {
      dispatch(toggleMedicalNotesFormDialog());
    }
  };

  const mapEditorCancelHandler = (value) => {
    switch (value) {
      case "Admin Notes":
        return dispatch(toggleAdminFormDialog());
      case "Medical Notes":
        return dispatch(toggleMedicalNotesFormDialog());
      default:
        return () => { };
    }
  };

  const mapEditorSaveHandler = (value) => {
    switch (value) {
      case "Admin Notes":
        return updateAdminNotes();
      case "Medical Notes":
        return updateMedicalNotes();
      default:
        return () => { };
    }
  };

  const updateMinHeight = (key, newHeight) => {
    const calculatedHeight = newHeight / 40 + 0.5;
    // 40 is the row height, 0.5 is the margin
    const newLayout = layout.map((item) => (item.i === key ? { ...item, h: calculatedHeight } : item));
    setLayout([...newLayout]);
  };

  const fetchPaymentMethods = useCallback(() => {
    PatientService.getPaymentMethods(patientId).then((res) => {
      dispatch(setPaymentMethods(res.data));
    });
  }, [patientId]);

  useEffect(() => {
    if (!hasPatientIderror) {
      fetchEncounters();
      fetchDiagnoses(true);
      fetchMessages();
      fetchMedications();
      fetchForms();
      fetchMedicalNotes();
      fetchRequisitions();
      fetchBillings();
      fetchHandouts();
      fetchAllergies();
      fetchDocuments();
      fetchTests();
      fetchPatientHistory();
      fetchPatientBalance();
      fetchAdminNotesHistory();
      fetchPaymentMethods();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [
    hasPatientIderror,
    fetchPatientHistory,
    fetchPatientBalance,
    fetchAdminNotesHistory,
    fetchAllergies,
    fetchHandouts,
    fetchForms,
    fetchBillings,
    fetchDocuments,
    fetchEncounters,
    fetchMedicalNotes,
    fetchMessages,
    fetchDiagnoses,
    fetchMedications,
    fetchRequisitions,
    fetchTests,
    fetchPaymentMethods,
  ]);

  return (
    <PatientContext.Provider value={{ state, dispatch }}>
      <input
        type="file"
        id="file"
        accept=".pdf, .txt, .doc, .docx, image/*"
        multiple
        ref={inputFile}
        onChange={(e) => handleDocumentsFile(e)}
        hidden
      />
      {!!patientInfo.appointmentHistoryDialog && (
        <Dialog
          open={patientInfo.appointmentHistoryDialog}
          title="Appointment History"
          message={<AppointmentHistory />}
          cancelForm={() => dispatch(togglePatientAppointmentHistoryDialog())}
          hideActions
          size="md"
        />
      )}
      {!!patientInfo.editDialog && (
        <Dialog
          open={patientInfo.editDialog}
          title={patientInfo.isEditDialogType ? "Patient Edit" : "New Patient"}
          message={(
            <BasicInfo
              reloadData={fetchPatientData}
              reloadPaymentMethods={fetchPaymentMethods}
            />
          )}
          applyForm={() => dispatch(togglePatientInfoDialog())}
          cancelForm={() => dispatch(togglePatientInfoDialog())}
          hideActions
          size="lg"
        />
      )}

      {!!patientInfo.historyDialog && (
        <Dialog
          open={patientInfo.historyDialog}
          title="Patient History"
          message={<PatientHistoryDetails />}
          applyForm={() => dispatch(togglePatientHistoryDialog())}
          cancelForm={() => dispatch(togglePatientHistoryDialog())}
          hideActions
          size="md"
        />
      )}
      {!!adminNotes.historyDialog && (
        <Dialog
          open={adminNotes.historyDialog}
          title="Admin Notes History"
          message={<AdminNotesHistory />}
          applyForm={() => dispatch(toggleAdminHistoryDialog())}
          cancelForm={() => dispatch(toggleAdminHistoryDialog())}
          hideActions
          size="md"
        />
      )}

      {!!forms.expandDialog && (
        <Dialog
          open={forms.expandDialog}
          title="Forms"
          message={<FormDetails />}
          applyForm={() => dispatch(toggleFormsExpandDialog())}
          cancelForm={() => dispatch(toggleFormsExpandDialog())}
          hideActions
          size="md"
        />
      )}

      {!!forms.viewDialog && (
        <Dialog
          open={forms.viewDialog}
          title="Forms"
          message={<Form />}
          applyForm={() => dispatch(toggleFormsViewDialog())}
          cancelForm={() => dispatch(toggleFormsViewDialog())}
          hideActions
          size="lg"
        />
      )}

      {!!billing.newTransactionDialog && (
        <Dialog
          open={billing.newTransactionDialog}
          title={`${selectedBilling ? "Edit" : "New"} Payment`}
          message={(
            <TransactionForm
              reloadData={() => {
                fetchBillings();
                fetchPatientBalance();
              }}
            />
          )}
          applyForm={() => dispatch(toggleNewTransactionDialog())}
          cancelForm={() => dispatch(toggleNewTransactionDialog())}
          hideActions
          size="md"
        />
      )}

      {!!billing.expandDialog && (
        <Dialog
          open={billing.expandDialog}
          title="Billing"
          message={(
            <BillingDetails
              reloadData={() => {
                fetchBillings();
                fetchPatientBalance();
              }}
            />
          )}
          applyForm={() => dispatch(toggleBillngExpandDialog())}
          cancelForm={() => dispatch(toggleBillngExpandDialog())}
          hideActions
          size="lg"
        />
      )}

      {!!billing.newDialog && (
        <Dialog
          open={billing.newDialog}
          title={`${selectedBilling ? "Edit" : "New"} Billing`}
          message={(
            <BillingDialog
              reloadData={() => {
                fetchBillings();
                fetchPatientBalance();
              }}
              reloadPaymentMethods={fetchPaymentMethods}
            />
          )}
          applyForm={() => dispatch(togglePaymentDialog())}
          cancelForm={() => dispatch(togglePaymentDialog())}
          hideActions
          size="xl"
          fullHeight
        />
      )}

      {!!allergies.newDialog && (
        <Dialog
          open={allergies.newDialog}
          title="New Allergy"
          message={<Allergies reloadData={() => fetchAllergies()} />}
          applyForm={() => dispatch(toggleAllergyDialog())}
          cancelForm={() => dispatch(toggleAllergyDialog())}
          hideActions
          size="sm"
          fullHeight
        />
      )}

      {!!allergies.expandDialog && (
        <Dialog
          open={allergies.expandDialog}
          title="Allergies"
          message={<AllergiesDetails reloadData={() => fetchAllergies()} />}
          applyForm={() => dispatch(toggleAllergyExpandDialog())}
          cancelForm={() => dispatch(toggleAllergyExpandDialog())}
          hideActions
          size="md"
        />
      )}

      {!!handouts.newDialog && (
        <Dialog
          open={handouts.newDialog}
          title="New Handout"
          message={(
            <HandoutsForm
              reloadData={fetchHandouts}
            />
          )}
          applyForm={() => dispatch(toggleHandoutsDialog())}
          cancelForm={() => dispatch(toggleHandoutsDialog())}
          hideActions
          size="sm"
          fullHeight
        />
      )}

      {!!handouts.expandDialog && (
        <Dialog
          open={handouts.expandDialog}
          title="Handouts"
          message={(
            <HandoutsDetails
              reloadData={fetchHandouts}
            />
          )}
          applyForm={() => dispatch(toggleHandoutsExpandDialog())}
          cancelForm={() => dispatch(toggleHandoutsExpandDialog())}
          hideActions
          size="md"
        />
      )}

      {!!encounters.newDialog && (
        <Dialog
          open={encounters.newDialog}
          title="New Encounter"
          message={<EncountersForm reloadData={fetchEncounters} />}
          applyForm={() => dispatch(toggleEncountersDialog())}
          cancelForm={() => dispatch(toggleEncountersDialog())}
          hideActions
          size="lg"
        />
      )}

      {!!encounters.expandDialog && (
        <Dialog
          open={encounters.expandDialog}
          title="Encounters"
          message={(
            <EncountersDetails
              toggleEncountersDialog={() => dispatch(toggleEncountersDialog())}
              reloadData={fetchEncounters}
            />
          )}
          applyForm={() => dispatch(toggleEncountersExpandDialog())}
          cancelForm={() => dispatch(toggleEncountersExpandDialog())}
          hideActions
          size="lg"
        />
      )}

      {!!medicalNotes.historyDialog && (
        <Dialog
          open={medicalNotes.historyDialog}
          title="Medical Notes History"
          message={<MedicalNotesDetails />}
          applyForm={() => dispatch(toggleMedicalNotesDialog())}
          cancelForm={() => dispatch(toggleMedicalNotesDialog())}
          hideActions
          size="md"
        />
      )}

      {!!messages.newDialog && (
        <Dialog
          open={messages.newDialog}
          title={`${messageType} Message`}
          message={<NewMessageForm reloadData={fetchMessages} />}
          applyForm={() => dispatch(toggleMessageDialog())}
          cancelForm={() => dispatch(toggleMessageDialog())}
          hideActions
          size="md"
        />
      )}

      {!!messageDialogPage && (
        <Dialog
          fullHeight
          open={messageDialogPage}
          title="Edit Message"
          message={(
            <ProcessMessagePage
              fetchProviderDetails={() => { }}
              selectedMessage={selectedMessage}
              onClose={() => {
                // resetSelectedMessage is used with a timeout otherwise selectedMessage prop
                // gets null on the process message page and wrong API gets called
                setTimeout(() => dispatch(resetSelectedMessage()), 1000);
                dispatch(toggleMessageDialogPage());
                fetchMessages();
              }}
            />
          )}
          cancelForm={() => dispatch(toggleMessageDialogPage())}
          size="xl"
          hideActions
        />
      )}

      {!!messages.expandDialog && (
        <Dialog
          open={messages.expandDialog}
          title="Messages"
          message={<MessagesDetails reloadData={fetchMessages} />}
          applyForm={() => dispatch(toggleMessageExpandDialog())}
          cancelForm={() => dispatch(toggleMessageExpandDialog())}
          hideActions
          size="xl"
        />
      )}

      {!!diagnoses.newDialog && (
        <Dialog
          open={diagnoses.newDialog}
          title="Diagnoses"
          message={(
            <DiagnosesForm
              reloadData={() => {
                fetchDiagnoses();
                fetchDiagnoses(true);
              }}
            />
          )}
          applyForm={() => dispatch(toggleDiagnosesDialog())}
          cancelForm={() => dispatch(toggleDiagnosesDialog())}
          hideActions
          size="lg"
          fullHeight
        />
      )}

      {!!diagnoses.expandDialog && (
        <Dialog
          open={diagnoses.expandDialog}
          title="Diagnoses"
          message={(
            <DiagnosesDetails
              reloadData={() => {
                fetchDiagnoses();
                fetchDiagnoses(true);
              }}
            />
          )}
          applyForm={() => dispatch(toggleDiagnosesExpandDialog())}
          cancelForm={() => dispatch(toggleDiagnosesExpandDialog())}
          hideActions
          size="md"
        />
      )}

      {!!medications.newDialog && (
        <Dialog
          open={medications.newDialog}
          title={`${selectedMedication ? "Edit" : "New"} Patient Medication`}
          message={<MedicationsForm reloadData={fetchMedications} />}
          applyForm={() => dispatch(toggleMedicationDialog())}
          cancelForm={() => dispatch(toggleMedicationDialog())}
          hideActions
          size="lg"
        />
      )}

      {!!medications.expandDialog && (
        <Dialog
          open={medications.expandDialog}
          title="Medications"
          message={<MedicationsDetails reloadData={() => fetchMedications()} />}
          applyForm={() => dispatch(toggleMedicationExpandDialog())}
          cancelForm={() => dispatch(toggleMedicationExpandDialog())}
          hideActions
          size="lg"
        />
      )}

      {!!requisitions.newDialog && (
        <Dialog
          open={requisitions.newDialog}
          title="New Requisition"
          message={<RequisitionsForm reloadData={fetchRequisitions} />}
          applyForm={() => dispatch(toggleRequisitionDialog())}
          cancelForm={() => dispatch(toggleRequisitionDialog())}
          hideActions
          fullHeight
          size="xl"
        />
      )}

      {!!requisitions.expandDialog && (
        <Dialog
          open={requisitions.expandDialog}
          title="Requisitions"
          message={<RequisitionsDetails reloadData={fetchRequisitions} />}
          applyForm={() => dispatch(toggleRequisitionExpandDialog())}
          cancelForm={() => dispatch(toggleRequisitionExpandDialog())}
          hideActions
          size="lg"
        />
      )}

      {!!documents.expandDialog && (
        <Dialog
          open={documents.expandDialog}
          title="Documents"
          message={(
            <DocumentsCardContent
              reloadData={() => fetchDocuments()}
              actionsEnable
              createNewHandler={onFilePickerClick}
            />
          )}
          applyForm={() => dispatch(toggleDocumentsExpandDialog())}
          cancelForm={() => dispatch(toggleDocumentsExpandDialog())}
          hideActions
          size="lg"
          fullHeight
        />
      )}

      {!!tests.expandDialog && (
        <Dialog
          open={tests.expandDialog}
          title="All Markers"
          message={<TestsCardContent />}
          applyForm={() => dispatch(toggleTestsExpandDialog())}
          cancelForm={() => dispatch(toggleTestsExpandDialog())}
          hideActions
          size="lg"
          fullHeight
        />
      )}
      {!!tests.expandChartDialog && (
        <Dialog
          open={tests.expandChartDialog}
          title={tests.testName}
          message={<MarkerGraph />}
          applyForm={() => dispatch(toggleTestsChartExpandDialog())}
          cancelForm={() => dispatch(toggleTestsChartExpandDialog())}
          hideActions
          size="xl"
          fullHeight
        />
      )}

      {!!insights.expandDialog && (
        <Dialog
          open={insights.expandDialog}
          title="Insights"
          message={<InsightsCardContent />}
          applyForm={() => dispatch(toggleInsightsExpandDialog())}
          cancelForm={() => dispatch(toggleInsightsExpandDialog())}
          hideActions
          size="xl"
        />
      )}

      <Grid className={classes.main}>
        {!hasPatientIderror && (
          <ResponsiveGridLayout
            className="layout"
            rowHeight={40}
            cols={{
              lg: 12,
              md: 10,
              sm: 6,
              xs: 4,
              xxs: 2,
            }}
            breakpoints={{
              lg: 1200,
              md: 996,
              sm: 768,
              xs: 480,
              xxs: 0,
            }}
            layouts={{ lg: layout }}
            onDragStop={(val) => updateLayoutState(val)}
            onResizeStop={(val) => updateLayoutState(val)}
            // onLayoutChange is called always on first render so it fails
            // in our scenario, using above two props for our use case
            compactType="vertical"
            containerPadding={[0, 0]}
            margin={[5, 0]}
            measureBeforeMount
            useCSSTransforms={false}
            draggableHandle=".drag-handle"
          >
            {FirstColumnPatientCards.map((item) => (
              <Grid key={item.title}>
                <Card
                  key={item.title}
                  title={item.title}
                  data={mapCardContentDataHandlers(item.title)}
                  showActions={item.showActions}
                  showEditorActions={
                    item.title === "Admin Notes" && !!adminNotes.editForm
                  }
                  editorSaveHandler={() => mapEditorSaveHandler(item.title)}
                  editorCancelHandler={() => mapEditorCancelHandler(item.title)}
                  showSearch={item.showSearch}
                  icon={item.icon}
                  primaryButtonText={item.primaryButtonText}
                  secondaryButtonText={item.secondaryButtonText}
                  primaryButtonHandler={() => mapPrimaryButtonHandlers(item.title)}
                  secondaryButtonHandler={() => mapSecondaryButtonHandlers(item.title)}
                  iconHandler={mapIconHandlers(item.title)}
                  searchHandler={(value) => searchPatientHandler(value)}
                  updateLayoutHandler={() => updateCardsLayout()}
                  resetLayoutHandler={() => resetCardsLayout()}
                  isLayoutUpdated={isLayoutUpdated}
                  updateMinHeight={updateMinHeight}
                />
              </Grid>
            ))}
            {SecondColumnPatientCards.map((item) => (
              <Grid key={item.title}>
                <Card
                  key={item.title}
                  title={item.title}
                  data={mapCardContentDataHandlers(item.title)}
                  showActions={item.showActions}
                  showEditorActions={
                    item.title === "Medical Notes" && !!medicalNotes.editForm
                  }
                  editorSaveHandler={() => mapEditorSaveHandler(item.title)}
                  editorCancelHandler={() => mapEditorCancelHandler(item.title)}
                  showSearch={item.showSearch}
                  icon={item.icon}
                  primaryButtonText={item.primaryButtonText}
                  secondaryButtonText={item.secondaryButtonText}
                  primaryButtonHandler={() => mapPrimaryButtonHandlers(item.title)}
                  secondaryButtonHandler={() => mapSecondaryButtonHandlers(item.title)}
                  updateMinHeight={updateMinHeight}
                />
              </Grid>
            ))}
            {ThirdColumnPatientCards.map((item) => (
              <Grid key={item.title}>
                <Card
                  key={item.title}
                  title={item.title}
                  data={mapCardContentDataHandlers(item.title)}
                  showActions={item.showActions}
                  showSearch={item.showSearch}
                  icon={item.icon}
                  primaryButtonText={item.primaryButtonText}
                  secondaryButtonText={item.secondaryButtonText}
                  primaryButtonHandler={() => mapPrimaryButtonHandlers(item.title)}
                  secondaryButtonHandler={() => mapSecondaryButtonHandlers(item.title)}
                  updateMinHeight={updateMinHeight}
                  contentToggleHandler={(value) => {
                    // setFetchDiagnosesStatus(value);
                    dispatch(setDiagnosesStatus(value));
                    if (value) {
                      fetchDiagnoses(value);
                    } else {
                      fetchDiagnoses();
                    }
                  }}
                />
              </Grid>
            ))}
            {FourthColumnPatientCards.map((item) => (
              <Grid key={item.title}>
                <Card
                  key={item.title}
                  title={item.title}
                  data={mapCardContentDataHandlers(item.title)}
                  showActions={item.showActions}
                  showSearch={item.showSearch}
                  icon={item.icon}
                  primaryButtonText={item.primaryButtonText}
                  secondaryButtonText={item.secondaryButtonText}
                  iconHandler={mapIconHandlers(item.title)}
                  primaryButtonHandler={() => mapPrimaryButtonHandlers(item.title)}
                  secondaryButtonHandler={() => mapSecondaryButtonHandlers(item.title)}
                  updateMinHeight={updateMinHeight}
                  cardInfo={
                    item.title === "Billing" && patientBalance !== null
                      ? `Balance $${Number(patientBalance)?.toFixed(2)}`
                      : ""
                  }
                />
              </Grid>
            ))}
            <Grid key="Documents">
              <Card
                title="Documents"
                data={(
                  <DocumentsCardContent
                    reloadData={() => fetchDocuments()}
                    actionsEnable
                  />
                )}
                showActions
                primaryButtonText="New"
                secondaryButtonText="Expand"
                showSearch={false}
                primaryButtonHandler={onFilePickerClick}
                secondaryButtonHandler={() => dispatch(toggleDocumentsExpandDialog())}
                updateMinHeight={updateMinHeight}
              />
            </Grid>
            <Grid key="All Markers">
              <Card
                title="All Markers"
                data={<TestsCardContent />}
                showActions
                primaryButtonText="Expand"
                secondaryButtonText={null}
                showSearch={false}
                contentToggleHandler={() => dispatch(toggleTestsChartExpandDialog())}
                primaryButtonHandler={() => {
                  dispatch(toggleTestsExpandDialog());
                }}
                updateMinHeight={updateMinHeight}
              />
            </Grid>
          </ResponsiveGridLayout>
        )}
      </Grid>
    </PatientContext.Provider>
  );
};

export default Patient;
