import {
  SET_SELECTED_ENCOUNTER,
  RESET_SELECTED_ENCOUNTER,
  SET_EDITOR_TEXT,
  RESET_EDITOR_TEXT,
} from "./types";

const initState = {
  selectedEncounter: null,
  editorText: "",
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SET_SELECTED_ENCOUNTER:
      return {
        ...state,
        selectedEncounter: action.payload,
      };
    case RESET_SELECTED_ENCOUNTER:
      return {
        ...state,
        selectedEncounter: null,
      };
    case SET_EDITOR_TEXT:
      return {
        ...state,
        editorText: action.payload,
      };
    case RESET_EDITOR_TEXT:
      return {
        ...state,
        editorText: "",
      };
    // editor case
    default:
      return state;
  }
};

export default reducer;
