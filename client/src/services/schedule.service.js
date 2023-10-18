import axios from "axios";

import authHeader from "./auth-header";

const API_URL = `${process.env.REACT_APP_API_URL}api/v1` || "http://localhost:5000/api/v1";
class Schedule {
  getAllUsers() {
    return axios.get(`${API_URL}/setup/schedule/users`, { headers: authHeader() });
  }

  search(data) {
    return axios.post(`${API_URL}/setup/schedule/search`, data, {
      headers: authHeader(),
    });
  }

  createNewSchedule(data) {
    return axios.post(`${API_URL}/setup/schedule`, data, { headers: authHeader() });
  }

  updateSchedule(scheduleId, data) {
    return axios.put(`${API_URL}/setup/schedule/${scheduleId}`, data, {
      headers: authHeader(),
    });
  }

  deleteSchedule(id) {
    return axios.delete(`${API_URL}/setup/schedule/${id}`, { headers: authHeader() });
  }
}

export default new Schedule();
