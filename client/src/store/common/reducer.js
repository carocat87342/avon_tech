import {
  START_FETCHING,
  FETCHING_COMPLETED,
  SET_ERROR,
  HIDE_ERROR,
  CLOSE_SNACKBAR,
  SET_SUCCESS,
} from "./types";

const initState = {
  loading: false,
  error: null,
  isOpen: false,
  success: false,
  snackbar: {
    isOpen: false,
    message: null,
    severity: null,
  },
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case START_FETCHING:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case FETCHING_COMPLETED:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.error,
        isOpen: true,
        success: false,
        snackbar: {
          ...state.snackbar,
          isOpen: true,
          message: action.error.message,
          severity: action.error.severity,
        },
      };
    case SET_SUCCESS:
      return {
        ...state,
        error: action.error,
        isOpen: true,
        success: true,
        snackbar: {
          ...state.snackbar,
          isOpen: true,
          message: action.message,
          severity: "success",
        },
      };
    case CLOSE_SNACKBAR:
      return {
        ...state,
        snackbar: {
          ...state.snackbar,
          isOpen: false,
        },
      };

    case HIDE_ERROR:
      return {
        ...state,
        isOpen: false,
      };

    default:
      return state;
  }
};

export default reducer;
