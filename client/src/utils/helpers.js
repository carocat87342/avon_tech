import { intersection } from "lodash";
import moment from "moment";

const presentDate = new Date();

export const getAcronym = (str) => {
  if (!str || typeof str === "undefined" || str === "") {
    return "";
  }
  const matches = str.match(/\b(\w)/g);
  return matches.join("");
};

export const removeSpecialCharFromString = (str) => str.replace(/[^a-zA-Z ]/g, "");

export const removeEmpty = (obj) => {
  const newObj = {};
  Object.keys(obj).forEach((prop) => {
    if (obj[prop] && typeof obj[prop] === "object") removeEmpty(obj[prop]);
    if (obj[prop]) {
      newObj[prop] = obj[prop];
    }
  });
  return newObj;
};

function getFullDate(x) {
  switch (x) {
    case 0:
      return 31;
    case 1:
      return 28;
    case 2:
      return 31;
    case 3:
      return 30;
    case 4:
      return 31;
    case 5:
      return 30;
    case 6:
      return 31;
    case 7:
      return 31;
    case 8:
      return 30;
    case 9:
      return 31;
    case 10:
      return 30;
    case 11:
      return 31;
    default:
      return 30;
  }
}

export const calculateAge = (date) => {
  const now = new Date();
  const dob = new Date(date);
  let year = now.getYear() - dob.getYear();
  let month = now.getMonth() - dob.getMonth();
  if (month < 0) {
    month = now.getMonth() + 12 - dob.getMonth();
    year -= 1;
  }
  let day = now.getDate() - dob.getDate();
  if (day < 0) {
    const monthNumber = dob.getMonth();
    const fullDate = getFullDate(monthNumber);
    day = now.getDate() + fullDate - dob.getDate();
    month -= 1;
  }

  return year > 0 ? `${year} yrs` : `${month} mo`;
};

