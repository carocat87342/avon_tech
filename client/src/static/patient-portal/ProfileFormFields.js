export const ProfileFormFields = {
  firstRow: [
    {
      name: "firstname",
      id: "firstname",
      label: "First Name",
      baseType: "input",
      type: "text",
      options: [],
      readOnly: true,
    },
    {
      name: "middlename",
      id: "middlename",
      label: "Middle Name",
      baseType: "input",
      type: "text",
      options: [],
      readOnly: true,
    },
    {
      name: "lastname",
      id: "lastName",
      label: "Last Name",
      baseType: "input",
      type: "text",
      options: [],
      readOnly: true,
    },
    {
      name: "gender",
      id: "gender",
      label: "Gender",
      baseType: "select",
      type: null,
      options: [
        {
          label: "Male",
          value: "M",
        },
        {
          label: "Female",
          value: "F",
        },
      ],
    },
  ],
  secondRow: [
    {
      name: "phone_home",
      id: "homePhone",
      label: "Home Phone",
      baseType: "input",
      type: "text",
      options: [],
    },
    {
      name: "phone_cell",
      id: "cellPhone",
      label: "Cell Phone",
      baseType: "input",
      type: "text",
      options: [],
    },
    {
      name: "phone_work",
      id: "workPhone",
      label: "Work Phone",
      baseType: "input",
      type: "text",
      options: [],
    },
    {
      name: "phone_other",
      id: "otherPhone",
      label: "Other Phone",
      baseType: "input",
      type: "text",
      options: [],
    },
  ],
  thirdRow: [
    {
      name: "phone_note",
      id: "phoneNotes",
      label: "Phone Notes",
      baseType: "input",
      type: "text",
      options: [],
    },
    {
      name: "ssn",
      id: "socialSecurity",
      label: "Social Security",
      baseType: "input",
      type: "text",
      options: [],
    },
  ],
};

export const InsuranceForm = [
  {
    name: "insurance_name",
    id: "insurance_name",
    label: "Insurance Plan Name",
    baseType: "input",
    type: "text",
    options: [],
  },
  {
    name: "insurance_group",
    id: "insurance_group",
    label: "Group Name",
    baseType: "input",
    type: "text",
    options: [],
  },
  {
    name: "insurance_member",
    id: "insurance_member",
    label: "Member Id",
    baseType: "input",
    type: "number",
    options: [],
  },
  {
    name: "insurance_phone",
    id: "insurance_phone",
    label: "Plan Phone No",
    baseType: "input",
    type: "number",
    options: [],
  },
  {
    name: "insurance_desc",
    id: "insurance_desc",
    label: "Plan Description",
    baseType: "input",
    type: "text",
    options: [],
  },
];

export const AddressForm = [
  {
    name: "city",
    id: "planName",
    label: "Plan Name",
    baseType: "input",
    type: "text",
    options: [],
  },
  {
    name: "state",
    id: "planName",
    label: "Plan Name",
    baseType: "input",
    type: "text",
    options: [],
  },
  {
    name: "postal",
    id: "planName",
    label: "Plan Name",
    baseType: "input",
    type: "text",
    options: [],
  },
];

export const PortalForm = [
  {
    name: "email",
    id: "portal-email",
    label: "Email",
    baseType: "input",
    type: "email",
    options: [],
  },
  {
    name: "password",
    id: "portal-password",
    label: "Password",
    baseType: "input",
    type: "password",
    options: [],
  },
];
