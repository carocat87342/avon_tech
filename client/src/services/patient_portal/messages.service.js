import axios from "axios";

import { API_BASE } from "../../utils/API_BASE";
import authHeader from "../auth-header";

class MessagesService {
  getMessages = () => axios.get(`${API_BASE}/client-portal/messages`, {
    headers: authHeader(),
  });

  getMessageUsers = () => axios.get(`${API_BASE}/client-portal/messages/users`, {
    headers: authHeader(),
  });

  createMessage = (data) => axios.post(`${API_BASE}/client-portal/messages`, data, {
    headers: authHeader(),
  });

  updateMessage = (data) => axios.put(`${API_BASE}/client-portal/messages/${data.data.id}`, data, {
    headers: authHeader(),
  });

  deleteMessage = (id) => axios.delete(`${API_BASE}/client-portal/messages/${id}`, {
    headers: authHeader(),
  });
}

export default new MessagesService();
