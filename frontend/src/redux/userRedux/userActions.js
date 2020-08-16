import {
  GET_USER_SUCCESS,
  GET_USER_REQUEST,
  UPDATE_USER,
} from "./userActionTypes";

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
    alert(err.msg);
    // dispatch(setError(err));
  }
};

export const updateUser = user => async dispatch => {
  const reqData = { user };
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    });
    if (response.status !== 200) throw await response.json();
    dispatch({ type: UPDATE_USER, payload: user });
  } catch (err) {
    alert(err.msg);
    // dispatch(setError(err));
  }
};
