import { GET_USER_SUCCESS, GET_USER_REQUEST, UPDATE_USERS } from "./userActionTypes";
// eslint-disable-next-line
import { setError } from "../errorRedux/errorActions";

export const getUserRequest = () => ({
  type: GET_USER_REQUEST,
});

export const getUserSuccess = (data) => ({
  type: GET_USER_SUCCESS,
  payload: data,
});

export const getUsers = () => async (dispatch) => {
  dispatch(getUserRequest());
  try {
    const response = await fetch("/api/users/");
    const data = await response.json();
    const dataObj = {};
    for (const person of data) dataObj[person.person_no] = person;

    dispatch(getUserSuccess(dataObj));
  } catch (err) {
    alert(err.msg);
    // dispatch(setError(err));
  }
};

export const updateUser = (user) => async (dispatch) => {
  const reqData = { user };
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    });
    const resData = await response.json();
    if (response.status !== 200) throw resData;
    resData.push(user);
    dispatch({ type: UPDATE_USERS, payload: resData });
    alert("Done");
  } catch (err) {
    console.log(err);
    alert(err.msg);
    // dispatch(setError(err));
  }
};
