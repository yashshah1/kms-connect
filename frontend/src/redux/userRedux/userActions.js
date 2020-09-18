import { GET_USER_SUCCESS, GET_USER_REQUEST, UPDATE_USERS } from "./userActionTypes";
// eslint-disable-next-line
import { setError } from "../errorRedux/errorActions";

const getUserRequest = () => ({
  type: GET_USER_REQUEST,
});

const getUserSuccess = (data) => ({
  type: GET_USER_SUCCESS,
  payload: data,
});

export const getUsers = () => async (dispatch, getState) => {
  if (getState().user.loading === false) {
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
  }
};

export const updateUser = (user) => async (dispatch) => {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      body: user,
    });
    const resData = await response.json();
    if (response.status !== 200) throw resData;
    dispatch({ type: UPDATE_USERS, payload: resData });
    alert("Done");
  } catch (err) {
    console.log(err);
    alert(err.msg);
    // dispatch(setError(err));
  }
};
