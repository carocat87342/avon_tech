const initialState = {
  patientId: null,
  editorText: null,
  layout: null,
  patientInfo: {
    data: {},
    history: [],
    appointmentHistoryDialog: false,
    editDialog: false,
    historyDialog: false,
    isEditDialogType: true,
  },
  adminNotes: {
    data: [],
    editForm: false,
    historyDialog: false,
  },
  forms: {
    data: [],
    viewDialog: false,
    expandDialog: false,
  },
  handouts: {
    data: [],
    newDialog: false,
    expandDialog: false,
  },
  documents: {
    data: [],
    newDialog: false,
    expandDialog: false,
  },
  encounters: {
    data: [],
    selectedEncounter: null,
    newDialog: false,
    expandDialog: false,
  },
  medicalNotes: {
    data: [],
    editForm: false,
    historyDialog: false,
  },
  allergies: {
    data: [],
    newDialog: false,
    expandDialog: false,
  },
  messages: {
    data: [],
    selectedMessage: null,
    messageType: "New",
    messageDialogPage: false,
    newDialog: false,
    expandDialog: false,
  },
  requisitions: {
    data: [],
    newDialog: false,
    expandDialog: false,
  },
  tests: {
    data: [],
    expandDialog: false,
    expandChartDialog: false,
    testName: "",
    selectedTest: null,
  },
  diagnoses: {
    data: [],
    activeData: [],
    newDialog: false,
    expandDialog: false,
    status: true,
  },
  medications: {
    data: [],
    selectedMedication: null,
    newDialog: false,
    expandDialog: false,
  },
  billing: {
    data: [],
    selectedBilling: null,
    balance: 0,
    newDialog: false,
    expandDialog: false,
    newTransactionDialog: false,
  },
  insights: {
    data: [],
    newDialog: false,
    expandDialog: false,
  },
};

export default initialState;
