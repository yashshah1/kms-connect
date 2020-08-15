import { LOGIN_SUCCESS, LOGOUT } from "./authActionTypes";

import { setError } from "../errorRedux/errorActions";

export const loginSuccess = data => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const logOut = () => ({
  type: LOGOUT,
});

export const login = (username, password) => async dispatch => {
  const reqData = { username, password };

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    });
    if (response.status !== 200) throw await response.json();
    const data = await response.json();

    dispatch(loginSuccess(data));
  } catch (err) {
    dispatch(setError(err));
  }
};
