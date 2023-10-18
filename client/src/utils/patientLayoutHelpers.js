const DEFAULT_HEIGHT = 3;

export const getSecondColumnHeight = (title) => {
  switch (title) {
    case "Encounters":
      return 8;
    case "Medical Notes":
      return 5;
    case "Allergies":
      return 3;
    default:
      return DEFAULT_HEIGHT;
  }
};

export const getThirdColumnHeight = (title) => {
  switch (title) {
    case "Diagnoses":
      return 5;
    case "Medications":
      return 4;
    case "Requisitions":
      return 4;
    case "Nutrition":
      return 3;
    default:
      return DEFAULT_HEIGHT;
  }
};

export const getFourthColumnHeight = (title) => {
  switch (title) {
    case "Messages":
      return 7;
    case "Billing":
      return 4;
    case "Insights":
      return 5;
    default:
      return DEFAULT_HEIGHT;
  }
};
