import { GET_USER_SUCCESS, GET_USER_REQUEST } from "./userActionTypes";

import { setError } from "../errorRedux/errorActions";

export const getUserRequest = () => ({
  type: GET_USER_REQUEST,
});

export const getUserSuccess = data => ({
  type: GET_USER_SUCCESS,
  payload: data,
});

export const getUsers = () => async dispatch => {
  dispatch(getUserRequest());
  try {
    const response = await fetch("/api/users/");
    const data = await response.json();
    dispatch(getUserSuccess(data));
  } catch (err) {
    dispatch(setError(err));
  }
};
