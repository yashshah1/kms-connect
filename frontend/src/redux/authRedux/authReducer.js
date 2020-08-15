import { LOGIN_SUCCESS, LOGOUT } from "./authActionTypes";

const initialAuthState = {
  loggedIn: false,
  user: {},
  jwt: "",
};

const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const { token, user } = action.payload;
      localStorage.setItem("kmmms-token", token);
      return {
        ...state,
        jwt: token,
        loggedIn: true,
        user,
      };

    case LOGOUT:
      localStorage.removeItem("kmmms-token");
      return {
        ...state,
        user: {},
        jwt: "",
        loggedIn: false,
      };

    default:
      return state;
  }
};

export default authReducer;
