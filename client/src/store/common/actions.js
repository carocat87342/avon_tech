import {
  START_FETCHING,
  FETCHING_COMPLETED,
  SET_ERROR,
  HIDE_ERROR,
  CLOSE_SNACKBAR,
  SET_SUCCESS,
} from "./types";

export const startFetching = () => ({
  type: START_FETCHING,
});

export const fetchingCompleted = () => ({
  type: FETCHING_COMPLETED,
});

export const setError = (error) => ({
  type: SET_ERROR,
  error,
});

export const setSuccess = (message) => ({
  type: SET_SUCCESS,
  message,
});

export const hideError = () => ({
  type: HIDE_ERROR,
});

export const closeSnackbar = () => ({
  type: CLOSE_SNACKBAR,
});
