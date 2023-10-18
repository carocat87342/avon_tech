import React, {
  createContext,
  useEffect,
  useReducer,
} from "react";

import jwtDecode from "jwt-decode";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";
import logger from "use-reducer-logger";

import SplashScreen from "../components/SlashScreen";
import authHeader from "../services/auth-header";
import { API_BASE } from "../utils/API_BASE";
import axios from "../utils/axios";
import { isDev } from "../utils/helpers";

const initialAuthState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
  lastVisitedPatient: null,
};

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INITIALISE": {
      const { isAuthenticated, user, lastVisitedPatient } = action.payload;
      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
        lastVisitedPatient,
      };
    }
    case "UPDATE_LAST_VISITED_PATIENT": {
      const { lastVisitedPatient } = action.payload;
      return {
        ...state,
        lastVisitedPatient,
      };
    }
    case "LOGIN": {
      const { user } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialAuthState,
  method: "JWT",
  login: () => Promise.resolve(),
  logout: () => { },
  patientLogin: () => Promise.resolve(),
  corporateLogin: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(isDev() ? logger(reducer) : reducer, initialAuthState);
  const [cookies] = useCookies();

  const updateLastVisitedPatient = async (patientId) => {
    try {
      const lastVisitedPatentResponse = await axios.get(`${API_BASE}/user/last-visited-patient/${patientId}`,
        {
          headers: authHeader(),
        });
      const lastVisitedPatient = lastVisitedPatentResponse.data.data;

      dispatch({
        type: "UPDATE_LAST_VISITED_PATIENT",
        payload: {
          lastVisitedPatient,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };


  const login = async (email, password) => {
    const response = await axios.post(`${API_BASE}/auth/login`, { email, password });
    const { accessToken, user } = response.data.data;
    setSession(accessToken);
    const patientId = cookies[`${user.id}-last_viewed_patient_id`];

    updateLastVisitedPatient(patientId);
    dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    });
  };

  const patientLogin = async (client_id, email, password) => {
    const response = await axios.post(`${API_BASE}/auth/patient/login`, { client_id, email, password });
    const { accessToken, user } = response.data.data;
    setSession(accessToken);
    dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    });
  };

  const corporateLogin = async (email, password) => {
    const response = await axios.post(`${API_BASE}/auth/corporate/login`, { email, password });
    const { accessToken, user } = response.data.data;
    setSession(accessToken);
    dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    });
  };

  const logout = () => {
    localStorage.clear();
    setSession(null);
    dispatch({ type: "LOGOUT" });

    // removeCookie("last_viewed_patient_id");
  };

  useEffect(() => {
    const initialise = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const decoded = jwtDecode(accessToken);

          let fetchURL = `${API_BASE}/auth/user`;
          if (decoded.role === "CORPORATE") {
            fetchURL = `${API_BASE}/auth/corporate-user`;
          } else if (decoded.role === "PATIENT") {
            fetchURL = `${API_BASE}/auth/patient`;
          }

          const response = await axios.get(fetchURL, {
            headers: authHeader(),
          });
          const { user } = response.data.data;
          const patientId = cookies[`${user.id}-last_viewed_patient_id`];
          let lastVisitedPatient = null;
          if (patientId && patientId !== "undefined" && (decoded.role === "CLIENT")) {
            const lastPatentRes = await axios.get(`${API_BASE}/user/last-visited-patient/${patientId}`,
              { headers: authHeader() });
            lastVisitedPatient = lastPatentRes.data.data;
          }

          dispatch({
            type: "INITIALISE",
            payload: {
              ...state,
              isAuthenticated: true,
              user,
              lastVisitedPatient,
            },
          });
        } else {
          dispatch({
            type: "INITIALISE",
            payload: {
              isAuthenticated: false,
              user: null,
              lastVisitedPatient: null,
            },
          });
        }
      } catch (err) {
        dispatch({
          type: "INITIALISE",
          payload: {
            isAuthenticated: false,
            user: null,
            lastVisitedPatient: null,
          },
        });
      }
    };

    initialise();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!state.isInitialised) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "JWT",
        login,
        patientLogin,
        updateLastVisitedPatient,
        corporateLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

AuthContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
