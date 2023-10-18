import initialState from "./initialState";
import {
  SET_SELECTED_ENCOUNTER,
  RESET_SELECTED_ENCOUNTER,
  SET_EDITOR_TEXT,
  RESET_EDITOR_TEXT,
  SAVE_LAYOUT,

  // Setters
  SET_PATIENT_ID,
  SET_PATIENT_INFO,
  TOGGLE_PATIENT_DIALOG_TYPE,
  SET_PATIENT_HISTORY,
  SET_ADMIN_NOTES,
  SET_FORMS,
  SET_BILLING,
  SET_SELECTED_BILLING,
  RESET_SELECTED_BILLING,
  SET_BALANCE,
  SET_ALLERGIES,
  SET_HANDOUTS,
  SET_ENCOUNTERS,
  SET_MEDICAL_NOTES,
  SET_SELECTED_MESSAGE,
  RESET_SELECTED_MESSAGE,
  SET_MESSAGE_TYPE,
  SET_MESSAGES,
  SET_MEDICATIONS,
  SET_SELECTED_MEDICATION,
  RESET_SELECTED_MEDICATION,
  SET_DIAGNOSES,
  SET_ACTIVE_DIAGNOSES,
  SET_DIAGNOSES_STATUS,
  SET_REQUISITIONS,
  SET_DOCUMENTS,
  SET_TESTS,
  SET_PAYMENT_METHODS,

  // Togglers
  TOGGLE_PATIENT_INFO_EDIT_DIALOG,
  TOGGLE_PATIENT_INFO_HISORY_DIALOG,
  TOGGLE_PATIENT_APPOINTMENT_HISORY_DIALOG,
  TOGGLE_ADMIN_NOTES_EDIT_FORM,
  TOGGLE_ADMIN_NOTES_HISTORY_DIALOG,
  TOGGLE_FORM_EXPAND_DIALOG,
  TOGGLE_FORM_VIEW_DIALOG,
  TOGGLE_HANDOUTS_NEW_DIALOG,
  TOGGLE_HANDOUTS_EXPAND_DIALOG,
  TOGGLE_DOCUMENTS_EXPAND_DIALOG,
  TOGGLE_ENCOUNTERS_NEW_DIALOG,
  TOGGLE_ENCOUNTERS_EXPAND_DIALOG,
  TOGGLE_MEDICAL_NOTES_HISTORY_DIALOG,
  TOGGLE_MEDICAL_NOTES_EDIT_FORM,
  TOGGLE_ALLERGIES_NEW_DIALOG,
  TOGGLE_ALLERGIES_EXPAND_DIALOG,
  TOGGLE_MESSAGES_NEW_DIALOG,
  TOGGLE_MESSAGES_EXPAND_DIALOG,
  TOGGLE_MESSAGES_DIALOG_PAGE,
  TOGGLE_REQUISITIONS_NEW_DIALOG,
  TOGGLE_REQUISITIONS_EXPAND_DIALOG,
  TOGGLE_TESTS_EXPAND_DIALOG,
  TOGGLE_TESTS_CHART_EXPAND_DIALOG,
  TOGGLE_DIAGNOSES_NEW_DIALOG,
  TOGGLE_DIAGNOSES_EXPAND_DIALOG,
  TOGGLE_MEDICATION_NEW_DIALOG,
  TOGGLE_MEDICATION_EXPAND_DIALOG,
  TOGGLE_BILLING_NEW_TRANSACTION_DIALOG,
  TOGGLE_BILLING_NEW_DIALOG,
  TOGGLE_BILLING_EXPAND_DIALOG,
  TOGGLE_INSIGHTS_EXPAND_DIALOG,
  SET_TEST_NAME,
  SET_SELECTED_TEST,
  RESET_STORE,
} from "./types";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_ENCOUNTER:
      return {
        ...state,
        encounters: {
          ...state.encounters,
          selectedEncounter: action.payload,
        },
      };
    case RESET_SELECTED_ENCOUNTER:
      return {
        ...state,
        encounters: {
          ...state.encounters,
          selectedEncounter: null,
        },
      };
    case SET_EDITOR_TEXT:
      return {
        ...state,
        editorText: action.payload,
      };
    case RESET_EDITOR_TEXT:
      return {
        ...state,
        editorText: "",
      };
    // editor case ends here...
    case SAVE_LAYOUT:
      return {
        ...state,
        layout: action.payload,
      };

    // data setter starts here...
    case SET_PATIENT_ID:
      return {
        ...state,
        patientId: action.payload,
      };
    case SET_PATIENT_INFO:
      return {
        ...state,
        patientInfo: {
          ...state.patientInfo,
          data: { ...action.payload },
        },
      };
    case TOGGLE_PATIENT_DIALOG_TYPE:
      return {
        ...state,
        patientInfo: {
          ...state.patientInfo,
          isEditDialogType: !state.patientInfo.isEditDialogType,
        },
      };

    case SET_PATIENT_HISTORY:
      return {
        ...state,
        patientInfo: {
          ...state.patientInfo,
          history: [...action.payload],
        },
      };
    case SET_ADMIN_NOTES:
      return {
        ...state,
        adminNotes: {
          ...state.adminNotes,
          data: [...action.payload],
        },
      };
    case SET_FORMS:
      return {
        ...state,
        forms: {
          ...state.forms,
          data: [...action.payload],
        },
      };
    case SET_HANDOUTS:
      return {
        ...state,
        handouts: {
          ...state.handouts,
          data: [...action.payload],
        },
      };
    case SET_DOCUMENTS:
      return {
        ...state,
        documents: {
          ...state.documents,
          data: [...action.payload],
        },
      };
    case SET_ENCOUNTERS:
      return {
        ...state,
        encounters: {
          ...state.encounters,
          data: [...action.payload],
        },
      };
    case SET_MEDICAL_NOTES:
      return {
        ...state,
        medicalNotes: {
          ...state.medicalNotes,
          data: [...action.payload],
        },
      };
    case SET_ALLERGIES:
      return {
        ...state,
        allergies: {
          ...state.allergies,
          data: [...action.payload],
        },
      };
    case SET_MESSAGES:
      return {
        ...state,
        messages: {
          ...state.messages,
          data: [...action.payload],
        },
      };
    case SET_SELECTED_MESSAGE:
      return {
        ...state,
        messages: {
          ...state.messages,
          selectedMessage: action.payload,
        },
      };
    case RESET_SELECTED_MESSAGE:
      return {
        ...state,
        messages: {
          ...state.messages,
          selectedMessage: null,
          messageType: "New",
        },
      };
    case SET_MESSAGE_TYPE:
      return {
        ...state,
        messages: {
          ...state.messages,
          messageType: action.payload,
        },
      };
    case SET_REQUISITIONS:
      return {
        ...state,
        requisitions: {
          ...state.requisitions,
          data: [...action.payload],
        },
      };
    case SET_TESTS:
      return {
        ...state,
        tests: {
          ...state.tests,
          data: [...action.payload],
        },
      };
    case SET_DIAGNOSES:
      return {
        ...state,
        diagnoses: {
          ...state.diagnoses,
          data: [...action.payload],
        },
      };
    case SET_ACTIVE_DIAGNOSES:
      return {
        ...state,
        diagnoses: {
          ...state.diagnoses,
          activeData: [...action.payload],
        },
      };
    case SET_MEDICATIONS:
      return {
        ...state,
        medications: {
          ...state.medications,
          data: [...action.payload],
        },
      };
    case SET_SELECTED_MEDICATION:
      return {
        ...state,
        medications: {
          ...state.medications,
          selectedMedication: action.payload,
        },
      };
    case RESET_SELECTED_MEDICATION:
      return {
        ...state,
        medications: {
          ...state.medications,
          selectedMedication: null,
        },
      };
    case SET_BILLING:
      return {
        ...state,
        billing: {
          ...state.billing,
          data: [...action.payload],
        },
      };
    case SET_SELECTED_BILLING:
      return {
        ...state,
        billing: {
          ...state.billing,
          selectedBilling: action.payload,
        },
      };
    case RESET_SELECTED_BILLING:
      return {
        ...state,
        billing: {
          ...state.billing,
          selectedBilling: null,
        },
      };
    case SET_BALANCE:
      return {
        ...state,
        billing: {
          ...state.billing,
          balance: action.payload,
        },
      };
    case SET_PAYMENT_METHODS:
      return {
        ...state,
        patientInfo: {
          ...state.patientInfo,
          paymentMethods: action.payload,
        },
      };

    // dialog togglers starts here...
    case TOGGLE_PATIENT_INFO_EDIT_DIALOG:
      return {
        ...state,
        patientInfo: {
          ...state.patientInfo,
          editDialog: !state.patientInfo.editDialog,
        },
      };
    case TOGGLE_PATIENT_INFO_HISORY_DIALOG:
      return {
        ...state,
        patientInfo: {
          ...state.patientInfo,
          historyDialog: !state.patientInfo.historyDialog,
        },
      };
    case TOGGLE_PATIENT_APPOINTMENT_HISORY_DIALOG:
      return {
        ...state,
        patientInfo: {
          ...state.patientInfo,
          appointmentHistoryDialog: !state.patientInfo.appointmentHistoryDialog,
        },
      };
    case TOGGLE_ADMIN_NOTES_HISTORY_DIALOG:
      return {
        ...state,
        adminNotes: {
          ...state.adminNotes,
          historyDialog: !state.adminNotes.historyDialog,
        },
      };
    case TOGGLE_ADMIN_NOTES_EDIT_FORM:
      return {
        ...state,
        adminNotes: {
          ...state.adminNotes,
          editForm: !state.adminNotes.editForm,
        },
      };
    case TOGGLE_FORM_EXPAND_DIALOG:
      return {
        ...state,
        forms: {
          ...state.forms,
          expandDialog: !state.forms.expandDialog,
        },
      };
    case TOGGLE_FORM_VIEW_DIALOG:
      return {
        ...state,
        forms: {
          ...state.forms,
          viewDialog: !state.forms.viewDialog,
        },
      };
    case TOGGLE_HANDOUTS_EXPAND_DIALOG:
      return {
        ...state,
        handouts: {
          ...state.handouts,
          expandDialog: !state.handouts.expandDialog,
        },
      };
    case TOGGLE_HANDOUTS_NEW_DIALOG:
      return {
        ...state,
        handouts: {
          ...state.handouts,
          newDialog: !state.handouts.newDialog,
        },
      };
    case TOGGLE_DOCUMENTS_EXPAND_DIALOG:
      return {
        ...state,
        documents: {
          ...state.documents,
          expandDialog: !state.documents.expandDialog,
        },
      };
    case TOGGLE_ENCOUNTERS_EXPAND_DIALOG:
      return {
        ...state,
        encounters: {
          ...state.encounters,
          expandDialog: !state.encounters.expandDialog,
        },
      };
    case TOGGLE_ENCOUNTERS_NEW_DIALOG:
      return {
        ...state,
        encounters: {
          ...state.encounters,
          newDialog: !state.encounters.newDialog,
        },
      };
    case TOGGLE_MEDICAL_NOTES_HISTORY_DIALOG:
      return {
        ...state,
        medicalNotes: {
          ...state.medicalNotes,
          historyDialog: !state.medicalNotes.historyDialog,
        },
      };
    case TOGGLE_MEDICAL_NOTES_EDIT_FORM:
      return {
        ...state,
        medicalNotes: {
          ...state.medicalNotes,
          editForm: !state.medicalNotes.editForm,
        },
      };
    case TOGGLE_ALLERGIES_EXPAND_DIALOG:
      return {
        ...state,
        allergies: {
          ...state.allergies,
          expandDialog: !state.allergies.expandDialog,
        },
      };
    case TOGGLE_ALLERGIES_NEW_DIALOG:
      return {
        ...state,
        allergies: {
          ...state.allergies,
          newDialog: !state.allergies.newDialog,
        },
      };
    case TOGGLE_MESSAGES_EXPAND_DIALOG:
      return {
        ...state,
        messages: {
          ...state.messages,
          expandDialog: !state.messages.expandDialog,
        },
      };
    case TOGGLE_MESSAGES_NEW_DIALOG:
      return {
        ...state,
        messages: {
          ...state.messages,
          newDialog: !state.messages.newDialog,
        },
      };
    case TOGGLE_MESSAGES_DIALOG_PAGE:
      return {
        ...state,
        messages: {
          ...state.messages,
          messageDialogPage: !state.messages.messageDialogPage,
        },
      };
    case TOGGLE_REQUISITIONS_EXPAND_DIALOG:
      return {
        ...state,
        requisitions: {
          ...state.requisitions,
          expandDialog: !state.requisitions.expandDialog,
        },
      };
    case TOGGLE_REQUISITIONS_NEW_DIALOG:
      return {
        ...state,
        requisitions: {
          ...state.requisitions,
          newDialog: !state.requisitions.newDialog,
        },
      };
    case TOGGLE_TESTS_EXPAND_DIALOG:
      return {
        ...state,
        tests: {
          ...state.tests,
          expandDialog: !state.tests.expandDialog,
        },
      };
    case TOGGLE_TESTS_CHART_EXPAND_DIALOG:
      return {
        ...state,
        tests: {
          ...state.tests,
          expandChartDialog: !state.tests.expandChartDialog,
        },
      };
    case SET_TEST_NAME:
      return {
        ...state,
        tests: {
          ...state.tests,
          testName: action.payload,
        },
      };
    case SET_SELECTED_TEST:
      return {
        ...state,
        tests: {
          ...state.tests,
          selectedTest: action.payload,
        },
      };
    case TOGGLE_DIAGNOSES_EXPAND_DIALOG:
      return {
        ...state,
        diagnoses: {
          ...state.diagnoses,
          expandDialog: !state.diagnoses.expandDialog,
        },
      };
    case SET_DIAGNOSES_STATUS:
      return {
        ...state,
        diagnoses: {
          ...state.diagnoses,
          status: action.payload,
        },
      };
    case TOGGLE_DIAGNOSES_NEW_DIALOG:
      return {
        ...state,
        diagnoses: {
          ...state.diagnoses,
          newDialog: !state.diagnoses.newDialog,
        },
      };
    case TOGGLE_MEDICATION_EXPAND_DIALOG:
      return {
        ...state,
        medications: {
          ...state.medications,
          expandDialog: !state.medications.expandDialog,
        },
      };
    case TOGGLE_MEDICATION_NEW_DIALOG:
      return {
        ...state,
        medications: {
          ...state.medications,
          newDialog: !state.medications.newDialog,
        },
      };
    case TOGGLE_BILLING_NEW_TRANSACTION_DIALOG:
      return {
        ...state,
        billing: {
          ...state.billing,
          newTransactionDialog: !state.billing.newTransactionDialog,
        },
      };
    case TOGGLE_BILLING_EXPAND_DIALOG:
      return {
        ...state,
        billing: {
          ...state.billing,
          expandDialog: !state.billing.expandDialog,
        },
      };
    case TOGGLE_BILLING_NEW_DIALOG:
      return {
        ...state,
        billing: {
          ...state.billing,
          newDialog: !state.billing.newDialog,
        },
      };
    case TOGGLE_INSIGHTS_EXPAND_DIALOG:
      return {
        ...state,
        insights: {
          ...state.insights,
          expandDialog: !state.insights.expandDialog,
        },
      };
    case RESET_STORE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default reducer;
