import axios from "axios";

import authHeader from "../services/auth-header";
import { API_BASE } from "./API_BASE";

export const fetchClientAgreement = () => axios
  .get(`${API_BASE}/client/agreement`, {
    headers: authHeader(),
  })
  .then((res) => res.data);

export const search = (searchTerm) => axios
  .get(`${API_BASE}/search/?query=${searchTerm}`, {
    headers: authHeader(),
  })
  .then((res) => res.data);
