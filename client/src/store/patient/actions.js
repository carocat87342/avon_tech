import {
  SET_SELECTED_ENCOUNTER,
  RESET_SELECTED_ENCOUNTER,
  SET_EDITOR_TEXT,
  RESET_EDITOR_TEXT,
} from "./types";


export const setEncounter = (encounter) => ({
  type: SET_SELECTED_ENCOUNTER,
  payload: encounter,
});

export const resetEncounter = () => ({
  type: RESET_SELECTED_ENCOUNTER,
});


export const setEditorText = (value) => ({
  type: SET_EDITOR_TEXT,
  payload: value,
});

export const resetEditorText = () => ({
  type: RESET_EDITOR_TEXT,
});
