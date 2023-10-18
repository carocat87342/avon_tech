export const EncountersFormFields = {
  titleField: {
    name: "title",
    id: "title",
    label: "Title",
    baseType: "input",
    type: "text",
    options: [],
  },
  typeField: {
    name: "encounter_type",
    id: "encounter_type",
    label: "Type",
    baseType: "select",
    type: null,
    options: [
      {
        label: "Office Visit",
        value: "O",
      },
      {
        label: "Email",
        value: "E",
      },
      {
        label: "Admin Note",
        value: "A",
      },
      {
        label: "Phone Call",
        value: "P",
      },
      {
        label: "Refill",
        value: "R",
      },
    ],
  },
};

export const EncountersCards = [
  {
    title: "Diagnose",
    showActions: false,
    showSearch: false,
    data: [],
    primaryButtonText: "",
    secondaryButtonText: "",
    icon: null,
  },
  {
    title: "Plan",
    showActions: false,
    showSearch: false,
    data: [],
    primaryButtonText: "",
    secondaryButtonText: "",
    icon: "AddIcon",
  },
  {
    title: "Billing",
    showActions: false,
    showSearch: false,
    data: [],
    primaryButtonText: "",
    secondaryButtonText: "",
    icon: "AddIcon",
  },
];


export const NewDrugFormFields = [
  {
    name: "type",
    id: "type",
    label: "Type",
    baseType: "input",
    type: "text",
    options: [],
  },
  {
    name: "frequency",
    id: "frequency",
    label: "Frequency",
    baseType: "select",
    type: "text",
    options: [],
  },
  {
    name: "startDate",
    id: "startDate",
    label: "Start Date",
    baseType: "input",
    type: "date",
    options: [],
  },
  {
    name: "expires",
    id: "expires",
    label: "Expires (Days)",
    baseType: "input",
    type: "number",
    options: [],
  },
  {
    name: "amount",
    id: "amount",
    label: "Amount",
    baseType: "input",
    type: "number",
    options: [],
  },
  {
    name: "refills",
    id: "refills",
    label: "Refills",
    baseType: "input",
    type: "number",
    options: [],
  },
  {
    name: "patientInstructions",
    id: "patientInstructions",
    label: "Patient Instructions",
    baseType: "input",
    type: "text",
    options: [],
  },
  {
    name: "pharmacyInstructions",
    id: "pharmacyInstructions",
    label: "Pharmacy Instructions",
    baseType: "input",
    type: "text",
    options: [],
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