export const formatPhoneNumber = (phoneNumber) => {
  const cleaned = `${phoneNumber}`.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]}`;
  }
  return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
};

export const formatDate = (date) => {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join("-");
};

export const formatPdfDate = (date) => {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [day, month, year].join("/");
};

export const dateDiffInMinutes = (d1, d2) => {
  const t2 = d2.getTime();
  const t1 = d1.getTime();

  return parseInt(Math.abs(t1 - t2) / 60000, 10);
};

export const dateDiffInHours = (d1, d2) => {
  const t2 = d2.getTime();
  const t1 = d1.getTime();
  return parseInt(Math.abs(t1 - t2) / 36e5, 10);
};

export const dateDiffInDays = (d1, d2) => {
  const t2 = d2.getTime();
  const t1 = d1.getTime();

  return parseInt((t2 - t1) / (24 * 3600 * 1000), 10);
};

export const dateDiffInWeeks = (d1, d2) => {
  const t2 = d2.getTime();
  const t1 = d1.getTime();

  return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7), 10);
};

export const dateDiffInMonths = (d1, d2) => {
  const d1Y = d1.getFullYear();
  const d2Y = d2.getFullYear();
  const d1M = d1.getMonth();
  const d2M = d2.getMonth();

  return d2M + 12 * d2Y - (d1M + 12 * d1Y);
};

export const dateDiffInYears = (d1, d2) => d2.getFullYear() - d1.getFullYear();

export const calculateDateDifference = (d1, d2 = presentDate) => {
  const hoursDiff = dateDiffInHours(d1, d2);
  const daysDiff = dateDiffInDays(d1, d2);
  const monthsDiff = dateDiffInMonths(d1, d2);
  const yearsDiff = dateDiffInYears(d1, d2);

  if (yearsDiff > 0) {
    return yearsDiff > 1 ? `${yearsDiff} years` : `${yearsDiff} year`;
  } if (monthsDiff > 0) {
    return monthsDiff > 1 ? `${monthsDiff} months` : `${monthsDiff} month`;
  }

  return daysDiff > 0 ? `${daysDiff} ${daysDiff > 1 ? "days" : "day"}` : `${hoursDiff} hours`;
};

export const statusToColorCode = (status) => {
  switch (status) {
    case "D":
      return "#ffab40";
    case "A":
      return "#008B00";
    default:
      return "#2196f3";
  }
};

export const mapAppointmentStatus = (status) => {
  switch (status) {
    case "R":
      return "Requested";
    case "A":
      return "Approved";
    case "D":
      return "Declined";
    default:
      return "";
  }
};

export const encounterTypeToLetterConversion = (encounter) => {
  switch (encounter) {
    case "Office Visit":
      return "O";
    case "Email":
      return "E";
    case "Admin Note":
      return "A";
    case "Phone Call":
      return "P";
    case "Refill":
      return "R";
    default:
      return "";
  }
};

export const encounterLetterToTypeConversion = (encounter) => {
  switch (encounter) {
    case "O":
      return "Office Visit";
    case "E":
      return "Email";
    case "A":
      return "Admin Note";
    case "P":
      return "Phone Call";
    case "R":
      return "Refill";
    default:
      return "";
  }
};

export const convertTransactionTypes = (type) => {
  switch (type) {
    case "Service":
      return 1;
    case "Service Credit":
      return 2;
    case "Payment":
      return 3;
    case "Payment Refund":
      return 4;
    default:
      return "";
  }
};

export const messageStatusType = (type) => {
  switch (type) {
    case "O":
      return "Open";
    case "C":
      return "Closed";
    default:
      return "";
  }
};

export const paymentMethodType = (type) => {
  switch (type) {
    case "V":
      return "Visa";
    case "M":
      return "Master";
    case "C":
      return "Credit Card";
    default:
      return "New Payment Method"; // required for purchase labs page
  }
};

export const labRangeTableTranslation = (type) => {
  switch (type) {
    case "G":
      return "Gender";
    case "A":
      return "Age";
    case "M":
      return "Male";
    case "F":
      return "Female";
    default:
      return "";
  }
};

export const labStatusTypeToLabel = (type) => {
  switch (type) {
    case "R":
      return "Requested";
    case "A":
      return "Approved";
    case "D":
      return "Declined";
    default:
      return "";
  }
};

export const labSourceTypeToLabel = (type) => {
  switch (type) {
    case "P":
      return "Patient";
    case "U":
      return "User";
    case "L":
      return "Lab Company";
    case "F":
      return "Fax";
    default:
      return "";
  }
};

export const drugFrequencyCodeToLabel = (frequency) => {
  switch (frequency) {
    case "1D":
      return "Once a day";
    case "2D":
      return "Twice a day";
    default:
      return "";
  }
};

export const drugFrequencyLabelToCode = (frequency) => {
  switch (frequency) {
    case "Once Daily":
      return "1D";
    case "Twice Daily":
      return "2D";
    default:
      return "";
  }
};

export const medicationFormToLabel = (form) => {
  switch (form) {
    case "T":
      return "Tablets";
    case "C":
      return "Capsules";
    default:
      return "";
  }
};

export const isDev = () => process.env.NODE_ENV === "development";

export function isArrayWithLength(arr) {
  return Array.isArray(arr) && arr.length;
}

export function getAllowedRoutes(routes, roles) {
  return routes.filter(({ permission }) => {
    if (!permission) return true;
    if (!isArrayWithLength(permission)) return true;
    return intersection(permission, roles).length;
  });
}

export function checkFileExtension(fileName) {
  const extension = fileName.substring(fileName.lastIndexOf(".") + 1);
  return extension;
}

export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function noOp() { }

export const pickerDateFormat = (date) => moment(date).format("MMM DD YYYY");

export const dateFormat = (date) => moment(date).format("MMM D YYYY");

export const dayDateFormat = (date) => moment(date).format("dddd MMM D YYYY");

export const dateTimeFormat = (date) => moment(date).format("MMM D YYYY hh:mm A");

export const hasValue = (value) => !((typeof value === "undefined") || (value === null));

export const stringWithoutComments = (string) => string.replace(/(\/\*[^*]*\*\/)|(\/\/[^*]*)/g, "");

export const urlify = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  // eslint-disable-next-line quotes
  return text.replace(urlRegex, '<a style="word-wrap: break-word" href="$1" target="_blank">$1</a>');
};

export const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const getDatesArray = (startDate, endDate, holidays) => {
  const dateArray = [];
  let currentDate = moment(startDate);
  const stopDate = moment(endDate);
  while (currentDate <= stopDate) {
    if (!holidays.includes(moment(currentDate).format("dddd"))) { // skip holidays
      dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
    }
    currentDate = moment(currentDate).add(1, "days");
  }
  return dateArray;
};

export const round1 = (number) => Number(number).toFixed(1);

export const changeTimezone = (date, ianatz) => {
  // suppose the date is 12:00 UTC
  const invdate = new Date(date.toLocaleString("en-US", {
    timeZone: ianatz,
  }));

  // then invdate will be 07:00 in Toronto
  // and the diff is 5 hours
  const diff = date.getTime() - invdate.getTime();

  // so 12:00 in Toronto is 17:00 UTC
  return new Date(date.getTime() - diff); // needs to substract
};

/** Create time slots * */

function parseTime(s) {
  const c = s.split(":");
  return parseInt(c[0], 10) * 60 + parseInt(c[1], 10);
}

function pad(str, max) {
  const string = str.toString();
  return string.length < max ? pad(`0${string}`, max) : string;
}

function convertHours(mins) {
  const hour = Math.floor(mins / 60);
  const minutes = mins % 60;
  const converted = `${pad(hour, 2)}:${pad(minutes, 2)}`;
  return converted;
}

export const calculate_time_slot = (startTime, endTime, interval = "30") => {
  const start_time = parseTime(startTime);
  const end_time = parseTime(endTime);
  const time_slots = [];
  if (start_time < end_time) {
    for (let i = start_time; i < end_time; i += interval) {
      const formatted_pre_time = convertHours(i);
      const formatted_end_time = convertHours(i + interval);
      time_slots.push(`${formatted_pre_time} - ${formatted_end_time}`);
    }
  } else {
    for (let i = start_time; i < parseTime("24:00"); i += interval) {
      const formatted_pre_time = convertHours(i);
      const formatted_end_time = convertHours(i + interval);
      time_slots.push(`${formatted_pre_time} - ${formatted_end_time}`);
    }
    for (let i = parseTime("00:00"); i < end_time; i += interval) {
      const formatted_pre_time_2 = convertHours(i);
      const formatted_end_time_2 = convertHours(i + interval);
      time_slots.push(`${formatted_pre_time_2} - ${formatted_end_time_2}`);
    }
  }

  return time_slots;
};


/** End of create time slots * */
