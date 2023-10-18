
export const NewDrugFormFields = [
  {
    name: "strength",
    id: "strength",
    label: "Strength",
    baseType: "select",
    type: "text",
    options: [],
    multiline: false,
    required: true,
  },
  {
    name: "frequency",
    id: "frequency",
    label: "Frequency",
    baseType: "select",
    type: "text",
    options: [],
    multiline: false,
    required: true,
  },
  {
    name: "startDate",
    id: "startDate",
    label: "Start Date",
    baseType: "input",
    type: "date",
    options: [],
    multiline: false,
    required: true,
  },
  {
    name: "expires",
    id: "expires",
    label: "Expires (Days)",
    baseType: "input",
    type: "number",
    options: [],
    multiline: false,
    required: true,
  },
  {
    name: "amount",
    id: "amount",
    label: "Amount",
    baseType: "input",
    type: "number",
    options: [],
    multiline: false,
    required: true,
  },
  {
    name: "refills",
    id: "refills",
    label: "Refills",
    baseType: "input",
    type: "number",
    options: [],
    multiline: false,
    required: true,
  },
  {
    name: "patientInstructions",
    id: "patientInstructions",
    label: "Patient Instructions",
    baseType: "input",
    type: "text",
    options: [],
    multiline: true,
    required: false,
  },
  {
    name: "pharmacyInstructions",
    id: "pharmacyInstructions",
    label: "Pharmacy Instructions",
    baseType: "input",
    type: "text",
    options: [],
    multiline: true,
    required: false,
  },
];

export const GenericOptions = [
  {
    label: "Generic Yes",
    value: "1",
  },
  {
    label: "Generic No",
    value: "0",
  },
];

export const InputOptions = [
  {
    label: "30",
    value: "30",
  },
  {
    label: "60",
    value: "60",
  },
  {
    label: "90",
    value: "90",
  },
  {
    label: "120",
    value: "120",
  },
];

export const RefillsOptions = [
  {
    label: "1",
    value: "1",
  },
  {
    label: "2",
    value: "2",
  },
  {
    label: "3",
    value: "3",
  },
  {
    label: "4",
    value: "4",
  },
];

export const DEFAULT_FREQUENCY = "1D";
export const DEFAULT_EXPIRY = 30;
export const DEFAULT_AMOUNT = 30;
export const DEFAULT_REFILLS = 2;
