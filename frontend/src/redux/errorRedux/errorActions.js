import { SET_ERROR, HIDE_ERROR } from "./errorActionTypes";

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const hideError = () => ({
  type: HIDE_ERROR,
});
