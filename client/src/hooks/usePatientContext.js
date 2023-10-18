import { useContext } from "react";

import { PatientContext } from "../screens/Patient";

const usePatientContext = () => useContext(PatientContext);

export default usePatientContext;
