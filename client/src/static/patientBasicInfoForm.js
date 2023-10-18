export const BasicInfoForm = {
  firstRow: [
    {
      name: "firstname",
      id: "firstname",
      label: "First Name",
      baseType: "input",
      type: "text",
      options: [],
      required: true,
    },
    {
      name: "middlename",
      id: "middlename",
      label: "Middle Name",
      baseType: "input",
      type: "text",
      options: [],
    },
    {
      name: "lastname",
      id: "lastName",
      label: "Last Name",
      baseType: "input",
      type: "text",
      options: [],
      required: true,
    },
    {
      name: "status",
      id: "status",
      label: "Status",
      baseType: "select",
      type: null,
      options: [
        {
          label: "Active",
          value: "A",
        },
        {
          label: "Inactive",
          value: "I",
        },
      ],
    },
    {
      name: "provider",
      id: "provider",
      label: "Provider",
      baseType: "input",
      type: "text",
      options: [],
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
      name: "email",
      id: "email",
      label: "Email",
      baseType: "input",
      type: "email",
      options: [],
      required: true,
    },
  ],
  thirdRow: [
    {
      name: "phone_other",
      id: "otherPhone",
      label: "Other Phone",
      baseType: "input",
      type: "number",
      options: [],
    },
    {
      name: "phone_note",
      id: "phoneNotes",
      label: "Phone Notes",
      baseType: "input",
      type: "text",
      options: [],
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
    label: "Plan Name",
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

export const Pharmacies = [
  {
    id: "pharmacy1",
    name: "pharmacy1",
    label: "Search",
    address: "100 Main St, Ottario Canada",
    phone: "030-123-456",
  },
  {
    id: "pharmacy2",
    name: "pharmacy2",
    label: "Search",
    address: "100 Main St, New York USA",
    phone: "030-123-456",
  },
];

export const PaymentData = [
  {
    type: "Visa",
    cardNumber: "4234 5678 1234 5678",
    expiryDate: "08/25",
    cvv: 123,
  },
  {
    type: "Master Card",
    cardNumber: "5678 1234 5678 1234",
    expiryDate: "07/23",
    cvv: 567,
  },
];
